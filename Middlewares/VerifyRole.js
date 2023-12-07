// Middleware function to verify if the user has the 'admin' role
exports.isAdmin = (req, res, next) => {
    // Check if user data is available in the request object
    if (req.user && req.user.role === 'admin') {
        // If the user has the 'admin' role, proceed to the next middleware or route handler
        return next();
    } else {
        // If the user does not have the 'admin' role, return a 403 Forbidden status
        return res.status(403).json({ message: 'Permission denied' });
    }
}
