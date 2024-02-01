import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { getAllStudent } from "../data/studentsApi";
import StudentCard from "../components/StudentCard";

const AllStudentListScreen = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchAllStudents() {
            try {
                const studentList = await getAllStudent();
                setStudents(studentList);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllStudents();
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
                All Student List
            </h2>
            <Row>
                {students.map((student) => (
                    <Col style={{marginRight: "10px"}} key={student._id} sm={12} md={6} lg={4} xl={3}>
                        <StudentCard student={student} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AllStudentListScreen;