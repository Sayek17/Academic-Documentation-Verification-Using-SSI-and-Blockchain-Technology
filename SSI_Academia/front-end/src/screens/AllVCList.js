import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const AllVCList = () => {
  const [credentialDefinitionIds, setCredentialDefinitionIds] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8021/credential-defiitions/created")
      .then((response) =>
        setCredentialDefinitionIds(response.data.credential_definition_ids)
      );
  }, []);

  return (
    <div>
      <h2
        className="font-link"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        All VC List
      </h2>
      {credentialDefinitionIds.map((id) => (
        <Card key={id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text>{id}</Card.Text>
            <Button variant="success">Proof VC</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AllVCList;
