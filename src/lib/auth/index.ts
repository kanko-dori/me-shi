import { auth0 } from './auth0';
import { writable, derived } from 'svelte/store';

export const auth = (() => {
	const { subscribe, set } = writable<boolean>(false);

	auth0.isAuthenticated().then((isSignedIn) => set(isSignedIn));

	const signIn = () => auth0.loginWithRedirect().then(() => set(true));
	const signOut = () => Promise.resolve(auth0.logout()).then(() => set(false));

	return {
		signIn,
		signOut,
		subscribe
	};
})();

auth.subscribe(console.log);

export const signedIn = auth;

export const token = derived<typeof auth, string | null>(auth, (isSignedIn, set) => {
	if (!isSignedIn) {
		set(null);
		return;
	}
	auth0.getTokenSilently().then((token) => set(token));
});
