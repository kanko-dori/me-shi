import { mutation } from '../client';
import type { CreateNamecardInput, Namecard } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const createNamecard = (
	variables: { input: CreateNamecardInput },
	headers: AuthHeader
): Promise<{ createNamecard: Namecard }> =>
	mutation<{ input: CreateNamecardInput }, { createNamecard: Namecard }>(
		`
        mutation createNamecard($input: CreateNamecardInput!) {
            createNamecard(input: $input){
                id
				owner {
					id
					name
					githubId
					twitterId
					iconURL
				}
				event {
					id
					name
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
						repository
						description
						comments {
							id
							body
							commenterId
						}
					}
				}
				usedTechnologies
				preferTechnologies
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
