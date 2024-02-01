import React, {useState} from "react";
import {Form, Button, Container, Card, Alert} from "react-bootstrap";
import {useStudentSignUp} from "../hooks/useStudentSignUp";

export const AddStudentScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [studentId, setStudentId] = useState("");
    const [graduationSession, setGraduationSession] = useState("");
    const [cgpa, setCgpa] = useState("");
    const [dob, setDob] = useState("");
    const [programmingLanguageGrade, setProgrammingLanguageGrade] = useState("");
    const [dataStructuresGrade, setDateStructureGrade] = useState("");
    const [algorithmGrade, setAlgorithmGrade] = useState("");
    const [dataCommunicationGrade, setDataCommunicationGrade] = useState("");
    const [computerNetworksGrade, setComputerNetworkGrade] = useState("");
    const [biologyGrade, setBiologyGrade] = useState("");

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErroAlert] = useState(false);
    const {addStudent, isLoading, error} = useStudentSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const studentInformation = {
            name,
            email,
            studentId,
            graduationSession,
            cgpa,
            dob,
            programmingLanguageGrade,
            dataStructuresGrade,
            algorithmGrade,
            dataCommunicationGrade,
            computerNetworksGrade,
            biologyGrade
        };

        const saveSuccess = await addStudent(studentInformation);

        if (saveSuccess) {
            setShowSuccessAlert(true);
            handleReset();
        } else {
            setShowErroAlert(true);
        }
    };

    const handleReset = () => {
        document.getElementById("addStudentForm").reset();
        setName("");
        setEmail("");
        setStudentId("");
        setGraduationSession("");
        setCgpa("");
        setDob("");
        setProgrammingLanguageGrade("");
        setDateStructureGrade("");
        setAlgorithmGrade("");
        setDataCommunicationGrade("");
        setComputerNetworkGrade("");
        setBiologyGrade("");
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "55vh"}}>
            <div className="w-100" style={{maxWidth: "600px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="font-link"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                padding: "10px",
                            }}
                        >
                            Add a New Student
                        </h2>
                        {showSuccessAlert && (
                            <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                                Student Added Successfully!
                            </Alert>
                        )}
                        {showErrorAlert && (
                            <Alert variant="error" onClose={() => setShowErroAlert(false)} dismissible>
                                Couldn't Add Student! {error}
                            </Alert>
                        )}
                        <Form id="addStudentForm" className="mt-3" onSubmit={handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="student_id">
                                <Form.Label>Student Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Student Id"
                                    value={studentId}
                                    onChange={(event) => setStudentId(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="email">
                                <Form.Label>Graduation Session</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Graduation Session"
                                    value={graduationSession}
                                    onChange={(event) => setGraduationSession(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="date_of_birth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Date of Birth (DD/MM/YYYY)"
                                    value={dob}
                                    onChange={(event) => setDob(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="cgpa">
                                <Form.Label>CGPA</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter CGPA"
                                    value={cgpa}
                                    onChange={(event) => setCgpa(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="programming_language">
                                <Form.Label>Programming Language II</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Grade"
                                    value={programmingLanguageGrade}
                                    onChange={(event) => setProgrammingLanguageGrade(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="data_structures">
                                <Form.Label>Data Structure</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Grade"
                                    value={dataStructuresGrade}
                                    onChange={(event) => setDateStructureGrade(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="algorithms">
                                <Form.Label>Algorithms</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Grade"
                                    value={algorithmGrade}
                                    onChange={(event) => setAlgorithmGrade(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="data_communications">
                                <Form.Label>Data Communications</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Grade"
                                    value={dataCommunicationGrade}
                                    onChange={(event) => setDataCommunicationGrade(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="computer_networks">
                                <Form.Label>Computer Networks</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Grade"
                                    value={computerNetworksGrade}
                                    onChange={(event) => setComputerNetworkGrade(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="biology">
                                <Form.Label>Biology 101</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Grade"
                                    value={biologyGrade}
                                    onChange={(event) => setBiologyGrade(event.target.value)}
                                />
                            </Form.Group>

                            <Button
                                disabled={isLoading}
                                className="mt-4 btn-pill"
                                variant="success"
                                type="submit"
                            >
                                Add Student
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default AddStudentScreen;
