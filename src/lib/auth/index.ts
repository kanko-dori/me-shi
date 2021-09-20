import { auth0 } from './auth0';
import { writable, derived } from 'svelte/store';
import type { RedirectLoginResult, User } from '@auth0/auth0-spa-js';

export const getUser = (): Promise<User | undefined> => auth0.then((a) => a.getUser());
export const getToken = (): Promise<string | undefined> =>
	auth0.then((a) => a.getIdTokenClaims()).then((token) => token.__raw);
export const waitForSignIn = (): Promise<RedirectLoginResult> =>
	auth0.then((a) => a.handleRedirectCallback());

export const auth = (() => {
	const { subscribe, set } = writable<boolean>(false);

	const reload = () => auth0.then((a) => a.isAuthenticated()).then((isSignedIn) => set(isSignedIn));
	const signIn = () => auth0.then((a) => a.loginWithRedirect());
	const signOut = () => auth0.then((a) => a.logout());

	reload();

	return {
		signIn,
		signOut,
		reload,
		subscribe
	};
})();

export const signedIn = auth;

export const token = derived<typeof auth, string | undefined>(
	auth,
	(isSignedIn, set) => {
		if (!isSignedIn) {
			set(undefined);
			return;
		}
		getToken().then((token) => set(token));
	},
	undefined
);

export const user = derived<typeof auth, User | undefined>(
	auth,
	(isSignedIn, set) => {
		if (!isSignedIn) {
			set(undefined);
			return;
		}
		getUser().then((user) => set(user));
	},
	undefined
);
