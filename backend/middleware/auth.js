// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   // ✅ Get token from cookies or headers
//   const token =
//     req.cookies?.token ||
//     (req.headers.authorization && req.headers.authorization.split(" ")[1]);

//   // ✅ If no token found
//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Token missing" });
//   }

//   try {
//     // ✅ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ Attach user info to request
//     req.user_id = decoded.id;
//     req.email = decoded.email;

//     next(); // ✅ Proceed to next middleware or controller
//   } catch (err) {
//     // ✅ Handle expired or invalid token
//     const message =
//       err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";

//     res.status(403).json({ success: false, message });
//   }
// };

// export default authMiddleware;






import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token =
    req.cookies?.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Match your controller expectation
    req.user = { _id: decoded.id, email: decoded.email };

    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";

    res.status(403).json({ success: false, message });
  }
};

export default authMiddleware;

