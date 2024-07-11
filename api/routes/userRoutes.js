const express = require("express");
const router = express.Router();

const verifytoken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

const userController = require("../controllers/userControllers");

router.get("/" , verifytoken , verifyAdmin ,userController.getAllUsers);
router.post("/", userController.createUser);
router.delete("/:id", verifytoken , verifyAdmin , userController.deleteUser);
router.get("/admin/:email",verifytoken , userController.getAdmin);          // route to check if current user is admin or not
router.patch("/admin/:id",verifytoken , verifyAdmin , userController.makeAdmin);           // route to make current user admin 
// patch method is similar to put both are used for updating resource properties, but "patch" is used in case of partial data and "put" for complete data


module.exports = router;