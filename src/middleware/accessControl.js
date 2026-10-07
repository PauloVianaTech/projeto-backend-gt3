const getAdminEmails = () => (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const isAdminEmail = (email) => getAdminEmails().includes(String(email || '').toLowerCase());

const adminOnly = (request, response, next) => {
  if (!isAdminEmail(request.userEmail)) {
    return response.status(403).json({ error: 'Acesso restrito a administradores.' });
  }

  return next();
};

const selfOrAdmin = (request, response, next) => {
  const requestedUserId = Number(request.params.id);
  if (request.userId !== requestedUserId && !isAdminEmail(request.userEmail)) {
    return response.status(403).json({ error: 'Você não tem permissão para acessar este usuário.' });
  }

  return next();
};

module.exports = { adminOnly, selfOrAdmin };