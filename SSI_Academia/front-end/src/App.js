import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen";
import AddStudentScreen from "./screens/AddStudentScreen";
import IssueVCScreen from "./screens/IssueVCScreen";
import VcWaitingScreen from "./screens/VcWaitingScreen";
import CreateConnectionScreen from "./screens/CreateConnectionScreen";
import GradeSheetScreen from "./screens/GradeSheetScreen";
import AllStudentListScreen from "./screens/AllStudentListScreen";
import { useAuthContext } from "./hooks/useAuthContext";

import { Routes, Route } from "react-router-dom";
import VcGenerationSuccessScreen from "./screens/VcGenerationSuccessScreen";
import SSIConnectionSuccessScreen from "./screens/SSIConnectionSuccessScreen";



function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Header />
      <main className="py-5">
        <Container>
          <Routes>
            <Route
              path="/"
              exact
              element={user ? <HomeScreen /> : <LoginScreen />}
            />
            <Route path="login" exact element={<LoginScreen />} />
            <Route path="add-student" exact element={<AddStudentScreen />} />
            <Route path="/all_students" exact element={<AllStudentListScreen />} />
            <Route path="/create-connection" exact element={<CreateConnectionScreen />} />
            <Route path="/ssi-connected" exact element={<SSIConnectionSuccessScreen />} />
            <Route path="/grade-sheet" exact element={<GradeSheetScreen />} />
            <Route path="/issue-vc" exact element={<IssueVCScreen />} />
            {/*<Route path="/all-vc-list" exact element={<AllVCList />} />*/}
            <Route path="/vc-success" exact element={<VcGenerationSuccessScreen />} />
            <Route path="/waiting-for-vc" exact element={<VcWaitingScreen />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
