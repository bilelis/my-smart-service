import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layouts/RouteGuards';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Stagiaire Pages
import BrowseOffers from './pages/stagiaire/BrowseOffers';
import OfferDetails from './pages/stagiaire/OfferDetails';
import MyApplications from './pages/stagiaire/MyApplications';
import Profile from './pages/stagiaire/Profile';

// Company/Admin Pages
import CompanyDashboard from './pages/company/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<BrowseOffers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/offers/:id" element={<OfferDetails />} />

              {/* Stagiaire Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['stagiaire', 'admin']} />}>
                <Route path="/my-applications" element={<MyApplications />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Company Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['company', 'admin']} />}>
                <Route path="/company/dashboard" element={<CompanyDashboard />} />
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
