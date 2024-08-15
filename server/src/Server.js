const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoryRouter = require('./routers/categoryRouter');
const imageRouter = require('./routers/imageRouter');
const productRouter = require('./routers/productRouter');
const registerRouter = require('./routers/registerRouter');
const loginRouter = require('./routers/loginRouter');
const cartRouter = require('./routers/cartRouter');
const searchRouter = require('./routers/searchRouter');
const orderRouter = require('./routers/orderRouter');
const userRouter = require('./routers/userRouter');
require('dotenv').config();

const app = express();

// CORS middleware configuration
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/category',categoryRouter);
app.use('/image',imageRouter);
app.use('/product',productRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter)
app.use('/cart',cartRouter)
app.use('/search',searchRouter)
app.use('/order',orderRouter)
app.use('/user',userRouter)
app.get("/", (req, res) => {
    res.send("<h1>Hello world...</h1>");
  });
  

const mongoDBurl = process.env.MONGO_URI;

mongoose.connect(mongoDBurl)
    .then(() => {
        app.listen(4000, () => {
            console.log("Server started at http://localhost:4000");
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    });


