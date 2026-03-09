// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";

export const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "Unauthorized, JWT token is required" });
  }

  // Accept either:
  //   "Bearer <token>"  OR  "<token>"
  // so it's resilient to both frontend styles.
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]?.trim()
    : authHeader.trim();

  if (!token) {
    return res.status(403).json({ message: "Unauthorized, JWT token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach a consistent user object for controllers
    req.user = { userId: decoded._id, email: decoded.email };
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(403).json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};
