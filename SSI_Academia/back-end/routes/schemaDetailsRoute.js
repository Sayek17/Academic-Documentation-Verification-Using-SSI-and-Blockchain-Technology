import express from "express";
import {SchemaDetails} from "../model/SchemaDetails.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const credentials = await SchemaDetails.find();
    res.send(credentials);
});

export default router;