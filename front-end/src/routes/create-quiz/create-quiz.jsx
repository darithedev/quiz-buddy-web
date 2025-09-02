import React from "react";
import "./create-quiz.scss";

function CreateQuiz() {

    return (
        <div className="createquiz-wrapper">
            <h1 className="title">Create Quiz Page</h1>

            
            {/*Delete when done. Links for each page*/}
            <a href="/home">Home Page</a>
            <a href="/about">About Page</a>
            <a href="/">Login Page</a> {/*Logout*/}
        </div>
    );
}

export default CreateQuiz;
