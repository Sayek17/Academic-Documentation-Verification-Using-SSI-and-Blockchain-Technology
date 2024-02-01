import express from "express";
import { User, validateUser as validate } from "../model/user.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import { auth } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", upload.none(), async (req, res) => {
  console.log(req.body);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists!");

  user = new User(_.pick(req.body, ["name", "email", "password", "role"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user
    .validate()
    .then(async () => {
      let savedUser = await user.save();
      if (savedUser._id) {
        let token = user.generateAuthToken();

        return res
          .header("Access-Control-Expose-Headers", "x-auth-token")
          .header("x-auth-token", token)
          .status(200)
          .send(_.pick(savedUser, ["name", "email", "role"]));
      } else return res.status(400).send("Couldn't Register the User!");
    })
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

export default router;
