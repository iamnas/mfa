import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/Verify2FA";
import ProctectedRoute from "./components/ProctectedRoute";


const routes = createBrowserRouter([

    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />,
    },
    {
        path: "/register",
        element: <LoginPage />,
        errorElement: <Error />,
    },
    {
        element: <ProctectedRoute />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                errorElement: <Error />,
            },
            {
                path: "/2fa",
                element: <div>2FA</div>,
                errorElement: <Error />,
            },
            {
                path: "/setup-2fa",
                element: <Setup2FA />,
                errorElement: <Error />,
            },
            {
                path: "/verify-2fa",
                element: <Verify2FA />,
                errorElement: <Error />,
            },
        ]

    },

])


export default routes;