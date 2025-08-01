const jwt = require("jsonwebtoken");
const auth = (requiredRole = "admin") => {
  return (req, res, next) => {

    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) return res.status(404).json({ message: "Unauthorized" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (decoded.role != requiredRole)
        return res
          .status(404)
          .json({ message: "access denied, there no admin found " });

      next();
    } catch (err) {
      res.status(500).json({ message: "an error in the server occured" });
    }
  };
};
module.exports = auth;
