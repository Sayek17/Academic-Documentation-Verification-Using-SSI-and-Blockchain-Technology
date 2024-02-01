import axios from "axios";
import {fetchFirstSchemaDetail} from "./schemaDetails";

const createNewConnection = async () => {
  try {
    const response = await axios.post(
      "https://10.0.2.15:3030/api/acapy/newCon"
    );
    const inviteURL = response.data.inviteURL;
    const connectionID = response.data.connectionID;

    let statusOfAddingConnectionId =
      addConnectionIdToLocalStorage(connectionID);

    if (statusOfAddingConnectionId === "Failed") {
      console.log("Could not store connectionId to local storage");
    }

    return inviteURL;
  } catch (error) {
    return "Failed";
  }
};

function addConnectionIdToLocalStorage(connectionID) {
  const userString = localStorage.getItem("user");
  let user;

  try {
    user = JSON.parse(userString);
  } catch (error) {
    console.error("Error parsing 'user' object from localStorage:", error);
    return "Failed";
  }

  if (user) {
    user.connectionID = connectionID;

    const updatedUserString = JSON.stringify(user);

    localStorage.setItem("user", updatedUserString);
    return "Success";
  } else {
    console.error("'user' object not found in localStorage or invalid format.");
    return "Failed";
  }
}

async function generateVc(studentInformation, connectionID) {
  try {
    const formData = new FormData();
    for (const property in studentInformation) {
      formData.append(property, studentInformation[property]);
    }
    const schemaDetails = await fetchFirstSchemaDetail();

    if(schemaDetails == null){
      console.error("Could not fetch the schema details");
      return;
    }

    formData.append("connectionID", connectionID);
    formData.append("credDefId", schemaDetails.cred_def_id);

    const response = await axios.post(
      "https://10.0.2.15:3030/api/acapy/offerCredential",
      formData
    );

    return response.data.success;
  } catch (err) {
    console.error(err);
    return err;
  }
}

const checkCredentialStatus = async (req, res) => {
  return await axios.get(
      "https://10.0.2.15:9999/credStatus"
  );
};

export { createNewConnection, generateVc, checkCredentialStatus };
