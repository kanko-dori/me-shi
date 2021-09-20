import { ScanCommand, PutCommand, PutCommandInput, ScanCommandInput, GetCommandInput, GetCommand } from '@aws-sdk/lib-dynamodb'
import { EventTableName } from '../../../lib/namecard-backend-stack'
import { docClient } from './me_shi'

export const createEvent = async (name: String) => {
    console.log('eventname', name)
    const eventParam: PutCommandInput = {
        TableName: EventTableName,
        Item: {
            id: name,
            name: name,
        }
    }

    console.log('createEvent', eventParam)
    await docClient.send(new PutCommand(eventParam))
    return eventParam
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