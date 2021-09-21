import { query } from '../client';
import type { Technology } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const listTechnology = (variables: undefined, headers: AuthHeader): Promise<Technology[]> =>
	query<undefined, Technology[]>(
		`
        query listTechnology {
            listTechnology{
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
