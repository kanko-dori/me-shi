import { GetCommand, GetCommandInput, PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { NamecardTableName } from "../../../lib/namecard-backend-stack";
import { CreateNamecardInput, Event, Namecard } from "../../generated/graphql";

import { v4 as uuidv4 } from 'uuid'
import { createAffiliation } from "./affiliation";
import { docClient } from "./me_shi";
import { createTechnology } from "./technology";
import { getTeam } from "./team";

// type Namecard {
// 	id: ID!
// 	event: Event
// 	team: Team
// 	memberOf: String
// 	usedTechnologies: [String!]
// 	preferTechnologies: [String!]
// }

export const getNamecard = async (id: string) => {
    console.log('call getNamecard')
    const namecardParam: GetCommandInput = {
        TableName: NamecardTableName,
        Key: {
            id
        }
    }
    const namecardRes = await docClient.send(new GetCommand(namecardParam))
    if (namecardRes.Item == null) {
        throw new Error(`namecard: ${id} does not exist`)
    }

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
    }
    return namecard
}

export const createNamecard = async (input: CreateNamecardInput) => {
    console.log('call createNamecard')

    const namecardParam: PutCommandInput = {
        TableName: NamecardTableName,
        Item: {
            id: uuidv4(),
            eventId: input.eventId,
            teamId: input.teamId,
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
    return namecardParam.Item
}
