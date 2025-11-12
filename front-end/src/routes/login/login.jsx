import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import "./login.scss";

function Login() {
    const nav = useNavigate();
    const [userData, setUserData] = useState({
            email: '',
            password: ''
        });

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const URL = import.meta.env.VITE_API_URL
            const api = await fetch(`${URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (api.ok) {
                //alert('User successfully login!')
                const data = await api.json();
                if(data.session?.access_token && data?.user?.id) {
                    sessionStorage.setItem('authToken', data.session.access_token);
                    sessionStorage.setItem('userId', data.user.id);
                }
                nav('/home');
            } else {
                const data = await api.json();
                console.log('Error: ', data)
                alert(data.error || 'User was not logged in!');
            }

        } catch (error) {
            alert('ERROR!User was not logged in! Try again!')
        }
    }

    return(
        <div className="login-wrapper">
            <Card className="login-card">
                <Card.Body>
                    <div className="text-center mb-4 color-sec">
                        <Card.Title className="mb-4" as="h1">QuizBuddy</Card.Title>
                        <Card.Title className="mb-3" as="h2">Welcome Back!</Card.Title>
                        <Card.Subtitle className="mb-2">Please Login by Entering Your Email and Password</Card.Subtitle>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label className="color-sec">Email </Form.Label>
                                <Form.Control 
                                    className="text-box"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    required type="email" 
                                    placeholder=" example@mail.com" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formPassword">
                                <Form.Label className="color-sec">Password </Form.Label>
                                <Form.Control 
                                    className="text-box" 
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    required type="password" 
                                    placeholder=" Password" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-5 button-wrapper">
                                <Button type="submit" className="mt-2 w-100 button-sec">
                                    <strong>Login</strong>
                                </Button>
                            </Form.Group>
                        </div>
                    </Form>
                    <div className="d-flex justify-content-center gap-1">
                        <p className="color">No Account?</p>
                        <Button variant="link" href="/signup" className="button-link">
                            Create Account
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login