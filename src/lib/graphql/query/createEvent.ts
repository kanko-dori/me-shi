import { mutation } from '../client';
import type { CreateEventInput, Event } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const createEvent = (
	variables: { input: CreateEventInput },
	headers: AuthHeader
): Promise<{ createEvent: Event }> =>
	mutation<{ input: CreateEventInput }, { createEvent: Event }>(
		`
        mutation createEvent($input: CreateEventInput!) {
            createEvent(input: $input){
                id
                name
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
