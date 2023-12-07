const jwt = require('jsonwebtoken');

// Middleware function to verify JWT and user role
module.exports.verifyTokenAndRole = (req, res, next) => {
  // Extract the token from the 'Authorization' header
  const token = req.headers.authorization;

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    // Verify the token using the provided secret key
    const decodedToken = jwt.verify(token.split(" ")[1], 'sammba yero taharka sow');

    // Log the decoded token for debugging purposes
    console.log('Decoded Token:', decodedToken);

    // Check if the decoded token or user data is missing
    if (!decodedToken || !decodedToken.data) {
      return res.status(401).json({ message: 'Invalid token. Missing user data.' });
    }

    // Attach the user data to the request object for further middleware or route handling
    req.user = decodedToken.data;

    // Check if the user has the 'admin' role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized on this request' });
    }

    // Continue to the next middleware or route handler if everything is valid
    next();
  } catch (error) {
    // Log JWT verification errors
    console.error('JWT Verification Error:', error);

    // Return a 401 status if the token is invalid
    return res.status(401).json({ message: 'Invalid token' });
  }
};
module.exports.verifyTokenAndRole = (req, res, next) => {
  // Extract the token from the 'Authorization' header
  const token = req.headers.authorization;

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    // Verify the token using the provided secret key
    const decodedToken = jwt.verify(token.split(" ")[1], 'sammba yero taharka sow');

    // Log the decoded token for debugging purposes
    console.log('Decoded Token:', decodedToken);

    // Check if the decoded token or user data is missing
    if (!decodedToken || !decodedToken.data) {
      return res.status(401).json({ message: 'Invalid token. Missing user data.' });
    }

    // Attach the user data to the request object for further middleware or route handling
    req.user = decodedToken.data;

    // Check if the user has the 'admin' role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized on this request' });
    }

    // Continue to the next middleware or route handler if everything is valid
    next();
  } catch (error) {
    // Log JWT verification errors
    console.error('JWT Verification Error:', error);

    // Return a 401 status if the token is invalid
    return res.status(401).json({ message: 'Invalid token' });
  }
};

