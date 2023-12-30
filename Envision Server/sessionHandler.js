const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.KEY;

const authenticateToken = (req, res, next) => {
  const rtoken = req.headers["authorization"];
  let token = rtoken;
  if (!token) {
    return res.status(401).send("Unauthorized: Missing token");
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  } else {
    return res.status(401).send("Unauthorized: Must Begin With Bearer");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized: Invalid token");
    }
    req.username = decoded.username;
    next();
  });
};

function generateToken(username) {
  const payload = {
    username: username,
  };

  const options = {
    expiresIn: "6h",
  };

  return jwt.sign(payload, secretKey, options);
}

module.exports = { authenticateToken, generateToken };
