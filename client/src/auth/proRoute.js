import React from 'react';
import { Route } from 'react-router';

export const ProtectedRoute = ({ Component, ...props }) => {
    return <Route {...props} component={Component} />
}



