import axios from "axios";

async function fetchFirstSchemaDetail() {
    try {
        const apiUrl = "https://localhost:3030/api/schemaDetails";

        const response = await axios.get(apiUrl);

        if (response.data.length > 0) {
            return response.data[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching schema details: ", error);
        return null;
    }
}

export {fetchFirstSchemaDetail};