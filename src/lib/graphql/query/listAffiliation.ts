import { query } from '../client';
import type { Affiliation } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const listEvent = (variables: undefined, headers: AuthHeader): Promise<Affiliation[]> =>
	query<undefined, Affiliation[]>(
		`
        query listAffiliation {
            listAffiliation{
				id
				name
            }
        }
        `,
		variables,
		headers
	).then((res) => {
		if (res.errors !== undefined) throw res.errors;
		if (res.data === undefined) throw new Error('Blank data');
		return res.data;
	});
