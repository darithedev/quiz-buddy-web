import { Route, Routes } from "react-router-dom";
import './App.css'
import AboutMe from "./routes/aboute-me/about-me";
import CreateQuiz from "./routes/create-quiz/create-quiz";
import Home from "./routes/home/home";
import Login from "./routes/login/login";
import Quiz from "./routes/quiz/quiz";
import SignUp from "./routes/signup/signup";


function App() {

  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-quiz" element={<CreateQuiz/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/aboute-me" element={<AboutMe/>}/>
    </Routes>
  );
}

export default App
