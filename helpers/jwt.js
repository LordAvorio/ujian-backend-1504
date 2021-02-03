const jwt = require('jsonwebtoken')
const TOKEN_KEY = '!@#$%^&*'

module.exports = {
    createToken: (data) => {
        return jwt.sign(data, TOKEN_KEY);
    },
    verifyToken: (req, res, next) => {
        const token = req.body.token
        if(!token) return res.status(400).send('Token not detected')

        try {
            const result = jwt.verify(token, TOKEN_KEY)
            // console.log(result)
            req.user = result
            next()
        }
        catch(err) {
            console.log(err)
            res.status(400).send(err)
        }

    }
}


