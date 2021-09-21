import { browser } from '$app/env';
import { token, authUser } from '$lib/auth';
import { getUser } from '$lib/graphql/query';
import type { User } from 'src/generated/graphql';
import { derived } from 'svelte/store';
import type { StatusStore } from '.';

export const user = derived<[typeof token, typeof authUser], StatusStore<User | null, unknown>>(
	[token, authUser],
	([t, u], set) => {
		if (!browser) return; // node can't use graphql with amplify

		if (t.type === 'success' && u.type === 'success') {
			if (t.value === null) set({ type: 'failure', error: new Error('Token is null') });
			else if (u.value === null || u.value.sub === undefined)
				set({ type: 'failure', error: new Error('User sub is undefined') });
			else
				getUser(
					{
						input: {
							userId: u.value.sub
						}
					},
					{ Authorization: t.value }
				).then(({ getUser }) => set({ type: 'success', value: getUser }));
		}
	},
	{ type: 'loading' }
);
