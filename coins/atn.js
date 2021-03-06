/**
 * @title ATN
 * @symbol ATN
 * @ethContractAddr 0x461733c17b0755ca5649b6db08b3e213fcf22546
 * @implementation Dynamic
 * @cmcId atn
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x461733c17b0755ca5649b6db08b3e213fcf22546?apiKey=freekey', (error, response, body) => {
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
