import compression from "compression";
import cors from "cors";
import express, { Express } from "express";
import { connect } from "mongoose";
import { DB_URL, PORT } from "./config";
import Product from "./model";

const app: Express = express()
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

try {
    connect(DB_URL)
}
catch(e) {
    console.log(e)
}
console.log("Successfully connected to the database")

app.get("/products", async (req, res) => res.send({ status: "success", products: await Product.find(req.query)}))
app.post("/product", async (req, res) => {
    const newProduct = new Product(req.body)
    const isValid = await newProduct.validate().then(_ => ({status: "success"})).catch(err => ({status: "fail", errors: err.errors}))
    res.status(isValid.status==="success"?200:400).send(isValid.status === "fail"?isValid:{
        status: "success",
        product: await newProduct.save()
    })
})
app.put("/product/:id", async (req, res) => {
    if(!req.params.id) {
        return res.status(404).send({
            status: "fail",
            message: "The id of the product to update is not found"
        })
    }
    if(!Object.keys(req.body).length) {
        return res.status(404).send({
            status: "fail",
            message: "There are not fields to update in the product"
        })
    }
    const product = await Product.findByIdAndUpdate(req.params.id, {$set: req.body})
    if(!product) {
        return res.status(404).send({
            status: "fail",
            message: "Database error. Connection timed out"
        })
    }
    res.status(200).send({
        status: "success",
        product
    })
})
app.delete("/product/:id", async (req, res) => {
    if(!req.params.id) {
        return res.status(404).send({
            status: "fail",
            message: "The id of the product to update is not found"
        })
    }
    const product = await Product.findByIdAndRemove(req.params.id)
    if(!product) {
        return res.status(404).send({
            status: "fail",
            message: "Database error. Connection timed out"
        })
    }
    res.status(200).send({
        status: "success",
        product
    })
})
app.listen(PORT, () => console.log("Server running on port:", PORT))