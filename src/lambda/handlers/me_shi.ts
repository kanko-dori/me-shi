import {APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {v4 as uuid} from 'uuid';

export async function handler(
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {
  console.log(event, context)
  return {
    statusCode: 201,
    headers: event.headers,
    body: JSON.stringify({
      id: uuid(),
      method: event.httpMethod,
      query: event.queryStringParameters,
    })
  }
}