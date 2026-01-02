import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-white/5 pt-20 pb-10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-600" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary-500/30 group-hover:rotate-12 transition-transform">
                                <GraduationCap size={24} />
                            </div>
                            <span className="text-2xl font-display font-black text-white tracking-tighter">
                                Tunisie<span className="text-primary-600">Intern</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                            The definitive gateway for Tunisia's academic elite to connect with global tech leaders and innovative startups. Forge your path.
                        </p>
                        <div className="flex gap-4">
                            {[Linkedin, Facebook, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 hover:border-primary-500 transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation - Students */}
                    <div>
                        <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-10 opacity-50">Student Ecosystem</h4>
                        <ul className="space-y-5">
                            <li><Link to="/" className="text-slate-400 hover:text-primary-400 text-xs font-black uppercase tracking-widest transition-all">Opportunity Hub</Link></li>
                            <li><Link to="/profile" className="text-slate-400 hover:text-primary-400 text-xs font-black uppercase tracking-widest transition-all">Digital Resume</Link></li>
                            <li><Link to="/my-applications" className="text-slate-400 hover:text-primary-400 text-xs font-black uppercase tracking-widest transition-all">Tracking Control</Link></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary-400 text-xs font-black uppercase tracking-widest transition-all">Skill Validation</a></li>
                        </ul>
                    </div>

                    {/* Navigation - Enterprise */}
                    <div>
                        <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-10 opacity-50">Enterprise Access</h4>
                        <ul className="space-y-5">
                            <li><Link to="/company/dashboard" className="text-slate-400 hover:text-primary-400 text-xs font-black uppercase tracking-widest transition-all">Publish Protocol</Link></li>
                            <li><Link to="/company/dashboard" className="text-slate-400 hover:text-primary-400 text-xs font-black uppercase tracking-widest transition-all">Talent Pipeline</Link></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary-400 text-xs font-black uppercase tracking-widest transition-all">Brand Authority</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary-400 text-xs font-black uppercase tracking-widest transition-all">Global Analytics</a></li>
                        </ul>
                    </div>

                    {/* Contact - Registry */}
                    <div>
                        <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-10 opacity-50">Registry Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Send Inquiry</p>
                                    <p className="text-xs font-black text-white uppercase tracking-widest">contact@tunisieintern.tn</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
                                    <Phone size={16} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Direct Line</p>
                                    <p className="text-xs font-black text-white uppercase tracking-widest">+216 71 000 000</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        © 2024 Tunisie Intern. Engineered for the next generation of Tunisian excellence.
                    </p>
                    <div className="flex gap-10">
                        <a href="#" className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all">Security Protocol</a>
                        <a href="#" className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all">Data Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

