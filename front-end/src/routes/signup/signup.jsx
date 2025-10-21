import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./signup.scss";

function SignUp() {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        userName: '',
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
            const URL = import.meta.env.API_URL
            const api = await fetch(`${URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

        } catch (error) {
            alert('ERROR! Account was not created. Please try again.')
        }
    }

    return (
        <div className="login-wrapper">
            <Card className="signup-card">
                <Card.Body>
                    <div className="text-center color">
                        <Card.Title className="mb-4" as="h1">Create Your Account</Card.Title>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <Form.Group className="mb-3">
                                <Form.Label className="color">Full Name</Form.Label>
                                <Form.Control
                                    name="fullName"
                                    value={userData.fullName}
                                    onChange={handleChange}
                                    className="text-box" 
                                    required type="text" 
                                    placeholder=" Jane Shmane" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="color">Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className="text-box" 
                                    required type="email" 
                                    placeholder=" example@mail.com" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="color">User Name</Form.Label>
                                <Form.Control
                                    name="userName"
                                    value={userData.userName}
                                    onChange={handleChange}
                                    className="text-box" 
                                    placeholder=" example123" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label className="color-sec">Password </Form.Label>
                                <Form.Control
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    className="text-box" 
                                    required type="password" 
                                    placeholder=" Password321" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-5 button-wrap">
                                <Button href="/" type="submit" className="mt-3 w-100 button">
                                    <strong>Create</strong>
                                </Button>
                            </Form.Group>
                        </div>
                    </Form>
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
};

export default SignUp;