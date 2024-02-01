import React, {useEffect, useState} from "react";
import {Container, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import {fetchFirstSchemaDetail} from "../data/schemaDetails";
import "./GradeSheet.css";

const SSIConnectionSuccessScreen = ({studentEmail}) => {
    const navigate = useNavigate();

    const [schemaDetail, setSchemaDetail] = useState(null);

    useEffect(() => {
        // Fetch the schema detail when the component mounts
        fetchFirstSchemaDetail().then((result) => {
            setSchemaDetail(result);
        });
    }, []);

    return (
        <Container fluid>
            <div className="border" style={{
                textAlign: "right",
                padding: "10px",
            }}>
                <p><strong>Schema ID:</strong> {schemaDetail?.schema_id}</p>
                <p><strong>Credential Definition ID:</strong> {schemaDetail?.cred_def_id}</p>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: "10px",
                    marginTop: "10px"
                }}
            >
                <h2 className="font-link">Welcome Student</h2>
                <h5>SSI Connection: <b style={{color: "green"}}>Active</b></h5>
                <Button style={{marginTop: "20px"}} onClick={() => navigate("/grade-sheet")}>View Grade-sheet</Button>
                <Button style={{marginTop: "20px"}} onClick={() => navigate("/issue-vc")}>Issue Certificate</Button>
            </div>
        </Container>
    );
};

export default SSIConnectionSuccessScreen;