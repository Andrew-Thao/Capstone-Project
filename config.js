const mongoose = require('mongoose')
require('dotenv').config();
const mongoConfig = async () => {
    try {
        result = await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected: ', result.connection.host)
    }catch(error){
        console.log('Unable to connect to database', error)
    }
}

module.exports = mongoConfig