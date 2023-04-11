import dotenv from "dotenv";
import Product from "../models/product.js";
import { productSchema } from "../schemas/product";
import Category from "../models/category.js";
dotenv.config();

export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      res.send({
        messenger: "Danh sách sản phẩm trống!",
      });
    }
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).send({
      messenger: error,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.send({
        messenger: "Sản phẩm không tồn tại",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).send({
      messenger: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const product = await Product.create(req.body);
    console.log(product.categoryId)
    const find = Category.findOne({ _id: product.categoryId })
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });

    if (!product) {
      res.send({
        messenger: "Thêm sản phẩm thất bại",
      });
    }
    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      messenger: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(500).send({
        message: error?.details?.[0]?.message,
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      res.send({
        messenger: "Cập nhật sản phẩm thất bại",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).send({
      messenger: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).send({
        messenger: "khong tim thay",
      });
    }
    const data = await Product.deleteOne({ _id: req.params.id })
    return res.status(200).json({
      message: "Xoa thanh cong"
    })
  } catch (error) {
    res.send({
      messenger: error,
    });
  }
};