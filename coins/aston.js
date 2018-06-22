/**
* @title Aston
* @symbol ATX
* @ethContractAddr 0x1a0f2ab46ec630f9fd638029027b552afa64b94c
* @implementation Dynamic
*/
var request = require('request');

module.exports = (callback) => {
request('http://api.ethplorer.io/getTokenInfo/0x1a0f2ab46ec630f9fd638029027b552afa64b94c?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -18)
        });
    } else {
        callback(new Error('Request error ' + response.statusCode));
    }
});
};