const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, res, next) => {
    // Récupérer le token du header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, 'sammba yero taharka sow');

        // Ajouter les informations utilisateur à la requête
        req.user = decoded.data;

        // Passer à la prochaine étape
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};



  