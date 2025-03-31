const commentModel = require("../model/commentModel");

const get_user_comments = async (req, res, next) => {
    const userInfo = req.user;
    try {
        const comments = await commentModel.find({ userId: userInfo._id });
        if(comments) {
            return res.status(200).json({message: "User comments", comments})
        }
    } catch (error) {
        next(error);
    }
};

module.exports = get_user_comments;
