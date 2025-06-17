import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

function ProctectedRoute() {
    const {isLoggedIn} = useSession();
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default ProctectedRoute