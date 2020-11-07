const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const text = (phone) => {
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: "Next In Line: You have reached maximum capacity.",
      from: "+19786140860",
      to: phone,
    })
    .then((message) => console.log(message.sid));
};

module.exports = text;
