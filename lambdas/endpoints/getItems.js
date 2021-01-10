const Responses = require('../common/API_Responses');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.tableName

exports.handler = async event => {
    const params = {
        TableName
    };

    let scanResults = [];
    let items;
    do{
        items =  await documentClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey != "undefined");

    return  Responses._200(scanResults);
}
