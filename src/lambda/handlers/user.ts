import { GetCommand, GetCommandInput, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb'
import { UserTableName } from '../../../lib/namecard-backend-stack'
import { CreateUserInput } from '../../generated/graphql'
import { docClient } from './me_shi'

export const createUser = async (input: CreateUserInput, userId: string) => {
    console.log(input)
    const userParams: PutCommandInput = {
        TableName: UserTableName,
        Item: {
            id: userId,
            githubId: input.githubId,
            iconURL: input.iconURL ,
        }
    }
    if (input.name != null) {
        userParams.Item = {...userParams.Item, name: input.name}
    }
    if (input.twitterId != null) {
        userParams.Item = {...userParams.Item, twitterId: input.twitterId}
    }

    console.log('createUser', userParams)
    return await docClient.send(new PutCommand(userParams))
}

export const getUser = async (userId: string): Promise<any> => {
    const userParams: GetCommandInput = {
        TableName: UserTableName,
        Key: {
            id: userId
        }
    }

    console.log(userParams)
    const res = await docClient.send(new GetCommand(userParams))
    return res.Item
}