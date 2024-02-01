import axios from "axios";
import {getFaberEndPoint} from "./CommonConfigData.cjs";

async function createSchemaInLedger() {
    const faberEndpoint = getFaberEndPoint();

    if (faberEndpoint == null) {
        console.error("Could not fetch the Faber Endpoint while creating schema");
        return "False";
    }

    const body = generateSchemaCreationBody();
    const response = await axios.post(`${faberEndpoint}/schemas`, body, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (response == null) {
        console.error("Got the null response while creating schema");
        return "False";
    } else {
        try {
            const responseData = response.data;
            return responseData.sent.schema_id.toString();
        } catch (error) {
            console.error(error);
            return "False"
        }
    }
}

async function createCredentialDefinitionInLedger(schemaId) {
    const faberEndpoint = getFaberEndPoint();

    if (faberEndpoint == null) {
        console.error("Could not fetch the Faber Endpoint while creating cred_def_id");
        return "False";
    }

    const body = {
        "schema_id": schemaId,
        "support_revocation": false,
        "tag": "Certificate v_" + generateRandom4DigitNumber()
    };

    const response = await axios.post(`${faberEndpoint}/credential-definitions`, body, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (response == null) {
        console.error("Got the null response while creating cred_def_id");
        return "False";
    } else {
        try {
            const responseData = response.data;
            return responseData.sent.credential_definition_id.toString();
        } catch (error) {
            console.error(error);
            return "False"
        }
    }
}

function generateRandom4DigitNumber() {
    const random = Math.floor(Math.random() * 10000);

    return random.toString().padStart(4, '0');
}

function generateSchemaCreationBody() {
    return {
        "attributes": ["name", "email", "student_id", "graduation_session", "date_of_birth", "cgpa", "date_of_issuance", "programming_language_II", "data_structures", "algorithms", "data_communications", "computer_networks", "biology_101"],
        "schema_name": "BRACU CSE TEST SCHEMA",
        "schema_version": "1.0"
    };
}

export {createSchemaInLedger, createCredentialDefinitionInLedger};

