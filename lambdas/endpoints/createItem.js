const Responses = require('../common/API_Responses')
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.tableName

exports.handler = async event => {
    if(!event.pathParameters || !event.pathParameters.ID){
        Responses._400({message: 'ID or parameters not found'})
    }

    const newItem = JSON.parse(event.body)

    const benefits = newItem.benefits.map(benefit => benefit)

    const params = {
        TableName,
        Item: {
            ID: newItem.ID,
            benefits: benefits,
            city: newItem.city,
            companyType: newItem.companyType,
            experience: newItem.experience,
            extraSupport: newItem.extraSupport,
            happyRate: newItem.happyRate,
            numberOfWorkers: newItem.numberOfWorkers,
            remoteAllowed: newItem.remoteAllowed,
            salary:	newItem.salary,
            thingsYouKnow: newItem.thingsYouKnow,
            thinkToChangeJob: newItem.thinkToChangeJob,
            title: newItem.title,
        }
    }

    const res = await documentClient.put(params).promise()

    return Responses._200(res)
}