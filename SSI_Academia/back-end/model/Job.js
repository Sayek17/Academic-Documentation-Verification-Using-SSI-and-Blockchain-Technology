import mongoose from "mongoose";
import Joi from "joi";

const Job = mongoose.model(
    "Job",
    new mongoose.Schema({
        title: {type: String, min: 2, required: true},
        details: {type: String, min: 2, required: true},
        organization: {type: String, min: 2, required: true},
        requiredSubjects: [{type: String}]
    })
);


export {Job};
