import { createBrowserRouter } from "react-router-dom";
import { BlissFieldsPage } from "../pages/blissFields/BlissFieldsPage.jsx";
import { RegisterPage } from "../pages/register/RegisterPage.jsx";
import { NotePage } from "../pages/notes/notePage.jsx";
import { LoginPage } from "../pages/login/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/notes",
    element: <NotePage />,
  },
  {
    path: "/blissfields",
    element: <BlissFieldsPage />,
  },
]);

export default router;
