import Category from '../models/category';
import Product from "../models/product.js";
import { categorySchema } from '../schemas/category';


export const create = async (req, res) => {
    try {
        const category = await Category(req.body).save()
        res.json(category)
    } catch (error) {
        res.status(400).json({ message: "Khong the tao moi" })
    }
}

export const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length === 0) {
            res.send({
                messenger: "Danh sách sản phẩm trống!",
            });
        }
        return res.status(200).json(categories);
    } catch (error) {
        res.status(500).send({
            messenger: error,
        });
    }
}

export const getDetail = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id })
        const product = await Product.find({ category })
        res.json({ category, product })
    } catch (error) {
        res.status(400).json({ message: "Khong the hien thi" })
    }
}

export const remove = async (req, res) => {
    try {
        const categories = await Category.findOne({ _id: req.params.id });
        if (!categories) {
            return res.status(400).send({
                messenger: "khong tim thay",
            });
        }
        const data = await Category.deleteOne({ _id: req.params.id })
        return res.status(200).json({
            message: "Xoa thanh cong"
        })
    } catch (error) {
        res.send({
            messenger: error,
        });
    }
}

export const update = async (req, res) => {
    try {
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return res.status(500).send({
                message: error?.details?.[0]?.message,
            });
        }

        const categories = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!categories) {
            res.send({
                messenger: "Cập nhật sản phẩm thất bại",
            });
        }
        return res.status(200).json(categories);
    } catch (error) {
        res.status(500).send({
            messenger: error,
        });
    }
}