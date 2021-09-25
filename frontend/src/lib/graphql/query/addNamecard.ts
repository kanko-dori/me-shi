import { mutation } from '../client';
import type { Namecard } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const addNamecard = (variables: { input: string }, headers: AuthHeader): Promise<Namecard> =>
	mutation<{ input: string }, Namecard>(
		`
		mutation addNamecard($input: String!) {
			addNamecard(namecardId: $input){
				getterNamecardId
				ownerNamecardId
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
