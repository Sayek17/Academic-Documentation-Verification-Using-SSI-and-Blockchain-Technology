import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, min: 3, required: true },
  email: { type: String, min: 3, required: true, unique: true },
  password: { type: String, min: 3, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "STUDENT", "VERIFIER"],
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    "jwtPrivateKey"
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required(),
    role: Joi.string().valid("ADMIN", "STUDENT", "VERIFIER").required(),
  });

  return schema.validate(user);
}

export { User, validateUser };
