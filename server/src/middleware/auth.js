const jwt = require("jsonwebtoken");

function auth(required = true) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!token) {
      if (!required) {
        return next();
      }
      return res.status(401).json({ error: { message: "Missing authorization token" } });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
      req.user = {
        id: payload.id,
        email: payload.email,
        isVerified: payload.isVerified,
        isAdmin: payload.isAdmin,
      };
      return next();
    } catch (err) {
      if (!required) {
        return next();
      }
      return res.status(401).json({ error: { message: "Invalid or expired token" } });
    }
  };
}

module.exports = auth;


