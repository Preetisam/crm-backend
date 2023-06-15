const User = require("../models/user.model");
const converUserObject = require("../utils/convertUserObject");

exports.findAll = async (req, res) => {
  try {
    let users = await User.find();
    if (users) {
      return res.status(200).send(converUserObject.userResponse(users));
    }
  } catch (err) {
    res.status(500).send({
      message: "Some internal error occured",
    });
  }
};

exports.findById = async (req, res) => {
  const userIdRequest = req.params.userId;

  const user = await User.find({
    userId: userIdRequest,
  });
  if (user.length > 0) {
    return res.status(200).send(converUserObject.userResponse(user));
  } else {
    return res.status(200).send({
      message: `User with id ${userIdRequest} is not present`,
    });
  }
};

exports.update = async (req, res) => {
  const userIdReq = req.params.userId;
  try {
    const user = await User.findOneAndUpdate(
      {
        userId: userIdReq,
      },
      {
        userName: req.body.userName,
        userStatus: req.body.userStatus,
        userType: req.body.userType,
      }
    ).exec();

    if (user) {
      return res.status(200).send({
        message: "User updated successfully",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Some internal error occured",
    });
  }
};
