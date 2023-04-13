import mongoose from "mongoose";


const serviceProviderSchema = new mongoose.Schema(
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
        city: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        serviceType: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        rating: {
            type: String,
            default: 0,
        },
        CreatedAt: {
            type: Date,
            default: Date.now(),
            immutable: true,
        }
    },
    {
        versionKey: false,
    }
);

export default mongoose.model('ServiceProvider', serviceProviderSchema);