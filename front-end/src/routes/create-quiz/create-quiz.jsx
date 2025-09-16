import React from "react";
import { Button, Navbar, Nav, Container, Card, Form } from "react-bootstrap";
import "./create-quiz.scss";

function CreateQuiz() {

    return (
        <div className="create-wrapper">
            <Navbar expand="lg" className="d-flex flex-column m-3" fixed="top">
                <Container>
                    <Navbar.Brand href="home" className="m-4 ms-5 title-link">Create your Quiz</Navbar.Brand>
                    <Navbar.Toggle aria-controls="hamburger-menu" />
                    <Navbar.Collapse id="hamburger-menu" className="create-nav-bar">
                        <Nav className="m-4 ms-5">
                            <Nav.Link href="/home" className="color-secondary">Home</Nav.Link>
                            <Nav.Link href="/quiz" className="color-secondary">Take a Quiz</Nav.Link>
                            <Nav.Link href="/about" className="color-secondary">About</Nav.Link>
                            <Nav.Link href="/" className="color-secondary">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Card className="mt-8 create-card">
                <Form>
                    <div>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label className="color">Quiz Title</Form.Label>
                            <Form.Control className="text-box" required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="count">
                            <Form.Label className="color">Number of Questions (Max 25)</Form.Label>
                            <Form.Control className="text-box" required type="number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="questions">
                            <Form.Label className="color">
                                Questions - Multiple Choice - Add '()' to correct answer. EX: (B)
                            </Form.Label>
                            <Form.Control className="text-box-lg" />
                        </Form.Group>
                        <Form.Group className="button-wrapper text-end">
                            <Button href="/home" type="submit" className="mt-2 w-100 button-sm">
                                <strong>Create</strong>
                            </Button>
                        </Form.Group>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default CreateQuiz;
