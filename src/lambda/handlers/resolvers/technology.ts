import { PutCommand, PutCommandInput, ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb"
import { TechnologyTableName } from "../../../../lib/namecard-backend-stack"
import { Affiliation, Technology } from "../../../generated/graphql"
import { docClient } from "../me_shi"

export const createTechnology = async (name: string) => {
    console.log('call createTechnology')
    const technologyParam: PutCommandInput = {
        TableName: TechnologyTableName,
        Item: {
            id: name,
            name: name
        }
    }

    await docClient.send(new PutCommand(technologyParam))
    return technologyParam.Item
}

export const listTechnology = async (): Promise<Technology> => {
    const technologyParam: ScanCommandInput = {
        TableName: TechnologyTableName,
    }

    console.log(technologyParam)
    const technologies: any = []

    let res = await docClient.send(new ScanCommand(technologyParam))
    console.log(res)
    if (res.Items) {
        technologies.push(...res.Items)
    }
    while (res.LastEvaluatedKey) {
        technologyParam.ExclusiveStartKey = res.LastEvaluatedKey
        res = await docClient.send(new ScanCommand(technologyParam))
        if (res.Items) {
            technologies.push(...res.Items)
        }
    }
    console.log(technologies)
    return technologies
}