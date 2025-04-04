const mongoose = require("mongoose")

const connectDb = async (req, res) => {
    try {
        await mongoose.connect(process.env.DBCONNECTIONSTRING)
    } catch (error) {
        console.error(error)
    }
    console.log("connected to db")
}

module.exports = connectDb