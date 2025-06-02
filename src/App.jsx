import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useSubDomain } from './hooks/useSubDomain';
import SignupForm from './components/auth/SignupForm';
import SigninForm from './components/auth/SigninForm';
import Dashboard from './components/dashboard/Dashboard';
import ShopDashboard from './components/dashboard/ShopDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function AppContent() {
    const { isSubdomain } = useSubDomain();

    if (isSubdomain) {
        return (
            <ProtectedRoute>
                <ShopDashboard />
            </ProtectedRoute>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/signin" element={<SigninForm />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
