import express from "express";
import multer from "multer";
import { Job } from "../model/Job.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

const upload = multer();

router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
});

router.get('/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/", upload.none(), async (req, res) => {
  console.log(req.body);

  let job = new Job({
    title: req.body.title,
    details: req.body.details,
    organization: req.body.organization,
    requiredSubjects: req.body.requiredSubjects
  });

  job
    .validate()
    .then(async () => {
      let savedJob = await job.save();
      if (savedJob._id) res.status(200).send(savedJob);
      else res.status(400).send("Couldn't save job!");
    })
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

export default router;
