import SignIn from "./views/signIn/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./views/signUp/SignUp";
import Dashboard from "./views/dashboard/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
