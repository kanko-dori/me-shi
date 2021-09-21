import { mutation } from '../client';
import type { AddNamecardInput, Namecard } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const addNamecard = (
	variables: { input: AddNamecardInput },
	headers: AuthHeader
): Promise<Namecard> =>
	mutation<{ input: AddNamecardInput }, Namecard>(
		`
		mutation addNamecard($input: AddNamecardInput!) {
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
        `,
		variables,
		headers
	).then((res) => {
		if (res.errors !== undefined) throw res.errors;
		if (res.data === undefined) throw new Error('Blank data');
		return res.data;
	});
