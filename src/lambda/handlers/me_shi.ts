import { AppSyncResolverEvent, AppSyncIdentityOIDC } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { CreateUserInput, CreateEventInput, Event, CreateTeamInput } from '../../generated/graphql'
import { createUser, getUser } from './user';
import { createEvent, listEvent } from './event';
import { createTeam, getTeam, listTeam } from './team';

const client = new DynamoDBClient({
  apiVersion: '2012-08-10',
  region: 'ap-northeast-1'
})
export const docClient = DynamoDBDocumentClient.from(client)

export async function handler(
  event: AppSyncResolverEvent<AppSyncInput, AppSyncInput>,
): Promise<AppSyncResponse> {
  console.log(event)

  const userId = (event.identity as AppSyncIdentityOIDC).sub || '';
  switch(event.info.fieldName){
    case 'createUser':
      console.log('createUser');
      try {
        let user = await getUser(userId)
        console.log('1st', user)
        if (user != null){
          return user
        }

        const input = event.arguments.input as CreateUserInput
        await createUser(input, userId)
        user = await getUser(userId)
        if (user != null){
          console.log(user)
          return user
        }
      }catch (err) {
        throw err
      }
    
    case 'getUser':
      console.log('getUser');
      const user = await getUser(userId)
      if (user != null){
        console.log('user', user)
        return user
      }else{
        throw new Error(`failed to get user id ${userId}`)
      }

    case 'createEvent':
      console.log('call createEvent')
      try {
        const input = event.arguments.input as CreateEventInput
        const eventParam = await createEvent(input.name)
        return eventParam.Item as Event
      } catch (err) {
        throw err
      }
      
    case 'listEvent':
      console.log('call listEvent')
      try {
        return await listEvent()
      } catch (err) {
        throw err
      }

    case 'createTeam':
      console.log('call createTeam')
      try {
        const input = event.arguments.input as CreateTeamInput
        const teamParam = await createTeam(input)
        return await getTeam(teamParam.Item?.id)
      } catch (err) {
        throw err
      }
    
    case 'listTeam':
      console.log('call listTeam')
      try {
        const eventId = event.arguments.eventID as string
        return await listTeam(eventId)
      } catch(err) {
        throw err
      }
      
    default:
      console.log(event.info.fieldName)
  }
    
  
  throw new Error(`failed to invoke any query or mutation: ${event.info.fieldName}`)
}

type AppSyncInput = {
  [key: string]: any
}

type AppSyncResponse = {
  [key: string]: any
}

// {
//   arguments: { input: { name: 'onsd', iconURL: 'exmaple.com', githubId: 'onsd' } },
//   identity: {
//     claims: {
//       sub: 'github|29172177',
//       aud: 'sUyBzcnmmsqprfhmvJaJUFFqDaIUPw7O',
//       email_verified: true,
//       updated_at: '2021-09-17T13:20:27.070Z',
//       nickname: 'onsd',
//       name: 'Takamichi Omori',
//       iss: 'https://kanko-dori.us.auth0.com/',
//       exp: 1631921239,
//       iat: 1631885239,
//       nonce: 'UW5NZy1jbzhrY1FyOFQ3VlptMGprSG5qRjJEaUlSLmVhT21vcDhhcFVQRg==',
//       picture: 'https://avatars.githubusercontent.com/u/29172177?v=4',
//       email: 'merrytakamerry@gmail.com'
//     },
//     issuer: 'https://kanko-dori.us.auth0.com/',
//     sub: 'github|29172177'
//   },
//   source: null,
//   result: null,
//   request: {
//     headers: {
//       'x-forwarded-for': '221.118.55.122, 52.46.54.131',
//       'sec-ch-ua-mobile': '?0',
//       'cloudfront-viewer-country': 'JP',
//       'cloudfront-is-tablet-viewer': 'false',
//       'x-amzn-requestid': '0feb0e76-a0c9-4ad5-81c8-ae23e9541fc5',
//       via: '2.0 3169a86fe70f3974b3b8377d728ccf45.cloudfront.net (CloudFront)',
//       'cloudfront-forwarded-proto': 'https',
//       origin: 'https://ap-northeast-1.console.aws.amazon.com',
//       'content-length': '189',
//       'x-forwarded-proto': 'https',
//       'accept-language': 'ja,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
//       host: '3lwkais6ibe4dmio3oi4yypdby.appsync-api.ap-northeast-1.amazonaws.com',
//       'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
//       'cloudfront-is-mobile-viewer': 'false',
//       accept: 'application/json, text/plain, */*',
//       'cloudfront-is-smarttv-viewer': 'false',
//       'accept-encoding': 'gzip, deflate, br',
//       referer: 'https://ap-northeast-1.console.aws.amazon.com/',
//       'content-type': 'application/json',
//       'sec-fetch-mode': 'cors',
//       'x-amzn-trace-id': 'Root=1-6144a4e9-322152d568c00b8b3d090367',
//       'x-amz-cf-id': 'G-LEaAjvdVUTpAs1jEcYa_LDui3AaO7di6Mf2qG1CyWQ-prt6FskSA==',
//       authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVSX2JwZk93Uy1Hb0xKSThnTE5sMCJ9.eyJuaWNrbmFtZSI6Im9uc2QiLCJuYW1lIjoiVGFrYW1pY2hpIE9tb3JpIiwicGljdHVyZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8yOTE3MjE3Nz92PTQiLCJ1cGRhdGVkX2F0IjoiMjAyMS0wOS0xN1QxMzoyMDoyNy4wNzBaIiwiZW1haWwiOiJtZXJyeXRha2FtZXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9rYW5rby1kb3JpLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnaXRodWJ8MjkxNzIxNzciLCJhdWQiOiJzVXlCemNubW1zcXByZmhtdkphSlVGRnFEYUlVUHc3TyIsImlhdCI6MTYzMTg4NTIzOSwiZXhwIjoxNjMxOTIxMjM5LCJub25jZSI6IlVXNU5aeTFqYnpoclkxRnlPRlEzVmxwdE1HcHJTRzVxUmpKRWFVbFNMbVZoVDIxdmNEaGhjRlZRUmc9PSJ9.24BILHkkPP6Ksp7vWTrgOySDCukKmB7Ms7hQhjuFrSzJSSajzOrWij2DsD6C5h9AeKe8_Pml3BItgyhvHYdPdsZTNUH5in3CDwm2y3Zd1AmELbzRcsxICNEUp2QTMlHHH6fjhw1vHflNBhhC0bnIyRXgM5GjzcopVTdH_bPSZJ9FW1ayZ1yhMGNPWZBznMpdwmtlsy6lltve3pUUwxM4ALXVDGaYMe2Q6eMiJhIG5Fh06rf2HNm1jNqmGad__jpkVlhug8tx6AXtLOortauS_eDxB_6CIK9UQQSuzhelgVJMcbMHxCbIIhKCtqUSsoyEooQskh5GgUbWQArkyZJaig',
//       'sec-fetch-dest': 'empty',
//       'x-amz-user-agent': 'AWS-Console-AppSync/',
//       'sec-ch-ua-platform': '"macOS"',
//       'cloudfront-is-desktop-viewer': 'true',
//       'sec-fetch-site': 'cross-site',
//       'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
//       'x-forwarded-port': '443'
//     }
//   },
//   info: {
//     fieldName: 'createUser',
//     parentTypeName: 'Mutation',
//     variables: {}
//   },
//   error: null,
//   prev: null,
//   subscriptionFilter: null,
//   stash: {},
//   outErrors: []
// }