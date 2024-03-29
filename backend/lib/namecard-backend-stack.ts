import * as cdk from '@aws-cdk/core';
import { AuthorizationType, GraphqlApi, Schema, FieldLogLevel } from '@aws-cdk/aws-appsync';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Policy, PolicyStatement } from '@aws-cdk/aws-iam';
import * as path from 'path';

// TableNames
export const UserTableName = "me-shi-UserTable"
export const EventTableName = "me-shi-EventTable"
export const TeamTableName = "me-shi-Teamtable"
export const AffiliationTableName = "me-shi-AffiliationTable"
export const NamecardTableName = "me-shi-NamecardTable"
export const TechnologyTableName = "me-shi-TechnologyTable"

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

    // mutation
    meShiFnDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'createUser',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'createEvent',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'createTeam',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'addComment',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'createNamecard',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateUser',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'addNamecard',
    })

    // query
    meShiFnDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getUser',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'listEvent',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'listTeam',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'listTeamAll',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'listAffiliation',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'listTechnology',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getNamecard',
    })
    meShiFnDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getZukan',
    })

    // DynamoDB

    const userTable = new Table(this, UserTableName, {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: UserTableName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const eventTable = new Table(this, EventTableName, {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      },
      tableName: EventTableName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const teamTable = new Table(this, TeamTableName, {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      },
      tableName: TeamTableName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const affiliationTable = new Table(this, AffiliationTableName, {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      },
      tableName: AffiliationTableName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const namecardTable = new Table(this, NamecardTableName, {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      },
      tableName: NamecardTableName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const technologyTable = new Table(this, TechnologyTableName, {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      },
      tableName: TechnologyTableName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })
  }
}
