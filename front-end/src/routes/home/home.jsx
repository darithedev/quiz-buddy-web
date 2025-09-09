import React from "react";
import { Button } from "react-bootstrap";
import "./home.scss";

function Home() {
    
    return (
        <div className="home-wrapper">
            <div className="header">
                <h1 className="m-4 ms-5 title">QuizBuddy</h1>

                <div className="d-flex flex-column m-3">
                    {/*Delete when done. Links for each page*/}
                    <a href="/create-quiz">Create Quiz Page</a>
                    <a href="/about">About Page</a>
                    <a href="/">Logout</a> {/*Logout*/}
                
                    <a href="/quiz">Quiz Page</a>
                </div>
            </div>
            <div className="home-content">
                <div className="mt-4">
                    <Button href="/create-quiz" type="submit" className="button-primary">
                        <strong>+</strong>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;