import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  User,
  Bell,
  Sparkles,
  ChevronDown,
  LayoutDashboard,
  Calendar,
  Briefcase,
  SlidersHorizontal,
  CheckCircle2,
  X,
  LogIn,
  UserPlus,
  LogOut,
  HelpCircle,
  Info,
  PhoneCall,
  Home,
  FileCheck,
  AlertTriangle,
  IndianRupee,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    currentPersona,
    setCurrentPersona,
    personas,
    isAuthenticated,
    logout,
    setAuthModalOpen,
    setAuthModalMode,
    activeTab,
    setActiveTab,
    notifications,
    setBookingModalOpen,
    setAiModalOpen
  } = useApp();

  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const unreadCount = notifications.filter(
    n => !n.read && (currentPersona ? (n.roleTarget === currentPersona.role || n.roleTarget === 'guest') : n.roleTarget === 'guest')
  ).length;

  const currentRole = currentPersona?.role || 'guest';

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Active Role Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (currentRole === 'customer') setActiveTab('customer');
              else if (currentRole === 'provider') setActiveTab('provider');
              else if (currentRole === 'admin') setActiveTab('admin');
              else setActiveTab('home');
            }}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Wrench className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  ServiceLink
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-500/20 text-cyan-400 border border-cyan-500/30 rounded-md">
                  TN
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Tamil Nadu's Verified SaaS Service Marketplace</p>
            </div>
          </button>
        </div>

        {/* Dynamic Role-Based Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80">
          
          {/* CUSTOMER ROLE NAVIGATION */}
          {currentRole === 'customer' && (
            <>
              <button
                onClick={() => setActiveTab('customer')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'customer'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                <span>My Customer Hub</span>
              </button>

              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'home'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-blue-400" />
                <span>Browse Marketplace</span>
              </button>

              <button
                onClick={() => setAiModalOpen(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-300 hover:bg-purple-950/50 flex items-center gap-1.5 transition border border-purple-800/40"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>AI Home Diagnoser</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'about'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>About</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'contact'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contact</span>
              </button>
            </>
          )}

          {/* PROVIDER ROLE NAVIGATION */}
          {currentRole === 'provider' && (
            <>
              <button
                onClick={() => setActiveTab('provider')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'provider'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-300" />
                <span>Provider Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('provider');
                  setTimeout(() => {
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }, 100);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center gap-1.5 transition"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Incoming Job Leads</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('provider');
                  setTimeout(() => {
                    window.scrollTo({ top: 900, behavior: 'smooth' });
                  }, 100);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center gap-1.5 transition"
              >
                <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>License Verification</span>
              </button>

              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'home'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-blue-400" />
                <span>Public Marketplace</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'about'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>About</span>
              </button>
            </>
          )}

          {/* ADMIN ROLE NAVIGATION */}
          {currentRole === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'admin'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-indigo-300" />
                <span>Admin Governance Suite</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('admin');
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center gap-1.5 transition"
              >
                <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Provider Approvals Queue</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('admin');
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center gap-1.5 transition"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Dispute Resolution</span>
              </button>

              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'home'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-blue-400" />
                <span>Public Marketplace</span>
              </button>
            </>
          )}

          {/* GUEST / UNAUTHENTICATED NAVIGATION */}
          {currentRole === 'guest' && (
            <>
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'home'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('home');
                  const el = document.getElementById('category-grid-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center gap-1.5 transition"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                <span>Services</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'about'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>About Us</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'contact'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contact</span>
              </button>
            </>
          )}

        </nav>

        {/* Right Actions & Persona / Auth Menu */}
        <div className="flex items-center gap-2">
          
          {/* AI Advisor Button */}
          <button
            onClick={() => setAiModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-400 text-purple-200 text-xs font-semibold transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>AI Advisor</span>
          </button>

          {/* Become a Provider CTA */}
          <button
            onClick={() => {
              setAuthModalMode('register_provider');
              setAuthModalOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-600/40 hover:bg-emerald-900/40 text-emerald-300 text-xs font-semibold transition"
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>Provide Service</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifMenuOpen(!notifMenuOpen);
                setPersonaMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 relative transition"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-slate-100">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-semibold text-sm">Notifications</h3>
                  </div>
                  <button
                    onClick={() => setNotifMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">No notifications yet.</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-xs transition"
                      >
                        <div className="flex items-center justify-between font-semibold text-slate-200">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Active Role & Persona Switcher */}
          {isAuthenticated && currentPersona ? (
            <div className="relative">
              <button
                onClick={() => {
                  setPersonaMenuOpen(!personaMenuOpen);
                  setNotifMenuOpen(false);
                }}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs text-left transition shadow-md"
              >
                <img
                  src={currentPersona.avatar}
                  alt={currentPersona.name}
                  className="w-7 h-7 rounded-lg object-cover ring-2 ring-blue-500/40"
                />
                <div className="hidden sm:block">
                  <div className="font-semibold text-slate-200 text-xs leading-none">
                    {currentPersona.name}
                  </div>
                  <div className="text-[10px] text-cyan-400 font-bold capitalize mt-0.5 flex items-center gap-1">
                    <span>Role: {currentPersona.role === 'customer' ? 'Customer' : currentPersona.role === 'provider' ? 'Verified Pro' : 'Admin HQ'}</span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {personaMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-slate-100 space-y-3">
                  <div className="px-1 pb-2 border-b border-slate-800">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Active User Session
                    </p>
                    <div className="flex items-center gap-2.5 mt-2">
                      <img
                        src={currentPersona.avatar}
                        alt={currentPersona.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-cyan-500/30"
                      />
                      <div>
                        <div className="font-bold text-sm text-white">{currentPersona.name}</div>
                        <div className="text-xs text-cyan-400 font-semibold capitalize">{currentPersona.role} Role</div>
                        <p className="text-[10px] text-slate-400 truncate">{currentPersona.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      Switch Role & Persona
                    </p>
                    {personas.map(persona => {
                      const isSelected = persona.id === currentPersona.id;
                      return (
                        <button
                          key={persona.id}
                          onClick={() => {
                            setCurrentPersona(persona);
                            setPersonaMenuOpen(false);
                            // Automatically adapt active screen and navigation to role
                            if (persona.role === 'customer') setActiveTab('customer');
                            else if (persona.role === 'provider') setActiveTab('provider');
                            else if (persona.role === 'admin') setActiveTab('admin');
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                            isSelected
                              ? 'bg-blue-600/20 border-blue-500/60 text-white'
                              : 'bg-slate-800/40 hover:bg-slate-800 border-transparent text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={persona.avatar}
                              alt={persona.name}
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-semibold text-xs">{persona.name}</div>
                              <div className="text-[10px] text-cyan-400 capitalize font-medium">
                                {persona.role === 'customer' ? '👤 Customer' : persona.role === 'provider' ? '🛠️ Verified Pro' : '🛡️ Admin HQ'}
                              </div>
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setAuthModalMode('login');
                        setAuthModalOpen(true);
                        setPersonaMenuOpen(false);
                      }}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition text-center"
                    >
                      Auth Modal
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setPersonaMenuOpen(false);
                      }}
                      className="flex-1 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 text-xs font-semibold text-rose-300 transition flex items-center justify-center gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Switch Role</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Role Navigation Mobile Bar */}
      <div className="lg:hidden flex items-center justify-around bg-slate-950 border-t border-slate-800 px-2 py-2 text-[11px] gap-1 overflow-x-auto">
        {currentRole === 'customer' && (
          <>
            <button
              onClick={() => setActiveTab('customer')}
              className={`flex-1 py-1.5 px-2 text-center font-bold rounded-lg whitespace-nowrap ${activeTab === 'customer' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-900'}`}
            >
              Customer Hub
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex-1 py-1.5 px-2 text-center font-bold rounded-lg whitespace-nowrap ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-900'}`}
            >
              Browse
            </button>
          </>
        )}

        {currentRole === 'provider' && (
          <>
            <button
              onClick={() => setActiveTab('provider')}
              className={`flex-1 py-1.5 px-2 text-center font-bold rounded-lg whitespace-nowrap ${activeTab === 'provider' ? 'bg-emerald-600 text-white' : 'text-slate-300 bg-slate-900'}`}
            >
              Provider Hub
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex-1 py-1.5 px-2 text-center font-bold rounded-lg whitespace-nowrap ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-900'}`}
            >
              Marketplace
            </button>
          </>
        )}

        {currentRole === 'admin' && (
          <>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-1.5 px-2 text-center font-bold rounded-lg whitespace-nowrap ${activeTab === 'admin' ? 'bg-purple-600 text-white' : 'text-slate-300 bg-slate-900'}`}
            >
              Admin HQ
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex-1 py-1.5 px-2 text-center font-bold rounded-lg whitespace-nowrap ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-900'}`}
            >
              Marketplace
            </button>
          </>
        )}

        {currentRole === 'guest' && (
          <>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex-1 py-1.5 px-2 text-center font-bold rounded-lg whitespace-nowrap ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-900'}`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-1.5 px-2 text-center font-bold rounded-lg whitespace-nowrap ${activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-900'}`}
            >
              About
            </button>
          </>
        )}

        <button
          onClick={() => {
            setAuthModalMode('login');
            setAuthModalOpen(true);
          }}
          className="flex-1 py-1.5 px-2 text-center font-bold rounded-lg bg-indigo-600 text-white whitespace-nowrap"
        >
          Switch Role
        </button>
      </div>
    </header>
  );
};

