// Middleware function to check if the user has the 'admin' role
module.exports.isAdmin = (req, res, next) => {
    // Check if user data is available in the request object
    const user = req.user;

    // Check if user and role are defined
    if (user && user.role) {
        const role = user.role;
        if (!role === 'tiak-tiak') {
            res.status(403).json({ message: 'Access denied' });
        } else {
            res.json({ message: 'Access granted to admin' });
            // Move next() inside the if-else block to ensure it's only called when needed
            next();
        }
    } else {
        res.status(403).json({ message: 'Access ded' });
        // Move next() inside the if-else block to ensure it's only called when needed
        next();
    }
};



