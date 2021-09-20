import { mutation } from '../client';
import type { AuthHeader } from './types';

export type LoginInput = {
	input: {
		githubId: string;
		iconURL: string;
		name: string;
		twitterId?: string;
	};
};

export type LoginResult = {
	id: string;
	iconURL: string;
	name: string;
	twitterId?: string;
	githubId?: string;
};
export const login = (variables: LoginInput, headers: AuthHeader): Promise<LoginResult> =>
	mutation<LoginInput, LoginResult>(
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
