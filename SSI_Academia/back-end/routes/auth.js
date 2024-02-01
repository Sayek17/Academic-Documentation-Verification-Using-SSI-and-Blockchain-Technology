import express from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import _ from "lodash";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password!");

  let token = user.generateAuthToken();

  return res
    .header("Access-Control-Expose-Headers", "x-auth-token")
    .header("x-auth-token", token)
    .status(200)
    .send(_.pick(user, ["name", "email", "role"]));
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required(),
  });

  return schema.validate(user);
}

export default router;
