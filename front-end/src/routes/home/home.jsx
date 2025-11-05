import React, { useState, useEffect } from "react";
import { Button, Navbar, Nav, Container, Modal } from "react-bootstrap";
import "./home.scss";


function Home() {

    const [quizzes, showQuizzes] = useState([]);
    //const [deleteModal, setDeleteModal] = useState(false);
    //const [quizDelete, setQuizDelete] = useState("");

    useEffect(() => { 
        loadQuizzes();
    }, []);

    async function loadQuizzes() {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            return;
        }

        try {
            const apiURL = import.meta.env.VITE_API_URL;

            if (apiURL) {
                console.error('ERROR!! Issue with api URL!!');
                return;
            }

            const api = await fetch(`${apiURL}/api/quizzes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (api.ok) {
                const data = await api.json();
                showQuizzes(data.quizzes || []);
            } else {
                const errorData = await api.json();
                console.error('ERROR!! Quizzes not found! Error: ', errorData.error);
                showQuizzes([]);
            }
        } catch (error) {
            console.error('ERROR!! Quizzes not loaded!', error);
            showQuizzes([]);
        }
    }

    {/* Future feat for updating and deleting quizzes */}
    {/*const deleteWarning = (quiz) => {
        setQuizDelete(quiz);
        setDeleteModal(true);
    };

    const deleteThisQuiz = () => {
        if (quizDelete) {
            const local = localStorage.getItem("quizzes");
            const q = local ? JSON.parse(local) : [];
            const updated = q.filter(qu => qu.id !== quizDelete.id);
            localStorage.setItem("quizzes", JSON.stringify(updated));
            showQuizes(updated);
        }
        setDeleteModal(false);
        setQuizDelete("");
    }

    const updateQuiz = (quiz) => {
        localStorage.setItem("updating", JSON.stringify(quiz));
        window.location.href = "/crete-quiz";
    }*/}

    
    
    return (
        <div className="home-wrapper">
            <Navbar expand="lg" className="d-flex flex-column m-3" fixed="top">
                <Container>
                    <Navbar.Brand href="home" className="m-4 ms-5 title-link">QuizBuddy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="hamburger-menu" />
                    <Navbar.Collapse id="hamburger-menu" className="home-nav-bar">
                        <Nav className="m-4 ms-5">
                            <Nav.Link href="/create-quiz" className="color-secondary">Create a Quiz</Nav.Link>
                            <Nav.Link href="/quiz" className="color-secondary">Take a Quiz</Nav.Link>
                            <Nav.Link href="/about" className="color-secondary">About</Nav.Link>
                            <Nav.Link href="/" className="color-secondary">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="home-content">
                {quizzes.length == 0 ? (
                    <div className="mt-4">
                        <Button href="/create-quiz" type="submit" className="button-primary">
                            <strong>+</strong>
                        </Button>
                    </div>
                ) : (
                    <div>
                        <h3 className="mb-5 title-md">Your Quizzes</h3>
                        {quizzes.map(q => (
                            <div className="mb-3" key={q.id}>
                                <div className="quiz-content">
                                    <Button href={`/quiz?id=${q.id}`} type="button" className="button-primary-md quiz-title-button">
                                        <strong>{q.quiz.title}</strong>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;