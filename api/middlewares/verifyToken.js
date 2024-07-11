// This middleware verifies token for each user

const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(401).send({ message: "unauthorised access" });
  }
  
  const token = req.headers.authorization.split(" ")[1];
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "token is invalid" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifytoken;