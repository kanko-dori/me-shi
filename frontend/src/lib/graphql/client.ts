import type { GraphQLResult } from 'node_modules/@aws-amplify/api-graphql';
import type { Observable } from 'node_modules/zen-observable-ts/lib';
import * as amplify from 'aws-amplify';

amplify.Amplify.configure({
	aws_project_region: 'ap-northeast-1',
	aws_appsync_graphqlEndpoint:
		'https://h6qrtrf4hrdl5pt5z2ojjomstq.appsync-api.ap-northeast-1.amazonaws.com/graphql',
	aws_appsync_region: 'ap-northeast-1',
	aws_appsync_authenticationType: 'OPENID_CONNECT',
	Auth: {
		identityPoolId: 'ap-northeast-1:8f75aeee-2a4a-41ec-84bc-386d7c3db5c1',
		region: 'ap-northeast-1'
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
