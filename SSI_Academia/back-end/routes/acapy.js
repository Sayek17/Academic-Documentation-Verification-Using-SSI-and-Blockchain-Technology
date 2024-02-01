import express from "express";
import axios from "axios";
import { ConnectionDataSchema } from "../model/ConnectionDataSchema.js";
import multer from "multer";
const upload = multer();

const router = express.Router();

router.post("/newCon", async function (req, res) {
  const bodyData = {
    my_label: "BracU Admin",
  };

  axios
    .post("http://127.0.0.1:8021/connections/create-invitation", bodyData)
    .then((resp) => {
      if (resp) {
        const connectionID = resp.data["connection_id"];
        // try {
        //   // storing data for accessing in future
        //   const response = ConnectionDataSchema.create({
        //     email,
        //     memoName,
        //     connectionID,
        //   });
        // } catch (error) {
        //   if (error.code === 11000) {
        //     // duplicate key
        //     return res.json({
        //       status: "error",
        //       error: "provided data already in use",
        //     });
        //   }
        //   throw error;
        // }
        // parsing data into QR
        const inviteURL = JSON.stringify(resp.data["invitation_url"], null, 4);
        res
          .status(200)
          .json({ inviteURL: inviteURL, connectionID: connectionID });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

router.post("/offerCredential", upload.none(), async function (req, res) {
  console.log("At Post Credential!");
  console.log(req.body);

  const name = req.body.name;
  const email = req.body.email;
  const studentId = req.body.student_id;
  const graduationSession = req.body.graduation_session;
  const dateOfBirth = req.body.date_of_birth;
  const cgpa = req.body.cgpa;
  const dateOfIssuance = req.body.date_of_issuance;
  const programmingLanguageII = req.body.programming_language_II;
  const dataStructures = req.body.data_structures;
  const algorithms = req.body.algorithms;
  const dataCommunications = req.body.data_communications;
  const computerNetworks = req.body.computer_networks;
  const biology101 = req.body.biology_101;
  const connectionId = req.body.connectionID;
  const credDefID = req.body.credDefId;

  console.log(`Cred def id: ${credDefID}`);

  try {
    if (credDefID) {
      const data = {
        auto_issue: true,
        auto_remove: true,
        connection_id: connectionId,
        cred_def_id: credDefID,
        comment: "Offer on cred def id " + credDefID,
        credential_preview: {
          "@type":
            "https://didcomm.org/issue-credential/1.0/credential-preview",
          attributes: [
            {
              name: "name",
              value: name,
            },
            {
              name: "email",
              value: email,
            },
            {
              name: "student_id",
              value: studentId,
            },
            {
              name: "graduation_session",
              value: graduationSession,
            },
            {
              name: "date_of_birth",
              value: dateOfBirth,
            },
            {
              name: "cgpa",
              value: cgpa,
            },
            {
              name: "date_of_issuance",
              value: dateOfIssuance,
            },
            {
              name: "programming_language_II",
              value: programmingLanguageII,
            },
            {
              name: "data_structures",
              value: dataStructures,
            },
            {
              name: "algorithms",
              value: algorithms,
            },
            {
              name: "data_communications",
              value: dataCommunications,
            },
            {
              name: "computer_networks",
              value: computerNetworks,
            },
            {
              name: "biology_101",
              value: biology101,
            },
          ],
        },
      };
      await axios.post(
        "http://127.0.0.1:8021/issue-credential/send-offer",
        data
      );
      // res.cookie("conID", connectionId, {
      //   maxAge: 900000,
      //   httpOnly: true,
      // });
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

export default router;
