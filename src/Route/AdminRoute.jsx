import { Navigate } from "react-router-dom";
import { setInitializing, setUser } from "../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase.config";
import { useGetSingleUserQuery } from "../redux/api/baseApi";

const AdminRoute = ({ children }) => {
    const { email, isInitializing } = useSelector((state) => state.userSlice);
    
    // Skip the query entirely if the email is not yet available
    const { 
        data: isAdmin, 
        isLoading: isRoleLoading, 
        isFetching: isRoleFetching 
    } = useGetSingleUserQuery(email, { skip: !email });
    
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    setUser({
                        name: user?.displayName,
                        email: user?.email,
                    })
                );
                dispatch(setInitializing({ isInitializing: false }));
            } else {
                // Let the JSX handle the redirect to /login naturally
                dispatch(
                    setUser({
                        name: null,
                        email: null,
                    })
                );
                dispatch(setInitializing({ isInitializing: false }));
            }
        });

        return unsubscribe; // Cleanup on unmount
    }, [dispatch]);

    // Show loading spinner if auth is initializing OR if we have an email and are actively fetching/loading the role
    if (isInitializing || (email && (isRoleLoading || isRoleFetching))) {
        return (
            <div className="h-screen min-h-[500px] w-full flex justify-center items-center">
                <div className="loader">
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                </div>
            </div>
        );
    }

    // Grant access if the user is logged in and verified as an admin
    if (email && isAdmin?.role === "admin") {
        return children;
    }

    // Default redirect to login if loading finishes and they aren't authorized
    return <Navigate to="/login" replace />;
};

export default AdminRoute;