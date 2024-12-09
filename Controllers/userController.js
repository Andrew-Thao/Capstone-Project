const User = require('../models/userModel')

async function show(req,res){
    try{
        const foundUser = await User.findById(req.id)

        res.json({
            username: foundUser.username,
            email: foundUser.email
        })
    }catch(error){
        console.log(error.message)
        res.json({error: error.message})
    }
}

async function index (req,res){
    try{
        const foundUser = await User.find()

        console.log(('Found User', foundUser))
        res.json(foundUser)
    }catch(error){
        console.log(error.message)
        res.json({error: error.message})
    }
}

async function update(req,res){
    try{
        const foundUser = await User.findByIdAndUpdate(req.id)

        res.json({message: `user is ${foundUser.online}`, user:foundUser})
    }catch(error){
        console.log(error.message)
        res.json({error: error.message})
    }
}

module.exports ={
    show,
    index,
    update
}