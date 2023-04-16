import express from "express";
import {createChat} from "../Controller/aiController.js";
//import { isAuth } from "../utils.js";

const aiRouter = express.Router();

aiRouter.post("/", createChat);

export default aiRouter;