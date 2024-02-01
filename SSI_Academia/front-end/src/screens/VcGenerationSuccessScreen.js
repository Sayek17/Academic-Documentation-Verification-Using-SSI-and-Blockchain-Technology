import React from "react";
import "./GradeSheet.css";
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";

const VcGenerationSuccessScreen = () => {
    const navigate = useNavigate();

  return (
      <div className="container-element">
      <h1 style={{ color: "green", marginBottom: "30px" }}>Your VC has been issued successfully...</h1>
          <Button variant="outline-success" onClick={() => navigate("/")}>Go Back To Dashboard</Button>
    </div>
  );
};

export default VcGenerationSuccessScreen;
