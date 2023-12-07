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
import MyOrders from "./views/myorders/MyOrders";
import MyOrdersOwner from "./views/owners/addParking/myordersowner/MyOrdersOwner";

const defaultTheme = createTheme();

const SidebarLayout = () => (
  <>
    <ResponsiveDrawer />
    <Outlet />
    {/* <Footer
      description="Now never think about finding a parking space"
      title="Parko"
    /> */}
  </>
);

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<PrivateRoute />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.DEFAULT} element={<PrivateRoute />}></Route>
          <Route element={<SidebarLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROFILE} element={<Profile />}></Route>
            <Route path={ROUTES.DETAIL} element={<OrderDetailsPage />}></Route>
            <Route path={ROUTES.SETTINGS} element={<Settings />}></Route>
            <Route
              path={ROUTES.MY_PARKING_SLOTS}
              element={<OwnerAddParking />}
            ></Route>
            <Route path={ROUTES.MYORDERS} element={<MyOrders />}></Route>
            <Route
              path={ROUTES.ONGOING_ORDERS}
              element={<MyOrdersOwner />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
