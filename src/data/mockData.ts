import { ServiceCategory, ProviderProfile, Booking, Review, Dispute, NotificationItem, UserPersona } from '../types';

export const INITIAL_PERSONAS: UserPersona[] = [
  {
    id: 'user_cust_1',
    name: 'Anitha Sundaram',
    email: 'anitha.sundaram@gmail.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98401 23456',
  },
  {
    id: 'user_prov_1',
    name: 'S. Murugan',
    email: 'murugan.elec@tnproservices.in',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98410 88776',
    verificationStatus: 'verified_pro',
    providerId: 'prov_1',
  },
  {
    id: 'user_admin_1',
    name: 'G. Soundararajan (GM Admin)',
    email: 'admin.chennai@servicelink.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    phone: '+91 44 2800 9000',
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat_electrical',
    name: 'Electrical Services',
    iconName: 'Zap',
    description: 'House wiring, circuit breaker panel upgrades, inverter installation, EV charger & LED ceiling fittings.',
    avgHourlyRate: 450,
    popularServices: ['Whole House Wiring Check', 'Inverter & Battery Setup', 'EV Charger Install', 'LED Panel Fitting'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cat_plumbing',
    name: 'Plumbing Services',
    iconName: 'Wrench',
    description: 'Overhead tank repair, motor pump fitting, bathroom leak sealing, pipe fitting & RO purifier install.',
    avgHourlyRate: 400,
    popularServices: ['Overhead Tank Cleaning', 'Water Pump Motor Fix', 'Bathroom Leak Repair', 'Water Heater (Geyser) Install'],
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cat_cleaning',
    name: 'House Deep Cleaning',
    iconName: 'Sparkles',
    description: 'Residential sanitization, kitchen oil degreasing, bathroom deep scrub & sofa shampooing.',
    avgHourlyRate: 350,
    popularServices: ['Full Home Deep Cleaning', 'Kitchen Oil Degreasing', 'Bathroom Scrubbing', 'Sofa & Carpet Wash'],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cat_hvac',
    name: 'AC & Cooling Repair',
    iconName: 'Wind',
    description: 'Split & window AC servicing, gas refilling, jet spray wash & compressor motor troubleshooting.',
    avgHourlyRate: 500,
    popularServices: ['AC Jet Spray Service', 'Gas Top-up & Leak Fix', 'AC Installation / Uninstallation', 'PCB Circuit Repair'],
    image: 'https://images.unsplash.com/photo-1631545816622-be126742a7ed?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cat_appliance',
    name: 'Appliance Repair',
    iconName: 'Tv',
    description: 'Washing machine repair, double door refrigerator service, microwave & gas stove burner fixes.',
    avgHourlyRate: 400,
    popularServices: ['Washing Machine Drum Fix', 'Fridge Compressor Check', 'Gas Stove Burner Cleaning', 'Microwave Repair'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cat_handyman',
    name: 'Handyman & Carpentry',
    iconName: 'Hammer',
    description: 'Wooden door lock repair, modular kitchen cupboard fix, wall mounting & furniture assembly.',
    avgHourlyRate: 350,
    popularServices: ['TV Wall Mount', 'Modular Kitchen Hinge Fix', 'Door Lock & Latch Repair', 'Bed Assembly'],
    image: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cat_landscaping',
    name: 'Gardening & Lawn Care',
    iconName: 'Trees',
    description: 'Terrace garden setup, coconut tree pruning, lawn trimming & organic pest control.',
    avgHourlyRate: 300,
    popularServices: ['Terrace Garden Setup', 'Tree & Bush Pruning', 'Organic Garden Spraying', 'Lawn Mowing'],
    image: 'https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cat_painting',
    name: 'Painting & Waterproofing',
    iconName: 'Paintbrush',
    description: 'Asian Paints interior coating, wall putty smoothing, dampness waterproofing & exterior emulsion.',
    avgHourlyRate: 450,
    popularServices: ['Interior Room Painting', 'Wall Dampness Waterproofing', 'Wood Polish', 'Exterior Painting'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600'
  }
];

export const MOCK_PROVIDERS: ProviderProfile[] = [
  {
    id: 'prov_1',
    userId: 'user_prov_1',
    name: 'S. Murugan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    title: 'Master Licensed Electrician (Govt Approved Grade-A)',
    categoryId: 'cat_electrical',
    categoryName: 'Electrical Services',
    rating: 4.95,
    reviewCount: 184,
    completedJobs: 320,
    hourlyRate: 500,
    location: 'T. Nagar, Chennai (1.8 km away)',
    distanceKm: 1.8,
    bio: 'Licensed Senior Electrician with 14+ years experience across Chennai, Anna Nagar & T. Nagar. Govt Grade-A Electrical License holder. Expert in house wiring, inverter setups, EV chargers & breaker panels.',
    isOnline: true,
    serviceRadiusKm: 25,
    badges: ['Verified Pro', 'Govt Licensed', 'Background Checked', 'Top Rated Chennai 2026'],
    verificationStatus: 'verified_pro',
    documents: [
      {
        id: 'doc_101',
        docType: 'license',
        title: 'TN Electrical Licensing Board #EA-44912',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500',
        status: 'approved',
        uploadedAt: '2026-01-10'
      },
      {
        id: 'doc_102',
        docType: 'identity',
        title: 'Aadhaar Card Verification',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=500',
        status: 'approved',
        uploadedAt: '2026-01-11'
      }
    ],
    offeredServices: [
      {
        id: 'serv_e1',
        categoryId: 'cat_electrical',
        title: 'Home Inverter & Heavy Battery Setup',
        description: 'Professional wiring, breaker isolation, and dual-battery inverter connection with safety earthing.',
        basePrice: 1200,
        priceUnit: 'fixed',
        estimatedHours: 2.5
      },
      {
        id: 'serv_e2',
        categoryId: 'cat_electrical',
        title: 'EV Charger Level 2 Wall Mount Fitting',
        description: 'Dedicated 240V high-amp line from main meter box to garage/parking space with MCB protection.',
        basePrice: 2500,
        priceUnit: 'fixed',
        estimatedHours: 3.5
      },
      {
        id: 'serv_e3',
        categoryId: 'cat_electrical',
        title: 'MCB Breaker Box & Mains Earthing Upgrade',
        description: 'Complete replacement of old fuse wire boxes with modern Elcb/Mcb distribution board.',
        basePrice: 3800,
        priceUnit: 'fixed',
        estimatedHours: 5
      }
    ],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=500'
    ]
  },
  {
    id: 'prov_2',
    userId: 'user_prov_2',
    name: 'K. Selvam',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    title: 'Senior Plumbing & Water Pump Specialist',
    categoryId: 'cat_plumbing',
    categoryName: 'Plumbing Services',
    rating: 4.88,
    reviewCount: 142,
    completedJobs: 260,
    hourlyRate: 450,
    location: 'Velachery, Chennai (3.2 km away)',
    distanceKm: 3.2,
    bio: 'Punctual, honest plumbing specialist. Specializing in overhead water tank repairs, automatic water level motor controllers, bathroom Concealed piping & Geyser installations.',
    isOnline: true,
    serviceRadiusKm: 30,
    badges: ['Verified Pro', 'Fast 30-Min Dispatch', '100% Water Leak Guarantee'],
    verificationStatus: 'verified_pro',
    documents: [
      {
        id: 'doc_201',
        docType: 'license',
        title: 'TN Pipe Fitting Association License #PL-8821',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500',
        status: 'approved',
        uploadedAt: '2026-02-01'
      }
    ],
    offeredServices: [
      {
        id: 'serv_p1',
        categoryId: 'cat_plumbing',
        title: 'Water Heater Geyser Install & Piping',
        description: 'Wall mounting, inlet/outlet braided hose connection, angle valve fitting & safety check.',
        basePrice: 850,
        priceUnit: 'fixed',
        estimatedHours: 1.5
      },
      {
        id: 'serv_p2',
        categoryId: 'cat_plumbing',
        title: 'Overhead Tank 1000L Deep Cleaning & Scrub',
        description: 'Complete water drainage, sludge removal, high-pressure washing & UV sanitization.',
        basePrice: 1100,
        priceUnit: 'fixed',
        estimatedHours: 2.5
      }
    ],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=500'
    ]
  },
  {
    id: 'prov_3',
    userId: 'user_prov_3',
    name: 'Kavitha Cleaners & Team',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    title: 'Professional Deep Home Cleaning Experts',
    categoryId: 'cat_cleaning',
    categoryName: 'House Deep Cleaning',
    rating: 4.91,
    reviewCount: 215,
    completedJobs: 410,
    hourlyRate: 380,
    location: 'RS Puram, Coimbatore (4.5 km away)',
    distanceKm: 4.5,
    bio: 'Top-rated residential cleaning crew using eco-friendly non-toxic herbal floor solutions. Complete deep scrub for kitchens, bathrooms, tile grout & balcony washing.',
    isOnline: true,
    serviceRadiusKm: 25,
    badges: ['Verified Pro', 'Eco Herbal Clean', 'Pet & Child Safe'],
    verificationStatus: 'verified_pro',
    documents: [],
    offeredServices: [
      {
        id: 'serv_c1',
        categoryId: 'cat_cleaning',
        title: '2BHK / 3BHK Complete Deep Home Scrubbing',
        description: 'Dusting, floor scrubbing with single-disc machine, kitchen chimney degreasing, bathroom descaling & window pane washing.',
        basePrice: 2800,
        priceUnit: 'fixed',
        estimatedHours: 5
      }
    ],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=500'
    ]
  },
  {
    id: 'prov_4',
    userId: 'user_prov_4',
    name: 'Ramesh AC Technicians',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    title: 'AC Cooling & Jet Washing Engineer',
    categoryId: 'cat_hvac',
    categoryName: 'AC & Cooling Repair',
    rating: 4.93,
    reviewCount: 168,
    completedJobs: 290,
    hourlyRate: 500,
    location: 'Anna Nagar, Chennai (2.1 km away)',
    distanceKm: 2.1,
    bio: 'Certified Split & Inverter AC engineer for Daikin, Voltas, Blue Star, LG & Panasonic. Specialist in indoor unit water leakage fixes, R32/R410 gas refilling & jet washing.',
    isOnline: true,
    serviceRadiusKm: 35,
    badges: ['Verified Pro', 'Certified Brand Tech', 'Same Day Jet Wash'],
    verificationStatus: 'verified_pro',
    documents: [],
    offeredServices: [
      {
        id: 'serv_h1',
        categoryId: 'cat_hvac',
        title: 'Split AC Foam & High-Pressure Jet Spray Washing',
        description: 'Complete jacket washing of indoor evaporator coil, blower wheel cleaning & outdoor condenser jet spray.',
        basePrice: 650,
        priceUnit: 'fixed',
        estimatedHours: 1.5
      },
      {
        id: 'serv_h2',
        categoryId: 'cat_hvac',
        title: 'AC Refrigerant Gas Top-Up & Pressure Testing',
        description: 'Nitrogen leak detection, copper pipe brazing flare repair, vacuuming & original R32/R410 gas recharge.',
        basePrice: 2200,
        priceUnit: 'fixed',
        estimatedHours: 2.5
      }
    ],
    portfolioPhotos: []
  },
  {
    id: 'prov_5',
    userId: 'user_prov_5',
    name: 'Vijaykumar Carpentry',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    title: 'Handyman & Modular Furniture Craftsman',
    categoryId: 'cat_handyman',
    categoryName: 'Handyman & Carpentry',
    rating: 4.75,
    reviewCount: 62,
    completedJobs: 98,
    hourlyRate: 350,
    location: 'Simmakkal, Madurai (2.8 km away)',
    distanceKm: 2.8,
    bio: 'Expert carpenter for teakwood doors, kitchen cabinet hydraulic hinges, wardrobe locks, wall TV installation & IKEA furniture assembly.',
    isOnline: true,
    serviceRadiusKm: 15,
    badges: ['Pending Approval'],
    verificationStatus: 'pending',
    documents: [
      {
        id: 'doc_501',
        docType: 'identity',
        title: 'Aadhaar Card Copy',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500',
        status: 'pending',
        uploadedAt: '2026-07-20'
      }
    ],
    offeredServices: [
      {
        id: 'serv_hm1',
        categoryId: 'cat_handyman',
        title: 'Smart TV Wall Mount Fitting & Cable Concealing',
        description: 'Heavy duty metal wall bracket installation for TV size up to 75 inch on concrete wall.',
        basePrice: 450,
        priceUnit: 'fixed',
        estimatedHours: 1
      }
    ],
    portfolioPhotos: []
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk_101',
    bookingCode: 'TN-98201',
    customerId: 'user_cust_1',
    customerName: 'Anitha Sundaram',
    customerPhone: '+91 98401 23456',
    customerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    providerId: 'prov_1',
    providerName: 'S. Murugan',
    providerTitle: 'Master Licensed Electrician',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    categoryId: 'cat_electrical',
    serviceTitle: 'Home Inverter & Heavy Battery Setup',
    scheduledDate: '2026-07-23',
    timeSlot: '10:00 AM - 12:30 PM',
    address: 'Flat 302, Green Acres Appts, Velachery Main Rd',
    city: 'Chennai, Tamil Nadu',
    problemNotes: 'Need installation for new 1500VA Luminous Inverter with dual tubular batteries. Need separate earthing connection to balcony.',
    status: 'confirmed',
    createdAt: '2026-07-21 14:30',
    laborHoursEstimate: 2.5,
    hourlyRate: 500,
    materialsCost: 350,
    platformFee: 100,
    tax: 150,
    totalAmount: 1850,
    isPaid: true,
    paymentMethod: 'UPI (GPay / PhonePe)',
    messages: [
      {
        id: 'msg_1',
        senderRole: 'customer',
        senderName: 'Anitha Sundaram',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        text: 'Vanakkam Murugan Sir! Looking forward to Thursday morning. Inverter unit is delivered and kept ready.',
        timestamp: '14:32'
      },
      {
        id: 'msg_2',
        senderRole: 'provider',
        senderName: 'S. Murugan',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        text: 'Vanakkam Maam! I will bring heavy-duty copper cables and 16A MCB breaker. I will reach at 10 AM sharp.',
        timestamp: '14:35'
      }
    ]
  },
  {
    id: 'bk_102',
    bookingCode: 'TN-98205',
    customerId: 'user_cust_1',
    customerName: 'Anitha Sundaram',
    customerPhone: '+91 98401 23456',
    customerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    providerId: 'prov_4',
    providerName: 'Ramesh AC Technicians',
    providerTitle: 'AC Cooling & Jet Washing Engineer',
    providerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    categoryId: 'cat_hvac',
    serviceTitle: 'Split AC Foam & High-Pressure Jet Spray Washing',
    scheduledDate: '2026-07-22',
    timeSlot: '02:00 PM - 03:30 PM',
    address: 'Flat 302, Green Acres Appts, Velachery Main Rd',
    city: 'Chennai, Tamil Nadu',
    problemNotes: 'Master bedroom Voltas Split AC is blowing lukewarm air and water dripping from right side panel.',
    status: 'in_progress',
    createdAt: '2026-07-22 09:15',
    laborHoursEstimate: 1.5,
    hourlyRate: 500,
    materialsCost: 150,
    platformFee: 50,
    tax: 80,
    totalAmount: 1030,
    isPaid: true,
    paymentMethod: 'Paytm UPI',
    messages: [
      {
        id: 'msg_201',
        senderRole: 'provider',
        senderName: 'Ramesh AC Technicians',
        senderAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
        text: 'Vanakkam Anitha Maam, I am near Velachery flyover and will reach your place in 10 minutes with jet washing machine!',
        timestamp: '13:45'
      }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    bookingId: 'bk_103',
    providerId: 'prov_1',
    customerName: 'K. Rajeshwari',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    rating: 5,
    serviceTitle: 'MCB Breaker Box Upgrade',
    comment: 'Murugan Sir came right on time. Very neat wiring work in our T. Nagar house. Safe, polite and highly experienced!',
    createdAt: '2026-07-15 14:00',
    verifiedBooking: true
  },
  {
    id: 'rev_2',
    bookingId: 'bk_090',
    providerId: 'prov_2',
    customerName: 'M. Vignesh',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    rating: 5,
    serviceTitle: 'Overhead Tank Cleaning',
    comment: 'Selvam cleaned our 1000L water tank thoroughly with pressure wash. Cleaned up all sludge. Very satisfied!',
    createdAt: '2026-07-08 16:30',
    verifiedBooking: true
  }
];

export const INITIAL_DISPUTES: Dispute[] = [
  {
    id: 'disp_101',
    bookingId: 'bk_066',
    bookingCode: 'TN-66109',
    customerName: 'S. Arumugam',
    providerName: 'Vijaykumar Carpentry',
    reason: 'Delayed Arrival & Loose Cabinet Hinges',
    description: 'The technician arrived 2 hours late and the kitchen hydraulic hinge came loose after 2 days.',
    status: 'under_review',
    createdAt: '2026-07-18 10:20',
    refundAmountRequested: 300,
    adminNotes: 'Contacted Vijaykumar for explanation. Customer provided photo proof of loose hinge.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Booking Confirmed!',
    message: 'S. Murugan accepted your Inverter Setup booking for July 23 in Velachery, Chennai.',
    timestamp: '2026-07-21 14:31',
    read: false,
    type: 'booking',
    roleTarget: 'customer'
  },
  {
    id: 'notif_2',
    title: 'Technician Arriving Soon',
    message: 'Ramesh AC Technicians is 10 minutes away for your Split AC Jet Service.',
    timestamp: '2026-07-22 13:45',
    read: false,
    type: 'booking',
    roleTarget: 'customer'
  },
  {
    id: 'notif_3',
    title: 'New Service Provider Application',
    message: 'Vijaykumar Carpentry submitted Aadhaar card & license for Admin verification.',
    timestamp: '2026-07-20 09:12',
    read: false,
    type: 'verification',
    roleTarget: 'admin'
  }
];

export const FAQS = [
  {
    question: "What is ServiceLink Tamil Nadu?",
    answer: "ServiceLink is Tamil Nadu's leading SaaS marketplace that connects homeowners and businesses directly with verified, licensed local service professionals across Chennai, Coimbatore, Madurai, Trichy, Salem, and all districts."
  },
  {
    question: "How are Service Professionals verified on ServiceLink?",
    answer: "Every Service Provider undergoes strict Admin verification. Our Admin team inspects Government Grade Licenses (e.g. TN Electrical License, Plumbing Certificates), Aadhaar identity documents, police background checks, and past job references before approving their account."
  },
  {
    question: "How do I book a service and pay in Indian Rupees (INR ₹)?",
    answer: "Simply search for a service or professional, choose a convenient date and time slot, enter your address, and confirm your booking. Payments can be made safely via UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, or Net Banking in Indian Rupees (₹)."
  },
  {
    question: "What if I am not satisfied with the service provided?",
    answer: "We offer a 100% Service Quality Guarantee. If you encounter any issue, you can raise a Dispute directly from your Customer Dashboard. Our Admin Resolution team reviews photo/video evidence and arranges a free re-visit or refund within 24 hours."
  },
  {
    question: "How can I join ServiceLink as a Service Provider in Tamil Nadu?",
    answer: "Click 'Register as Provider' in the top menu, fill in your trade details, experience, service coverage area in Tamil Nadu, and upload your Aadhaar & License. Once our Admin team reviews and approves your application, you can log in and start receiving high-paying job leads!"
  }
];
