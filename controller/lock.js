const redlock = require('../helper/redlock');

module.exports = {
    lock: (req, res) => {
        if (!req.body.resourceId) {
            return res.status(400).send({
                error: true,
                message: 'Parameter required'
            });
        }
        // console.log(redlock);
        //ttl is 50secs
        redlock.lock(req.body.resourceId, 5000, function (err, lock) {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    error: true,
                    message: err.message
                });
            }
            return res.status(200).send({
                error: false,
                data: lock
            });
        })
    },
    unlock: (req, res) => {
        if (!req.body.lock) {
            return res.status(400).send({
                error: true,
                message: 'Parameter required'
            });
        }

        redlock.unlock(req.body.lock, function (err) {
            if (err) {
                return res.status(400).send({
                    error: true,
                    message: err.message
                });
            }
            return res.status(200).send({
                error: false,
                message: 'Lock release'
            });
        })
    }
}