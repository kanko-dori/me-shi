import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';

export class NamecardBackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const queue = new sqs.Queue(this, 'NamecardBackendQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // const topic = new sns.Topic(this, 'NamecardBackendTopic');

    // topic.addSubscription(new subs.SqsSubscription(queue));
    const lambda = new NodejsFunction(this, 'me-shi-lambda-func', {
      entry: 'src/lambda/handlers/me_shi.ts'
    })
  }
}
