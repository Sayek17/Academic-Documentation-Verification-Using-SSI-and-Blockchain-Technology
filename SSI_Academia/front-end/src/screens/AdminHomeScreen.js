import React from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const AdminHomeScreen = ({name}) => {
    const navigate = useNavigate();

    function navigateToAddStudentScreen() {
        navigate("/add-student");
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center", // Center vertically
                flexDirection: "column",
                padding: "10px",
            }}
        >
            <h2 className="font-link">Welcome to BracU SSI Academia</h2>
            <Button style={{marginTop: "20px"}} onClick={navigateToAddStudentScreen}>Add New Student</Button>
            <Button variant="info" style={{marginTop: "20px"}} onClick={() => navigate("/all_students")}>See All Students</Button>
        </div>
    );

};

export default AdminHomeScreen;
