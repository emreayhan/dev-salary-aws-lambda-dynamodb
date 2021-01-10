const Responses = require('../common/API_Responses')
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TableName

exports.handler = async event => {
    if (!event.pathParameters || !event.pathParameters.ID) {
        Responses._400({ message: 'ID or parameters not found' })
    }

    let ID = event.pathParameters.ID

    const params = {
        TableName,
        Key: {
            ID: parseInt(ID)
        }
    }
    try {
        const res = await documentClient.delete(params).promise()

        return Responses._200(res)
    } catch (error) {

        return Responses._400({ message: 'failed', error })
    }

}