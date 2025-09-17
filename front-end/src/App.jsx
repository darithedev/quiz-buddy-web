import { Route, Routes } from "react-router-dom";
import AboutMe from "./routes/about/about";
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
        <Route path="/about" element={<AboutMe/>}/>
    </Routes>
  );
}

export default App
