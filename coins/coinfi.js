/**
 * @title CoinFi
 * @symbol COFI
 * @ethContractAddr 0x3136ef851592acf49ca4c825131e364170fa32b3
 * @implementation Dynamic
 * @cmcId coinfi
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x3136ef851592acf49ca4c825131e364170fa32b3?apiKey=freekey', (error, response, body) => {
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
