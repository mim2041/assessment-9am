import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";


const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if(loading) {
        return <div className="flex items-center justify-center h-screen">
            <LoadingSpinner size="lg" />
        </div>;
    }

    if(!user) {
        return <Navigate to="/signin" replace state={{ message: "You must be logged in to access this page." }} />;
    }

    
    return children;
}

export default ProtectedRoute;