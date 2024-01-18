const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users_database", userController.getAllUsers);
router.get("/users_database/:id", userController.getUserById);
router.post("/users_database", userController.createUser);
router.put("/users_database/:id", userController.updateUser);
router.delete("/users_database/:id", userController.deleteUser);

module.exports = router;
