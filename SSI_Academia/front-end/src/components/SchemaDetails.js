import React from "react";

const SchemaDetails = ({ schemaId, credDefId }) => {
    return (
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <p>Schema ID: {schemaId}</p>
            <p>Credential Definition ID: {credDefId}</p>
        </div>
    );
};

export default SchemaDetails;
