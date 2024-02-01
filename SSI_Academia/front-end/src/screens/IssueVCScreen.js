import React, {useEffect, useState} from "react";
import {Form, Button, Container, Card, Alert} from "react-bootstrap";
import {generateVc} from "../data/acapyAPI.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import {formatSubjectName} from "../utils/FormatSubjectName";
import getCurrentTimeInFormat from "../data/getCurrentTime";

const IssueVCScreen = () => {
    const [student, setStudent] = useState({});
    const [grades, setGrades] = useState({});
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [email, setEmail] = useState("");

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubjectSelection = (subject) => {
        if (selectedSubjects.includes(subject)) {
            setSelectedSubjects((prevSelected) =>
                prevSelected.filter((item) => item !== subject)
            );
        } else {
            setSelectedSubjects((prevSelected) => [...prevSelected, subject]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let studentInformation = {...student};
        let allGrades = {...studentInformation.grades};
        delete studentInformation.grades;
        delete studentInformation.__v;
        delete studentInformation._id;
        studentInformation.email = email;
        studentInformation.date_of_issuance = getCurrentTimeInFormat();

        Object.keys(allGrades).forEach((subject) => {
            if (!selectedSubjects.includes(subject)) {
                allGrades[subject] = 'N/A';
            }
        });

        studentInformation = {
            ...studentInformation,
            ...allGrades,
        };

        console.log(studentInformation);

        const user = JSON.parse(localStorage.getItem("user"));
        const connectionId = user.connectionID;
        if (!connectionId) {
          setError("Could Not Found the Connection Id");
        }

        const responseFromGenerateVc = await generateVc(
            studentInformation,
            connectionId,

        );
        console.log(`responseFromGenerateVc ${responseFromGenerateVc}`);

        if (responseFromGenerateVc) {
            navigate("/waiting-for-vc");
        } else {
            setError(responseFromGenerateVc.response.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.email) {
            setError("User email not found in local storage");
            setIsLoading(false);
            return;
        }

        axios
            .get(`https://localhost:3030/api/students/grades?email=${user.email}`)
            .then((response) => {
                if (response.status === 200) {
                    const student = response.data;
                    setStudent(student);
                    setGrades(student.grades)
                    setIsLoading(false);
                } else {
                    setError(`Status: ${response.status}`);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError("An error occurred while fetching student.");
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loader/>;
    } else {
        return (
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{minHeight: "55vh"}}
            >
                <div className="w-100" style={{maxWidth: "600px"}}>
                    <Card>
                        <Card.Body>
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
                                <b>Your Information</b>
                            </h2>
                            {error ? (
                                <Alert variant="danger">{JSON.stringify(error)}</Alert>
                            ) : (
                            <Form className="mt-3" onSubmit={handleSubmit}>
                                <p><strong>Name:</strong> {student.name}</p>
                                <p><strong>Student ID:</strong> {student.student_id}</p>
                                <p><strong>Graduation Session:</strong> {student.graduation_session}</p>
                                <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
                                <p><strong>CGPA:</strong> {student.cgpa}</p>
                                <hr/>
                                <h6
                                    className="font-link"
                                    style={{
                                        marginTop: "10px"
                                    }}
                                >
                                    <b>Provide your updated email: </b>
                                </h6>
                                <Form.Group className="mt-3 mb-3" controlId="email">
                                    <Form.Control
                                        type="email"
                                        placeholder="Provide updated email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Form.Group>
                                <hr style={{marginTop: "10px"}}/>
                                <h5
                                    className="font-link"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        marginTop: "10px"
                                    }}
                                >
                                    <b>Choose the subjects you want to generate issue with: </b>
                                </h5>
                                {Object.keys(grades).map((subject) => (
                                    <div key={subject}>
                                        <label>
                                            <input type="checkbox" checked={selectedSubjects.includes(subject)} style={{marginRight: "10px"}}
                                                onChange={() => handleSubjectSelection(subject)}
                                            />
                                            <b style={{marginRight: "10px"}}>{formatSubjectName(subject)}:</b> {grades[subject]}
                                        </label>
                                    </div>
                                ))}

                                <Button
                                    disabled={isLoading}
                                    className="mt-4 btn-pill"
                                    variant="success"
                                    type="submit"
                                >
                                    Request VC
                                </Button>
                            </Form>)}
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
};

export default IssueVCScreen;
