const redis = require('redis');

const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on("connect", function () {
    console.log("Redis server is running on 127.0.0.1//6379");
});

client.on("ready", function () {
    console.log("Redis server is ready to use on 127.0.0.1//6379");
});

module.exports = client;