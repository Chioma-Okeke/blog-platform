const commentModel = require("../model/commentModel")
const userModel = require("../model/userModel")

const delete_comment = async (commentId, userInfo) => {
    try {
        const user = await userModel.findById(userInfo)

        await commentModel.findByIdAndDelete(commentId)

        if (user) {
            user.commentIds = user.commentIds.filter(
                (comment) => comment !== commentId
            );
            await user.save();
        }
    } catch (error) {
        next(error)
    }
}

module.exports = delete_comment