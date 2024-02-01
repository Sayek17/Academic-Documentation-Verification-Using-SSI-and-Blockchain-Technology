import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VcWaitingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const credStatusResponse = await axios.get(
        "https://10.0.2.15:9999/credStatus"
      );
      console.log("Cred Response Data: ", credStatusResponse.data);

      if (credStatusResponse.data !== "Status unavailable") {
        clearInterval(intervalId);
        navigate("/vc-success");
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [navigate]);

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
        }}
      >
        Please accept the new credential offer from the Aried Bifold app to
        complete the VC generation........
      </h2>
    </div>
  );
};

export default VcWaitingScreen;
