import { auth0 } from './auth0';
import { writable, derived } from 'svelte/store';
import type { RedirectLoginResult, User } from '@auth0/auth0-spa-js';
import { path } from '$lib/path';
import type { StatusStore } from '$lib/store';

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
	const { subscribe, set } = writable<StatusStore<boolean, unknown>>({ type: 'loading' });

	const reload = () =>
		auth0
			.then((a) => a.isAuthenticated())
			.then((isSignedIn) => set({ value: isSignedIn, type: 'success' }))
			.catch((e) => set({ error: e, type: 'failure' }));
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

export const token = derived<typeof auth, StatusStore<string | null, unknown>>(
	auth,
	(isSignedIn, set) => {
		switch (isSignedIn.type) {
			case 'loading':
				set({ type: 'loading' });
				break;
			case 'success':
				if (isSignedIn.value)
					getToken().then((token) => set({ value: token ?? null, type: 'success' }));
				else set({ type: 'success', value: null });
				break;
			case 'failure':
				set({ type: 'failure', error: isSignedIn.error });
				break;
		}
	},
	{ type: 'loading' }
);

export const authUser = derived<typeof auth, StatusStore<User | null, unknown>>(
	auth,
	(isSignedIn, set) => {
		switch (isSignedIn.type) {
			case 'loading':
				set({ type: 'loading' });
				break;
			case 'success':
				if (isSignedIn.value)
					getUser().then((user) => set({ value: user ?? null, type: 'success' }));
				else set({ type: 'success', value: null });
				break;
			case 'failure':
				set({ type: 'failure', error: isSignedIn.error });
				break;
		}
	},
	{ type: 'loading' }
);
