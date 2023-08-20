const authorization = (permission) => {
  return (req, res, next) => {
    if (!req.token.role.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Unauthorized`,
      });
    }
    next();
  };
};
module.exports = authorization;
