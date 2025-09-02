import React from "react";
import "./login.scss";

function Login() {

    return(
        <div className="login-wrapper">
            <h1 className="title">Login Page</h1>
            <h1 className="title">Welcome Back!</h1>
            {/*<h3 className="color">Please Enter Your Username and Password</h3>*/}
            
            {/*Delete when done. Links for each page*/}
            <a href="/signup">Sign Up Page</a>
            <a href="/home">Home Page</a>
        </div>
    );
}

export default Login