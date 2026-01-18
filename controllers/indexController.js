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

async function newMessagePost(req, res) {
  messages.push({text: req.body.messageText, user: req.body.messageUser, added: new Date() });
  res.redirect("/");
};

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
    newMessagePost,
    messageDetailsGet
}