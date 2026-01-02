import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, UserPlus, Briefcase, GraduationCap, Check, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'stagiaire',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await register(formData);
        setLoading(false);

        if (result.success) {
            toast.success('Registration successful! Welcome to the network.');
            navigate('/login');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side: Branding & Trust */}
            <div className="hidden lg:flex relative bg-primary-600 items-center justify-center p-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-white/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-900/20 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-10 border border-white/20 shadow-2xl">
                            <UserPlus size={32} />
                        </div>
                        <h2 className="text-5xl font-display font-black leading-tight mb-8">
                            Join the <span className="text-primary-200 text-gradient bg-gradient-to-r from-white to-blue-200">Exclusive</span> Talent Registry.
                        </h2>
                        <div className="space-y-6">
                            {[
                                "Access 500+ premium internship offers",
                                "Direct communication with top companies",
                                "Professional CV management system",
                                "Career growth tracking tools"
                            ].map((text, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors">
                                        <Check size={14} className="text-white" />
                                    </div>
                                    <span className="text-lg font-medium text-primary-50">{text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                                <GraduationCap size={20} />
                            </div>
                            <span className="font-display font-black text-slate-900 tracking-tighter">Tunisie Internships</span>
                        </Link>
                        <h1 className="text-4xl font-display font-black text-slate-900 mb-3 tracking-tight">Create Account</h1>
                        <p className="text-slate-500 font-medium">Select your role and start your professional journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Switcher */}
                        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'stagiaire' })}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.role === 'stagiaire' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <GraduationCap size={16} />
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'company' })}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.role === 'company' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <Briefcase size={16} />
                                Company
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name or Username</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        required
                                        className="input-field pl-14"
                                        placeholder="Bilel Ayari"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        className="input-field pl-14"
                                        placeholder="hello@tunisie.tn"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Account Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="input-field pl-14"
                                        placeholder="••••••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary mt-4"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                            ) : (
                                "Initialize Membership"
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                        <p className="text-slate-500 font-medium text-sm">
                            Already part of the network?{' '}
                            <Link to="/login" className="text-primary-600 font-black uppercase tracking-widest text-[11px] hover:underline ml-1">
                                Sign In →
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;

