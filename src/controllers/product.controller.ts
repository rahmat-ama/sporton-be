import { Request, Response } from "express";
import Product from "../models/product.model";

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const listProduct = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json(listProduct);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Products", error });
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.imageUrl = req.file.path;
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating Product", error });
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Product", error });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.imageUrl = req.file.path;
    }

    const product = Product.findByIdAndUpdate(req.params.id, productData, {
      new: true,
    }).populate("category");

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating Product", error });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Product", error });
  }
};
