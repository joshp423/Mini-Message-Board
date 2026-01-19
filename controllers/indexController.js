require('dotenv').config();
const db = require("../db/queries");

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New Message" },
];

async function existingMessagesGet (req, res) {
    const messages = await db.getAllMessages();
    res.render("index", {title: "Mini Messageboard", messages: messages, links: links});
}

async function newMessageGet (req, res) {
  res.render("form", {title: "New Message", links: links});
};

const { body, validationResult, matchedData } = require("express-validator");
const lengthErrUser = "must be between 1 and 25 characters.";
const lengthErrMessage = "must be between 1 and 250 characters.";


const validateMessage = [
  body("messageUser").trim().escape()
    .isLength({min: 1, max: 25}).withMessage(`Username ${lengthErrUser}`),
  body("messageText").trim().escape()
    .isLength({min: 1, max: 250}).withMessage(`Message ${lengthErrMessage}`),
];

async function messageDetailsGet (req, res) {
    const message = await db.getSelectedMessage(req);
    if (!message) {
        res.status(404).send("Message not found");
        return;
    }
    res.render("./messages/messageDetails", 
      {title:"Message Details",
        message: message,
        links: links
    });
};

module.exports = {
    existingMessagesGet,
    newMessageGet,
    newMessagePost: [
      ...validateMessage,
      async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
          return res.status(400).render("form", {
            title: "Create new message",
            links,
            errors: errors.array(),
          })
        }
        const {messageUser, messageText} = matchedData(req);

        await db.addNewMessage(messageUser, messageText);
        res.redirect('/');
      }
    ],
    messageDetailsGet
}