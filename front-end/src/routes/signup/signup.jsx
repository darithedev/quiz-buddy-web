import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./signup.scss";

function SignUp() {

    return (
        <div className="login-wrapper">
            <Card className="signup-card">
                <Card.Body>
                    <div className="text-center color">
                        <Card.Title className="mb-4" as="h1">Create Your Account</Card.Title>
                    </div>
                    <Form>
                        <div className="ms-4">
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label className="color">Full Name</Form.Label>
                            <Form.Control className="text-box" required type="text" placeholder=" Jane Shmane" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label className="color">Email</Form.Label>
                            <Form.Control className="text-box" required type="email" placeholder=" example@mail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userName">
                            <Form.Label className="color">User Name</Form.Label>
                            <Form.Control className="text-box" placeholder=" example123" />
                        </Form.Group>
                        </div>
                        <div className="d-flex ms-4 gap-5">
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label className="color-sec">Password </Form.Label>
                                <Form.Control className="text-box" required type="password" placeholder=" Password321" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPasswordRepeat">
                                <Form.Label className="color-sec">Repeat Password </Form.Label>
                                <Form.Control className="text-box" required type="password" placeholder=" Password321" />
                            </Form.Group>
                        </div>
                    </Form>
                    <div className="mt-4 button-flex-center">
                            <Button href="/home" type="submit" className="w-100 mb-5 button">
                                <strong>Create</strong>
                            </Button>
                    </div>
                    <div className="d-flex justify-content-center gap-1">
                        <p className="color">Already Created?</p>
                        <Button variant="link" href="/" className="button-link">
                            Login Account
                        </Button>
                    </div>
                </Card.Body>

            </Card>
        </div>
    );
}

export default SignUp;