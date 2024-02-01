import mongoose from "mongoose";
import Joi from "joi";

const Credential = mongoose.model(
  "Credential",
  new mongoose.Schema({
    connectionId: { type: String },
    credentialId: { type: String, unique: true },
  })
);

function validateCredentials(student) {
  const schema = Joi.object({
    connectionId: Joi.string().required(),
    credentialId: Joi.string().required().unique(),
  });

  return schema.validate(student);
}

export { Credential, validateCredentials };
