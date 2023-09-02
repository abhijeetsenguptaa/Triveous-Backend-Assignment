require('dotenv').config();

async function authentication(req, res, next) {
    try {
        const token = req.cookies.trevious_token
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        message: "Invalid Token"
                    })
                }
                req.userID = req.decode.userId
                next()
            })
        }
        else {
            return res.status(401).json({
                status: false,
                message: "No token found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}



module.exports = { authentication };