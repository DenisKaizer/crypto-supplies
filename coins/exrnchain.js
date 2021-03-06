/**
 * @title EXRNchain
 * @symbol EXRN
 * @ethContractAddr 0xe469c4473af82217b30cf17b10bcdb6c8c796e75
 * @implementation Dynamic
 * @cmcId exrnchain
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xe469c4473af82217b30cf17b10bcdb6c8c796e75?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -0)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
