import { PutCommand, PutCommandInput, ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb"
import { AffiliationTableName } from "../../../../lib/namecard-backend-stack"
import { Affiliation } from "../../../generated/graphql"
import { docClient } from "../me_shi"

export const createAffiliation = async (name: string) => {
    console.log('call affiliation')
    const affiliationParam: PutCommandInput = {
        TableName: AffiliationTableName,
        Item: {
            id: name,
            name: name
        }
    }

    await docClient.send(new PutCommand(affiliationParam))
    return affiliationParam.Item
}

export const listAffiliation = async (): Promise<Affiliation> => {
    const affiliationParam: ScanCommandInput = {
        TableName: AffiliationTableName,
    }

    console.log(affiliationParam)
    const affiliations: any = []

    let res = await docClient.send(new ScanCommand(affiliationParam))
    if (res.Items) {
        affiliations.push(...res.Items)
    }
    while (res.LastEvaluatedKey) {
        affiliationParam.ExclusiveStartKey = res.LastEvaluatedKey
        res = await docClient.send(new ScanCommand(affiliationParam))
        if (res.Items) {
            affiliations.push(...res.Items)
        }
    }
    console.log(affiliations)
    return affiliations
}