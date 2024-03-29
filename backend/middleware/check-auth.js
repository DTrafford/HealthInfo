const jwt = require("jsonwebtoken");
const secret = "secret_String_That_will_be_Used_for_hashing_token_by_THE_JwT";
module.exports = (req, res, next) => {
  try {
    console.log("HEADERS IN CHECK AUTH = ", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "You are not authenticated"
    });
  }
};
