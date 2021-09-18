import { GetCommand, GetCommandInput, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb'
import { CreateUserInput } from '../../generated/graphql'
import { docClient } from './me_shi'

const TableName = "me-shi-UserTable"
export const createUser = async (input: CreateUserInput, userId: string) => {
    console.log(input)
    const userParams: PutCommandInput = {
        TableName,
        Item: {
            id: userId,
            githubId: input.githubId,
            iconURL: input.iconURL ,
        }
    }
    if (input.name != null) {
        userParams.Item = {...userParams.Item, name: {S: input.name}}
    }
    if (input.twitterId != null) {
        userParams.Item = {...userParams.Item, twitterId: {S: input.twitterId}}
    }

    console.log('createUser', userParams)
    return await docClient.send(new PutCommand(userParams))
}

export const getUser = async (userId: string): Promise<any> => {
    const userParams: GetCommandInput = {
        TableName,
        Key: {
            id: userId
        }
    }

    console.log(userParams)
    const res = await docClient.send(new GetCommand(userParams))
    return res.Item
}