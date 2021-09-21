import type { UpdateUserInput, User } from 'src/generated/graphql';
import { mutation } from '../client';
import type { AuthHeader } from './types';

export const updateUser = (
	variables: { input: UpdateUserInput },
	headers: AuthHeader
): Promise<{ updateUser: User }> =>
	mutation<{ input: UpdateUserInput }, { updateUser: User }>(
		`
      mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input){
          id
          iconURL
          name
          twitterId
          githubId
        }
      }
    `,
		variables,
		headers
	).then((res) => {
		console.log('updateUser', res);
		if (res.errors !== undefined) throw res.errors;
		if (res.data === undefined) throw new Error('Blank data');
		return res.data;
	});
