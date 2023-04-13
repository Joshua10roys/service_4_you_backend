import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getRouter } from './src/routes/Get Route.js';
import { postRouter } from './src/routes/Post Route.js';
import { patchRouter } from './src/routes/Patch Route.js';
import { deleteRouter } from './src/routes/Delete Route.js';
import { customerRouter } from './src/routes/Customer Route.js';
import { serviceProviderRouter } from './src/routes/Service Provider Route.js';


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


app.use('/get', getRouter);
app.use('/post', postRouter);
app.use('/patch', patchRouter);
app.use('/delete', deleteRouter);
app.use('/customer', customerRouter);
app.use('/serviceProvider', serviceProviderRouter);


mongoose.set('strictQuery', true);
await mongoose.connect(process.env.MONGOBD_URL)
    .then(() => console.log('Connected to MongoDB'))
    .then(() => app.listen(process.env.PORT))
    .then(() => console.log('Server Started'))
    .catch((error) => console.log(error.message))