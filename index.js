/*
    npm init  -->  to initialize the package.json
    npm i express  --> to install express js
    npm i cors  -->  to handle Cross Origin file exchanges
    npm i dotenv -->  for handling the .env files
    npm i mongoose  -->  for connecting with database
    npm i nodemon   -->  so that again and-again the server need not to be started. Must set "start" attribute of "script" property in package.json to "nodemon index.js"
    npm i jsonwebtoken  --> JSON Web Tokens (JWT) is a widely used web authentication mechanism, providing a secure and compact way to transmit information.
*/

const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");


const port = process.env.PORT || 5000;

const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/PaymentRoutes");


// configuring dotenv
dotenv.config();

// for payment integration
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



// middlewares
app.use(cors());                // Cross-origin resource sharing (CORS) is an extension of the same-origin policy. You need it for authorized resource sharing with external third parties.
app.use(express.json());        // The express.json() function is a middleware function used in Express.js applications to parse incoming JSON data from HTTP requests, a standard format for data transmission in web servers.


// Database Connectivity
/*
    Username --> krishnangshusinha15
    Password --> pPvVM8n9urCjLhZG
*/
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://krishnangshusinha15:pPvVM8n9urCjLhZG@cluster0.z8cvpqx.mongodb.net/lazeezfoodappdb?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("MongoDB connected successfully"))
.catch(() => console.log("Error in connecting database..."))


// jwt authentication (as soon a request is made for a user generate its token)
app.post("/jwt", async (req, res) => {
    
    const user = req.body;

    const token =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1hr",
    });

    res.send({ token });
});
  


// routes
app.use("/menu" , menuRoutes);
app.use("/carts" , cartRoutes);
app.use("/users" , userRoutes)
app.use("/payments", paymentRoutes);

// stripe payment routes

app.post("/create-payment-intent", async (req, res) => {
    const { price } = req.body;
    const amount = Math.round(price * 100);
    
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      payment_method_types: ["card"],
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    
});
  


app.get("/", (req,res)=> {
    res.send("Hello world")
})

app.listen(port , () => {
    console.log(`App is running at port ${port}`);
})