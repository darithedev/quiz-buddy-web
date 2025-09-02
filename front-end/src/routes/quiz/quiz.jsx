import React from "react";
import "./quiz.scss";

function Quiz() {

    return (
        <div className="quiz-wrapper">
            <h1 className="title">Quiz Page</h1>

            {/*Delete when done. Links for each page*/}
            <a href="/home">Home Page</a>
            <a href="/about">About Page</a>
            <a href="/">Login Page</a> {/*Logout*/}
        </div>
    );
}

export default Quiz;