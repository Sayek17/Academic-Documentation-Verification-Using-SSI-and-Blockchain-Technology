import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { createNewConnection } from "../data/acapyAPI.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateConnectionScreen = () => {
  const [inviteURL, setInviteURL] = useState(null);
  const [connected, setConnected] = useState(false); // State to track successful connection
  const [connectionId, setConnectionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCreateNewConnection = async () => {
      const url = await createNewConnection();
      setInviteURL(url);
    };
    handleCreateNewConnection();

    const checkConnectionStatus = async () => {
      try {
        const response = await axios.get("https://10.0.2.15:9999/status");
        const connectionId = response.data;

        if (connectionId && connectionId !== "Nothing..") {
          // If a connectionId is returned, update the state
          setConnected(true);
          setConnectionId(connectionId);
        }
      } catch (error) {
        console.error("Error fetching connection status:", error);
      }
    };

    // Call the checkConnectionStatus function repeatedly every 5 seconds
    const interval = setInterval(checkConnectionStatus, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  if (connected) {
    // get the user object from local storage
    const user = JSON.parse(localStorage.getItem("user")) || {};

    // set or update the connectionId field
    user.connectionID = connectionId;

    // save the updated user object back to local storage
    localStorage.setItem("user", JSON.stringify(user));

    // If the user is connected and the connectionId matches, navigate to the VcRequest page
    navigate("/ssi-connected");
  }

  return (
    <>
      <>
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
          Scan the QR code below to create a new connection.
        </h2>
        {inviteURL !== "failed" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <QRCodeCanvas value={inviteURL} size={400} />
          </div>
        ) : (
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
            Failed to create connection
          </h2>
        )}
      </>
    </>
  );
};

export default CreateConnectionScreen;
