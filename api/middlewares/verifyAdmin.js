//This middleware is used to check if current user of Admin or not

const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const verifyAdmin = async (req, res, next) => {

  const email = req.decoded.email;      // decoded email stored during jwt handling
  const query = { email: email };

  const user = await User.findOne(query);
  const isAdmin = (user?.role === "admin");

  if (!isAdmin) {
    return res.status(403).send({ message: "forbidden access" });
  }

  next();
  
};

module.exports = verifyAdmin;