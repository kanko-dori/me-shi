import { GetCommand, GetCommandInput, PutCommand, PutCommandInput, ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";

import { NamecardTableName } from "../../../../lib/namecard-backend-stack";
import { AddNamecardInput, AddNamecardResult, CreateNamecardInput, CreateTeamInput, Event, GetNamecardInput, GetUserInput, GetZukanInput, Namecard, User, Zukan, ZukanNamecard } from "../../../generated/graphql";
import { createAffiliation } from "./affiliation";
import { docClient } from "../me_shi";
import { createTechnology } from "./technology";
import { getTeam } from "./team";
import { addGivenNamecard, addOwnNamecard, getUser } from "./user";
import { createHash } from "crypto";

// type Namecard {
// 	id: ID!
// 	event: Event
// 	team: Team
//  owner: User
// 	memberOf: String
// 	usedTechnologies: [String!]
// 	preferTechnologies: [String!]
// }

// NamecardTableSchema {
// 	id: ID!
// 	eventId: String
// 	teamId: String
//  ownerId: String
// 	memberOf: String
// 	usedTechnologies: [String!]
// 	preferTechnologies: [String!]
// }

export const getNamecard = async (input: GetNamecardInput) => {
    console.log('call getNamecard', input)
    const namecardParam: GetCommandInput = {
        TableName: NamecardTableName,
        Key: {
            id: input.namecardId,
        }
    }

    const namecardRes = await docClient.send(new GetCommand(namecardParam))
    if (namecardRes.Item == null) {
        throw new Error(`namecard: ${input.namecardId} does not exist`)
    }

    console.log('getNamecard, namecardRes', namecardRes)
    const getUserInput: GetUserInput = { userId: namecardRes.Item.ownerId }
    const user = await getUser(getUserInput, false)

    const team = await getTeam(namecardRes.Item.teamId)
    const event: Event = {
        id: namecardRes.Item.eventId,
        name: namecardRes.Item.eventId   
    }
    const namecard: Namecard = {
        id: namecardRes.Item.id,
        memberOf: namecardRes.Item.memberOf,
        usedTechnologies: namecardRes.Item.usedTechnologies,
        preferTechnologies: namecardRes.Item.preferTechnologies,
        event: event,
        team: team,
        owner: user
    }

    return namecard
}

export const createNamecard = async (input: CreateNamecardInput, userId: string) => {
    console.log('call createNamecard')
    const md5 = createHash('md5')
    const namecardId = md5.update(`${userId}-${input.teamId}`, 'utf8').digest('hex').slice(0, 15)
    
    // // check event
    // let event = await getEvent(input.eventId) as Event | null
    // if (event == null) {
    //     console.log(`event ${input.eventId} does not exists. create it now.`)
    //     const createEventInput: CreateEventInput = {
    //         name: input.eventId
    //     }
    //     event = await createEvent(createEventInput)
    // }

    // // check team
    // const team = await getTeam(input.teamId)
    // if (team == null) {
    //     console.log(`team ${input.teamId} does not exists. create it now.`)
    //     const createTeamInput: CreateTeamInput = {
    //         eventId: event.id,
    //         name: input.teamId,
    //         product: input
    //     }
    // }
    const namecardParam: PutCommandInput = {
        TableName: NamecardTableName,
        Item: {
            id: namecardId,
            eventId: input.eventId,
            teamId: input.teamId,
            ownerId: userId
        }
    }
    if(input.affiliation) {
        await createAffiliation(input.affiliation)
        namecardParam.Item = {...namecardParam.Item, memberOf: input.affiliation}
    }
    if(input.preferTechnologies) {
        await Promise.all(input.preferTechnologies.map(t => createTechnology(t)))
        namecardParam.Item = {...namecardParam.Item, preferTechnologies: input.preferTechnologies}
    }
    if(input.usedTechnologies) {
        await Promise.all(input.usedTechnologies.map(t => createTechnology(t)))
        namecardParam.Item = {...namecardParam.Item, usedTechnologies: input.usedTechnologies}
    }
    await docClient.send(new PutCommand(namecardParam))

    // 作った名刺を登録
    await addOwnNamecard(namecardParam.Item as Namecard, userId)
    
    const getNamecardInput: GetNamecardInput = {namecardId} 
    return await getNamecard(getNamecardInput)
}

export const addNamecard = async (input: AddNamecardInput, userId: string): Promise<AddNamecardResult> => {
    console.log('addNamecard', input, userId)
    // 登録するユーザを取得
    const getUserInput: GetUserInput = { userId }
    const me = await getUser(getUserInput, true) as User

    // 登録したい名刺を取得
    const getNamecardInput: GetNamecardInput = {namecardId: input.namecardId}
    const targetNamecard = await getNamecard(getNamecardInput) as Namecard

    // 自分のカードは登録できない
    if (targetNamecard.owner.id === me.id) {
        throw new Error(`You can't add your own card.`)
    }

    // すでに持っていたら
    const alreadyGivenNamecard = await me.givenNamecards?.find((n: Namecard) => n.id === targetNamecard.id)
    if(alreadyGivenNamecard != null){
        throw new Error(`${me.id} already have namecard ${targetNamecard.id}`)
    }

    // 登録するユーザがつくった名刺が、登録したい名刺と同じイベントにあることを確認
    const myNamecard = me.myNamecards?.find((n: Namecard) => n.event.id === targetNamecard.event.id)
    if (myNamecard  == null) {
        throw new Error(`${me.name} and ${targetNamecard.owner.name} didn't attend on same event`)
    }

    // givenNamecard に登録
    await addGivenNamecard(targetNamecard, me.id)

    const res: AddNamecardResult = {
        ownerNamecardId: input.namecardId,
        getterNamecardId: myNamecard.id
    }

    return res
}

export const listNamecards = async (): Promise<any> => {
    console.log('call listNamecards')
    const namecardParam: ScanCommandInput = {
        TableName: NamecardTableName,
    }

    console.log(namecardParam)
    const namecards: any = []

    let res = await docClient.send(new ScanCommand(namecardParam))
    if (res.Items) {
        for (const namecard of res.Items) {
            const getUserInput: GetUserInput = { userId: namecard.ownerId }
            const user = await getUser(getUserInput, false)
            const team = await getTeam(namecard.teamId)
            const event: Event = {
                id: namecard.eventId,
                name: namecard.eventId   
            }
            namecards.push({
                id: namecard.id,
                memberOf: namecard.memberOf,
                usedTechnologies: namecard.usedTechnologies,
                preferTechnologies: namecard.preferTechnologies,
                event: event,
                team: team,
                owner: user
            })
        }
    }
    while (res.LastEvaluatedKey) {
        namecardParam.ExclusiveStartKey = res.LastEvaluatedKey
        res = await docClient.send(new ScanCommand(namecardParam))
        if (res.Items) {
            for (const namecard of res.Items) {
                const getUserInput: GetUserInput = { userId: namecard.ownerId }
                const user = await getUser(getUserInput, false)
                const team = await getTeam(namecard.teamId)
                const event: Event = {
                    id: namecard.eventId,
                    name: namecard.eventId   
                }
                namecards.push({
                    id: namecard.id,
                    memberOf: namecard.memberOf,
                    usedTechnologies: namecard.usedTechnologies,
                    preferTechnologies: namecard.preferTechnologies,
                    event: event,
                    team: team,
                    owner: user
                })
            }
        }
    }
    console.log('namecards', namecards.length, namecards)
    return namecards
}

// イベント(eventId) ごとに名刺をリストし、持ってる・持っていないを判断する
export const getZukan = async (input: GetZukanInput, userId: string) => {
    console.log('getZukan', input, userId)
    const allNamecards = await listNamecards()
    // イベントにある名刺をリストする
    const namecards = allNamecards.filter((n: Namecard) => n.event.id === input.eventId)
    console.log(namecards)

    // イベントにある名刺のIDの map
    const namecardIDMap = Object.fromEntries(namecards.map((namecard: Namecard) => [namecard['id'], {...namecard, isOwn: false}]))

    console.log('created namecardIDMap', namecardIDMap)

    // 自分の持っている名刺を取得
    const getUserInput: GetUserInput = { userId }
    const me = await getUser(getUserInput, true) as User
    
    // 自分が持っている名刺を true にする
    me.givenNamecards?.forEach((n: Namecard) => {
        if(namecardIDMap[n.id]){
            console.log('ownCard is found', namecardIDMap[n.id])
            namecardIDMap[n.id].isOwn = true
        }
    })
    console.log('processed namecardIDsMap', namecardIDMap)

    // object を array にする
    // const zukanNamecards = Object.keys(namecardIDMap).map(key => ({...namecardIDMap[key]})) as Array<ZukanNamecard>
    const zukanNamecards = Object.values(namecardIDMap)
    return {
        event: {
            id: input.eventId,
            name: input.eventId
        },
        namecards: zukanNamecards
    }
}