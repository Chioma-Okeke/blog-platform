const mongoose = require("mongoose")

const blogModel = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Post", blogModel)