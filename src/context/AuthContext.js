import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const formatError = (error) => {
        const detail = error.response?.data?.detail;
        if (typeof detail === 'string') return detail;
        if (Array.isArray(detail)) {
            return detail.map(err => `${err.loc.join('.')}: ${err.msg}`).join('\n');
        }
        return 'An unexpected error occurred. Please try again.';
    };

    const login = async (credentials) => {
        try {
            // Attempt real login first
            const response = await authService.login(credentials);
            const { access_token, user } = response.data;

            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: formatError(error)
            };
        }
    };

    const register = async (userData) => {
        try {
            await authService.register(userData);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: formatError(error)
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const isAdmin = user?.role === 'admin';
    const isCompany = user?.role === 'company';
    const isStagiaire = user?.role === 'stagiaire';

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register, isAdmin, isCompany, isStagiaire }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
