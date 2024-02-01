import { useState } from "react";
import axios from "axios";
import { deleteStudent } from "../data/studentsApi.js";
import getCurrentTimeInFormat from "../data/getCurrentTime.js";

export const useStudentSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const DEFAULT_ADMIN_PASSWORD = "12345678";
  const user = JSON.parse(localStorage.getItem("user"));

  const addStudent = async (studentInformation) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    for (const key in studentInformation) {
      formData.append(key, studentInformation[key]);
    }
    formData.append("dateOfIssuance", getCurrentTimeInFormat());
    console.log(`Student Form Data`);
    for (const [key, value] of formData.entries()) {
      console.log(key + ": " + value);
    }

    try {
      if (!user) {
        setError("Could not found token to send Request");
        return;
      }
      const token = user.token;
      console.log(token);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      };

      const responseFromStudentAdd = await axios.post(
        "https://localhost:3030/api/students",
        formData,
        config
      );

      if (responseFromStudentAdd && responseFromStudentAdd.status === 200) {
        const formDataOfUser = new FormData();
        formDataOfUser.append("name", studentInformation.name);
        formDataOfUser.append("email", studentInformation.email);
        formDataOfUser.append("password", DEFAULT_ADMIN_PASSWORD);
        formDataOfUser.append("role", "STUDENT");

        console.log(`Student Form Date: ${formDataOfUser}`);

        const response = await axios.post(
          "https://localhost:3030/api/users",
          formDataOfUser,
          config
        );

        if (response.status === 200) {
          setIsLoading(false);
          return true;
        } else {
          await deleteStudent(studentInformation.studentId);
          setError(response.data);
          setIsLoading(false);
          return false;
        }
      } else {
        //setError(responseFromStudentAdd.data);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setError(error.response);
      setIsLoading(false);
      return false;
    }
  };

  return { addStudent, isLoading, error };
};
