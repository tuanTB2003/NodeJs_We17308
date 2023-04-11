import axios from "axios";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();
const { API_URI } = process.env;
import Joi from "joi";
const userSchema = Joi.object({
    name: Joi.string().required().min(6),
    email: Joi.string().required().min(6),
    password: Joi.string(),
});


