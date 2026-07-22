export type Role = 'guest' | 'customer' | 'provider' | 'admin';

export type VerificationStatus = 'unverified' | 'pending' | 'verified_pro';

export interface UserPersona {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  phone: string;
  verificationStatus?: VerificationStatus;
  providerId?: string; // If role is provider
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  avgHourlyRate: number;
  popularServices: string[];
  image: string;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  basePrice: number;
  priceUnit: 'hourly' | 'fixed';
  estimatedHours: number;
}

export interface VerificationDocument {
  id: string;
  docType: 'identity' | 'license' | 'insurance' | 'background_check';
  title: string;
  fileUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  notes?: string;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  title: string;
  categoryId: string;
  categoryName: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  hourlyRate: number;
  location: string;
  distanceKm: number;
  bio: string;
  isOnline: boolean;
  serviceRadiusKm: number;
  badges: string[];
  verificationStatus: VerificationStatus;
  documents: VerificationDocument[];
  offeredServices: ServiceItem[];
  portfolioPhotos: string[];
}

export type BookingStatus = 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface ChatMessage {
  id: string;
  senderRole: Role;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAvatar: string;
  providerId: string;
  providerName: string;
  providerTitle: string;
  providerAvatar: string;
  categoryId: string;
  serviceTitle: string;
  scheduledDate: string;
  timeSlot: string;
  address: string;
  city: string;
  problemNotes: string;
  status: BookingStatus;
  createdAt: string;
  
  // Financial breakdown
  laborHoursEstimate: number;
  hourlyRate: number;
  materialsCost: number;
  platformFee: number;
  tax: number;
  totalAmount: number;
  isPaid: boolean;
  paymentMethod: string;

  messages: ChatMessage[];
  hasReview?: boolean;
  hasDispute?: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  providerId: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  serviceTitle: string;
  comment: string;
  createdAt: string;
  verifiedBooking: boolean;
}

export interface Dispute {
  id: string;
  bookingId: string;
  bookingCode: string;
  customerName: string;
  providerName: string;
  reason: string;
  description: string;
  status: 'open' | 'under_review' | 'resolved' | 'refunded';
  createdAt: string;
  refundAmountRequested: number;
  adminNotes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'booking' | 'system' | 'payout' | 'verification' | 'chat';
  roleTarget: Role;
}

export interface AiDiagnosisResult {
  identifiedCategory: string;
  serviceTitle: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  explanation: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  suggestedAction: string;
  recommendedProviderIds: string[];
}
