import { query } from '../client';
import type { GetUserInput, User } from 'src/generated/graphql';
import type { AuthHeader } from './types';

export const getUser = (
	variables: { input: GetUserInput },
	headers: AuthHeader
): Promise<{ getUser: User }> =>
	query<{ input: GetUserInput }, { getUser: User }>(
		`
        query getUser($input: GetUserInput) {
            getUser(input: $input){
				id
				iconURL
				name
				twitterId
				githubId
				myNamecards {
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
						name
						githubId
						twitterId
						iconURL
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
				givenNamecards {
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
						name
						githubId
						twitterId
						iconURL
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
        }
        `,
		variables,
		headers
	).then((res) => {
		if (res.errors !== undefined) throw res.errors;
		if (res.data === undefined) throw new Error('Blank data');
		return res.data;
	});
