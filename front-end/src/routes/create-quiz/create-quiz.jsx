import React , { useState, useEffect } from "react";
import { Button, Navbar, Nav, Container, Card, Form } from "react-bootstrap";
import "./create-quiz.scss";

function CreateQuiz() {
    const [title, setTitle] = useState("");
    const [numOfQuestions, setNumOfQuestions] = useState("");
    const [questionsOrg, setQuestionsOrg] = useState("");
    const [quizID, setQuizID] = useState("");

    useEffect(() => {
        const url = new URLSearchParams(window.location.search);
        const editId = url.get('edit');

        if (editId) {
            setQuizID(editId);
            quizEditMode(editId);
        }
    }, []);

    async function quizEditMode(quizId) {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            return;
        }

        try {
            const apiURL = import.meta.env.VITE_API_URL;

            if(!apiURL) {
                console.error('ERROR!! issue with URL');
                return;
            }

            const api = await fetch(`${apiURL}/api/quizzes?id=${quizId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (api.ok) {
                const data = await api.json();
                const quiz = data.quiz;
                setTitle(quiz.quiz_title);
                setNumOfQuestions(quiz.num_questions.toString());
                setQuestionsOrg(quiz.created_quiz_editor);
            }
        } catch (error) {
            console.error('ERROR!! Quiz not loading in edit mode! Error: ', error);
        }
    }

    function createQuiz(questions, numQuestions) {
        const questionsArr = [];
        const split = questions.split('\n');
        const splitArr = [];
        let thisQuest = "";

        for (let i = 0; i < split.length; i++) {
            let thisLine = split[i].trim();
            if(thisLine) {
                splitArr.push(thisLine);
            }
        }

        for (let j = 0; j < splitArr.length; j++) {
            let thisLine = splitArr[j];

            if (thisLine.match(/^\d+\./)) {
                if (thisQuest) {
                    questionsArr.push(thisQuest);
                }

                const questionQuiz = thisLine.replace(/^\d+\.\s*/, "").trim();
                thisQuest = {
                    question: questionQuiz,
                    multipleChoice: [],
                    noAnsYet: -1
                };
            } else if (thisQuest) {
                if (thisLine.includes('(')) {
                    const rightAnswer = thisLine.replace(/^\([a-eA-E]\.?\)\s*/, "").trim();
                    thisQuest.multipleChoice.push(rightAnswer);
                    thisQuest.correctAnsIndex = thisQuest.multipleChoice.length - 1; 
                } else {
                    const answer = thisLine.replace(/^[a-eA-E]\.\s*/, "").trim();
                    thisQuest.multipleChoice.push(answer);
                }
            }
        }
        
        // Quick fix because last question wasnt getting saved
        if (thisQuest) {
            questionsArr.push(thisQuest);
        }

        if (numQuestions && questionsArr.length !== Number(numQuestions)) {
            throw new Error(`
                ERROR!! You entered ${numQuestions} but you really have ${questionsArr.length} 
                in the textbox. Please enter the correct amount of questions.
            `);
        }

        if (questionsArr.length > 25) {
            throw new Error("ERROR! You entered more than 25 questions!");
        }

        return questionsArr;
    }

    // Alerts for incorrect title and max number of questions (25 >)
    function titleAlert() {
        if (!title.trim()) {
            throw new Error("ERROR!! Quiz title missing.");
        }
    }
    function maxAlert() {
        const max = Number(numOfQuestions);
        if (!Number.isInteger(max) || max < 1 || max > 25) {
            throw new Error("ERROR! You entered more than 25 questions!");
        }
    }

    async function quizSave(questions) {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            throw new Error('Error!! Not authorized!! Please login!');
        }

        const apiURL = import.meta.env.VITE_API_URL;

        if(!apiURL) {
            throw new Error('ERROR!! issue with URL');
        }

        const method = quizID ? 'PUT' : 'POST';
        const endPoint = quizID ? `${apiURL}/api/quizzes?id=${quizID}` : `${apiURL}/api/quizzes`;
        const api = await fetch(endPoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title.trim(),
                questions: questions,
                count: Number(numOfQuestions),
                created_quiz_editor: questionsOrg
            })
        });

        if (!api.ok) {
            const data = await api.json();
            throw new Error(data.error || `ERROR!! Quiz was not ${quizID ? 'updated' : 'created'} !`);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            titleAlert();
            maxAlert(); // warns if user 25 >

            const num = Number(numOfQuestions);
            const ques = createQuiz(questionsOrg, num);

            await quizSave(ques);

            window.location.href = "/home";
        } catch (error) {
            alert(error.message || "ERROR!! Quiz was not created. Please try again.")
        }   
    } 


    return (
        <div className="create-wrapper">
            <Navbar expand="lg" className="d-flex flex-column m-3" fixed="top">
                <Container>
                    <Navbar.Brand href="home" className="m-4 ms-5 title-link">{quizID ? "Edit your Quiz" : "Create your Quiz"}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="hamburger-menu" />
                    <Navbar.Collapse id="hamburger-menu" className="create-nav-bar">
                        <Nav className="m-4 ms-5">
                            <Nav.Link href="/home" className="color-secondary">Home</Nav.Link>
                            <Nav.Link href="/quiz" className="color-secondary">Take Quiz</Nav.Link>
                            <Nav.Link href="/about" className="color-secondary">About</Nav.Link>
                            <Nav.Link href="/" className="color-secondary">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Card className="mt-8 create-card">
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label className="color">Quiz Title</Form.Label>
                            <Form.Control className="text-box" required type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="count">
                            <Form.Label className="color">Number of Questions (Max 25)</Form.Label>
                            <Form.Control className="text-box" required type="number" value={numOfQuestions} onChange={(e) => setNumOfQuestions(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="questions">
                            <Form.Label className="color">
                                Questions - Multiple Choice - Add '()' to correct answer. EX: (B.)
                            </Form.Label>
                            <Form.Control className="text-box-lg" as="textarea" rows={8} value={questionsOrg} onChange={(e) => setQuestionsOrg(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="button-wrapper text-end">
                            <Button type="submit" className="mt-2 w-100 button-sm">
                                <strong>{quizID ? "Update" : "Create"}</strong>
                            </Button>
                        </Form.Group>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default CreateQuiz;
