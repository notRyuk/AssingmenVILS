import { model, Schema } from "mongoose";
import Product from "./types";

export default model<Product>("product", new Schema({
    name: {
        type: String,
        required: [true, "The name of the product is required"]
    },
    category: {
        type: String,
        required: [true, "The category of the product is required"]
    },
    brandName: {
        type: String,
        required: [true, "The brand name of the product is required"]
    },
    images: {
        type: [String],
        default: []
    }
}))