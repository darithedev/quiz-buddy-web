import React from "react";
import "./about-me.scss";

function AboutMe () {

    return (
        <div className="about-wrapper">
            <h1 className="title">About Me page</h1>

            {/*Delete when done. Links for each page*/}
            <a href="/home">Home Page</a>
            <a href="/create-quiz">Create Quiz Page</a>
            <a href="/">Login Page</a> {/*Logout*/}
        </div>
    );
}

export default AboutMe;