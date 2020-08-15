const verfyRole = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ detail: "Access Denied!" });
  next();
};

module.exports = verfyRole;
