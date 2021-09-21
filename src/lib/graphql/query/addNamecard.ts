import { query } from '../client';
import type { AddNamecardInput, Namecard } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const getNamecard = (variables: AddNamecardInput, headers: AuthHeader): Promise<Namecard> =>
	query<AddNamecardInput, Namecard>(
		`
        mutation getNamecard($input: AddNamecardInput!) {
            getNamecard(input: $input){
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
					iconURL
					name
					twitterId
					githubId
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
