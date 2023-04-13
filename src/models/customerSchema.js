import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        randomToken: {
            type: String,
            default: null
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            immutable: true,
        }
    },
    {
        versionKey: false,
    }
);

export default mongoose.model('Customer', customerSchema);