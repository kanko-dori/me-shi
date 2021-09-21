import { Update } from '@aws-sdk/client-dynamodb'
import { GetCommand, GetCommandInput, PutCommand, PutCommandInput, UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb'
import { UserTableName } from '../../../../lib/namecard-backend-stack'
import { CreateUserInput, GetNamecardInput, GetUserInput, Namecard, UpdateUserInput, User } from '../../../generated/graphql'
import { docClient } from '../me_shi'
import { getNamecard } from './namecard'

// type UserDB = {
//     id: string 
//     iconURL: string // https://github.com/<githubId>.png
//     githubId: string // e.g. onsd
//     twitterId: string
//     myNamecardIdMap: {[namecardId: string]: bool} // 作った名刺の id
//     givenCardIdMap: {[namecardId: string]: bool} // もらった名刺 の id
// }

// type User {
//     id: ID!
//     name: String
//     githubId: String
//     twitterId: String
//     iconURL: String
//     myNamecards: [ Namecard! ]
//     givenNamecards: [ Namecard! ]
// }

export const createUser = async (input: CreateUserInput, userId: string) => {
    console.log(input)
    const userParams: PutCommandInput = {
        TableName: UserTableName,
        Item: {
            id: userId,
            githubId: input.githubId,
            iconURL: input.iconURL,
            namecardIdMap: {},
            givenCardIdMap: {},
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

export const updateUser = async (input: UpdateUserInput, userId: string): Promise<User> => {
    console.log('updateUser', input, userId)
    const getUserInput: GetUserInput = { userId }
    const user = await getUser(getUserInput, false) as User
    if(user == null) {
        throw new Error(`user: ${userId} does not exist`)
    }

    user.name = input.name ?? user.name
    user.githubId = input.githubId ?? user.githubId
    user.twitterId = input.twitterId ?? user.twitterId
    user.iconURL = input.iconURL ?? user.iconURL

    console.log('new user data', user)
    const userParam: UpdateCommandInput = {
        TableName: UserTableName,
        Key: {
            id: user.id
        },
        UpdateExpression: "set #name = :newName, #github = :newGithub, #twitter = :newTwitter, #icon = :newIcon",
        ExpressionAttributeNames: {
            "#name": "name",
            "#github": "githubId",
            '#twitter': "twitterId",
            '#icon': "iconURL"
        },
        ExpressionAttributeValues: {
            ":newName": user.name,
            ":newGithub": user.githubId,
            ":newTwitter": user.twitterId,
            ":newIcon": user.iconURL
        },
    }
    await docClient.send(new UpdateCommand(userParam))
    const newUser = await getUser(getUserInput, true)
    return newUser
    
}

export const addOwnNamecard = async (namecard: Namecard, userId: string): Promise<User> => {
    console.log('call addOwnNamecard', namecard, userId)
    const getUserInput: GetUserInput = { userId }
    const user = await getUser(getUserInput, false)
    if(user == null) {
        throw new Error(`user: ${userId} does not exist`)
    }
    const namecardIdMap = user.namecardIdMap as {[namecardId: string]: boolean}
    namecardIdMap[namecard.id] = true

    console.log("user", user, namecardIdMap)
    const userParam: UpdateCommandInput = {
        TableName: UserTableName,
        Key: {
            id: user.id
        },
        UpdateExpression: "set #namecardIdMap = :newNamecardMap",
        ExpressionAttributeNames: {
            "#namecardIdMap": "namecardIdMap"
        },
        ExpressionAttributeValues: {
            ":newNamecardMap": namecardIdMap
        },
    }
    await docClient.send(new UpdateCommand(userParam))
    const newUser = await getUser(getUserInput, true)
    return newUser
}

export const addGivenNamecard = async (namecard: Namecard, userId: string): Promise<User> => {
    console.log('call addGivenNamecard', namecard, userId)
    const getUserInput: GetUserInput = { userId }
    const user = await getUser(getUserInput, false)
    if(user == null) {
        throw new Error(`user: ${userId} does not exist`)
    }
    const newGivenCardIdMap = user.givenCardIdMap as {[namecardId: string]: boolean}
    newGivenCardIdMap[namecard.id] = true

    console.log("user", user, newGivenCardIdMap)
    const userParam: UpdateCommandInput = {
        TableName: UserTableName,
        Key: {
            id: user.id
        },
        UpdateExpression: "set #givenCardIdMap = :newGivenCardIdMap",
        ExpressionAttributeNames: {
            "#givenCardIdMap": "newGivenCardIdMap"
        },
        ExpressionAttributeValues: {
            ":givenCardIdMap": newGivenCardIdMap
        },
    }
    await docClient.send(new UpdateCommand(userParam))
    const newUser = await getUser(getUserInput, true)
    return newUser
}

export const getUser = async (input: GetUserInput, mustGetNamecard: boolean): Promise<any> => {
    const userParams: GetCommandInput = {
        TableName: UserTableName,
        Key: {
            id: input.userId
        }
    }
    console.log('getUser', input.userId, mustGetNamecard, userParams)

    const res = await docClient.send(new GetCommand(userParams))
    const user = res.Item
    if(user == null) {
        return null
    }

    console.log("const user = res.Item", res, user)
    if (mustGetNamecard) {
        console.log("namecardIdMap", user.namecardIdMap, typeof user.namecardIdMap)
        console.log("givenCardIdMap", user.givenCardIdMap, typeof user.givenCardIdMap)
        
        const myNamecardList = await Promise.all(Object.keys(user.namecardIdMap).map((id: string) => {
            const getNamecardInput: GetNamecardInput = {namecardId: id}
            return getNamecard(getNamecardInput)
        }))
        const givenNamecardList = await Promise.all(Object.keys(user.givenCardIdMap).map((id: string) => {
            const getNamecardInput: GetNamecardInput = {namecardId: id}
            return getNamecard(getNamecardInput)
        }))

        user.myNamecards = myNamecardList
        user.givenNamecards = givenNamecardList
    } else {
        user.myNamecards = null
        user.givenNamecards = null
    }
    return user
}

export const greeting = (name: string): string => {
    return `hello ${name}`
}