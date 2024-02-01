import express from "express";
import {
  Credential,
  validateCredentials as validate,
} from "../model/Credential.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const credentials = await Credential.find();
  res.send(credentials);
});

router.get("/:credentialId", async (req, res) => {
  try {
    const credential = await Credential.findOne({
      credentialId: req.params.credentialId,
    });

    if (!credential) {
      return res.status(404).send("Credential not found");
    }

    res.send(credential);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  console.log(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let credential = new Credential({
    connectionId: req.body.connectionId,
    credentialId: req.body.credentialId,
  });

  credential
    .validate()
    .then(async () => {
      let savedCredential = await credential.save();
      if (savedCredential._id) res.status(200).send(savedCredential);
      else res.status(400).send("Couldn't save student!");
    })
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

export default router;
