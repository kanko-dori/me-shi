import type { UpdateUserInput, User } from 'src/generated/graphql';
import { mutation } from '../client';
import type { AuthHeader } from './types';

export const updateUser = (variables: UpdateUserInput, headers: AuthHeader): Promise<User> =>
	mutation<UpdateUserInput, User>(
		`
      mutation updateUser($input: UpdateUserInput!) {
        createUser(input: $input){
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
		if (res.errors !== undefined) throw res.errors;
		if (res.data === undefined) throw new Error('Blank data');
		return res.data;
	});
