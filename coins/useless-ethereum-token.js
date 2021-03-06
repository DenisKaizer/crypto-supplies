/**
 * @title Useless Ethereum Token
 * @symbol UET
 * @ethContractAddr 0x27f706edde3aD952EF647Dd67E24e38CD0803DD6
 * @implementation Dynamic
 * @cmcId useless-ethereum-token
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x27f706edde3aD952EF647Dd67E24e38CD0803DD6?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -18)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
