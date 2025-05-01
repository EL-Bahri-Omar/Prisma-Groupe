import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isSuperAdmin, isAdmin, ...rest }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);

    if (loading) return null; // Show nothing while loading

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAdmin && !['admin', 'super'].includes(user.role)) {
        return <Navigate to="/" />;
    }

    if (isSuperAdmin && user?.role !== "super") {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
