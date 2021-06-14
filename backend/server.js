import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// use .js extension when importing your own js file ie if its not a npm library
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
    res.send("api is running");
});

app.use("/api/products", productRoutes);

// these error handling middlewares should be after the api route(ie after "/api/products" middleware) or else products api will never execute

// when the api called is made other than "/api/products" then notfound middleware is executed with 404 status so the call won't be execute inside of products api middleware
app.use(notFound)

// this errorHandler is executed with server error 500 status when the api parameter is incorrect like product id ie basically if there is an error in api then this will execute
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
