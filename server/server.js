import aiRouter from './Routes/aiRouter.js';
//import userRouter from './Routes/userRouter.js'
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
//import mongoose from 'mongoose'
//import { createServer } from "http";
//import { Server } from "socket.io";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

dotenv.config({ path: 'config.env' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
*/
app.use('/', aiRouter);
//app.use('/api/users', userRouter)

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((err, req, res, next) => {
  console.log(err)
})
/*
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST']
  }
});

io.on("connection", (socket) => {
  socket.emit('chat-message', 'hello world')
  //console.log('user connected')
});
*/
const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

/*
httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});
*/
