import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts =  async (req, res) => {
  try {
    const products = await Product.find({});

    console.log(products);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.price || !product.image || !product.name) {
    return res.status(400).json({
      message: "please provide all of the required details",
      success: false,
    });
  }

  try {
    const newProduct = await Product.create(product);
    return res.status(201).json({
      message: "product created successfully",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error in creating Product", error.message);
    res.status(500).json({ success: false, message: "internel server error" });
  }
}

export const updateProduct =  async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:"Error PRoduct Id "})
  
  try {
    const upadatedProduct = await Product.findByIdAndUpdate(id, product, {
      returnDocument: after,
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Product updated successfully",
        upadatedProduct,
      });
  } catch (error) {
    return res.status(500).json("Error Updating the Product");
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Deleted successfully", success: true });
  } catch (error) {
    console.error("404 product not found ");
    return res.json({ message: "not found" });
  }
}