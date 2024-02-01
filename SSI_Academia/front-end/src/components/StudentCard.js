import React from "react";
import {Card} from "react-bootstrap";

const StudentCard = ({student}) => {
    return (
        <Card className="my-3 p-3 rounded" bg="cardBackground" style={{ height: "170px", marginRight: "10px"}}>
            <Card.Body>
                <Card.Title as="div" className="cardText">
                    <strong>{student.name}</strong>
                </Card.Title>
                <Card.Text className="cardText">
                    <b>ID: </b> {student.student_id}
                </Card.Text>
                <Card.Text className="cardText">
                    <b>Email: </b> {student.email}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default StudentCard;