const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token de autorização não fornecido.' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (!token || !/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};