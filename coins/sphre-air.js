/**
 * @title Sphre AIR
 * @symbol XID
 * @ethContractAddr 0xb110ec7b1dcb8fab8dedbf28f53bc63ea5bedd84
 * @implementation Dynamic
 * @cmcId sphre-air
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xb110ec7b1dcb8fab8dedbf28f53bc63ea5bedd84?apiKey=freekey', (error, response, body) => {
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
