import { mutation } from '../client';
import type { AddCommentInput, Team } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const addComment = (
	variables: { input: AddCommentInput },
	headers: AuthHeader
): Promise<{ addComment: Team }> =>
	mutation<{ input: AddCommentInput }, { addComment: Team }>(
		`
		mutation addComment($input: AddCommentInput!) {
			addComment(input: $input){
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
