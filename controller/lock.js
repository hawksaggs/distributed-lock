const redis = require('../helper/redis');

module.exports = {
    lock: (req, res) => {
        if (!req.body.resourceId) {
            return res.status(400).send({
                error: true,
                message: 'Parameter required'
            });
        }
        const lockId = req.body.resourceId;
        const timeOut = parseInt(Date.now()) + parseInt(process.env.DEFAULT_TIMEOUT) + 1;

        redis.SETNX(lockId, timeOut, (err, result) => {
            if (err || result == null) {
                console.log(err);
                return res.status(400).send({
                    error: true,
                    message: err ? err.message : "Some error occured"
                });
            }
            if (!result) {
                return res.status(400).send({
                    error: true,
                    message: 'Resource is already in use'
                });
            }
            return res.status(200).send({
                error: false,
                data: result
            });
        });


    },
    unlock: (req, res) => {
        if (!req.body.resourceId) {
            return res.status(400).send({
                error: true,
                message: 'Parameter required'
            });
        }
        redis.DEL(req.body.resourceId, (err, result) => {
            if (err || !result) {
                return res.status(400).send({
                    error: true,
                    message: err ? err.message : 'Invalid resourceId'
                });
            }
            return res.status(200).send({
                error: false,
                message: 'Lock release'
            });
        })
    }
}