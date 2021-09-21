import { query } from '../client';
import type { ListTeamInput, Team } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const listTeam = (variables: ListTeamInput, headers: AuthHeader): Promise<Team[]> =>
	query<ListTeamInput, Team[]>(
		`
        query listTeam($input: ListTeamInput) {
            listTeam(input: $input){
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
