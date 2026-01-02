import React, { useState, useEffect } from 'react';
import {
    FileText, Calendar, Clock, CheckCircle,
    XCircle, AlertCircle, Search, Sparkles,
    Layout
} from 'lucide-react';
import { applicationApi } from '../../api/api';
import ApplicationCard from '../../components/applications/ApplicationCard';
import { motion } from 'framer-motion';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await applicationApi.getStagiaireApplications();
                setApplications(response.data);
            } catch (error) {
                // Mock applications
                setApplications([
                    { id: 101, offer: { title: 'Full-Stack Developer Intern', company: 'TechSolutions' }, date: 'June 01, 2024', status: 'pending' },
                    { id: 102, offer: { title: 'UI/UX Designer Intern', company: 'Creative Studio' }, date: 'May 28, 2024', status: 'accepted' },
                    { id: 103, offer: { title: 'Mobile Dev Intern', company: 'Nexus Agency' }, date: 'May 15, 2024', status: 'rejected' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const stats = [
        { label: 'Protocols Active', value: applications.length, icon: Layout, color: 'blue' },
        { label: 'Success Clearanced', value: applications.filter(a => a.status === 'accepted').length, icon: CheckCircle, color: 'emerald' },
        { label: 'Pending Response', value: applications.filter(a => a.status === 'pending').length, icon: Clock, color: 'amber' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16">
                    <span className="text-primary-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Candidate Portal</span>
                    <h1 className="text-5xl md:text-6xl font-display font-black text-slate-900 tracking-tighter leading-none mb-4">
                        Application <span className="text-gradient bg-gradient-to-r from-primary-600 to-indigo-600 italic font-medium">Trajectory.</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg">Monitor your internship applications and track your career progression in real-time.</p>
                </div>

                {/* Tracking Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-${stat.color}-600 bg-${stat.color}-50 border border-${stat.color}-100 group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                                <p className="text-3xl font-display font-black text-slate-900 leading-none">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Applications List */}
                <div className="space-y-8">
                    {loading ? (
                        [1, 2, 3].map(i => <div key={i} className="h-40 bg-white rounded-[2rem] border border-slate-100 animate-pulse" />)
                    ) : applications.length > 0 ? (
                        applications.map((app) => (
                            <ApplicationCard key={app.id} application={app} />
                        ))
                    ) : (
                        <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm">
                            <div className="w-20 h-20 bg-slate-50 flex items-center justify-center rounded-full mx-auto mb-8 text-slate-300">
                                <FileText size={40} />
                            </div>
                            <h2 className="text-2xl font-display font-black text-slate-900 mb-4 uppercase tracking-tighter">No Active Protocols</h2>
                            <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Your application pipeline is currently empty. Start exploring opportunities to begin your journey.</p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-primary-600 transition-all active:scale-95"
                            >
                                <Sparkles size={16} /> Discover Opportunities
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyApplications;

