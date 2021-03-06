/**
 * @title Pylon Network
 * @symbol PYLNT
 * @ethContractAddr 0x7703C35CfFdC5CDa8D27aa3df2F9ba6964544b6e
 * @implementation Dynamic
 * @cmcId pylon-network
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x7703C35CfFdC5CDa8D27aa3df2F9ba6964544b6e?apiKey=freekey', (error, response, body) => {
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
