import { mutation } from '../client';
import type { AddCommentInput, Team } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const addComment = (variables: AddCommentInput, headers: AuthHeader): Promise<Team> =>
	mutation<AddCommentInput, Team>(
		`
        mutation addComment($input: AddCommentInput!) {
            createEvent(input: $input){
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
