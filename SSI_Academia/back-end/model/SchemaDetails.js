import mongoose from "mongoose";

const schemaDetailsSchema = new mongoose.Schema({
    schema_id: { type: String, min: 3, required: true },
    cred_def_id: { type: String },
});

const SchemaDetails = mongoose.model("SchemaDetails", schemaDetailsSchema);

export { SchemaDetails };
