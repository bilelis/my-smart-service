import React, { useState, useEffect } from 'react';
import {
    Plus, Briefcase, Users, FileText, TrendingUp,
    MoreVertical, Edit2, Trash2, CheckCircle, XCircle,
    Building2, MapPin, Sparkles, Search, ArrowUpRight
} from 'lucide-react';
import { offerApi, applicationApi } from '../../api/api';
import OfferForm from '../../components/offers/OfferForm';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const CompanyDashboard = () => {
    const [offers, setOffers] = useState([]);
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState({ activeOffers: 0, totalApplicants: 0, pendingReview: 0 });
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);

    const fetchData = async () => {
        try {
            const [offersRes, appsRes] = await Promise.all([
                offerApi.getCompanyOffers(),
                applicationApi.getCompanyApplications()
            ]);
            setOffers(offersRes.data);
            setApplications(appsRes.data);

            setStats({
                activeOffers: offersRes.data.length,
                totalApplicants: appsRes.data.length,
                pendingReview: appsRes.data.filter(a => a.status === 'pending').length
            });
        } catch (error) {
            toast.error('Failed to sync recruitment hub metrics.');
            console.error('Recruitment Sync Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteOffer = async (id) => {
        if (!window.confirm('Terminate this internship protocol? This action is irreversible.')) return;
        try {
            await offerApi.delete(id);
            toast.success('Protocol terminated successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to terminate protocol');
        }
    };

    const handleUpdateStatus = async (appId, status) => {
        try {
            await applicationApi.updateStatus(appId, status);
            toast.success(`Candidate ${status}`);
            fetchData();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
                    <div>
                        <span className="text-primary-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Enterprise Dashboard</span>
                        <h1 className="text-5xl md:text-6xl font-display font-black text-slate-900 tracking-tighter leading-none mb-4">
                            Your Talent <span className="text-gradient bg-gradient-to-r from-primary-600 to-indigo-600 italic font-medium">Pipeline.</span>
                        </h1>
                        <p className="text-slate-500 font-medium max-w-xl text-lg">Manage your internship protocols and filter through Tunisia\'s top academic talent.</p>
                    </div>
                    <button
                        onClick={() => { setEditingOffer(null); setIsFormOpen(true); }}
                        className="group flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-primary-600 active:scale-95 shadow-2xl shadow-slate-900/20"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                        Initiate Protocol
                    </button>
                </div>

                {/* Statistics Panel */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        { label: 'Active Protocols', value: stats.activeOffers, icon: Briefcase, color: 'primary' },
                        { label: 'Total Candidates', value: stats.totalApplicants, icon: Users, color: 'indigo' },
                        { label: 'Pending Review', value: stats.pendingReview, icon: Sparkles, color: 'amber' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card !rounded-[2.5rem] p-10 flex items-center justify-between group"
                        >
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                                <p className="text-5xl font-display font-black text-slate-900 leading-none">{stat.value}</p>
                            </div>
                            <div className={`w-16 h-16 rounded-[1.5rem] bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-600 border border-${stat.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon size={28} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Offers Management */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-premium">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-display font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                                    <TrendingUp className="text-primary-600" /> Management Registry
                                </h2>
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={16} />
                                    <input type="text" placeholder="Filter protocols..." className="input-field py-2 pl-12 text-xs w-48" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                {offers.map((offer) => (
                                    <div key={offer.id} className="group flex items-center justify-between p-8 rounded-[2rem] bg-slate-50 border border-transparent hover:border-primary-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm border border-slate-100 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                                                <Building2 size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-display font-black text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">{offer.title}</h3>
                                                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5"><MapPin size={12} /> {offer.location}</span>
                                                    <span className="flex items-center gap-1.5"><Users size={12} /> {offer.applicants || 0} Candidates</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => { setEditingOffer(offer); setIsFormOpen(true); }}
                                                className="p-3 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all"
                                            >
                                                <Edit2 size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOffer(offer.id)}
                                                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                            <button className="p-3 text-slate-400 hover:text-slate-900 bg-white shadow-sm border border-slate-100 rounded-2xl hover:shadow-md transition-all">
                                                <ArrowUpRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {offers.length === 0 && (
                                    <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                            <FileText size={32} />
                                        </div>
                                        <h3 className="text-xl font-display font-black text-slate-900 mb-2 uppercase tracking-tighter">No Protocols Found</h3>
                                        <p className="text-slate-400 font-medium">Start building your pipeline by initiating a new internship protocol.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Applicants Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-glow h-full text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 rounded-full blur-[80px] opacity-20" />

                            <div className="relative z-10">
                                <h2 className="text-white font-display font-black text-2xl mb-10 flex items-center gap-3 uppercase tracking-tighter">
                                    <Sparkles size={24} className="text-primary-400" /> Recruitment Hub
                                </h2>

                                <div className="space-y-6">
                                    {applications.map((app) => (
                                        <div key={app.id} className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all group">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-primary-600/20 text-primary-400 border border-primary-500/20 rounded-2xl flex items-center justify-center font-black text-lg">
                                                        {app.user.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-black text-sm tracking-tight leading-none mb-1">{app.user.name}</p>
                                                        <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">{app.offer.title}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${app.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    app.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                        'bg-red-500/10 text-red-400 border-red-500/20'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </div>

                                            {app.status === 'pending' && (
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleUpdateStatus(app.id, 'accepted')}
                                                        className="flex-grow flex items-center justify-center gap-2 py-3 bg-white text-slate-900 hover:bg-primary-400 hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg"
                                                    >
                                                        <CheckCircle size={14} /> Screen +
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(app.id, 'rejected')}
                                                        className="flex-grow flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-red-500 text-slate-400 hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all"
                                                    >
                                                        <XCircle size={14} /> Deny
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {applications.length === 0 && (
                                        <div className="text-center py-20 opacity-30">
                                            <Users size={48} className="mx-auto mb-4" />
                                            <p className="text-sm font-black uppercase tracking-widest">Awaiting Candidates</p>
                                        </div>
                                    )}
                                </div>
                                <button className="w-full mt-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10 transition-all">
                                    Archive Recruitment History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isFormOpen && (
                        <OfferForm
                            offer={editingOffer}
                            onClose={() => setIsFormOpen(false)}
                            onSuccess={() => { setIsFormOpen(false); fetchData(); }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CompanyDashboard;

