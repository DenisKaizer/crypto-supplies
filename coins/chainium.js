/**
* @title Chainium
* @symbol CHX
* @ethContractAddr 0x1460a58096d80a50a2F1f956DDA497611Fa4f165
* @implementation Dynamic
*/
var request = require('request');

module.exports = (callback) => {
request('http://api.ethplorer.io/getTokenInfo/0x1460a58096d80a50a2F1f956DDA497611Fa4f165?apiKey=freekey', (error, response, body) => {
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