import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

export const signin = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        number: user.number,
        isUser: user.isUser,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

export const signup = expressAsyncHandler(async (req, res) => {

  const user = await User.create(req.body);

  res.send({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    number: user.number,
    email: user.email,
    isUser: user.isUser,
    token: generateToken(user),
  });
});





  

