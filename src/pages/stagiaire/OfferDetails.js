import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPin, Building2, Calendar, Clock, Star,
    CheckCircle, ShieldCheck, MessageCircle, ArrowLeft,
    Monitor, Briefcase, GraduationCap, Globe, Mail
} from 'lucide-react';
import { offerApi, applicationApi } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const OfferDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isStagiaire } = useAuth();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await offerApi.getById(id);
                setOffer(response.data);
            } catch (error) {
                console.error('Core Registry Failure:', error);
                toast.error('Could not retrieve specific offer data.');
            } finally {
                setLoading(false);
            }
        };
        fetchOffer();
    }, [id]);

    const handleApply = async () => {
        if (!user) {
            toast.error('Please login to apply');
            navigate('/login');
            return;
        }

        if (!isStagiaire) {
            toast.error('Only students/interns can apply for offers');
            return;
        }

        setIsApplying(true);
        try {
            await applicationApi.apply({ offer_id: id });
            toast.success('Application submitted successfully!');
            navigate('/my-applications');
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to submit application protocol.');
        } finally {
            setIsApplying(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Image Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={offer.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div className="absolute top-8 left-4 sm:left-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-white/10 backdrop-blur-md text-white p-3 rounded-2xl hover:bg-white/20 transition-all border border-white/10"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>

                <div className="absolute bottom-12 left-0 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <span className="bg-primary-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-6 inline-block shadow-lg shadow-primary-600/20">
                                {offer.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
                                {offer.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/80">
                                <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                                    <Building2 size={18} className="text-primary-400" />
                                    {offer.company_name || offer.company?.name || 'Partner Company'}
                                </div>
                                <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                                    <MapPin size={18} className="text-primary-400" />
                                    {offer.location}
                                </div>
                                <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                                    <div className="flex text-amber-400">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill={i <= 4 ? 'currentColor' : 'none'} />)}
                                    </div>
                                    <span className="text-white font-black">4.8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Highlights */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-display font-black text-slate-900 mb-8 flex items-center gap-3">
                                <Briefcase className="text-primary-600" />
                                Offer Overview
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</p>
                                    <p className="font-bold text-slate-900">Internship</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                                    <p className="font-bold text-slate-900">{offer.duration}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stipend</p>
                                    <p className="font-bold text-slate-900">{offer.price}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mode</p>
                                    <p className="font-bold text-slate-900">On-site</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-display font-black text-slate-900 mb-8">Role Description</h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-10 whitespace-pre-line">
                                {offer.description}
                            </p>

                            <h3 className="text-xl font-display font-black text-slate-900 mb-6">Key Learning Aspects</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {offer.features?.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                                        <span className="font-bold text-slate-700 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Application Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-slate-100">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                        <p className="text-2xl font-display font-black text-emerald-600">Accepting Now</p>
                                    </div>
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold">
                                        <ShieldCheck size={24} />
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between py-3 border-b border-slate-50">
                                        <span className="text-slate-500 font-medium">Start Date</span>
                                        <span className="font-bold text-slate-900">Immediate</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-slate-50">
                                        <span className="text-slate-500 font-medium">Vacancies</span>
                                        <span className="font-bold text-slate-900">03 Open</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleApply}
                                    disabled={isApplying}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary-500/30 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm"
                                >
                                    {isApplying ? 'Submitting...' : 'Submit Application'}
                                </button>

                                <p className="text-center text-[11px] text-slate-400 font-bold mt-4 uppercase tracking-tighter">
                                    Fast response within 48 hours
                                </p>
                            </div>

                            {/* Company Info */}
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-sm">
                                <h3 className="text-white font-display font-black text-xl mb-6 flex items-center gap-3">
                                    <Building2 className="text-primary-400" />
                                    About Company
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary-400">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Website</p>
                                            <p className="text-white font-bold text-sm tracking-tight">{offer.company_info?.website}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary-400">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">HR Contact</p>
                                            <p className="text-white font-bold text-sm tracking-tight">{offer.company_info?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferDetails;
