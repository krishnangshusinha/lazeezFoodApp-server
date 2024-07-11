const express = require("express");
const router = express.Router();

const Carts = require("../Model/Cart");
const verifyToken = require("../middlewares/verifyToken");


const cartController = require("../controllers/cartControllers");

router.get("/",verifyToken, cartController.getCartByEmail);     // route for getting all cart items of a user on basis of email
router.post("/", cartController.addToCart);         // route to handle adding in cart item
router.delete("/:id", cartController.deleteCart);   // route to handle deleting element
router.put("/:id", cartController.updateCart);      // route to handle increase/decrease in product quantity
router.put("/:id", cartController.getSingleCart);   // route to get single cart element



module.exports = router;