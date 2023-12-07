// Middleware function to authenticate a user based on a JWT
exports.authenticateToken = (req, res, next) => {
    // Extract the token from the 'Authorization' header
    const token = req.header('Authorization');
  
    // Check if the token is missing
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    // Verify the token using the provided secret key
    jwt.verify(token, 'sammba yero taharka sow', (err, user) => {
        // Check for errors during token verification
        if (err) return res.status(403).json({ message: 'Forbidden' });
  
        // Attach the user data to the request object for further middleware or route handling
        req.user = user;
  
        // Proceed to the next middleware or route handler
        next();
    });
};

  