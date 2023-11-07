import SignIn from "./views/signIn/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./views/signUp/SignUp";
import Dashboard from "./views/dashboard/Dashboard";
import PrivateRoute from "./route/PrivateRoute";
import { ROUTES } from "./route/Constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.DEFAULT} element={<PrivateRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
