const { Router } = require("express");
const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New Message" },
];

indexRouter.get("/", (req, res) => {
  res.render("index", {title: "Mini Messageboard", messages: messages, links: links});
});

indexRouter.get("/new", (req, res) => {
  res.render("form", {title: "New Message", links: links});
});

indexRouter.post("/new", (req, res) => {
  messages.push({text: req.body.messageText, user: req.body.messageUser, added: new Date() });
  res.redirect("/");
})

indexRouter.get("/:username/messages/:date", (req, res) => {
  for (const message of messages) {
    if (message.user === req.params.username && message.added.toDateString() === new Date(req.params.date).toDateString()) {
      res.render("./messages/messageDetails", {title:"Message Details", message: message, links: links})
      return;
    }
  }
  res.status(404).send("Message not found");
})

module.exports = indexRouter;