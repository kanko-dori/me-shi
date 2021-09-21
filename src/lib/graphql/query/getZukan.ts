import { query } from '../client';
import type { GetZukanInput, Zukan } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const getZukan = (variables: GetZukanInput, headers: AuthHeader): Promise<Zukan> =>
	query<{ input: GetZukanInput }, Zukan>(
		`
        query getZukan($input: GetZukanInput) {
            getZukan(input: $input){
				event {
					id
					name
				}
				namecards {
					isOwn
					id
					memberOf
					preferTechnologies
					usedTechnologies
					event {
						id
						name
					}
					owner {
						id
						name
						githubId
						tiwtterId
						iconURL
					}
					team {
						id
						name
						event {
							id
							name
						}
						product {
							name
							description
							repository
							comments {
								id
								body
							}
						}
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
