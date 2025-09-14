import React from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import "./home.scss";

function Home() {
    
    return (
        <div expand="md" className="home-wrapper">
            <Navbar className="d-flex flex-column m-3">
                <Container>
                    <Navbar.Brand  href="home" className="m-4 ms-5 title-link">QuizBuddy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="hamburger-menu" />
                    <Navbar.Collapse id="hamburger-menu" className="home-nav-bar">
                        <Nav className="m-4 ms-5">
                            <Nav.Link href="/create-quiz" className="color-secondary">Create Quiz Page</Nav.Link>
                            <Nav.Link href="/about" className="color-secondary">About Page</Nav.Link>
                            <Nav.Link href="/quiz" className="color-secondary">Quiz Page</Nav.Link>
                            <Nav.Link href="/" className="color-secondary">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="home-content">
                <div className="mt-4">
                    <Button href="/create-quiz" type="submit" className="button-primary">
                        <strong>+</strong>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;