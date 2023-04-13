import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            required: true,
            unique: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        serviceType: {
            type: String,
            default: null,
        },
        workStatus: {
            type: String,
            default: null,
        },
        bookingStatus: {
            type: Boolean,
            required: true,
            default: false,
        },
        serviceProviderId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'ServiceProvider',
            required: true,
        },
        customerId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Customer',
        },
        customerAddress: {
            type: String,
            default: "",
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

export default mongoose.model('Booking', bookingSchema);