const isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    return;
  }
};

module.exports = isAdmin;
