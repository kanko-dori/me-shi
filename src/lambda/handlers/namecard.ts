import { GetCommand, GetCommandInput, PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";

import { NamecardTableName } from "../../../lib/namecard-backend-stack";
import { CreateNamecardInput, Event, Namecard, User } from "../../generated/graphql";
import { createAffiliation } from "./affiliation";
import { docClient } from "./me_shi";
import { createTechnology } from "./technology";
import { getTeam } from "./team";
import { addGivenNamecard, addOwnNamecard, getUser } from "./user";

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

export const getNamecard = async (namecardId: string) => {
    console.log('call getNamecard', namecardId)
    const namecardParam: GetCommandInput = {
        TableName: NamecardTableName,
        Key: {
            id: namecardId,
        }
    }
    const namecardRes = await docClient.send(new GetCommand(namecardParam))
    if (namecardRes.Item == null) {
        throw new Error(`namecard: ${namecardId} does not exist`)
    }
    const user = await getUser(namecardRes.Item.ownerId, false)
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

    const namecardId = `${userId}-${input.teamId}`
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
    return await getNamecard(namecardId)
}

export const addNamecard = async (namecardId: string, userId: string): Promise<Namecard> => {
    // 登録するユーザを取得
    const me = await getUser(userId, true) as User

    // 登録したい名刺を取得
    const targetNamecard = await getNamecard(namecardId) as Namecard

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

    // 登録したい名刺と同じイベントにある名刺を返す
    return myNamecard
}