import { Navigate, Outlet } from "react-router";
import jwt_decode from "jwt-decode";


const ProtectedRoute = (props) => {
    const loggedUserToken = localStorage.getItem("loggedUserToken");
    if (loggedUserToken != null) {
        try {
            const decoded = jwt_decode(loggedUserToken);
            if (Date.now() > (decoded.exp * 1000)) {
                localStorage.removeItem("loggedUserToken");
            }
        } catch (error) {
            localStorage.removeItem("loggedUserToken");
        }
    }

    return (
        loggedUserToken != null ? <Outlet /> : <Navigate to="/signIn" />
    );
}

export default ProtectedRoute;