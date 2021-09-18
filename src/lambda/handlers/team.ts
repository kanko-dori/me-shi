import { ScanCommand, PutCommand, PutCommandInput, ScanCommandInput, GetCommandInput, GetCommand } from '@aws-sdk/lib-dynamodb'
import { EventTableName, TeamTableName } from '../../../lib/namecard-backend-stack'
import { CreateTeamInput, Event } from '../../generated/graphql'
import { docClient } from './me_shi'

export const createTeam = async (input: CreateTeamInput) => {
    console.log('createTeam', input)
    const teamParam: PutCommandInput = {
        TableName: TeamTableName,
        Item: {
            id: `${input.eventId}-${input.name}`,
            name: input.name,
            eventId: input.eventId,
            product: input.product,
        }
    }

    console.log('createTeam', teamParam)
    await docClient.send(new PutCommand(teamParam))
    return teamParam
}

export const getTeam = async (id: string) => {
    console.log('getTeam', id)
    const teamParam: GetCommandInput = {
        TableName: TeamTableName,
        Key:{
            id
        }
    }
    const teamRes = await docClient.send(new GetCommand(teamParam))
    if(teamRes.Item == null) {
        throw new Error(`${id} does not exist`)
    }

    const event: Event = {
        id: teamRes.Item.eventId,
        name: teamRes.Item.eventId   
    }
    return {
        ...teamRes.Item,
        event
    }
}

export const listTeam = async (eventId: string): Promise<any> => {
    const teamParams: ScanCommandInput = {
        TableName: TeamTableName,
    }

    console.log(teamParams)
    const teams: any = []

    let res = await docClient.send(new ScanCommand(teamParams))
    if (res.Items) {
        res.Items.forEach(item => {
            if(item.eventId === eventId) {
                teams.push({
                    id: item.id,
                    name: item.name,
                    product: item.product,
                    event: {
                        id: item.eventId,
                        name: item.eventId
                    }
                })
            }
        })
    }
    while (res.LastEvaluatedKey) {
        teamParams.ExclusiveStartKey = res.LastEvaluatedKey
        res = await docClient.send(new ScanCommand(teamParams))
        if (res.Items) {
            res.Items.forEach(item => {
                if(item.eventId === eventId) {
                    teams.push({
                        id: item.id,
                        name: item.name,
                        product: item.product,
                        event: {
                            id: item.eventId,
                            name: item.eventId
                        }
                    })
                }
            })       
        }
    }
    console.log(teams)
    return teams
}

const scan = async () => {

}