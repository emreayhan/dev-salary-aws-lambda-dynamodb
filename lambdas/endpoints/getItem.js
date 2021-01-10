const Responses = require('../common/API_Responses')
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.tableName

exports.handler = async event => {
    if(!event.pathParameters || !event.pathParameters.ID){
        Responses._400({message: 'ID or parameters not found'})
    }

    let ID = event.pathParameters.ID

    const params = {
        TableName,
        Key: {
            ID: parseInt(ID)
        }
    }

    const res = await documentClient.get(params).promise()

    return Responses._200(res)
}