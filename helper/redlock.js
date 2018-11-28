const Redlock = require('redlock');
const client = require('./redis');

const redlock = new Redlock(
    [client],
    {
        // the expected clock drift
        driftFactor: 0.01, // time in ms

        // the max number of times Redlock will attempt
        // to lock a resource before erroring
        retryCount: 10,

        // the time in ms between attempts
        retryDelay: 200, // time in ms

        // the max time in ms randomly added to retries
        // to improve performance under high contention
        retryJitter: 200 // time in ms
    });
// console.log(redlock);
redlock.on('clientError', function (err) {
    console.error('A redis error has occurred:', err);
});

module.exports = redlock;