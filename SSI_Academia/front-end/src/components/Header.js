import React from "react";
import {Navbar, Nav, NavDropdown, Container, Button} from "react-bootstrap";
import {FaUserAlt} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {useAuthContext} from "../hooks/useAuthContext";
import {useLogOut} from "../hooks/useLogOut";

const Header = () => {
    const {logout} = useLogOut();
    const {user} = useAuthContext();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>BracU SSI Academia</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {user ? (
                            <NavDropdown
                                title={
                                    <>
                                        <FaUserAlt style={{marginRight: "5px"}}/>
                                        {user.name}
                                    </>
                                }
                                id="basic-nav-dropdown"
                            >
                                <div style={{textAlign: "center"}}>
                                    <Button
                                        className="ml-3"
                                        variant="outline-secondary"
                                        onClick={logout}
                                    >
                                        Log Out
                                    </Button>
                                </div>
                            </NavDropdown>
                        ) : ""
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
