import type { GraphQLResult } from 'node_modules/@aws-amplify/api-graphql';
import type { Observable } from 'node_modules/zen-observable-ts/lib';
import * as amplify from 'aws-amplify';

amplify.Amplify.configure({
	API: {
		graphql_endpoint:
			'https://h6qrtrf4hrdl5pt5z2ojjomstq.appsync-api.ap-northeast-1.amazonaws.com/graphql'
	}
});

export const query = <TProps extends undefined | Record<string, unknown>, TResult extends unknown>(
	operation: string,
	variables?: TProps,
	headers?: Record<string, string>
): Promise<GraphQLResult<TResult>> => {
	const res = amplify.API.graphql(
		{
			query: operation,
			variables
		},
		headers
	);
	if (res instanceof Promise) return res as Promise<GraphQLResult<TResult>>;
	throw new Error('This query is maybe subscription');
};

export const mutation = query;

export const subscription = <TProps extends Record<string, unknown>, TResult extends unknown>(
	operation: string,
	variables?: TProps,
	headers?: Record<string, string>
): Observable<TResult> => {
	const res = amplify.API.graphql(
		{
			query: operation,
			variables
		},
		headers
	);
	if (!(res instanceof Promise)) return res as Observable<TResult>;
	throw new Error('This query is not maybe subscription');
};
