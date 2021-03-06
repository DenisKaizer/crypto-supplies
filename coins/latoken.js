/**
 * @title LATOKEN
 * @symbol LA
 * @ethContractAddr 0xe50365f5d679cb98a1dd62d6f6e58e59321bcddf
 * @implementation Dynamic
 * @cmcId latoken
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xe50365f5d679cb98a1dd62d6f6e58e59321bcddf?apiKey=freekey', (error, response, body) => {
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
