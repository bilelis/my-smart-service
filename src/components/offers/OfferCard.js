import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Building2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const OfferCard = ({ service }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-premium transition-all duration-500 h-full flex flex-col"
        >
            {/* Image & Badge Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={service.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                        {service.category || "General"}
                    </span>
                    {service.price === 'Paid' && (
                        <span className="px-4 py-1.5 rounded-full bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-600/20 flex items-center gap-1.5 w-fit">
                            <Sparkles size={12} /> Featured
                        </span>
                    )}
                </div>

                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-[0.2em] bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 w-fit">
                        <MapPin size={12} className="text-primary-400" />
                        {service.location}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-500">
                        <Building2 size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">
                        {service.company_name || service.company?.name || 'Partner Company'}
                    </span>
                </div>

                <h3 className="text-xl font-display font-black text-slate-900 mb-4 group-hover:text-primary-600 transition-colors line-clamp-2 min-h-[3.5rem] tracking-tight">
                    {service.title}
                </h3>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Clock size={16} className="text-primary-500" />
                            <span className="text-xs font-bold uppercase tracking-widest">{service.duration}</span>
                        </div>
                    </div>

                    <Link
                        to={`/offers/${service.id}`}
                        className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-all active:scale-90 shadow-lg shadow-slate-900/10"
                    >
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default OfferCard;
