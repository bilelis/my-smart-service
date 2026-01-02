import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Menu, X, User, LogOut, ChevronDown,
    Bell, Sparkles, GraduationCap, Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout, isStagiaire, isCompany, isAdmin } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Discover', path: '/', show: true },
        { name: 'My Hub', path: '/my-applications', show: isStagiaire },
        { name: 'Enterprise', path: '/company/dashboard', show: isCompany },
        { name: 'Console', path: '/admin/dashboard', show: isAdmin },
    ];

    const isHome = location.pathname === '/';

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
            ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-premium'
            : 'py-6 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary-500/30 group-hover:scale-110 transition-transform">
                            <GraduationCap size={24} />
                        </div>
                        <span className={`text-xl font-display font-black tracking-tighter ${!isScrolled && isHome ? 'text-white' : 'text-slate-900'
                            }`}>
                            Tunisie<span className="text-primary-600">Intern</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.filter(link => link.show).map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary-600 ${!isScrolled && isHome ? 'text-white/70 underline-offset-8 hover:text-white' : 'text-slate-400'
                                    } ${location.pathname === link.path ? 'text-primary-600 !text-primary-600' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <div className="flex items-center gap-6">
                                <button className={`relative p-2 rounded-xl transition-all ${!isScrolled && isHome ? 'text-white/60 hover:bg-white/10' : 'text-slate-400 hover:bg-slate-50'
                                    }`}>
                                    <Bell size={20} />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white" />
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className={`flex items-center gap-3 p-1.5 rounded-2xl border transition-all ${!isScrolled && isHome
                                            ? 'bg-white/10 border-white/20 hover:bg-white/20'
                                            : 'bg-white border-slate-100 hover:border-primary-200 shadow-sm'
                                            }`}
                                    >
                                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="text-left hidden lg:block">
                                            <p className={`text-[10px] font-black leading-none mb-1 uppercase tracking-widest ${!isScrolled && isHome ? 'text-white' : 'text-slate-900'
                                                }`}>{user.name}</p>
                                            <p className="text-[8px] text-primary-400 font-bold uppercase tracking-widest leading-none">
                                                {user.role} Clearanced
                                            </p>
                                        </div>
                                        <ChevronDown size={14} className={`${!isScrolled && isHome ? 'text-white/40' : 'text-slate-400'}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-premium border border-slate-50 p-3 overflow-hidden"
                                            >
                                                <div className="p-4 border-b border-slate-50 mb-2">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated Email</p>
                                                    <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                                                </div>
                                                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
                                                    <User size={18} className="text-primary-600" />
                                                    Personal Profile
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    <LogOut size={18} />
                                                    Terminate Session
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/login"
                                    className={`text-[10px] font-black uppercase tracking-widest transition-all ${!isScrolled && isHome ? 'text-white hover:text-primary-400' : 'text-slate-600 hover:text-primary-600'
                                        }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-500/30 transition-all active:scale-95"
                                >
                                    Join Network
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-xl transition-all ${!isScrolled && isHome ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-100'
                                }`}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <div className="px-6 pt-6 pb-12 space-y-4">
                            {navLinks.filter(link => link.show).map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {!user && (
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                    <Link to="/login" className="flex items-center justify-center py-4 rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600">Login</Link>
                                    <Link to="/register" className="flex items-center justify-center py-4 rounded-2xl bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest">Join</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

