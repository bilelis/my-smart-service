import React, { useState, useEffect } from 'react';
import { offerApi } from '../../api/api';
import OfferCard from '../../components/offers/OfferCard';
import { Search, SlidersHorizontal, Sparkles, Filter, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BrowseOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await offerApi.getAll();
                setOffers(response.data);
            } catch (error) {
                console.error('Core Network Error:', error);
                toast.error('Failed to link with internship registry. Please refresh.');
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    const categories = ['All', 'Engineering', 'Design', 'Marketing', 'Business', 'Healthcare'];

    const filteredOffers = offers.filter(offer => {
        const title = offer.title || '';
        const companyName = offer.company_name || offer.company?.name || 'Partner Company';
        const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            companyName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || offer.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen pb-20 bg-slate-50">
            {/* Premium Hero Section */}
            <div className="relative bg-slate-900 pt-32 pb-48 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <Sparkles size={14} /> 500+ New Opportunities
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter leading-none">
                            Find your dream <br />
                            <span className="text-gradient bg-gradient-to-r from-primary-400 to-indigo-400 italic font-medium">Internship</span> today.
                        </h1>
                    </motion.div>

                    {/* Search Bar Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto mt-12 px-4"
                    >
                        <div className="relative flex items-center p-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl">
                            <div className="flex-grow relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Company, role, or keywords..."
                                    className="w-full bg-transparent border-none text-white focus:ring-0 pl-16 py-5 font-bold placeholder:text-white/30"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${isFilterOpen ? 'bg-primary-600 text-white shadow-glow' : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                <SlidersHorizontal size={18} />
                                <span>Refine</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                {/* Advanced Filters Overlay */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium p-8 mb-12"
                        >
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                                    <Filter size={20} className="text-primary-600" /> Advanced Parameters
                                </h3>
                                <button onClick={() => setIsFilterOpen(false)} className="text-slate-400 hover:text-slate-900">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="grid md:grid-cols-4 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Industry Domain</label>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Location Type</label>
                                    <select className="input-field py-2 text-sm">
                                        <option>All Locations</option>
                                        <option>Tunis</option>
                                        <option>Sousse</option>
                                        <option>Remote</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Stipend Range</label>
                                    <select className="input-field py-2 text-sm">
                                        <option>Any Pay</option>
                                        <option>Paid Only</option>
                                        <option>400 DT+</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Duration</label>
                                    <select className="input-field py-2 text-sm">
                                        <option>Any Length</option>
                                        <option>3 Months</option>
                                        <option>6 Months</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Offer Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] aspect-[4/5] border border-slate-100 animate-pulse" />
                        ))
                    ) : filteredOffers.length > 0 ? (
                        filteredOffers.map((offer, i) => (
                            <motion.div
                                key={offer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <OfferCard service={offer} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                                <Search size={40} />
                            </div>
                            <h3 className="text-2xl font-display font-black text-slate-900 mb-2 tracking-tighter uppercase">No matches discovered</h3>
                            <p className="text-slate-500 font-medium">Try adjusting your filters or search terms for broader results.</p>
                        </div>
                    )}
                </div>

                {/* Top Companies Section */}
                <div className="mt-32 pt-20 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-display font-black text-slate-900 tracking-tighter uppercase">Top Hiring Partners</h2>
                        <button className="btn-ghost">View All Partners</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {['Vermeg', 'Instadeep', 'Expensya', 'Talan', 'Sopra Steria', 'Actia'].map((company) => (
                            <div key={company} className="h-24 bg-white rounded-3xl border border-slate-50 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                                <span className="font-display font-black text-slate-300 text-xl italic">{company}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How it Works Section */}
                <div className="mt-32 bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-white">
                    <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 block">The Flow</span>
                            <h2 className="text-4xl lg:text-5xl font-display font-black mb-8 leading-tight tracking-tighter">Your career kickstart in <br /> 4 simple steps.</h2>
                            <div className="space-y-12">
                                {[
                                    { step: '01', title: 'Curate your Profile', desc: 'Create a professional presence that demands attention.' },
                                    { step: '02', title: 'Discover Roles', desc: 'Browse curated internship offers from Tunisia\'s top tech hubs.' },
                                    { step: '03', title: 'Instant Application', desc: 'Send your application directly to HR with a single click.' },
                                    { step: '04', title: 'Status Tracking', desc: 'Monitor your application status in real-time from your hub.' }
                                ].map((step) => (
                                    <div key={step.step} className="flex gap-6">
                                        <span className="text-4xl font-display font-black text-white/10">{step.step}</span>
                                        <div>
                                            <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                                            <p className="text-slate-400 font-medium">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-primary-600 to-indigo-600 shadow-glow flex items-center justify-center p-12">
                                <GraduationCap size={160} className="text-white/20 absolute top-[-20%] right-[-20%]" />
                                <div className="relative z-10 text-center">
                                    <p className="text-6xl font-display font-black mb-4 tracking-tighter">85%</p>
                                    <p className="text-xl font-medium text-primary-100">Success rate for <br /> our students.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowseOffers;
