const blogModel = require("../model/blogModel");
const userModel = require("../model/userModel");

const get_all_posts = async (req, res, next) => {
    try {
        const allPosts = await blogModel.find();
        res.status(200).json({ msg: "books fetched", books: allPosts });
    } catch (error) {
        next(error);
    }
};

const get_a_post = async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await blogModel.findById(id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(200).json({ post });
    } catch (error) {
        next({ status: 404, message: "Post not found" });
    }
};

const create_a_post = async (req, res, next) => {
    const userInfo = req.user;

    try {
        const user = await userModel.findById(userInfo);
        console.log(user, "In here");
        if (!user) {
            return res
                .status(401)
                .json({ msg: "You need to be logged in to create a post" });
        }

        const newPost = new blogModel({ ...req.body, userId: userInfo._id });
        const createdPost = await newPost.save();
        user.postIds.push(createdPost._id);
        await user.save();
        res.status(200).json({ createdPost });
    } catch (error) {
        next(error);
    }
};

const update_a_post = async (req, res, next) => {
    try {
        const userInfo = req.user;
        const update = req.body;
        const { id } = req.params;

        if (!userInfo.postIds.includes(id)) {
            return res
                .status(401)
                .json({ msg: "You can only edit posts created by you" });
        }

        try {
            const postUpdated = await blogModel.findByIdAndUpdate(id, update, {
                new: true,
                runValidators: true,
            });
            if (!postUpdated) {
                return res.status(404).json({ msg: "No post found" });
            }
            res.status(200).json(postUpdated);
        } catch (error) {
            next({ status: 404 });
        }
    } catch (error) {
        next(error);
    }
};

const delete_a_post = async (req, res, next) => {
    const userInfo = req.user;
    const { id } = req.params;

    try {
        const post = await blogModel.findById(id)
        if (!post) {
            return res.status(404).json({message: "Post not found."})
        }

        const postOwner = await userModel.findById(post.userId);

        if (post.userId !== userInfo.id && userInfo.role !== "admin") {
            return res.status(403).json({ msg: "Unauthorized: Only authors or admins can delete this post" });
        }

        await blogModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "Post successfully deleted" });

        if (postOwner) {
            postOwner.postIds = postOwner.postIds.filter(postId => postId !== id)
            await postOwner.save()
        }
        
    } catch (error) {
        next(error);
    }
};

module.exports = {
    get_all_posts,
    get_a_post,
    create_a_post,
    update_a_post,
    delete_a_post,
};
