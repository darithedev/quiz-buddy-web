import React, { useEffect, useState } from "react";
import { Button, Navbar, Nav, Container, Card, Form, Modal, ModalFooter } from "react-bootstrap";
import JSConfetti from 'js-confetti';
import "./quiz.scss";

function Quiz() {

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

    const jsConfetti = new JSConfetti();
    useEffect(() => {
        if (modal) {
            jsConfetti.addConfetti({
                emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                confettiRadius: 6,
                confettiNumber: 500,
            });
        }
    }, [modal]);

    async function loadQuiz(quizID) {
        const token = sessionStorage.getItem('authToken');

        if(!token) {
            return;
        }

        try {
            const apiURL = import.meta.env.VITE_API_URL;

            if(!apiURL) {
                console.error('ERROR!! issue with URL');
                return;
            }

            const api = await fetch(`${apiURL}/api/quizzes?id=${quizID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (api.ok) {
                const data = await api.json();
                const quizData = data.quiz;

                if (quizData.questions && typeof quizData.questions === 'string') {
                    try {
                        quizData.questions = JSON.parse(quizData.questions);
                    } catch (error) {
                        console.error('ERROR!! Incorrect quiz format. Error: ', error);
                        quizData.questions = [];
                    }
                }
                setQuiz(data.quiz);
            }

        } catch (error) {
            console.error('ERROR!! Quiz not loading in edit mode! Error: ', error);
            setQuiz(null);
        }
    }

    let thisThis = null;
    if (quiz && quiz.questions) {
        const arr = Array.isArray(quiz.questions) ? quiz.questions : [];
        if (arr.length > 0 && arr[current]) {
            const quest = arr[current];

            if (quest && quest.question) {
                thisThis = quest;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!quiz || selected === null) {
            return;
        }

        const questArray = Array.isArray(quiz.questions) ? quiz.questions : [];
        const currentQuest = questArray[current];
        const correctAnsIndex = currentQuest?.correctAnsIndex ?? 0;
        const correctAns = selected === correctAnsIndex;

        if (current + 1 < questArray.length) {
            if(correctAns) {
                setScore(prevScore => prevScore+ 1);
            }
            setCurrent(current + 1);
            setSelected(null);
        } else {
            setScore(prevScore => {
                const finalSc = correctAns ? prevScore + 1 : prevScore;
                setFinal(finalSc);
                return finalSc
            });
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

            {quiz && (
                <div className="mb-3">
                    <h2 className="text-center title-link">{quiz.quiz_title}</h2>
                </div>
            )}
            <Card className="mt-8 quiz-card">
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Form.Group className="mb-3" controlId="questions">
                            <Card.Title as="h2" className="color">
                                {!quiz ? "No Quizzes found" : !thisThis || !thisThis.question ? "Loading..." : `${current + 1}. ${thisThis.question}`}
                            </Card.Title>
                        </Form.Group>
                        {quiz && thisThis && thisThis.multipleChoice && thisThis.multipleChoice.map((chosen, letter) => (
                            <Form.Group className="mb-3" controlId={`chosen-${letter}`} key={letter}>
                                <Form.Control className="text-box" value={chosen} onClick={() => setSelected(letter)} readOnly/>
                            </Form.Group>
                        ))}

                        <Form.Group className="button-wrapper text-end">
                            {quiz && Array.isArray(quiz.questions) && (
                                <Button type="submit" className="mt-2 w-100 button-sm" disabled={selected === null}>
                                    <strong>{current + 1 < quiz.questions.length ? "Next" : "Finish"}</strong>
                                </Button>
                            )}
                        </Form.Group>
                    </div>
                </Form>
            </Card>

            <Modal show={modal} onHide={() => showModal(false)} centered>
                <Modal.Title className="text-center">You Completed Your Quiz!</Modal.Title>
                <Modal.Body className="text-center">
                    <div>
                        <h3>Your Score: {final} / {quiz && Array.isArray(quiz.questions) ? quiz.questions.length : 0}</h3>
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