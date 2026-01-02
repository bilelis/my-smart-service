import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield, Calendar, MapPin, Briefcase, FileCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '../../api/api';
import { toast } from 'react-hot-toast';

/**
 * Profile component for Stagiaires to view and manage their personal information.
 */
const Profile = () => {
    const { user, login } = useAuth(); // Assuming login or updateUser exists in context
    const [uploading, setUploading] = React.useState(false);

    if (!user) return null;

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const response = await authService.uploadCV(file);
            toast.success('CV Uploaded successfully!');
            // Update user state if possible, or just refresh page
            window.location.reload();
        } catch (error) {
            toast.error('Failed to upload CV');
        } finally {
            setUploading(false);
        }
    };
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden"
            >
                {/* Header/Cover Gradient */}
                <div className="h-40 bg-gradient-to-r from-primary-600 to-indigo-600"></div>

                <div className="px-8 pb-12 relative">
                    {/* Avatar */}
                    <div className="absolute -top-16 left-8">
                        <div className="w-32 h-32 rounded-[2rem] bg-white p-2 shadow-xl">
                            <div className="w-full h-full bg-primary-100 rounded-[1.5rem] flex items-center justify-center text-primary-600 text-4xl font-black">
                                {user.username?.charAt(0).toUpperCase() || user.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-display font-black text-slate-900 mb-1">{user.name || user.username}</h1>
                            <p className="text-slate-500 font-medium flex items-center gap-2">
                                <Shield size={16} className="text-primary-500" />
                                {user.role.toUpperCase()} Account
                            </p>
                        </div>
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-primary-500/20">
                            Edit Profile
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Account Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Email Address</p>
                                        <p className="font-bold text-slate-700">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Full Name</p>
                                        <p className="font-bold text-slate-700">{user.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Professional Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Joined Date</p>
                                        <p className="font-bold text-slate-700">January 2024</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        <Briefcase size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Education</p>
                                        <p className="font-bold text-slate-700">Engineering Student</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <h4 className="font-black text-slate-900 mb-4">Resume / CV</h4>
                        <div
                            className={`relative overflow-hidden flex items-center justify-between border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer group ${user.cv_url ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:border-primary-300 hover:bg-primary-50/30'
                                }`}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                onChange={handleFileUpload}
                                accept=".pdf,.doc,.docx"
                                disabled={uploading}
                            />
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center ${user.cv_url ? 'text-emerald-600' : 'text-primary-600'} group-hover:scale-110 transition-transform`}>
                                    {uploading ? <Loader2 className="animate-spin" size={24} /> : user.cv_url ? <FileCheck size={24} /> : <Briefcase size={24} />}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-700">
                                        {uploading ? 'Uploading...' : user.cv_url ? 'CV Uploaded' : 'Upload your latest CV'}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {user.cv_url ? 'Click to replace your current CV' : 'PDF, DOC (max 2MB)'}
                                    </p>
                                </div>
                            </div>
                            {user.cv_url && !uploading && (
                                <a
                                    href={`http://localhost:8000${user.cv_url}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="relative z-20 bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-100 shadow-sm hover:bg-emerald-600 hover:text-white transition-all"
                                >
                                    View CV
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
