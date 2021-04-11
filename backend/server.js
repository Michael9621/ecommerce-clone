import express from 'express'
import data from './data.js';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://cristiano:ombati1995@cluster0.tunda.mongodb.net/amazona?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/products', productRouter);

app.use('/api/users', userRouter);

app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get('/', (req, res) => {
  res.send('Server is ready');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});