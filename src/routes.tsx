import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import CreatePost from "./pages/post"
import Profile from "./pages/profile"
import MyPhotos from "./pages/myPhotos"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Error from "./pages/error"
import ProtectedRoutes from "./components/protectedRoutes"

export const routerFile = createBrowserRouter([
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <Error />
            },
            {
                path: "/create-post",
                element: <CreatePost />,
                errorElement: <Error />
            },
            {
                path: "/profile",
                element: <Profile />,
                errorElement: <Error />
            },
            {
                path: "/my-photos",
                element: <MyPhotos />,
                errorElement: <Error />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error />
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <Error />
    },
])

export default routerFile
