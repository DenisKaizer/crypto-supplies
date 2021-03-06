/**
 * @title B2Bcoin
 * @symbol BBC
 * @ethContractAddr 0xe7D3e4413E29ae35B0893140F4500965c74365e5
 * @implementation Dynamic
 * @cmcId b2bcoin
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xe7D3e4413E29ae35B0893140F4500965c74365e5?apiKey=freekey', (error, response, body) => {
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
