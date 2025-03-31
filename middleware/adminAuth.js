const adminAuth = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({message: "Access denied. Not authorized to perform this action."})
    }
    next();
}

module.exports = adminAuth