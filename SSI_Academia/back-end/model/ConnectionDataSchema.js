import mongoose from "mongoose";
import Joi from "joi";

const ConnectionDataSchema = mongoose.model(
  "ConnectionDataSchema",
  new mongoose.Schema({
    email: { type: String, required: true },
    memoName: { type: String, required: true },
    connectionID: { type: String, required: true },
  })
);

export { ConnectionDataSchema };
