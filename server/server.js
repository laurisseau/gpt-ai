import aiRouter from './Routes/aiRouter.js';
import userRouter from './Routes/userRouter.js'
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose'
//import bodyParser from 'body-parser';

const app = express();

dotenv.config({ path: 'config.env' });

//app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/', aiRouter);
app.use('/api/users', userRouter)

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((err, req, res, next) => {
  
  console.log(err)
  
})
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

