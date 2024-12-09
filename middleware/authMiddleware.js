const jwt =require('jsonwebtoken')

function authorize (req, res, next) {
    console.log('Authorizing...')
    try{
        let token = req.header("Authorization")

        if(!token){
            return res.status(403).json({error: "No token provided"})
        }

        console.log(token)

        token = token.replace("Bearer ", "")

        console.log(token)

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        console.log(payload)

        if(payload.error){
            return res.status(498).json({error: payload.error})
        }

        req.id = payload.id
        req.username = payload.username

        next()
    }catch(error){
        console.log(error.message)
        res.status(403).json({error: error.message})
    }
}

module.exports = {
    authorize
}