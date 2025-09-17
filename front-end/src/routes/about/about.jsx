import React from "react";
import { Button, Navbar, Nav, Container, Card, Form } from "react-bootstrap";
import "./about.scss";

function AboutMe () {

    return (
        <div className="about-wrapper">
            <Navbar expand="lg" className="d-flex flex-column m-3" fixed="top">
                <Container>
                    <Navbar.Brand href="home" className="m-4 ms-5 title-link">About Us</Navbar.Brand>
                    <Navbar.Toggle aria-controls="hamburger-menu" />
                    <Navbar.Collapse id="hamburger-menu" className="about-nav-bar">
                        <Nav className="m-4 ms-5">
                            <Nav.Link href="/home" className="color-secondary">Home</Nav.Link>
                            <Nav.Link href="/about" className="color-secondary">Create a Quiz</Nav.Link>
                            <Nav.Link href="/quiz" className="color-secondary">Take a Quiz</Nav.Link>
                            <Nav.Link href="/" className="color-secondary">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="about-content">
                <h2 className="mb-3 color">Hi! We're QuizBuddy!</h2>
                <p className="color">
                    QuizBuddy is a free web application for creating and saving self-administered quizzes.
                    You have the ability to input your own multiple-choice questions and then test yourself
                    on your newly created quiz.
                </p>
                <p className="color">
                    Believe it or not, this web app was  originally named QuizMehPlz but then I ultimately 
                    decided on QuizBuddy after going for a walk with my dog. 
                </p>
                <p className="color">
                    Hope you make some great quizzes and retain the information you quizzed yourself on!
                </p>
            </div>

        </div>
    );
}

export default AboutMe;