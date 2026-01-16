const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();


indexRouter.get("/", indexController.existingMessagesGet);
indexRouter.get("/new", indexController.newMessageGet);
indexRouter.post("/new", indexController.newMessagePost);
indexRouter.get("/:username/messages/:date", indexController.messageDetailsGet);

module.exports = indexRouter;