import { browser } from '$app/env';
import { token, user as authUser } from '$lib/auth';
import { getUser } from '$lib/graphql/query';
import type { User } from 'src/generated/graphql';
import { derived } from 'svelte/store';

export const user = derived<[typeof token, typeof authUser], User | undefined>(
	[token, authUser],
	([t, u], set) => {
		if (!browser || !t || !u) return;
		getUser(
			{
				input: { userId: u?.sub ?? '' }
			},
			{ Authorization: t ?? '' }
		).then((u) => {
			if (u == null) throw new Error('User not found');
			set(u.getUser);
		});
	},
	undefined
);
