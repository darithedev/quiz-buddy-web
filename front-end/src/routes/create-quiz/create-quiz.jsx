import React , { useEffect, useState } from "react";
import { Button, Navbar, Nav, Container, Card, Form } from "react-bootstrap";
import "./create-quiz.scss";

function CreateQuiz() {
    const [title, setTitle] = useState("");
    const [numOfQuestions, setNumOfQuestions] = useState("");
    const [questionsOrg, setQuestionsOrg] = useState("");
    const [quizID, setQuizID] = useState("");

    useEffect(() => {
        const edit = localStorage.getItem('editing');
        if (edit) {
            const quiz = JSON.parse(edit);
            setTitle(quiz.title);
            setNumOfQuestions(quiz.questions.length.toString());
            setQuizID(quiz.id);

            setQuestionsOrg(quiz.createdQuiz);
            localStorage.removeItem('editing');
        }
    }, []);

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

    function quizzes() {
        const getQuizzes = localStorage.getItem("quizzes");
        return getQuizzes ? JSON.parse(getQuizzes) : [];
    }

    function newQuizObject(questions) {
        const newQuiz = quizzes();
        const incrementID = newQuiz.length + 1;
        const quiz = { 
            id: incrementID.toString(),
            title: title.trim(),
            questions,
            createdQuiz: questionsOrg,
        };

        return quiz;
    }

    function updatedQuizObject(questions) {
        const quizUpdate = { 
            id: quizID,
            title: title.trim(),
            questions,
            createdQuiz: questionsOrg,
        };

        return quizUpdate;
    }

    function saveQuiz(questions) {
        const save = newQuizObject(questions);
        const existing = quizzes();

        existing.push(save);
        localStorage.setItem("quizzes", JSON.stringify(existing));
    }

    function updateAQuiz(questions) {
        const update = updatedQuizObject(questions);
        const existing = quizzes();
        const updated = existing.map(q =>
            q.id === quizID ? update : q
        );
        localStorage.setItem("quizzes", JSON.stringify(updated));
    }

    function handleSubmit(e) {
        e.preventDefault();

        try {
            titleAlert();
            maxAlert(); // warns if user 25 >

            const num = Number(numOfQuestions);
            const ques = createQuiz(questionsOrg, num);

            if (quizID) {
                updateAQuiz(ques);
            } else {
                saveQuiz(ques);
            }

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
