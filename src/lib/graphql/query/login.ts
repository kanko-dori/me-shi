import type { CreateUserInput, User } from 'src/generated/graphql';
import { mutation } from '../client';
import type { AuthHeader } from './types';

export const login = (variables: { input: CreateUserInput }, headers: AuthHeader): Promise<User> =>
	mutation<{ input: CreateUserInput }, User>(
		`
      mutation Login($input: CreateUserInput!) {
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
