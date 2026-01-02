import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/api';
import {
    Users, Briefcase, FileText, Search,
    MoreVertical, Trash2, Shield,
    UserCircle, Mail, Sparkles, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 124, companies: 42, offers: 86, applications: 312 });
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('users');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, appsRes] = await Promise.all([
                    adminApi.getUsers(),
                    adminApi.getApplications()
                ]);
                setUsers(usersRes.data);
                setApplications(appsRes.data);
            } catch (error) {
                toast.error('Failed to synchronize with central intelligence. Please check your connection.');
                console.error('API Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Terminate this user account permanently?')) return;
        try {
            await adminApi.deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
            toast.success('User terminated successfully');
        } catch (error) {
            toast.error('Failed to terminate user');
        }
    };

    const statCards = [
        { label: 'Network Citizens', value: stats.users, icon: Users, color: 'blue' },
        { label: 'Enterprise Partners', value: stats.companies, icon: Shield, color: 'indigo' },
        { label: 'Active Opportunities', value: stats.offers, icon: Briefcase, color: 'emerald' },
        { label: 'Total Protocols', value: stats.applications, icon: FileText, color: 'amber' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-primary-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Central Intelligence</span>
                        <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">System Control Center</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Global search..."
                                className="input-field py-2.5 pl-11 text-sm min-w-[300px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    {statCards.map((card, i) => (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl p-6 border border-slate-100 flex items-center justify-between"
                        >
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                                <p className="text-3xl font-display font-black text-slate-900">{card.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-${card.color}-600 bg-${card.color}-50 border border-${card.color}-100 shadow-sm`}>
                                <card.icon size={24} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Management Tab Interface */}
                <div className="flex flex-col gap-8">
                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit border border-slate-200 shadow-sm">
                        {['users', 'applications', 'companies', 'offers'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden">
                        <AnimatePresence mode="wait">
                            {activeTab === 'users' && (
                                <motion.div
                                    key="users-table"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                >
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identified User</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Registry Email</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Clearance Role</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Protocol</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {users.map(user => (
                                                <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
                                                                <UserCircle size={24} />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black text-slate-900">{user.name}</p>
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ID: 00{user.id}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                                                            <Mail size={14} className="text-slate-300" /> {user.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100 ${user.role === 'admin' ? 'bg-red-50 text-red-600' :
                                                            user.role === 'company' ? 'bg-indigo-50 text-indigo-600' :
                                                                'bg-emerald-50 text-emerald-600'
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                                                                <MoreVertical size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}

                            {activeTab === 'applications' && (
                                <motion.div
                                    key="apps-table"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                >
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate Info</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Offer</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Registry Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {applications.map(app => (
                                                <tr key={app.id} className="hover:bg-slate-50/30 transition-colors">
                                                    <td className="px-8 py-6">
                                                        <p className="text-sm font-black text-slate-900">{app.student}</p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-sm font-medium text-slate-600">{app.offer}</p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100 ${app.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                            app.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                                                'bg-amber-50 text-amber-600 border-amber-100'
                                                            }`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right font-bold text-[11px] text-slate-400 uppercase tracking-widest">
                                                        {app.date}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
