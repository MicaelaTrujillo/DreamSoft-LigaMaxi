import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({isAllowed}) => {
    return isAllowed ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoute;