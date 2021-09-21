import { ScanCommand, PutCommand, PutCommandInput, ScanCommandInput, GetCommandInput, GetCommand } from '@aws-sdk/lib-dynamodb'
import { EventTableName } from '../../../../lib/namecard-backend-stack'
import { CreateEventInput, Event } from '../../../generated/graphql'
import { docClient } from '../me_shi'

export const createEvent = async (input: CreateEventInput): Promise<Event> => {
    console.log('eventname', input)
    const eventParam: PutCommandInput = {
        TableName: EventTableName,
        Item: {
            id: input.name,
            name: input.name,
        }
    }

    console.log('createEvent', eventParam)
    await docClient.send(new PutCommand(eventParam))
    const event: Event = {
        id: input.name,
        name: input.name
    }
    return event
}

export const listEvent = async (): Promise<any> => {
    const eventParams: ScanCommandInput = {
        TableName: EventTableName,
    }

    console.log(eventParams)
    const events: any = []

    let res = await docClient.send(new ScanCommand(eventParams))
    if (res.Items) {
        events.push(...res.Items)
    }
    while (res.LastEvaluatedKey) {
        eventParams.ExclusiveStartKey = res.LastEvaluatedKey
        res = await docClient.send(new ScanCommand(eventParams))
        if (res.Items) {
            events.push(...res.Items)
        }
    }
    console.log(events)
    return events
}

export const getEvent = async (eventId:string) => {
    console.log('call getEvent')
    const eventParams: GetCommandInput = {
        TableName: EventTableName,
        Key: {
            id: eventId
        }
    }

    const res = await docClient.send(new GetCommand(eventParams))
    return res.Item
}