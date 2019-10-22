const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.get("/items", itemController.index);
router.post("/items/create", itemController.create);
router.post("/items/:id/destroy", itemController.destroy);
router.get("/items/:id/edit", itemController.edit);
router.post("/items/:id/update", itemController.update);


module.exports = router;