import React, { useEffect, useState } from "react";
import { Button, Navbar, Nav, Container, Card, Form, Modal, ModalFooter } from "react-bootstrap";
import "./quiz.scss";

function Quiz({quizName, question}) {

    const [selected, setSelected] = useState(null);
    const [current, setCurrent] = useState(0);
    const [quiz, setQuiz] = useState(null);
    const [score, setScore] = useState(0);
    const [final, setFinal] = useState(0);
    const [modal, showModal] = useState(false);

    useEffect(() => {
        const url = new URLSearchParams(window.location.search);
        const quizID = url.get('id');

        if (quizID) {
            loadQuiz(quizID);
        }
    }, []);

    let thisThis = null;
    if (quiz && quiz.questions && quiz.questions[current]) {
        thisThis = quiz.questions[current];
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!quiz || selected === null) {
            return;
        }

        if (selected == 0) { // set to default
            setScore(score + 1);
        }

        if (current + 1 < quiz.questions.length) {
            setCurrent(current + 1);
            setSelected(null);
        } else {
            let total = score;
            if (selected === 0) { // set to default
                total = score + 1;
            }
            setFinal(total);
            showModal(true);
        }
    }

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
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Form.Group className="mb-3" controlId="questions">
                            <Card.Title as="h2" className="color">{!quiz ? "No Quizzes found" : !thisThis ? "Loading..." : `${current + 1}. ${thisThis.question}`}</Card.Title>
                        </Form.Group>
                        {quiz && thisThis && thisThis.multipleChoice && thisThis.multipleChoice.map((chosen, letter) => (
                            <Form.Group className="mb-3" controlId={`chosen-${letter}`} key={letter}>
                                <Form.Control className="text-box" value={chosen} onClick={() => setSelected(letter)} readOnly/>
                            </Form.Group>
                        ))}

                        <Form.Group className="button-wrapper text-end">
                            {quiz && (
                                <Button href="" type="submit" className="mt-2 w-100 button-sm" disabled={selected === null}>
                                    <strong>{current + 1 < quiz.questions.length ? "Next" : "Finish"}</strong>
                                </Button>
                            )}
                        </Form.Group>
                    </div>
                </Form>
            </Card>

            <Modal show={modal} onHide={() => showModal(false)} centered>
                <Modal.Title>You Completed Your Quiz!</Modal.Title>
                <Modal.Body>
                    <div>
                        <h3>Your Score: {final} / {quiz?.questions.length}</h3>
                        {/*<p className="mt-3"></p>*/}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { showModal(false); window.location.href = "/home";}}> Home </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Quiz;