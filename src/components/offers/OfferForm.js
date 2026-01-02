import React, { useState } from 'react';
import { X, Save, Plus, Trash2, MapPin, Clock, Briefcase, GraduationCap } from 'lucide-react';
import { offerApi } from '../../api/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const OfferForm = ({ offer, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: offer?.title || '',
        description: offer?.description || '',
        price: offer?.price || '', // Internship stipend
        category: offer?.category || 'Software Engineering',
        duration: offer?.duration || '4-6 Months',
        location: offer?.location || 'Tunis, Berges du Lac',
        features: offer?.features || [''],
    });

    const categories = [
        'Software Engineering',
        'Digital Marketing',
        'Finance & Accounting',
        'UI/UX Design',
        'Human Resources',
        'Data Science',
        'Cybersecurity',
        'Mobile Development'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (offer?.id) {
                await offerApi.update(offer.id, formData);
                toast.success('Offer updated successfully');
            } else {
                await offerApi.create(formData);
                toast.success('Offer posted successfully');
            }
            onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to save offer');
        } finally {
            setLoading(false);
        }
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-premium overflow-hidden border border-slate-100"
            >
                <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h2 className="text-2xl font-display font-black text-slate-900 leading-tight">
                            {offer ? 'Edit Internship Position' : 'Post New Internship'}
                        </h2>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Fill in the role details</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-all text-slate-400 hover:text-slate-600 shadow-sm">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Position Title</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary-500 font-bold text-slate-900 placeholder:font-normal"
                                placeholder="e.g. Full-Stack Developer Intern"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Domain / Category</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary-500 font-bold text-slate-900 appearance-none"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Role Description</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary-500 font-bold text-slate-900 placeholder:font-normal resize-none"
                            placeholder="Describe the tasks, responsibilities and what the intern will learn..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stipend (DT/mo)</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary-500 font-bold text-slate-900"
                                placeholder="Paid / 400 DT"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary-500 font-bold text-slate-900"
                                placeholder="e.g. 4-6 Months"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary-500 font-bold text-slate-900"
                                placeholder="e.g. Tunis, Lac 1"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Learning Perks</label>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="text-primary-600 hover:text-primary-700 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5"
                            >
                                <Plus size={14} /> Add Perk
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex gap-3">
                                    <input
                                        type="text"
                                        className="flex-grow bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 text-sm font-bold text-slate-700"
                                        placeholder="e.g. Mentorship by Senior Lead"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    />
                                    {formData.features.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-50 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-grow py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-grow-[2] bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-primary-500/30 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save size={18} />
                                    {offer ? 'Update Offer' : 'Publish Offer'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default OfferForm;
