import { query } from '../client';
import type { Team } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const listTeamAll = (
	variables: undefined,
	headers: AuthHeader
): Promise<{ listTeamAll: Team[] }> =>
	query<undefined, { listTeamAll: Team[] }>(
		`
        query listTeamAll {
            listTeamAll{
				id
				name
				event {
					id
					name
				}
				product {
					name
					repository
					description
					comments {
						id
						body
						commenterId
					}
				}
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
