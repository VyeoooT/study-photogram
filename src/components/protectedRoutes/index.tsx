import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth } from "firebase/auth"

function ProtectedRoutes() {
    const auth = getAuth()
    const [user, loading] = useAuthState(auth)
    const location = useLocation()

    if (loading) {
        return (
            <div>...loading</div>
        )
    }

    return (
        user ? (<Outlet />) : (<Navigate to={"/login"} state={{ from: location }} />)
    )
}

export default ProtectedRoutes
