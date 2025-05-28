import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from "/src/pages/Home";
import Menu from "/src/pages/Menu";
import Order from "/src/pages/Order";

import "./index.css";
import ErrorElement from "./components/ErrorElement.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import EditMenuItem from "./pages/admin/EditMenuItem.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorElement/>,
  },{
    path: "/order",
    element: <Order/>,
  },{
    path: "/menu",
    element: <Menu/>,
  },{
    path: "/admin",
    element: <AdminLogin/>,
  },{
    path: "/admin/dashboard",
    element: <AdminDashboard/>,
  },{
    path: "/admin/menu/:id",
    element: <EditMenuItem/>,
  },{
    path: "*", // Catch-all route for unknown pages
    element: <ErrorElement/>,
  }
]);

const theme = createTheme({
  palette: {
    primary: {
      main: '#040404',
    },
    secondary: {
      main: '#dd3189',
    },
    tertiary: {
      main: '#008751',
    },
  },
  typography: {
    fontFamily: '"Lato", "Caveat", sans-serif',
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>
);
