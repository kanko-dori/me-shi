import { GetCommand, GetCommandInput, PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { NamecardTableName } from "../../../lib/namecard-backend-stack";
import { CreateNamecardInput, Event, Namecard } from "../../generated/graphql";

import { createAffiliation } from "./affiliation";
import { docClient } from "./me_shi";
import { createTechnology } from "./technology";
import { getTeam } from "./team";
import { addOwnNamecard, getUser } from "./user";

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
        memberOf: namecardRes.Item.affiliation,
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
        await Promise.all(input.preferTechnologies.map(t => createTechnology))
        namecardParam.Item = {...namecardParam.Item, preferTechnologies: [input.preferTechnologies]}
    }
    if(input.usedTechnologies) {
        await Promise.all(input.usedTechnologies.map(t => createTechnology))
        namecardParam.Item = {...namecardParam.Item, usedTechnologies: [input.usedTechnologies]}
    }
    await docClient.send(new PutCommand(namecardParam))

    // 作った名刺を登録
    await addOwnNamecard(namecardParam.Item as Namecard, userId)
    return await getNamecard(namecardId)
}
