import { auth0 } from './auth0';
import { writable, derived } from 'svelte/store';
import type { RedirectLoginResult, User } from '@auth0/auth0-spa-js';
import { path } from '$lib/path';

export const getUser = (): Promise<User | undefined> =>
	auth0.then((a) => a.getUser()).catch(() => undefined);
export const getToken = (): Promise<string | undefined> =>
	auth0
		.then((a) => a.getIdTokenClaims())
		.then((token) => token.__raw)
		.catch(() => undefined);
export const waitForSignIn = (): Promise<RedirectLoginResult> =>
	auth0.then((a) => a.handleRedirectCallback()).catch(() => ({ appState: undefined }));

export const auth = (() => {
	const { subscribe, set } = writable<boolean>(false);

	const reload = () =>
		auth0
			.then((a) => a.isAuthenticated())
			.then((isSignedIn) => set(isSignedIn))
			.catch(() => set(false));
	const signIn = () => auth0.then((a) => a.loginWithRedirect().catch(() => undefined));
	const signOut = () =>
		auth0.then((a) => Promise.resolve(a.logout({ returnTo: path })).catch(() => undefined));

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
