import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesPage from "./pages/NotesPage";
import CreateNote from "./pages/CreateNote";


const router = createBrowserRouter([

    {
        path: '/dashboard',
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
            {
                path: "notes/create",
                element: <CreateNote />,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
        ],
    },
])

export default router;
