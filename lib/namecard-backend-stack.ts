import * as cdk from '@aws-cdk/core';
import { AuthorizationType, GraphqlApi, Schema, FieldLogLevel } from '@aws-cdk/aws-appsync';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Policy, PolicyStatement } from '@aws-cdk/aws-iam';
import * as path from 'path';

export class NamecardBackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const meShiFn = new NodejsFunction(this, 'MeShiFn', {
      entry: 'src/lambda/handlers/me_shi.ts'
    })

    const dynamoDBPolicy = new PolicyStatement({
      actions: [
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Scan",
        "dynamodb:UpdateItem"
      ],
      resources: [
        "arn:aws:dynamodb:ap-northeast-1:245184755094:table/*"
      ]
    })

    meShiFn.role?.attachInlinePolicy(
      new Policy(this, 'use-dynamodb-policy', {
        statements: [dynamoDBPolicy]
      })
    )

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
    meShiFnDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getUser',
    })

    // DynamoDB

    const userTable = new Table(this, "me-shi-UserTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: "me-shi-UserTable",
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

  }
}
