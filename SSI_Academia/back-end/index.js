
import path from "path";
import fs from "fs";
import https from "https";


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import students from "./routes/students.js";
import homeRoutes from "./routes/home.js";
import users from "./routes/users.js";
import auth from "./routes/auth.js";
import acapy from "./routes/acapy.js";
import credentials from "./routes/credentials.js";
import jobs from "./routes/jobs.js";
import schemaDetailsRoute from "./routes/schemaDetailsRoute.js";

import { createAdminUserIfNeeded, createSchemaIfNeeded } from "./middleware/initializer.js";

const url = "mongodb://0.0.0.0:27017/ssi_academia";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose
  .connect(url, {})
  .then()
  .catch((err) => console.log("Could not connect to mongodb", err));

createAdminUserIfNeeded();
createSchemaIfNeeded();

const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, "uploads")));
app.use(cors());

app.use("/api/students", students);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/acapy", acapy);
app.use("/api/credentials", credentials);
app.use("/api/jobs", jobs);
app.use("/api/schemaDetails", schemaDetailsRoute);
app.use("/", homeRoutes);

// const port = process.env.PORT || 3030;
// app.listen(3030, () => console.log(`SSI_Cafe backend listening on port ${port}`));


// const sslServer = https.createServer(
//   {
//       key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//       cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
//   },
//   app
// )
// sslServer.listen(port,  ()=> console.log('server up at 3443'))



const key = fs.readFileSync('./CA/localhost/localhost.decrypted.key');
const cert = fs.readFileSync('./CA/localhost/localhost.crt');

const server = https.createServer({ key, cert }, app);

const port = 3030;
server.listen(port, () => {
  console.log(`Server is listening on https://localhost:${port}`);
});