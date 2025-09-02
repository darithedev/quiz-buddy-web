import React from "react";
import "./home.scss";

function Home() {
    
    return (
        <div className="home-wrapper">
            <h1 className="title">Home Page</h1>

            {/*Delete when done. Links for each page*/}
            <a href="/create-quiz">Create Quiz Page</a>
            <a href="/about">About Page</a>
            <a href="/">Login Page</a> {/*Logout*/}
            
            <a href="/quiz">Quiz Page</a>
        </div>
    );
}

export default Home;