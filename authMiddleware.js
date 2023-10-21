const jwt = require("jsonwebtoken");

// Replace this with your actual secret key

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token, "in middleware");
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  // Verify the token
  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // If the token is valid, add the user information to the request
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
