/**
 * @title Aion
 * @symbol AION
 * @ethContractAddr 0x4CEdA7906a5Ed2179785Cd3A40A69ee8bc99C466
 * @implementation Dynamic
 * @cmcId aion
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x4CEdA7906a5Ed2179785Cd3A40A69ee8bc99C466?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -8)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
