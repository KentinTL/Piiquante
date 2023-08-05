const jwt = require('jsonwebtoken');
// Ici on créer notre token utilisé dans le controllers/user.js login
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId
    };
    next();
  }catch (error) {
    res.status(401).json({ error: error });
  }
};