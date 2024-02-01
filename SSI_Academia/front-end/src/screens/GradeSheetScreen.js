import React, {useState, useEffect} from "react";
import axios from "axios";
import Loader from "../components/Loader";
import {formatSubjectName} from "../utils/FormatSubjectName";
import "./GradeSheet.css";

const GradeSheetScreen = () => {
    const [grades, setGrades] = useState({
        programming_language_II: "",
        data_structures: "",
        algorithms: "",
        data_communications: "",
        computer_networks: "",
        biology_101: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.email) {
            setError("User email not found in local storage");
            setLoading(false);
            return;
        }

        axios
            .get(`https://localhost:3030/api/students/grades?email=${user.email}`)
            .then((response) => {
                if (response.status === 200) {
                    const student = response.data;
                    setGrades(student.grades);
                    setLoading(false);
                } else {
                    setError(`Status: ${response.status}`);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError("An error occurred while fetching grades.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-element">
            <h2>Grade Sheet</h2>
            <table className="grade-sheet-table">
                <thead>
                <tr>
                    <th>Course</th>
                    <th>Grade</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(grades).map(([course, grade]) => (
                    <tr key={course}>
                        <td>{formatSubjectName(course)}</td>
                        <td>{grade}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GradeSheetScreen;
