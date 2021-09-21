import { mutation } from '../client';
import type { GetNamecardInput, Namecard } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const addNamecard = (variables: GetNamecardInput, headers: AuthHeader): Promise<Namecard> =>
	mutation<GetNamecardInput, Namecard>(
		`
        mutation addNamecard($input: GetNamecardInput) {
            addNamecard(input: $input){
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
