import React, { useState } from "react";
import { Button, Navbar, Nav, Container, Card, Form } from "react-bootstrap";
import "./quiz.scss";

function Quiz({quizName, question}) {

    const [selected, setSelected] = useState(false);

    return (
        <div className="quiz-wrapper">
            <Navbar expand="lg" className="d-flex flex-column m-3" fixed="top">
                <Container>
                    <Navbar.Brand href="home" className="m-4 ms-5 title-link">Quiz</Navbar.Brand>
                    <Navbar.Toggle aria-controls="hamburger-menu" />
                    <Navbar.Collapse id="hamburger-menu" className="create-nav-bar">
                        <Nav className="m-4 ms-5">
                            <Nav.Link href="/home" className="color-secondary">Home</Nav.Link>
                            <Nav.Link href="/quiz" className="color-secondary">Create a Quiz</Nav.Link>
                            <Nav.Link href="/about" className="color-secondary">About</Nav.Link>
                            <Nav.Link href="/" className="color-secondary">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/*Fix this showing above nav bar*/}
            {/*<div className="mb-3">
                <h2>Quiz - {quizName}</h2>
            </div>*/}
            <Card className="mt-8 quiz-card">
                <Form>
                    <div>
                        <Form.Group className="mb-3" controlId="questions">
                            <Card.Title as="h2" className="color">{question}1. Who is the 46th govenor of Florida?</Card.Title>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="a">
                            <Form.Control className="text-box" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="b">
                            <Form.Control className="text-box" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="c">
                            <Form.Control className="text-box" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="d">
                            <Form.Control className="text-box" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="e">
                            <Form.Control 
                                className="text-box"  
                                placeholder="e. I don't know"
                                disabled
                                onClick={() => setSelected(!selected)}/>
                        </Form.Group>

                        <Form.Group className="button-wrapper text-end">
                            <Button href="/home" type="submit" className="mt-2 w-100 button-sm">
                                <strong>Next</strong>
                            </Button>
                        </Form.Group>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default Quiz;