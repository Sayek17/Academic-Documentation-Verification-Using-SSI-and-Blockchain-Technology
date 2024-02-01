import express from "express";
import { Student } from "../model/student.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

router.get('/grades', async (req, res) => {
  try {
    const { email } = req.query; // Extract email from query parameters

    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", auth, upload.none(), async (req, res) => {
  let student = new Student({
    name: req.body.name,
    email: req.body.email,
    student_id: req.body.studentId,
    graduation_session: req.body.graduationSession,
    date_of_birth: req.body.dob,
    cgpa: req.body.cgpa,
    date_of_issuance: req.body.dateOfIssuance,
    grades: {
      programming_language_II: req.body.programmingLanguageGrade,
      data_structures: req.body.dataStructuresGrade,
      algorithms: req.body.algorithmGrade,
      data_communications: req.body.dataCommunicationGrade,
      computer_networks: req.body.computerNetworksGrade,
      biology_101: req.body.biologyGrade,
    },
  });


  student
    .validate()
    .then(async () => {
      let savedStudent = await student.save();
      if (savedStudent._id) res.status(200).send(savedStudent);
      else res.status(400).send("Couldn't save student!");
    })
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        credentialId: req.body.studentId,
      },
      { new: true, runValidators: true }
    );

    if (!student) return res.status(404).send("The student does not exist");

    return res.send(student);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const result = await Student.deleteOne({ studentid: studentId });
    if (result.deletedCount === 0) {
      res.status(404).send("Student not found");
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
