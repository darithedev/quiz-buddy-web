import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./login.scss";

function Login() {

    return(
        <div className="login-wrapper">
            <Card className="login-card">
                <Card.Body>
                    <div className="text-center mb-4 color-sec">
                        <Card.Title className="mb-4"as="h1">QuizBuddy</Card.Title>
                        <Card.Title className="mb-3" as="h2">Welcome Back!</Card.Title>
                        <Card.Subtitle className="mb-2">Please Login by Entering Your Username and Password</Card.Subtitle>
                    </div>
                    <Form>
                        <Form.Group className="mb-3" controlId="formUser">
                            <Form.Label className="color-sec">User Name </Form.Label>
                            <Form.Control className="text-box" required type="user" placeholder=" User Name" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formPassword">
                            <Form.Label className="color-sec">Password </Form.Label>
                            <Form.Control className="text-box" required type="password" placeholder=" Password" />
                        </Form.Group>
                        <Button href="/home" type="submit" className="w-100 mb-5 button-sec">
                            <strong>Login</strong>
                        </Button>
                    </Form>
                    <Button variant="link" href="/signup" className="button-link">
                        Create Account
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login