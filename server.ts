import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import {
  SERVICE_CATEGORIES,
  MOCK_PROVIDERS,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_DISPUTES,
  INITIAL_NOTIFICATIONS,
  INITIAL_PERSONAS
} from './src/data/mockData.js';
import { Booking, Review, Dispute, NotificationItem, ProviderProfile, ChatMessage } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory Database Store
let personasStore = [...INITIAL_PERSONAS];
let categoriesStore = [...SERVICE_CATEGORIES];
let providersStore = [...MOCK_PROVIDERS];
let bookingsStore = [...INITIAL_BOOKINGS];
let reviewsStore = [...INITIAL_REVIEWS];
let disputesStore = [...INITIAL_DISPUTES];
let notificationsStore = [...INITIAL_NOTIFICATIONS];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    } catch (err) {
      console.warn('Gemini initialization skipped or failed:', err);
    }
  }

  // --- API ENDPOINTS ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'ServiceLink SaaS Engine', timestamp: new Date().toISOString() });
  });

  // Get categories
  app.get('/api/categories', (req, res) => {
    res.json(categoriesStore);
  });

  // Get providers with optional filtering
  app.get('/api/providers', (req, res) => {
    const { categoryId, search, minRating, maxRate, onlyVerified } = req.query;

    let result = [...providersStore];

    if (categoryId && categoryId !== 'all') {
      result = result.filter(p => p.categoryId === categoryId);
    }

    if (search) {
      const q = String(search).toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q)
      );
    }

    if (minRating) {
      result = result.filter(p => p.rating >= Number(minRating));
    }

    if (maxRate) {
      result = result.filter(p => p.hourlyRate <= Number(maxRate));
    }

    if (onlyVerified === 'true') {
      result = result.filter(p => p.verificationStatus === 'verified_pro');
    }

    res.json(result);
  });

  // Get single provider
  app.get('/api/providers/:id', (req, res) => {
    const provider = providersStore.find(p => p.id === req.params.id);
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    const providerReviews = reviewsStore.filter(r => r.providerId === provider.id);
    res.json({ ...provider, reviews: providerReviews });
  });

  // Get Bookings
  app.get('/api/bookings', (req, res) => {
    const { role, userId } = req.query;

    let filtered = [...bookingsStore];

    if (role === 'customer' && userId) {
      filtered = filtered.filter(b => b.customerId === userId);
    } else if (role === 'provider' && userId) {
      // Find provider ID for user
      const prov = providersStore.find(p => p.userId === userId || p.id === userId);
      if (prov) {
        filtered = filtered.filter(b => b.providerId === prov.id);
      }
    }

    res.json(filtered);
  });

  // Create Booking
  app.post('/api/bookings', (req, res) => {
    const body = req.body;

    const bookingCode = `SL-${Math.floor(10000 + Math.random() * 90000)}`;
    const laborHours = body.laborHoursEstimate || 2;
    const hourlyRate = body.hourlyRate || 85;
    const materialsCost = body.materialsCost || 0;
    const subtotal = (laborHours * hourlyRate) + materialsCost;
    const platformFee = Math.round(subtotal * 0.08); // 8% platform fee
    const tax = Math.round(subtotal * 0.07); // 7% local tax
    const totalAmount = subtotal + platformFee + tax;

    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      bookingCode,
      customerId: body.customerId || 'user_cust_1',
      customerName: body.customerName || 'Sarah Jenkins',
      customerPhone: body.customerPhone || '+1 (555) 234-5678',
      customerAvatar: body.customerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      providerId: body.providerId,
      providerName: body.providerName,
      providerTitle: body.providerTitle || 'Service Professional',
      providerAvatar: body.providerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      categoryId: body.categoryId,
      serviceTitle: body.serviceTitle,
      scheduledDate: body.scheduledDate,
      timeSlot: body.timeSlot,
      address: body.address,
      city: body.city || 'Springfield, CA',
      problemNotes: body.problemNotes || '',
      status: 'requested',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      laborHoursEstimate: laborHours,
      hourlyRate,
      materialsCost,
      platformFee,
      tax,
      totalAmount,
      isPaid: true,
      paymentMethod: body.paymentMethod || 'Credit Card ending in 4242',
      messages: [
        {
          id: `msg_${Date.now()}`,
          senderRole: 'customer',
          senderName: body.customerName || 'Customer',
          senderAvatar: body.customerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
          text: `Hi ${body.providerName}! Booking submitted: ${body.serviceTitle} for ${body.scheduledDate} (${body.timeSlot}). Notes: ${body.problemNotes}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    bookingsStore.unshift(newBooking);

    // Create Notification for Provider
    notificationsStore.unshift({
      id: `notif_${Date.now()}`,
      title: `New Job Booking (${bookingCode})`,
      message: `${newBooking.customerName} requested ${newBooking.serviceTitle} for $${newBooking.totalAmount}.`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
      type: 'booking',
      roleTarget: 'provider'
    });

    res.status(201).json(newBooking);
  });

  // Update Booking Status
  app.patch('/api/bookings/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const booking = bookingsStore.find(b => b.id === id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = status;

    if (status === 'completed') {
      // Increase provider completed jobs
      const prov = providersStore.find(p => p.id === booking.providerId);
      if (prov) {
        prov.completedJobs += 1;
      }
    }

    // Add notification for customer
    notificationsStore.unshift({
      id: `notif_${Date.now()}`,
      title: `Booking Update (${booking.bookingCode})`,
      message: `Your booking for ${booking.serviceTitle} is now marked as "${status.toUpperCase().replace('_', ' ')}".`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
      type: 'booking',
      roleTarget: 'customer'
    });

    res.json(booking);
  });

  // Post Chat Message
  app.post('/api/bookings/:id/messages', (req, res) => {
    const { id } = req.params;
    const { senderRole, senderName, senderAvatar, text } = req.body;

    const booking = bookingsStore.find(b => b.id === id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderRole,
      senderName,
      senderAvatar,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    booking.messages.push(newMessage);
    res.status(201).json(newMessage);
  });

  // Post Review
  app.post('/api/reviews', (req, res) => {
    const { bookingId, providerId, customerName, customerAvatar, rating, comment, serviceTitle } = req.body;

    const newReview: Review = {
      id: `rev_${Date.now()}`,
      bookingId,
      providerId,
      customerName,
      customerAvatar,
      rating,
      comment,
      serviceTitle,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      verifiedBooking: true
    };

    reviewsStore.unshift(newReview);

    // Update provider rating average
    const prov = providersStore.find(p => p.id === providerId);
    if (prov) {
      const provReviews = reviewsStore.filter(r => r.providerId === providerId);
      const avg = provReviews.reduce((sum, r) => sum + r.rating, 0) / provReviews.length;
      prov.rating = Number(avg.toFixed(2));
      prov.reviewCount = provReviews.length;
    }

    // Mark booking as reviewed
    const bk = bookingsStore.find(b => b.id === bookingId);
    if (bk) bk.hasReview = true;

    res.status(201).json(newReview);
  });

  // Submit Dispute
  app.post('/api/disputes', (req, res) => {
    const { bookingId, reason, description, refundAmountRequested } = req.body;

    const bk = bookingsStore.find(b => b.id === bookingId);
    if (!bk) return res.status(404).json({ error: 'Booking not found' });

    const newDispute: Dispute = {
      id: `disp_${Date.now()}`,
      bookingId,
      bookingCode: bk.bookingCode,
      customerName: bk.customerName,
      providerName: bk.providerName,
      reason,
      description,
      status: 'under_review',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      refundAmountRequested: refundAmountRequested || bk.totalAmount
    };

    disputesStore.unshift(newDispute);
    bk.hasDispute = true;

    notificationsStore.unshift({
      id: `notif_${Date.now()}`,
      title: `Dispute Filed (${bk.bookingCode})`,
      message: `Dispute filed by ${bk.customerName} regarding ${reason}.`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
      type: 'system',
      roleTarget: 'admin'
    });

    res.status(201).json(newDispute);
  });

  // Admin Stats
  app.get('/api/admin/stats', (req, res) => {
    const totalGMV = bookingsStore.reduce((acc, b) => acc + (b.status !== 'cancelled' ? b.totalAmount : 0), 0);
    const platformCommission = bookingsStore.reduce((acc, b) => acc + (b.status !== 'cancelled' ? b.platformFee : 0), 0);
    const pendingVerifications = providersStore.filter(p => p.verificationStatus === 'pending').length;
    const activeDisputes = disputesStore.filter(d => d.status === 'under_review' || d.status === 'open').length;

    res.json({
      totalGMV,
      platformCommission,
      totalBookings: bookingsStore.length,
      activeProviders: providersStore.length,
      pendingVerifications,
      activeDisputes,
      disputesList: disputesStore,
      pendingProviders: providersStore.filter(p => p.verificationStatus === 'pending')
    });
  });

  // Admin Approve / Reject Provider Verification
  app.patch('/api/admin/providers/:id/verify', (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'verified_pro' or 'unverified'

    const prov = providersStore.find(p => p.id === id);
    if (!prov) return res.status(404).json({ error: 'Provider not found' });

    prov.verificationStatus = status;
    if (status === 'verified_pro') {
      if (!prov.badges.includes('Verified Pro')) {
        prov.badges.push('Verified Pro', 'Background Checked');
      }
    }

    res.json(prov);
  });

  // Admin Resolve Dispute
  app.patch('/api/admin/disputes/:id/resolve', (req, res) => {
    const { id } = req.params;
    const { status, adminNotes } = req.body; // 'resolved' or 'refunded'

    const disp = disputesStore.find(d => d.id === id);
    if (!disp) return res.status(404).json({ error: 'Dispute not found' });

    disp.status = status;
    disp.adminNotes = adminNotes || 'Resolved by Platform Admin.';

    res.json(disp);
  });

  // AI Home Issue Diagnoser Endpoint using Gemini API
  app.post('/api/ai/diagnose', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Problem description prompt is required' });
    }

    // Default Fallback Response generator if Gemini API key is unavailable or errors out
    const getFallback = () => {
      const p = prompt.toLowerCase();
      let catId = 'cat_handyman';
      let catName = 'Handyman & Repairs';
      let serviceTitle = 'General Home Inspection & Repair';
      let urgency: 'low' | 'medium' | 'high' | 'emergency' = 'medium';

      if (p.includes('leak') || p.includes('water') || p.includes('pipe') || p.includes('drain') || p.includes('sink') || p.includes('toilet')) {
        catId = 'cat_plumbing';
        catName = 'Plumbing Services';
        serviceTitle = p.includes('leak') ? 'Emergency Pipe Leak Repair' : 'Drain Cleaning & Snaking';
        urgency = p.includes('flood') || p.includes('burst') ? 'emergency' : 'high';
      } else if (p.includes('spark') || p.includes('light') || p.includes('breaker') || p.includes('outlet') || p.includes('wire') || p.includes('power')) {
        catId = 'cat_electrical';
        catName = 'Electrical Work';
        serviceTitle = p.includes('breaker') ? 'Breaker Box Inspection' : 'Electrical Outlet & Wiring Repair';
        urgency = p.includes('spark') || p.includes('smoke') ? 'emergency' : 'high';
      } else if (p.includes('ac') || p.includes('cold') || p.includes('heat') || p.includes('furnace') || p.includes('air')) {
        catId = 'cat_hvac';
        catName = 'HVAC Heating & Cooling';
        serviceTitle = 'AC & Heating System Diagnostic';
        urgency = 'medium';
      } else if (p.includes('clean') || p.includes('mold') || p.includes('dirty') || p.includes('dust')) {
        catId = 'cat_cleaning';
        catName = 'House & Deep Cleaning';
        serviceTitle = 'Deep House Sanitization';
        urgency = 'low';
      }

      const matchingPros = providersStore.filter(p => p.categoryId === catId).slice(0, 3);

      return {
        identifiedCategory: catName,
        categoryId: catId,
        serviceTitle,
        urgencyLevel: urgency,
        explanation: `Based on your description ("${prompt.slice(0, 60)}..."), our AI engine identified an issue requiring ${catName}. Address this promptly to prevent property damage.`,
        estimatedCostMin: 95,
        estimatedCostMax: 280,
        suggestedAction: `Shut off relevant main valve/power if leaking or sparking, and schedule a verified ${catName} specialist immediately.`,
        recommendedProviderIds: matchingPros.map(p => p.id)
      };
    };

    if (!ai) {
      return res.json(getFallback());
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Analyze the following home maintenance issue reported by a homeowner and categorize it into one of these service categories:
Categories:
- Plumbing Services (cat_plumbing)
- Electrical Work (cat_electrical)
- House & Deep Cleaning (cat_cleaning)
- HVAC Heating & Cooling (cat_hvac)
- Appliance Repair (cat_appliance)
- Handyman & Repairs (cat_handyman)
- Gardening & Lawn Care (cat_landscaping)
- Painting & Decorating (cat_painting)

Homeowner Issue Description: "${prompt}"

Return a JSON object with these exact fields:
- categoryId (string, e.g. "cat_plumbing")
- identifiedCategory (string, e.g. "Plumbing Services")
- serviceTitle (string, e.g. "Emergency Pipe Leak Repair")
- urgencyLevel (string: "low" | "medium" | "high" | "emergency")
- explanation (string, concise 2-sentence explanation of the problem cause)
- estimatedCostMin (number, min price estimate in USD)
- estimatedCostMax (number, max price estimate in USD)
- suggestedAction (string, immediate safety advice or step for the homeowner)`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              categoryId: { type: Type.STRING },
              identifiedCategory: { type: Type.STRING },
              serviceTitle: { type: Type.STRING },
              urgencyLevel: { type: Type.STRING },
              explanation: { type: Type.STRING },
              estimatedCostMin: { type: Type.NUMBER },
              estimatedCostMax: { type: Type.NUMBER },
              suggestedAction: { type: Type.STRING }
            },
            required: ['categoryId', 'identifiedCategory', 'serviceTitle', 'urgencyLevel', 'explanation', 'estimatedCostMin', 'estimatedCostMax', 'suggestedAction']
          }
        }
      });

      const parsed = JSON.parse(response.text.trim());
      const matchingPros = providersStore.filter(p => p.categoryId === parsed.categoryId).slice(0, 3);

      res.json({
        ...parsed,
        recommendedProviderIds: matchingPros.map(p => p.id)
      });
    } catch (err) {
      console.error('Gemini AI diagnose error:', err);
      res.json(getFallback());
    }
  });

  // Get notifications
  app.get('/api/notifications', (req, res) => {
    const { role } = req.query;
    if (role) {
      return res.json(notificationsStore.filter(n => n.roleTarget === role || n.roleTarget === 'guest'));
    }
    res.json(notificationsStore);
  });

  // Vite Middleware for Development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ServiceLink SaaS Server running on http://localhost:${PORT}`);
  });
}

startServer();
