import React from "react";
import AdminHomeScreen from "./AdminHomeScreen.js";
import StudentHomeScreen from "./StudentHomeScreen.js";
import LoginScreen from "./LoginScreen.js";

const HomeScreen = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role === "ADMIN") {
    return <AdminHomeScreen name={user.name} />;
  } else if (user.role === "STUDENT") {
    return <StudentHomeScreen studentEmail={user.email}/>;
  } else {
    return <LoginScreen />;
  }
};

export default HomeScreen;
