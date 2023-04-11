import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'product'

        }
    ]
}, { timestamps: true })

export default mongoose.model('Categories', categorySchema);