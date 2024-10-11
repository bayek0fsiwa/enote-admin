import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import NotesPage from "./pages/NotesPage";


const router = createBrowserRouter([

    {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "notes",
                element: <NotesPage />,
            },
        ],
    },
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "register",
        element: <RegisterPage />
    },
])

export default router;
