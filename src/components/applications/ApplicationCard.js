import React from 'react';
import {
    Calendar, CheckCircle, XCircle,
    AlertCircle, Building2, ArrowRight,
    Building, Sparkles, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const ApplicationCard = ({ application, onAction }) => {
    const getStatusStyles = (status) => {
        switch (status) {
            case 'accepted': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/10';
            case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20 shadow-red-500/10';
            default: return 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-amber-500/10';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'accepted': return <CheckCircle size={14} />;
            case 'rejected': return <XCircle size={14} />;
            default: return <Clock size={14} className="animate-spin-slow" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-premium transition-all duration-500"
        >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                {/* Information Side */}
                <div className="flex items-start gap-8">
                    <div className="relative">
                        <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-700 shadow-sm ring-4 ring-transparent group-hover:ring-primary-100">
                            <Building size={40} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg border border-slate-50 flex items-center justify-center text-amber-500">
                            <Sparkles size={14} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-4">
                            <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight leading-none group-hover:text-primary-600 transition-colors">
                                {application.offer?.title || 'Internship Position'}
                            </h3>
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border flex items-center gap-2 shadow-sm ${getStatusStyles(application.status)}`}>
                                {getStatusIcon(application.status)}
                                {application.status}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                            <div className="flex items-center gap-2.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                <Building2 size={16} className="text-primary-500" />
                                <span className="text-slate-600">{application.offer?.company || 'Company Name'}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                <Calendar size={16} className="text-primary-500" />
                                <span className="text-slate-600">Decision pending since {application.date}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Side */}
                <div className="flex items-center gap-4 lg:pl-10 lg:border-l border-slate-50">
                    {application.status === 'pending' && (
                        <button
                            onClick={() => onAction && onAction(application.id, 'withdraw')}
                            className="px-8 py-3.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
                        >
                            Withdraw
                        </button>
                    )}
                    <button className="flex items-center justify-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10">
                        View Hub <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ApplicationCard;

