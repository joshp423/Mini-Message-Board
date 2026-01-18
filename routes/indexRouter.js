const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();


indexRouter.get("/", indexController.existingMessagesGet);
indexRouter.get("/new", indexController.newMessageGet);
indexRouter.post("/new", indexController.newMessagePost);
indexRouter.get("/messages/:messageid/", indexController.messageDetailsGet);

module.exports = indexRouter;