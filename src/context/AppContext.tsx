import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserPersona,
  ServiceCategory,
  ProviderProfile,
  Booking,
  Review,
  Dispute,
  NotificationItem,
  Role,
  BookingStatus,
  VerificationStatus
} from '../types';
import { INITIAL_PERSONAS, FAQS } from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Auth state
  currentPersona: UserPersona | null;
  setCurrentPersona: (persona: UserPersona | null) => void;
  personas: UserPersona[];
  isAuthenticated: boolean;
  
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register_customer' | 'register_provider';
  setAuthModalMode: (mode: 'login' | 'register_customer' | 'register_provider') => void;
  authNotice: string | null;
  setAuthNotice: (notice: string | null) => void;

  // Login & Registration actions
  loginPersona: (persona: UserPersona) => boolean;
  logout: () => void;
  registerCustomer: (data: { name: string; email: string; phone: string }) => UserPersona;
  registerProvider: (data: {
    name: string;
    email: string;
    phone: string;
    title: string;
    categoryId: string;
    categoryName: string;
    location: string;
    hourlyRate: number;
    bio: string;
    licenseDoc?: string;
  }) => { success: boolean; message: string; providerId?: string };

  categories: ServiceCategory[];
  providers: ProviderProfile[];
  bookings: Booking[];
  reviews: Review[];
  disputes: Dispute[];
  notifications: NotificationItem[];
  faqs: typeof FAQS;
  
  // Navigation & Active View States
  activeTab: 'home' | 'customer' | 'provider' | 'admin' | 'about' | 'contact';
  setActiveTab: (tab: 'home' | 'customer' | 'provider' | 'admin' | 'about' | 'contact') => void;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  
  selectedProviderForDetail: ProviderProfile | null;
  setSelectedProviderForDetail: (p: ProviderProfile | null) => void;
  
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  preselectedProviderForBooking: ProviderProfile | null;
  setPreselectedProviderForBooking: (p: ProviderProfile | null) => void;
  
  aiModalOpen: boolean;
  setAiModalOpen: (open: boolean) => void;
  
  activeInvoiceBooking: Booking | null;
  setActiveInvoiceBooking: (b: Booking | null) => void;
  
  activeChatBooking: Booking | null;
  setActiveChatBooking: (b: Booking | null) => void;

  activeDisputeBooking: Booking | null;
  setActiveDisputeBooking: (b: Booking | null) => void;

  activeReviewBooking: Booking | null;
  setActiveReviewBooking: (b: Booking | null) => void;

  // Data Manipulation Actions
  createNewBooking: (data: Partial<Booking>) => Promise<Booking | null>;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => Promise<void>;
  sendChatMessage: (bookingId: string, text: string) => Promise<void>;
  submitReview: (reviewData: Partial<Review>) => Promise<void>;
  submitDispute: (disputeData: Partial<Dispute>) => Promise<void>;
  verifyProvider: (providerId: string, status: 'verified_pro' | 'unverified') => Promise<void>;
  resolveDispute: (disputeId: string, status: 'resolved' | 'refunded', adminNotes?: string) => Promise<void>;
  toggleProviderOnline: (providerId: string) => void;
  updatePersonaAvatar: (personaId: string, newAvatarUrl: string) => void;
  
  toasts: Toast[];
  addToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personas, setPersonas] = useState<UserPersona[]>(INITIAL_PERSONAS);
  // Default: Starts as Guest / Logged Out on First Visit (Home Page view)
  const [currentPersona, setCurrentPersona] = useState<UserPersona | null>(INITIAL_PERSONAS[0]); // Default to Anitha Sundaram (Customer) for quick demo access, but allow logout / switching
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register_customer' | 'register_provider'>('login');
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const faqs = FAQS;

  const [activeTab, setActiveTab] = useState<'home' | 'customer' | 'provider' | 'admin' | 'about' | 'contact'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals
  const [selectedProviderForDetail, setSelectedProviderForDetail] = useState<ProviderProfile | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedProviderForBooking, setPreselectedProviderForBooking] = useState<ProviderProfile | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [activeInvoiceBooking, setActiveInvoiceBooking] = useState<Booking | null>(null);
  const [activeChatBooking, setActiveChatBooking] = useState<Booking | null>(null);
  const [activeDisputeBooking, setActiveDisputeBooking] = useState<Booking | null>(null);
  const [activeReviewBooking, setActiveReviewBooking] = useState<Booking | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);

  const isAuthenticated = currentPersona !== null;

  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Initial Fetch Data from Express server
  const fetchData = async () => {
    try {
      const [catRes, provRes, bkRes, notifRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/providers'),
        fetch('/api/bookings'),
        fetch('/api/notifications')
      ]);

      if (catRes.ok) setCategories(await catRes.json());
      if (provRes.ok) setProviders(await provRes.json());
      if (bkRes.ok) setBookings(await bkRes.json());
      if (notifRes.ok) setNotifications(await notifRes.json());
    } catch (err) {
      console.warn('Backend fetch error, using local state:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Login handler
  const loginPersona = (persona: UserPersona): boolean => {
    // If provider, check if admin has approved
    if (persona.role === 'provider') {
      const prov = providers.find(p => p.userId === persona.id || p.id === persona.providerId);
      if (prov && prov.verificationStatus === 'pending') {
        addToast(
          'warning',
          'Approval Pending',
          'Your Service Provider application is awaiting Admin approval. Once approved by Admin, you can log in.'
        );
        setAuthNotice('Your provider application is awaiting Admin verification. Once approved by Admin, your account will be activated.');
        return false;
      }
    }

    setCurrentPersona(persona);
    setAuthModalOpen(false);
    setAuthNotice(null);

    if (persona.role === 'customer') {
      setActiveTab('customer');
      addToast('success', 'Logged In as Customer', `Welcome back, ${persona.name}!`);
    } else if (persona.role === 'provider') {
      setActiveTab('provider');
      addToast('success', 'Logged In as Service Provider', `Welcome back, ${persona.name}!`);
    } else if (persona.role === 'admin') {
      setActiveTab('admin');
      addToast('info', 'Logged In as Admin', 'ServiceLink HQ Admin Dashboard loaded.');
    }
    return true;
  };

  // Logout handler
  const logout = () => {
    setCurrentPersona(null);
    setActiveTab('home');
    addToast('info', 'Logged Out', 'You have been signed out. Returning to Home Page.');
  };

  // Register Customer
  const registerCustomer = (data: { name: string; email: string; phone: string }): UserPersona => {
    const newPersona: UserPersona = {
      id: `user_cust_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      phone: data.phone || '+91 98401 00000',
    };

    setPersonas(prev => [...prev, newPersona]);
    setCurrentPersona(newPersona);
    setAuthModalOpen(false);
    setActiveTab('customer');
    addToast('success', 'Account Created!', `Welcome to ServiceLink, ${data.name}! You can now book Tamil Nadu's top professionals.`);
    return newPersona;
  };

  // Register Provider
  const registerProvider = (data: {
    name: string;
    email: string;
    phone: string;
    title: string;
    categoryId: string;
    categoryName: string;
    location: string;
    hourlyRate: number;
    bio: string;
    licenseDoc?: string;
  }) => {
    const newUserId = `user_prov_${Date.now()}`;
    const newProvId = `prov_${Date.now()}`;

    const newPersona: UserPersona = {
      id: newUserId,
      name: data.name,
      email: data.email,
      role: 'provider',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      phone: data.phone || '+91 98410 00000',
      verificationStatus: 'pending',
      providerId: newProvId
    };

    const newProvider: ProviderProfile = {
      id: newProvId,
      userId: newUserId,
      name: data.name,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      title: data.title || 'Service Specialist',
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      rating: 5.0,
      reviewCount: 0,
      completedJobs: 0,
      hourlyRate: data.hourlyRate || 400,
      location: `${data.location || 'Chennai'}, Tamil Nadu`,
      distanceKm: 2.5,
      bio: data.bio || 'Qualified local service professional in Tamil Nadu.',
      isOnline: false,
      serviceRadiusKm: 25,
      badges: ['Pending Admin Approval'],
      verificationStatus: 'pending',
      documents: [
        {
          id: `doc_${Date.now()}`,
          docType: 'license',
          title: data.licenseDoc || 'TN Trade License / Aadhaar Verification',
          fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500',
          status: 'pending',
          uploadedAt: new Date().toISOString().substring(0, 10)
        }
      ],
      offeredServices: [
        {
          id: `serv_${Date.now()}`,
          categoryId: data.categoryId,
          title: `${data.categoryName} General Service`,
          description: data.bio,
          basePrice: data.hourlyRate * 2,
          priceUnit: 'fixed',
          estimatedHours: 2
        }
      ],
      portfolioPhotos: []
    };

    setPersonas(prev => [...prev, newPersona]);
    setProviders(prev => [newProvider, ...prev]);

    // Add Notification for Admin
    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'New Service Provider Application',
        message: `${data.name} applied for ${data.categoryName} in ${data.location}. Requires Admin Approval.`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        read: false,
        type: 'verification',
        roleTarget: 'admin'
      },
      ...prev
    ]);

    setAuthNotice('Your Service Provider application has been submitted successfully! Admin approval is required before your account can be activated for bookings.');
    addToast(
      'warning',
      'Application Submitted',
      'Your provider details are pending Admin approval. Our Admin team will inspect your credentials shortly.'
    );

    return {
      success: true,
      message: 'Application submitted! Admin approval is required before logging in.',
      providerId: newProvId
    };
  };

  // Create Booking
  const createNewBooking = async (data: Partial<Booking>): Promise<Booking | null> => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          customerId: currentPersona?.id || 'user_cust_1',
          customerName: currentPersona?.name || 'Anitha Sundaram',
          customerPhone: currentPersona?.phone || '+91 98401 23456',
          customerAvatar: currentPersona?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
        })
      });

      if (res.ok) {
        const newBk: Booking = await res.json();
        setBookings(prev => [newBk, ...prev]);
        addToast('success', 'Booking Confirmed!', `Job code ${newBk.bookingCode} requested successfully.`);
        fetchData();
        return newBk;
      }
    } catch (err) {
      console.error('Error creating booking:', err);
    }
    return null;
  };

  // Update Status
  const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        const updatedBk = await res.json();
        setBookings(prev => prev.map(b => b.id === bookingId ? updatedBk : b));
        addToast('info', 'Status Updated', `Booking status changed to ${status.toUpperCase().replace('_', ' ')}.`);
        fetchData();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Send Chat Message
  const sendChatMessage = async (bookingId: string, text: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderRole: currentPersona?.role || 'customer',
          senderName: currentPersona?.name || 'User',
          senderAvatar: currentPersona?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
          text
        })
      });

      if (res.ok) {
        const newMsg = await res.json();
        setBookings(prev => prev.map(b => {
          if (b.id === bookingId) {
            return { ...b, messages: [...b.messages, newMsg] };
          }
          return b;
        }));
        if (activeChatBooking && activeChatBooking.id === bookingId) {
          setActiveChatBooking(prev => prev ? { ...prev, messages: [...prev.messages, newMsg] } : null);
        }
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // Submit Review
  const submitReview = async (reviewData: Partial<Review>) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reviewData,
          customerName: currentPersona?.name || 'Customer',
          customerAvatar: currentPersona?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
        })
      });

      if (res.ok) {
        addToast('success', 'Review Submitted', 'Thank you for rating your service professional!');
        fetchData();
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  // Submit Dispute
  const submitDispute = async (disputeData: Partial<Dispute>) => {
    try {
      const res = await fetch('/api/disputes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(disputeData)
      });

      if (res.ok) {
        addToast('warning', 'Dispute Case Filed', 'Our Admin Resolution Team will review your case within 24 hours.');
        fetchData();
      }
    } catch (err) {
      console.error('Error submitting dispute:', err);
    }
  };

  // Admin Verify Provider
  const verifyProvider = async (providerId: string, status: 'verified_pro' | 'unverified') => {
    try {
      // Update local state
      setProviders(prev => prev.map(p => {
        if (p.id === providerId) {
          const updatedBadges = status === 'verified_pro'
            ? Array.from(new Set([...p.badges.filter(b => !b.includes('Pending')), 'Verified Pro', 'Background Checked', 'Govt Approved']))
            : p.badges.filter(b => b !== 'Verified Pro');
          return {
            ...p,
            verificationStatus: status,
            badges: updatedBadges,
            documents: p.documents.map(d => ({ ...d, status: status === 'verified_pro' ? 'approved' : 'rejected' }))
          };
        }
        return p;
      }));

      // Update persona verification status if exists
      setPersonas(prev => prev.map(pers => {
        if (pers.providerId === providerId) {
          return { ...pers, verificationStatus: status };
        }
        return pers;
      }));

      const res = await fetch(`/api/admin/providers/${providerId}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        addToast(
          'success',
          'Provider Approved & Activated!',
          `Provider account is now ${status === 'verified_pro' ? 'VERIFIED PRO' : 'UNVERIFIED'}. The provider can now log in and accept bookings.`
        );
        fetchData();
      }
    } catch (err) {
      console.error('Error verifying provider:', err);
    }
  };

  // Admin Resolve Dispute
  const resolveDispute = async (disputeId: string, status: 'resolved' | 'refunded', adminNotes?: string) => {
    try {
      const res = await fetch(`/api/admin/disputes/${disputeId}/resolve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });

      if (res.ok) {
        addToast('success', 'Dispute Resolved', `Dispute updated to ${status.toUpperCase()}.`);
        fetchData();
      }
    } catch (err) {
      console.error('Error resolving dispute:', err);
    }
  };

  // Toggle Provider Online Status
  const toggleProviderOnline = (providerId: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        const nextStatus = !p.isOnline;
        addToast('info', 'Status Changed', `You are now ${nextStatus ? 'ONLINE (Accepting Job Leads)' : 'OFFLINE'}.`);
        return { ...p, isOnline: nextStatus };
      }
      return p;
    }));
  };

  // Update Persona Avatar Image
  const updatePersonaAvatar = (personaId: string, newAvatarUrl: string) => {
    setPersonas(prev => prev.map(p => p.id === personaId ? { ...p, avatar: newAvatarUrl } : p));
    if (currentPersona && currentPersona.id === personaId) {
      setCurrentPersona(prev => prev ? { ...prev, avatar: newAvatarUrl } : null);
    }
    setProviders(prev => prev.map(prov => prov.userId === personaId ? { ...prov, avatar: newAvatarUrl } : prov));
    addToast('success', 'Profile Image Updated', 'Avatar photo updated for active persona!');
  };

  return (
    <AppContext.Provider
      value={{
        currentPersona,
        setCurrentPersona,
        personas,
        isAuthenticated,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        authNotice,
        setAuthNotice,
        loginPersona,
        logout,
        registerCustomer,
        registerProvider,
        categories,
        providers,
        bookings,
        reviews,
        disputes,
        notifications,
        faqs,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedProviderForDetail,
        setSelectedProviderForDetail,
        bookingModalOpen,
        setBookingModalOpen,
        preselectedProviderForBooking,
        setPreselectedProviderForBooking,
        aiModalOpen,
        setAiModalOpen,
        activeInvoiceBooking,
        setActiveInvoiceBooking,
        activeChatBooking,
        setActiveChatBooking,
        activeDisputeBooking,
        setActiveDisputeBooking,
        activeReviewBooking,
        setActiveReviewBooking,
        createNewBooking,
        updateBookingStatus,
        sendChatMessage,
        submitReview,
        submitDispute,
        verifyProvider,
        resolveDispute,
        toggleProviderOnline,
        updatePersonaAvatar,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
