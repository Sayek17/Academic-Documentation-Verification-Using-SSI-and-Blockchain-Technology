import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(email, password);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "55vh" }}
    >
      <div className="w-100" style={{ maxWidth: "600px" }}>
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
              Sign In
            </h2>
            {error ? (
              <Alert variant="danger">{JSON.stringify(error)}</Alert>
            ) : (
              ""
            )}
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mt-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <Button
                disabled={isLoading}
                className="mt-4"
                variant="success"
                type="submit"
              >
                Submit
              </Button>
            </Form>
            {/* <div className="w-100 text-center mt-3">
              New verifier? Create a new account{"    "}
              <LinkContainer className="ml-3" to="/verfier-signup">
                <Button variant="outline-primary">Sign Up!</Button>
              </LinkContainer>
            </div> */}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default LoginScreen;
