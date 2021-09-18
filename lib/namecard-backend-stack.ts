import { AuthorizationType, GraphqlApi, Schema, FieldLogLevel } from '@aws-cdk/aws-appsync';
import * as appsync from '@aws-cdk/aws-appsync'
import * as cdk from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as path from 'path';

export class NamecardBackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const meShiFn = new NodejsFunction(this, 'MeShiFn', {
      entry: 'src/lambda/handlers/me_shi.ts'
    })

    const appsync = new GraphqlApi(this, 'me-shi-bff', {
      name: "MeShiBFF",
      schema: Schema.fromAsset(
        path.join(__dirname, 'schema.graphql')
      ),
      logConfig: {
        excludeVerboseContent: true,
        fieldLogLevel: FieldLogLevel.ALL,
      },
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.OIDC,
          openIdConnectConfig: {
            tokenExpiryFromAuth: 0,
            tokenExpiryFromIssue: 0,
            clientId: process.env.OIDC_CLIENTID || '',
            oidcProvider: process.env.OIDC_PROVIDER || '',
          },
        }
      }
    })

    const meShiFnDataSource = appsync.addLambdaDataSource(
      'MeShiDataSource',
      meShiFn
    )

    meShiFnDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'createUser',
    })

  }
}
