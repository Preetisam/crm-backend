const User = require("../models/user.model");
const constants = require("../utils/constants");

validateSignUpRequest = async (req, res, next) => {
  //Implementing the logic for validating the request

  //1.Validate the user name
  if (!req.body.name) {
    res.status(400).send({
      message: "Failed! Name is not provided",
    });
    return;
  }

  //2. Validate the user Id
  if (!req.body.userId) {
    res.status(400).send({
      message: "Failed! UserId is not provided",
    });
    return;
  }

  //3. Validate if the user id already exists
  const user = await User.findOne({ userId: req.body.userId });
  if (user != null) {
    res.status(400).send({
      message: "Failed! UserId already exists",
    });
    return;
  }

  // 4. Validate email
  //5. Validate if email id already exists
  const email = await User.findOne({ email: req.body.userId });
  if (email != null) {
    res.status(400).send({
      message: "Failed! Email already exists",
    });
    return;
  }

  //6. Validate the user type
  const userType = req.body.userType;
  const validUserTypes = [
    constants.userTypes.customer,
    constants.userTypes.admin,
    constants.userTypes.engineer,
  ];
  if (userType && !validUserTypes.includes(userType)) {
    res.status(400).send({
      message: " Failed! UserType proviede is invalid",
    });
    return;
  }
  next();
};

const verifySignUp = {
  validateSignUpRequest: validateSignUpRequest,
};

module.exports = verifySignUp;
