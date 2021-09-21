import { mutation } from '../client';
import type { CreateTeamInput, Team } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const createTeam = (
	variables: { input: CreateTeamInput },
	headers: AuthHeader
): Promise<Team> =>
	mutation<{ input: CreateTeamInput }, Team>(
		`
        mutation createTeam($input: CreateTeamInput!) {
            createTeam(input: $input){
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
