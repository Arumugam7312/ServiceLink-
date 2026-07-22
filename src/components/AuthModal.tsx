import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  UserCheck,
  ShieldAlert,
  UserPlus,
  LogIn,
  Briefcase,
  User,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  FileText,
  Sparkles
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    authNotice,
    setAuthNotice,
    personas,
    loginPersona,
    registerCustomer,
    registerProvider,
    categories
  } = useApp();

  // Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('');

  // Customer Register State
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhone, setCustPhone] = useState('');

  // Provider Register State
  const [provName, setProvName] = useState('');
  const [provEmail, setProvEmail] = useState('');
  const [provPhone, setProvPhone] = useState('');
  const [provTitle, setProvTitle] = useState('');
  const [provCatId, setProvCatId] = useState(categories[0]?.id || 'cat_electrical');
  const [provRate, setProvRate] = useState(450);
  const [provLocation, setProvLocation] = useState('Chennai, Tamil Nadu');
  const [provBio, setProvBio] = useState('');
  const [provLicense, setProvLicense] = useState('TN Electrical License #TN-2026-90');

  const [registrationSubmittedMsg, setRegistrationSubmittedMsg] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handlePersonaSelectAndLogin = (personaId: string) => {
    const p = personas.find(pers => pers.id === personaId);
    if (p) {
      const success = loginPersona(p);
      if (success) {
        setAuthModalOpen(false);
      }
    }
  };

  const handleCustomerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custEmail.trim()) return;
    registerCustomer({
      name: custName,
      email: custEmail,
      phone: custPhone || '+91 98401 55667'
    });
  };

  const handleProviderRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provName.trim() || !provEmail.trim()) return;

    const catObj = categories.find(c => c.id === provCatId);
    const res = registerProvider({
      name: provName,
      email: provEmail,
      phone: provPhone || '+91 98410 99887',
      title: provTitle || `${catObj?.name || 'Service'} Professional`,
      categoryId: provCatId,
      categoryName: catObj?.name || 'Service',
      location: provLocation,
      hourlyRate: Number(provRate),
      bio: provBio || 'Verified service professional serving Tamil Nadu customers.',
      licenseDoc: provLicense
    });

    if (res.success) {
      setRegistrationSubmittedMsg(res.message);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-900/40 border-b border-slate-800 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>ServiceLink Tamil Nadu Auth Engine</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {authModalMode === 'login' && 'Sign In / Switch Role'}
                {authModalMode === 'register_customer' && 'Create Customer Account'}
                {authModalMode === 'register_provider' && 'Register as Service Provider'}
              </h2>
              <p className="text-xs text-slate-300">
                {authModalMode === 'login' && 'Access your Customer, Service Provider, or Admin Dashboard in Tamil Nadu.'}
                {authModalMode === 'register_customer' && 'Instant access to book top electricians, plumbers & technicians in INR ₹.'}
                {authModalMode === 'register_provider' && 'Submit your trade details & Aadhaar/License for Admin verification.'}
              </p>
            </div>

            <button
              onClick={() => setAuthModalOpen(false)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/50 p-1.5 gap-1.5">
            <button
              onClick={() => { setAuthModalMode('login'); setRegistrationSubmittedMsg(null); }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                authModalMode === 'login'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Demo Switch</span>
            </button>

            <button
              onClick={() => { setAuthModalMode('register_customer'); setRegistrationSubmittedMsg(null); }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                authModalMode === 'register_customer'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>New Customer</span>
            </button>

            <button
              onClick={() => { setAuthModalMode('register_provider'); setRegistrationSubmittedMsg(null); }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                authModalMode === 'register_provider'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Become a Provider</span>
            </button>
          </div>

          {/* Alert / Notice Banner if present */}
          {(authNotice || registrationSubmittedMsg) && (
            <div className="p-4 bg-amber-500/10 border-b border-amber-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200 space-y-1">
                <span className="font-bold block text-amber-300">Role & Approval Notice</span>
                <p>{registrationSubmittedMsg || authNotice}</p>
              </div>
            </div>
          )}

          {/* Modal Content Body */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* --- MODE 1: LOGIN / PERSONA SWITCH --- */}
            {authModalMode === 'login' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-200 mb-1 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-400" />
                    <span>Quick Role Switcher (Pre-configured Demo Accounts)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Select a role to experience the platform from a Customer, Verified Service Provider, or HQ Admin perspective:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {personas.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handlePersonaSelectAndLogin(p.id)}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition group ${
                          p.role === 'admin'
                            ? 'bg-purple-950/30 border-purple-800/50 hover:bg-purple-900/40 hover:border-purple-600'
                            : p.role === 'provider'
                            ? 'bg-emerald-950/30 border-emerald-800/50 hover:bg-emerald-900/40 hover:border-emerald-600'
                            : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-blue-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.avatar}
                            alt={p.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-700"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="block text-xs font-bold text-white truncate group-hover:text-cyan-300">
                              {p.name}
                            </span>
                            <span className="block text-[10px] text-slate-400 truncate capitalize">
                              {p.role === 'provider' ? 'Verified Technician' : p.role}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px]">
                          <span className="text-slate-400">{p.phone}</span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold uppercase tracking-wider">
                            Select &gt;
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Manual Credentials Sign In */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-semibold text-slate-300">Or Login with Registered Email & Password</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        placeholder="e.g. anitha.sundaram@gmail.com"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (loginEmail) {
                        const matched = personas.find(p => p.email.toLowerCase() === loginEmail.toLowerCase());
                        if (matched) {
                          loginPersona(matched);
                        } else {
                          // create custom customer or show alert
                          registerCustomer({ name: 'User', email: loginEmail, phone: '+91 98401 00000' });
                        }
                      }
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Account</span>
                  </button>
                </div>
              </div>
            )}

            {/* --- MODE 2: REGISTER CUSTOMER --- */}
            {authModalMode === 'register_customer' && (
              <form onSubmit={handleCustomerRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={custName}
                      onChange={e => setCustName(e.target.value)}
                      placeholder="e.g. Divya Sethuraman"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={custEmail}
                        onChange={e => setCustEmail(e.target.value)}
                        placeholder="divya@gmail.com"
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Tamil Nadu)</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        value={custPhone}
                        onChange={e => setCustPhone(e.target.value)}
                        placeholder="+91 98401 22334"
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-xl text-[11px] text-blue-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Customer accounts activate instantly with 100% money-back guarantee in INR ₹.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Free Customer Account</span>
                </button>
              </form>
            )}

            {/* --- MODE 3: REGISTER SERVICE PROVIDER --- */}
            {authModalMode === 'register_provider' && (
              <form onSubmit={handleProviderRegister} className="space-y-4">
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-xs text-emerald-300 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Admin Verification Requirement</span>
                    <p className="text-[11px] text-emerald-200/80">
                      Service Provider details are submitted to HQ Admin. Once Admin reviews your Aadhaar/License documents and approves your profile, your provider dashboard will be unlocked!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={provName}
                      onChange={e => setProvName(e.target.value)}
                      placeholder="e.g. K. Karthik"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={provEmail}
                      onChange={e => setProvEmail(e.target.value)}
                      placeholder="karthik.elec@gmail.com"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (+91)</label>
                    <input
                      type="tel"
                      value={provPhone}
                      onChange={e => setProvPhone(e.target.value)}
                      placeholder="+91 98410 77889"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Service Category</label>
                    <select
                      value={provCatId}
                      onChange={e => setProvCatId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={provTitle}
                      onChange={e => setProvTitle(e.target.value)}
                      placeholder="e.g. Master Licensed Electrician"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hourly Rate (₹ INR)</label>
                    <div className="relative">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="number"
                        min={200}
                        max={3000}
                        value={provRate}
                        onChange={e => setProvRate(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Location in Tamil Nadu</label>
                    <input
                      type="text"
                      value={provLocation}
                      onChange={e => setProvLocation(e.target.value)}
                      placeholder="e.g. Anna Nagar, Chennai"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Govt License / Aadhaar Proof</label>
                    <input
                      type="text"
                      value={provLicense}
                      onChange={e => setProvLicense(e.target.value)}
                      placeholder="TN License # or Aadhaar ID"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Experience Summary</label>
                  <textarea
                    rows={2}
                    value={provBio}
                    onChange={e => setProvBio(e.target.value)}
                    placeholder="Describe your trade experience, certifications, and service coverage..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Submit Application for Admin Approval</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
