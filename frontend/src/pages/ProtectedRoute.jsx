import { Navigate } from "react-router-dom";
import { useAuth } from "../conext/AuthContext";

export default function ProtectedRoute({children}){
    const {isAuth} = useAuth();
    return isAuth ? children : <Navigate to={"/login"} />;
}