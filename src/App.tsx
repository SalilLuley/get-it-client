import SignIn from "./views/signIn/SignIn";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SignUp from "./views/signUp/SignUp";
import Dashboard from "./views/dashboard/Dashboard";
import PrivateRoute from "./route/PrivateRoute";
import { ROUTES } from "./route/Constants";
import { ThemeProvider, createTheme } from "@mui/material";
import ResponsiveDrawer from "./views/sidebar/Sidebar";
import Profile from "./views/profile/profile";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0074d9",
    },
    secondary: {
      main: "#b10dc9",
    },
  },
});

const SidebarLayout = () => (
  <>
    <ResponsiveDrawer />
    <Outlet />
  </>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.DEFAULT} element={<PrivateRoute />}></Route>
        </Routes>
        <div className="screen-container">
          <Routes>
            <Route element={<SidebarLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.PROFILE} element={<Profile />}></Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
