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
import OrderDetailsPage from "./views/detail/Detail";
import Settings from "./views/settings/Settings";
import OwnerAddParking from "./views/owners/addParking/AddParking";
import Footer from "./views/footer/Footer";

const defaultTheme = createTheme();

const SidebarLayout = () => (
  <>
    <ResponsiveDrawer />
    <Outlet />
    <Footer
      description="Now never think about finding a parking space"
      title="Parko"
    />
  </>
);

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.DEFAULT} element={<PrivateRoute />}></Route>
          <Route element={<SidebarLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROFILE} element={<Profile />}></Route>
            <Route path={ROUTES.DETAIL} element={<OrderDetailsPage />}></Route>
            <Route path={ROUTES.SETTINGS} element={<Settings />}></Route>
            <Route path={ROUTES.OWNER} element={<OwnerAddParking />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
