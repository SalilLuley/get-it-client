import "./App.css";
import SignIn from "./views/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./views/signUp/SignUp";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
