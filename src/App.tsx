import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryGrid } from './components/CategoryGrid';
import { ProviderCard } from './components/ProviderCard';
import { ProviderSkeletonGrid } from './components/ProviderSkeletonGrid';
import { FaqSection } from './components/FaqSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ProviderDetailModal } from './components/ProviderDetailModal';
import { BookingFlowModal } from './components/BookingFlowModal';
import { AiDiagnosticsModal } from './components/AiDiagnosticsModal';
import { CustomerDashboard } from './components/CustomerDashboard';
import { ProviderDashboard } from './components/ProviderDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { DigitalInvoiceModal } from './components/DigitalInvoiceModal';
import { ChatDrawer } from './components/ChatDrawer';
import { ReviewModal } from './components/ReviewModal';
import { DisputeModal } from './components/DisputeModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';
import {
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Search,
  User,
  Image,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Briefcase,
  LayoutDashboard,
  Home,
  Check,
  LayoutGrid,
  List,
  ArrowUpDown
} from 'lucide-react';

const AVATAR_PRESETS = [
  {
    name: 'Customer (South Asian Homeowner)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Service Pro (Technician with Tools)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Admin HQ (General Manager)',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Pro Cleaner (Kavitha)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'AC Engineer (Ramesh)',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300'
  }
];

const MainContent: React.FC = () => {
  const {
    currentPersona,
    activeTab,
    setActiveTab,
    providers,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    categories,
    setAiModalOpen,
    updatePersonaAvatar,
    setAuthModalOpen,
    setAuthModalMode
  } = useApp();

  const [showImagePicker, setShowImagePicker] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [isFetchingProviders, setIsFetchingProviders] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'rating_desc' | 'rate_asc' | 'distance_asc' | 'experience_desc'>('rating_desc');

  // Trigger brief skeleton loading on refresh or filter change
  const handleRefreshProviders = () => {
    setIsFetchingProviders(true);
    setTimeout(() => {
      setIsFetchingProviders(false);
    }, 850);
  };

  // Filter Providers
  const filteredProviders = providers
    .filter(p => {
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        const matchesBio = p.bio.toLowerCase().includes(q);
        return matchesName || matchesTitle || matchesCat || matchesBio;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating_desc') return b.rating - a.rating;
      if (sortBy === 'rate_asc') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'distance_asc') return a.distanceKm - b.distanceKm;
      if (sortBy === 'experience_desc') return b.experienceYears - a.experienceYears;
      return 0;
    });

  const role = currentPersona?.role || 'guest';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white antialiased">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <HeroSection />
            <CategoryGrid />

            {/* Providers List Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>Verified Professional Network</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-50 tracking-tight flex items-center gap-3">
                    <span>Available Local Professionals</span>
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full">
                      {filteredProviders.length} Active
                    </span>
                  </h2>
                </div>

                {/* Toolbar Controls: Refresh, Sort, View Mode */}
                <div className="flex items-center flex-wrap gap-2.5">
                  {/* Refresh Button - Triggers Skeleton Loading */}
                  <button
                    onClick={handleRefreshProviders}
                    disabled={isFetchingProviders}
                    className="px-3 py-1.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition shadow-sm disabled:opacity-50"
                    title="Simulate live fetch to test custom skeleton loading screen"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isFetchingProviders ? 'animate-spin' : ''}`} />
                    <span>{isFetchingProviders ? 'Fetching Pros...' : 'Refresh Network'}</span>
                  </button>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-slate-400 font-medium hidden sm:inline">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as any)}
                      className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="rating_desc" className="bg-slate-900 text-slate-100">Top Rated ⭐</option>
                      <option value="rate_asc" className="bg-slate-900 text-slate-100">Lowest Price (₹)</option>
                      <option value="distance_asc" className="bg-slate-900 text-slate-100">Nearest Distance (km)</option>
                      <option value="experience_desc" className="bg-slate-900 text-slate-100">Most Experienced</option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition ${
                        viewMode === 'grid'
                          ? 'bg-blue-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Grid Layout"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition ${
                        viewMode === 'list'
                          ? 'bg-blue-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="List Layout"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Clear Filter buttons */}
                  {(selectedCategory !== 'all' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Grid or Skeleton Loader */}
              {isFetchingProviders ? (
                <ProviderSkeletonGrid count={6} viewMode={viewMode} />
              ) : filteredProviders.length === 0 ? (
                <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
                  <Search className="w-10 h-10 text-slate-600 mx-auto" />
                  <h3 className="font-bold text-white text-base">No Professionals Match Filter</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try clearing your search query or selecting a different service category.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                    >
                      Show All Pros
                    </button>
                    <button
                      onClick={() => setAiModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-purple-900/80 text-purple-200 border border-purple-700/60 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                      <span>Ask AI Advisor</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                  {filteredProviders.map(provider => (
                    <ProviderCard key={provider.id} provider={provider} viewMode={viewMode} />
                  ))}
                </div>
              )}
            </section>

            {/* Frequently Asked Questions */}
            <FaqSection />
          </div>
        )}

        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'contact' && <ContactSection />}
        {activeTab === 'customer' && <CustomerDashboard />}
        {activeTab === 'provider' && <ProviderDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Modals & Drawers */}
      <AuthModal />
      <ProviderDetailModal />
      <BookingFlowModal />
      <AiDiagnosticsModal />
      <DigitalInvoiceModal />
      <ChatDrawer />
      <ReviewModal />
      <DisputeModal />
      <ToastContainer />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

