import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await login(formData);
        setLoading(false);

        if (result.success) {
            toast.success('Welcome back to the platform!');
            navigate('/');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side: Visual Branding */}
            <div className="hidden lg:flex relative bg-slate-900 items-center justify-center p-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white mb-10 shadow-2xl shadow-primary-600/40">
                            <GraduationCap size={40} />
                        </div>
                        <h1 className="text-6xl font-display font-black text-white leading-[1.1] mb-8">
                            Empowering the next <span className="text-primary-400">Generation</span> of Talent.
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            Join thousands of students and companies shape the future of Tunisia's professional landscape.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-md w-full"
                >
                    <div className="mb-12">
                        <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                                <GraduationCap size={20} />
                            </div>
                            <span className="font-display font-black text-slate-900 tracking-tighter">Tunisie Internships</span>
                        </Link>
                        <h2 className="text-4xl font-display font-black text-slate-900 mb-3 tracking-tight">Sign In</h2>
                        <p className="text-slate-500 font-medium">Access your global internship network dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email or Username</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    required
                                    className="input-field pl-14"
                                    placeholder="john.doe@email.com"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Password</label>
                                <a href="#" className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="input-field pl-14 pr-12"
                                    placeholder="••••••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Authenticate</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-50 text-center">
                        <p className="text-slate-500 font-medium">
                            Don't have an account yet?{' '}
                            <Link to="/register" className="text-primary-600 font-bold hover:text-primary-700 transition-colors underline decoration-2 underline-offset-4">
                                Join the mission
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;

