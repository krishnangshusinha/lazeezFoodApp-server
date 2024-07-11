const express = require("express");
const { mongoose } = require("mongoose");
const Payment = require("../Model/Payment");
const router = express.Router();

const Cart = require("../Model/Cart");
const ObjectId = mongoose.Types.ObjectId;

// token
const verifyToken = require("../middlewares/verifyToken");


// post paymnet related info
router.post("/", verifyToken, async (req, res) => {
  const payment = req.body;
  try {
    const paymentRequest = await Payment.create(payment);

    // deletecart items
    const cartIds = payment.cartItems.map((id) => new ObjectId(id));
    const deleteCartRequest = await Cart.deleteMany({ _id: { $in: cartIds } });

    res.status(200).json({paymentRequest, deleteCartRequest});
  } 
  catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// get payment related info
router.get("/", verifyToken, async (req, res) => {
  const email = req.query.email;

  const query = { email: email };
  
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ messge: "Forbidden  Access" });
    }
    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } 
  catch (error) {
    res.status(404).json({ message: error.message });
  }
  
});


module.exports = router;