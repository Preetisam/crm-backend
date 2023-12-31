const constants = require("../utils/constants");

validateTicketRequestBody = (req, res, next) => {
  //Validate the title of the ticket
  if (!req.body.title) {
    return res.status(400).send({
      message: "Failed! Title is not provided",
    });
  }
  //Validate desription
  if (!req.body.description) {
    return res.status(400).send({
      message: "Failed! Description is not provided",
    });
  }
  next();
};

validateTicketStatus = (req, res, next) => {
  const status = req.body.status;

  const statustypes = [
    constants.ticketStatus.open,
    constants.ticketStatus.inProgress,
    constants.ticketStatus.closed,
    constants.ticketStatus.blocked,
  ];
  if (status && !statustypes.includes(status)) {
    return res.status(400).send({
      message: "Failed! Status provided is invalid",
    });
  }
  next();
};

const verifyTicketRequestBody = {
  validateTicketRequestBody: validateTicketRequestBody,
  validateTicketStatus: validateTicketStatus,
};

module.exports = verifyTicketRequestBody;
