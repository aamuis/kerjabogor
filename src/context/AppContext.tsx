import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  AuthUser,
  SiteConfig,
  Job,
  JobSeekerProfile,
  Company,
  Application,
  InterviewSchedule,
  ChatMessage,
  NotificationItem,
  BogorLocation,
  TransportMode,
  TalentAssessmentResult,
  VideoIntroLink,
  ModerationReport,
  PackageType,
  Invoice,
  InvoiceStatus,
  CompanySubscription,
  PaymentSettingsConfig,
  EmployerPackageConfig,
  RecruitmentServiceConfig,
  ProofOfPayment,
  RecruitmentServiceRequest
} from '../types';

import {
  BOGOR_LOCATIONS,
  INITIAL_COMPANIES,
  INITIAL_JOBS,
  CAREER_ARTICLES,
  INITIAL_COMPANY_REVIEWS,
  DEFAULT_PAYMENT_SETTINGS,
  INITIAL_INVOICES,
  INITIAL_COMPANY_SUBSCRIPTION,
  DEFAULT_SITE_CONFIG
} from '../data/bogorData';

import { calculateDistanceKm, calculateJobMatch } from '../utils/distance';

interface AppContextType {
  // Authentication & Auth User
  authUser: AuthUser | null;
  loginUser: (email: string, role: UserRole, customName?: string, phone?: string, district?: string) => boolean;
  registerUser: (data: {
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    district?: string;
    companyName?: string;
    industry?: string;
  }) => boolean;
  logoutUser: () => void;
  adminUnlock: (pin: string) => boolean;
  isSecretAdminModalOpen: boolean;
  setIsSecretAdminModalOpen: (open: boolean) => void;
  openSecretAdminModal: () => void;
  closeSecretAdminModal: () => void;

  // Site Configuration & White-labeling
  siteConfig: SiteConfig;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  resetSiteConfig: () => void;

  // Roles & User
  role: UserRole;
  setRole: (role: UserRole) => void;
  seekerProfile: JobSeekerProfile;
  updateSeekerProfile: (updated: Partial<JobSeekerProfile>) => void;
  activeCompany: Company;
  updateCompanyProfile: (updated: Partial<Company>) => void;
  allCompanies: Company[];
  editCompany: (companyId: string, updated: Partial<Company>) => void;
  addCompany: (newCompany: Company) => void;

  // Location & Radius
  userLocation: BogorLocation;
  setUserLocation: (loc: BogorLocation) => void;
  radiusKm: number; // 0 for unlimited
  setRadiusKm: (radius: number) => void;
  transportMode: TransportMode;
  setTransportMode: (mode: TransportMode) => void;
  isGpsActive: boolean;
  requestGpsLocation: () => Promise<void>;

  // Jobs & Content Management
  jobs: Job[];
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  addJob: (newJob: Omit<Job, 'id' | 'postedDate' | 'status'>) => void;
  editJob: (jobId: string, updated: Partial<Job>) => void;
  deleteJob: (jobId: string) => void;
  updateJobStatus: (jobId: string, status: 'active' | 'closed' | 'draft') => void;

  // Applications & ATS
  applications: Application[];
  applyToJob: (
    jobId: string,
    data: {
      coverLetter?: string;
      answers?: { question: string; answer: string }[];
      portfolioUrl?: string;
      videoLink?: VideoIntroLink;
    }
  ) => boolean;
  updateApplicationStatus: (
    applicationId: string,
    newStatus: Application['status'],
    note?: string
  ) => void;

  // Interviews
  interviews: InterviewSchedule[];
  scheduleInterview: (interviewData: Omit<InterviewSchedule, 'id' | 'status'>) => void;
  updateInterviewStatus: (interviewId: string, status: InterviewSchedule['status']) => void;

  // Chats
  messages: ChatMessage[];
  sendMessage: (text: string, conversationId: string, isInterviewInvite?: boolean, interviewDetails?: InterviewSchedule) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Assessment
  saveAssessmentResult: (result: TalentAssessmentResult) => void;

  // Admin / Moderation
  reports: ModerationReport[];
  toggleCompanyVerification: (companyId: string) => void;
  resolveReport: (reportId: string) => void;

  // UI Toast
  toast: { message: string; type?: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // Selected Detail Navigation Helpers
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Monetization & Subscription System (Constraints 63 - 84)
  paymentSettings: PaymentSettingsConfig;
  updatePaymentSettings: (settings: Partial<PaymentSettingsConfig>) => void;
  invoices: Invoice[];
  createInvoice: (packageId: PackageType | string, targetJobId?: string, customAmount?: number) => Invoice;
  uploadProofOfPayment: (invoiceId: string, proofData: Omit<ProofOfPayment, 'uploadedAt'>) => void;
  verifyPayment: (invoiceId: string) => void;
  rejectPayment: (invoiceId: string, reason: string) => void;
  companySubscription: CompanySubscription;
  recruitmentRequests: RecruitmentServiceRequest[];
  submitRecruitmentRequest: (req: Omit<RecruitmentServiceRequest, 'id' | 'createdAt' | 'status'>) => void;
  activeInvoiceModal: Invoice | null;
  setActiveInvoiceModal: (inv: Invoice | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SEEKER: JobSeekerProfile = {
  id: 'seeker-abdul-1',
  name: 'Abdul Muis',
  email: 'aamuisx@gmail.com',
  phone: '0857-1234-5678',
  headline: 'Digital Marketing, Admin & Content Creator',
  bio: 'Pemuda berdomisili Bogor yang aktif, jujur, dan bersemangat dalam bidang pemasaran digital, pembuatan konten video, dan administrasi perkantoran.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
  location: BOGOR_LOCATIONS[0], // Bogor Tengah
  addressDetail: 'Jl. Paledang No. 18, RT 02/RW 04, Bogor Tengah, Kota Bogor',
  birthDate: '2002-05-14',
  gender: 'Laki-laki',
  educationLevel: 'SMA/SMK',
  major: 'Administrasi Perkantoran & Multimedia',
  expectedSalaryMin: 4000000,
  expectedSalaryMax: 6000000,
  preferredJobTypes: ['Full Time', 'Part Time', 'Harian'],
  preferredCategories: ['Admin & Office', 'Marketing & Sales', 'Restoran & Cafe'],
  skills: ['Microsoft Excel', 'Administrasi', 'Content Creation', 'CapCut', 'Komunikasi', 'Kasir POS', 'Pelayanan Ramah'],
  experiences: [
    {
      id: 'exp-1',
      company: 'Cafe & Roastery Bogor',
      position: 'Barista & Staff Kasir POS',
      startDate: '2024',
      endDate: '2025',
      current: false,
      description: 'Melayani pembayaran 200+ pengunjung per hari dan mengelola inventory stok harian.',
      location: 'Bogor Timur'
    },
    {
      id: 'exp-2',
      company: 'Toko Online Fashion Bogor',
      position: 'Staff Admin & Live Host TikTok',
      startDate: '2025',
      endDate: 'Sekarang',
      current: true,
      description: 'Merekap pesanan e-commerce dan mengadakan siaran langsung live selling TikTok.',
      location: 'Tanah Sareal'
    }
  ],
  educations: [
    {
      id: 'edu-1',
      institution: 'SMK Negeri 1 Bogor',
      degree: 'SMK',
      fieldOfStudy: 'Administrasi Perkantoran & Bisnis Daring',
      startYear: '2019',
      endYear: '2022',
      grade: '88/100'
    }
  ],
  certificates: [
    {
      id: 'cert-1',
      title: 'Sertifikasi Keahlian Administrasi & Microsoft Excel',
      issuer: 'BNSP / Lembaga Pelatihan Kerja Bogor',
      issueDate: '2024'
    },
    {
      id: 'cert-2',
      title: 'Dasar Pemasaran Digital & Social Media',
      issuer: 'Google Digital Talent Scholarship',
      issueDate: '2025'
    }
  ],
  portfolios: [
    {
      id: 'port-1',
      title: 'Kampanye Video TikTok Kuliner Bogor',
      description: 'Membuat video review makanan yang mencapai 120k views di TikTok.',
      category: 'Video & Media',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&auto=format&fit=crop&q=80',
      projectUrl: 'https://tiktok.com'
    },
    {
      id: 'port-2',
      title: 'Template Rekapitulasi Stock Opname Gudang',
      description: 'Sistem spreadsheet otomatis untuk monitoring keluar masuk barang.',
      category: 'Administrasi',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80'
    }
  ],
  videoLinks: [
    {
      id: 'v-1',
      title: 'Video Perkenalan Diri (60 Detik)',
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      description: 'Perkenalan singkat latar belakang pendidikan, keahlian, dan motivasi bekerja di Bogor.'
    }
  ],
  socialLinks: {
    instagram: 'https://instagram.com/abdulmuis.bogor',
    linkedin: 'https://linkedin.com/in/abdul-muis-demo'
  },
  assessmentCompleted: true,
  assessmentResult: {
    completedAt: '2026-08-20',
    primaryTrait: 'Komunikasi & Pemasaran',
    secondaryTrait: 'Administrasi & Logistik',
    scores: {
      'Komunikasi': 90,
      'Kreatif': 85,
      'Administrasi & Angka': 80,
      'Pelayanan & Hospitality': 78,
      'Teknis & IT': 70,
      'Logistik & Fisik': 65
    },
    summary: 'Kamu memiliki bakat alami dalam berinteraksi, meyakinkan orang lain, dan menyajikan ide secara persuasif dipadukan dengan ketelitian administrasi.',
    recommendedRoles: ['Digital Marketing Specialist', 'Admin Warehouse', 'Customer Service', 'Barista / Frontliner Cafe'],
    skillsToDevelop: ['Analisis Iklan Meta / Google Ads', 'Formula Excel Lanjutan', 'Public Speaking']
  },
  isFreshGraduate: false
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('kb_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [role, setRole] = useState<UserRole>(() => {
    const savedAuth = localStorage.getItem('kb_auth_user');
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        return parsed.role || 'seeker';
      } catch {
        return 'seeker';
      }
    }
    return 'seeker';
  });

  // Site Configuration & Customization (Admin white-labeling)
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('kb_site_config');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_CONFIG;
  });

  const [isSecretAdminModalOpen, setIsSecretAdminModalOpen] = useState<boolean>(false);

  const [seekerProfile, setSeekerProfile] = useState<JobSeekerProfile>(() => {
    const saved = localStorage.getItem('kb_seeker_profile');
    return saved ? JSON.parse(saved) : DEFAULT_SEEKER;
  });

  const [allCompanies, setAllCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem('kb_companies');
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });

  const [activeCompany, setActiveCompany] = useState<Company>(allCompanies[0]);

  const [userLocation, setUserLocation] = useState<BogorLocation>(() => {
    const saved = localStorage.getItem('kb_user_location');
    return saved ? JSON.parse(saved) : BOGOR_LOCATIONS[0];
  });

  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [transportMode, setTransportMode] = useState<TransportMode>('all');
  const [isGpsActive, setIsGpsActive] = useState<boolean>(false);

  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('kb_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('kb_saved_jobs');
    return saved ? JSON.parse(saved) : ['job-1', 'job-2'];
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('kb_applications');
    if (saved) return JSON.parse(saved);
    // Initial sample application
    return [
      {
        id: 'app-sample-1',
        jobId: 'job-1',
        jobTitle: 'Staff Admin Warehouse & Inventory',
        companyId: 'comp-3',
        companyName: 'PT Kahatex Logistik Citeureup',
        companyLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80',
        applicantId: 'seeker-abdul-1',
        applicantName: 'Abdul Muis',
        applicantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
        applicantHeadline: 'Digital Marketing & Admin Specialist',
        applicantEducation: 'SMK Administrasi Perkantoran',
        applicantSkills: ['Microsoft Excel', 'Administrasi', 'Stock Opname'],
        applicantLocation: 'Bogor Tengah',
        appliedDate: '2026-08-21',
        status: 'interview',
        statusHistory: [
          { status: 'submitted', updatedAt: '2026-08-21 09:15', note: 'Lamaran berhasil dikirimkan via Kerja Bogor.' },
          { status: 'received', updatedAt: '2026-08-21 11:30', note: 'HRD PT Kahatex Logistik telah membuka berkas profil Anda.' },
          { status: 'screening', updatedAt: '2026-08-21 14:00', note: 'Kualifikasi pengalaman dan skill Excel Anda lolos screening awal.' },
          { status: 'interview', updatedAt: '2026-08-22 10:00', note: 'Undangan interview kerja tatap muka di kantor Citeureup telah dikirimkan.' }
        ],
        coverLetter: 'Dengan hormat HRD PT Kahatex Logistik, saya tertarik melamar sebagai Staff Admin Warehouse. Saya memiliki pengalaman mengelola inventory dan siap bekerja disiplin di Citeureup.',
        matchScore: 95,
        aiFitSummary: 'Kandidat memiliki penguasaan Excel yang baik, domisili terjangkau di Bogor, dan pengalaman relevan dalam pencatatan stok barang.',
        interviewSchedule: {
          id: 'int-1',
          applicationId: 'app-sample-1',
          jobTitle: 'Staff Admin Warehouse & Inventory',
          companyName: 'PT Kahatex Logistik Citeureup',
          applicantName: 'Abdul Muis',
          date: '2026-08-24',
          time: '10.00 WIB',
          type: 'Tatap Muka di Kantor',
          locationOrLink: 'Kantor Operasional PT Kahatex, Jl. Mayor Oking No. 88, Citeureup, Kab. Bogor',
          notes: 'Membawa print CV, KTP asli, dan memakai pakaian kemeja rapi.',
          status: 'scheduled'
        }
      }
    ];
  });

  const [interviews, setInterviews] = useState<InterviewSchedule[]>(() => {
    const saved = localStorage.getItem('kb_interviews');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'int-1',
        applicationId: 'app-sample-1',
        jobTitle: 'Staff Admin Warehouse & Inventory',
        companyName: 'PT Kahatex Logistik Citeureup',
        applicantName: 'Abdul Muis',
        date: '2026-08-24',
        time: '10.00 WIB',
        type: 'Tatap Muka di Kantor',
        locationOrLink: 'Kantor Operasional PT Kahatex, Jl. Mayor Oking No. 88, Citeureup, Kab. Bogor',
        notes: 'Membawa print CV, KTP asli, dan memakai pakaian kemeja rapi.',
        status: 'scheduled'
      }
    ];
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('kb_messages');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'msg-1',
        conversationId: 'comp-3_seeker-abdul-1',
        senderId: 'comp-3',
        senderRole: 'employer',
        senderName: 'HRD PT Kahatex Logistik',
        text: 'Halo Abdul! Kami telah meninjau profil dan video perkenalan Anda. Kami tertarik untuk mengundang Anda interview langsung di kantor Citeureup.',
        timestamp: '10:05 WIB',
        isInterviewInvite: true
      },
      {
        id: 'msg-2',
        conversationId: 'comp-3_seeker-abdul-1',
        senderId: 'seeker-abdul-1',
        senderRole: 'seeker',
        senderName: 'Abdul Muis',
        text: 'Selamat pagi Bu HRD. Terima kasih atas kesempatannya! Saya konfirmasi siap hadir pada Senin, 24 Agustus 2026 pukul 10.00 WIB.',
        timestamp: '10:12 WIB'
      }
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      userId: 'seeker-abdul-1',
      title: '🎉 Undangan Interview Masuk!',
      message: 'PT Kahatex Logistik Citeureup mengundang Anda untuk interview posisi Staff Admin Warehouse.',
      type: 'interview',
      timestamp: '2 jam yang lalu',
      read: false,
      actionUrl: 'applications'
    },
    {
      id: 'notif-2',
      userId: 'seeker-abdul-1',
      title: '⚡ Loker Butuh Hari Ini di Dekatmu',
      message: 'Kopi Nako Pajajaran (2.1 KM) butuh 2 Waiter/Kasir mulai besok.',
      type: 'urgent',
      timestamp: '4 jam yang lalu',
      read: false,
      actionUrl: 'search'
    },
    {
      id: 'notif-3',
      userId: 'seeker-abdul-1',
      title: '✨ 95% Match dengan Profilmu',
      message: 'Lowongan Operator Produksi PT Nutrifood Sentul cocok dengan keahlianmu.',
      type: 'job_match',
      timestamp: '1 hari yang lalu',
      read: true,
      actionUrl: 'search'
    }
  ]);

  const [reports, setReports] = useState<ModerationReport[]>([
    {
      id: 'rep-1',
      type: 'job',
      targetId: 'job-demo-fake',
      targetName: 'Lowongan Kerja Administrasi Tanpa Kejelasan Alamat',
      reporterName: 'Siti Rahma',
      reason: 'Informasi gaji tidak sesuai dan meminta biaya pendaftaran',
      details: 'Diminta transfer uang seragam sebelum interview.',
      status: 'pending',
      createdAt: '2026-08-22'
    }
  ]);

  // Monetization & Subscription States
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettingsConfig>(() => {
    const saved = localStorage.getItem('kb_payment_settings');
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_SETTINGS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('kb_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [companySubscription, setCompanySubscription] = useState<CompanySubscription>(() => {
    const saved = localStorage.getItem('kb_company_subscription');
    return saved ? JSON.parse(saved) : INITIAL_COMPANY_SUBSCRIPTION;
  });

  const [recruitmentRequests, setRecruitmentRequests] = useState<RecruitmentServiceRequest[]>(() => {
    const saved = localStorage.getItem('kb_recruitment_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeInvoiceModal, setActiveInvoiceModal] = useState<Invoice | null>(null);

  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' | 'warning' } | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('kb_seeker_profile', JSON.stringify(seekerProfile));
  }, [seekerProfile]);

  useEffect(() => {
    localStorage.setItem('kb_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('kb_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('kb_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('kb_interviews', JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem('kb_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('kb_user_location', JSON.stringify(userLocation));
  }, [userLocation]);

  useEffect(() => {
    localStorage.setItem('kb_payment_settings', JSON.stringify(paymentSettings));
  }, [paymentSettings]);

  useEffect(() => {
    localStorage.setItem('kb_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('kb_company_subscription', JSON.stringify(companySubscription));
  }, [companySubscription]);

  useEffect(() => {
    localStorage.setItem('kb_recruitment_requests', JSON.stringify(recruitmentRequests));
  }, [recruitmentRequests]);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem('kb_auth_user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('kb_auth_user');
    }
  }, [authUser]);

  useEffect(() => {
    localStorage.setItem('kb_site_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  // Recalculate distances dynamically whenever user location changes
  const computedJobs: Job[] = jobs.map((job) => {
    const dist = calculateDistanceKm(
      userLocation.latitude,
      userLocation.longitude,
      job.location.latitude,
      job.location.longitude
    );
    return {
      ...job,
      distanceKm: dist
    };
  });

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // -----------------------------------------------------------
  // AUTHENTICATION HANDLERS
  // -----------------------------------------------------------
  const loginUser = (
    email: string,
    targetRole: UserRole,
    customName?: string,
    phone?: string,
    district?: string
  ): boolean => {
    const defaultName = targetRole === 'seeker' ? 'Abdul Muis' : targetRole === 'employer' ? 'HRD PT Nutrifood Sentul' : 'Admin Utama';
    const user: AuthUser = {
      id: `user-${Date.now()}`,
      name: customName || defaultName,
      email,
      role: targetRole,
      phone: phone || (targetRole === 'seeker' ? seekerProfile.phone : activeCompany.phone),
      district: district || (targetRole === 'seeker' ? seekerProfile.location.district : activeCompany.location.district),
      companyId: targetRole === 'employer' ? activeCompany.id : undefined,
      avatarUrl: targetRole === 'seeker' ? seekerProfile.avatarUrl : activeCompany.logo
    };

    setAuthUser(user);
    setRole(targetRole);

    if (targetRole === 'seeker' && customName) {
      setSeekerProfile((prev) => ({
        ...prev,
        name: customName,
        email,
        phone: phone || prev.phone,
        location: district ? (BOGOR_LOCATIONS.find((l) => l.district === district) || prev.location) : prev.location
      }));
    }

    showToast(`Selamat datang kembali, ${user.name}!`);
    return true;
  };

  const registerUser = (data: {
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    district?: string;
    companyName?: string;
    industry?: string;
  }): boolean => {
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      district: data.district
    };

    if (data.role === 'seeker') {
      const loc = BOGOR_LOCATIONS.find((l) => l.district === data.district) || BOGOR_LOCATIONS[0];
      setSeekerProfile((prev) => ({
        ...prev,
        id: newUser.id,
        name: data.name,
        email: data.email,
        phone: data.phone || '0857-0000-0000',
        location: loc
      }));
    } else if (data.role === 'employer') {
      const compId = `comp-${Date.now()}`;
      const loc = BOGOR_LOCATIONS.find((l) => l.district === data.district) || BOGOR_LOCATIONS[1];
      const newComp: Company = {
        id: compId,
        name: data.companyName || data.name,
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=160&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
        industry: data.industry || 'Usaha & Retail Lokal Bogor',
        description: `Profil rekrutmen resmi ${data.companyName || data.name} di wilayah ${loc.district}.`,
        location: loc,
        address: `Jl. Raya ${loc.district}, Bogor`,
        website: '',
        phone: data.phone || '0251-800000',
        email: data.email,
        isVerified: true,
        employeeCount: '10-50 Karyawan',
        workplacePhotos: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80'
        ],
        benefits: ['Gaji Pokok', 'Tunjangan Transportasi', 'BPJS'],
        rating: 5.0,
        reviewCount: 1
      };

      setAllCompanies((prev) => [newComp, ...prev]);
      setActiveCompany(newComp);
      newUser.companyId = compId;
    }

    setAuthUser(newUser);
    setRole(data.role);
    showToast(`Pendaftaran akun ${data.role === 'seeker' ? 'Pencari Kerja' : 'Perusahaan'} berhasil!`);
    return true;
  };

  const logoutUser = () => {
    setAuthUser(null);
    setRole('seeker');
    setActiveTab('home');
    showToast('Anda telah keluar dari akun.');
  };

  const adminUnlock = (pin: string): boolean => {
    if (pin.trim() === siteConfig.adminSecretPin || pin.trim() === 'bogor2026') {
      const adminUser: AuthUser = {
        id: 'admin-master',
        name: 'Pengelola / Admin Kerja Bogor',
        email: 'admin@kerjabogor.id',
        role: 'admin'
      };
      setAuthUser(adminUser);
      setRole('admin');
      setIsSecretAdminModalOpen(false);
      showToast('Akses Admin Utama Berhasil Dibuka!', 'success');
      return true;
    }
    showToast('PIN Akses Admin Salah! Silakan coba lagi.', 'warning');
    return false;
  };

  // -----------------------------------------------------------
  // SITE CONFIGURATION & CUSTOMIZATION HANDLERS
  // -----------------------------------------------------------
  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({
      ...prev,
      ...newConfig
    }));
    showToast('Pengaturan tampilan situs berhasil diperbarui!', 'success');
  };

  const resetSiteConfig = () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    showToast('Tampilan situs dikembalikan ke default.', 'info');
  };

  // -----------------------------------------------------------
  // CONTENT MANAGEMENT (JOBS & COMPANIES)
  // -----------------------------------------------------------
  const editJob = (jobId: string, updated: Partial<Job>) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, ...updated } : j))
    );
    showToast('Informasi lowongan berhasil diupdate!');
  };

  const deleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    showToast('Lowongan berhasil dihapus dari database.');
  };

  const editCompany = (companyId: string, updated: Partial<Company>) => {
    setAllCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, ...updated } : c))
    );
    if (activeCompany.id === companyId) {
      setActiveCompany((prev) => ({ ...prev, ...updated }));
    }
    showToast('Data perusahaan berhasil diperbarui!');
  };

  const addCompany = (newCompany: Company) => {
    setAllCompanies((prev) => [newCompany, ...prev]);
    showToast(`Perusahaan "${newCompany.name}" berhasil ditambahkan!`);
  };

  const updateSeekerProfile = (updated: Partial<JobSeekerProfile>) => {
    setSeekerProfile((prev) => ({ ...prev, ...updated }));
    showToast('Profil dan CV berhasil diperbarui!');
  };

  const updateCompanyProfile = (updated: Partial<Company>) => {
    setActiveCompany((prev) => {
      const next = { ...prev, ...updated };
      setAllCompanies((comps) => comps.map((c) => (c.id === next.id ? next : c)));
      return next;
    });
    showToast('Profil perusahaan berhasil disimpan.');
  };

  const requestGpsLocation = async () => {
    if (!navigator.geolocation) {
      showToast('Perangkat tidak mendukung geolokasi GPS.', 'warning');
      return;
    }

    try {
      showToast('Mendeteksi koordinat lokasi Bogor kamu...', 'info');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          // Find closest Bogor district
          let closest = BOGOR_LOCATIONS[0];
          let minDist = 9999;
          BOGOR_LOCATIONS.forEach((loc) => {
            const d = calculateDistanceKm(lat, lng, loc.latitude, loc.longitude);
            if (d < minDist) {
              minDist = d;
              closest = loc;
            }
          });

          setUserLocation({
            id: 'loc-gps-live',
            name: `${closest.district} (GPS Terdeteksi)`,
            type: closest.type,
            district: closest.district,
            latitude: lat,
            longitude: lng
          });
          setIsGpsActive(true);
          showToast(`Lokasi aktif: ${closest.district} (${closest.type})`);
        },
        () => {
          showToast('Izin lokasi tidak diberikan. Menggunakan default Bogor Tengah.', 'info');
        }
      );
    } catch {
      showToast('Gagal memuat GPS. Silakan pilih kecamatan secara manual.', 'warning');
    }
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      if (exists) {
        showToast('Lowongan dihapus dari tersimpan.');
        return prev.filter((id) => id !== jobId);
      } else {
        showToast('Lowongan berhasil disimpan!');
        return [...prev, jobId];
      }
    });
  };

  const addJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'status'>) => {
    const newId = `job-${Date.now()}`;
    const newJob: Job = {
      ...newJobData,
      id: newId,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      isVerifiedCompany: activeCompany.isVerified
    };
    setJobs((prev) => [newJob, ...prev]);
    showToast(`Lowongan "${newJob.title}" berhasil dipasang!`);
  };

  const updateJobStatus = (jobId: string, status: 'active' | 'closed' | 'draft') => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status } : j))
    );
    showToast(`Status lowongan diubah menjadi ${status}.`);
  };

  const applyToJob = (
    jobId: string,
    data: {
      coverLetter?: string;
      answers?: { question: string; answer: string }[];
      portfolioUrl?: string;
      videoLink?: VideoIntroLink;
    }
  ) => {
    const targetJob = computedJobs.find((j) => j.id === jobId);
    if (!targetJob) return false;

    const alreadyApplied = applications.some(
      (app) => app.jobId === jobId && app.applicantId === seekerProfile.id
    );

    if (alreadyApplied) {
      showToast('Anda sudah pernah mengirimkan lamaran untuk posisi ini.', 'warning');
      return false;
    }

    const match = calculateJobMatch(targetJob, seekerProfile);

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      companyId: targetJob.companyId,
      companyName: targetJob.companyName,
      companyLogo: targetJob.companyLogo,
      applicantId: seekerProfile.id,
      applicantName: seekerProfile.name,
      applicantAvatar: seekerProfile.avatarUrl,
      applicantHeadline: seekerProfile.headline,
      applicantEducation: `${seekerProfile.educationLevel} - ${seekerProfile.major}`,
      applicantSkills: seekerProfile.skills,
      applicantLocation: `${seekerProfile.location.district}, ${seekerProfile.location.type}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'submitted',
      statusHistory: [
        {
          status: 'submitted',
          updatedAt: new Date().toLocaleString('id-ID'),
          note: 'Lamaran dikirim via Kerja Bogor beserta CV dan Portofolio.'
        }
      ],
      coverLetter: data.coverLetter,
      answers: data.answers,
      portfolioUrl: data.portfolioUrl || (seekerProfile.portfolios[0]?.projectUrl ?? ''),
      videoLink: data.videoLink || seekerProfile.videoLinks[0],
      matchScore: match.score,
      aiFitSummary: `Kandidat berjarak ${targetJob.distanceKm ?? 3.5} KM dari lokasi kerja. Menguasai ${seekerProfile.skills.slice(0, 3).join(', ')} dan siap bergabung.`
    };

    setApplications((prev) => [newApp, ...prev]);

    // Send notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: seekerProfile.id,
        title: '✅ Lamaran Terkirim!',
        message: `Lamaran untuk "${targetJob.title}" di ${targetJob.companyName} berhasil terkirim.`,
        type: 'application',
        timestamp: 'Baru saja',
        read: false,
        actionUrl: 'applications'
      },
      ...prev
    ]);

    showToast('🎉 Lamaran kerja berhasil dikirimkan!');
    return true;
  };

  const updateApplicationStatus = (
    applicationId: string,
    newStatus: Application['status'],
    note?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          const updatedHistory = [
            ...app.statusHistory,
            {
              status: newStatus,
              updatedAt: new Date().toLocaleString('id-ID'),
              note: note || `Status diperbarui menjadi: ${newStatus}`
            }
          ];
          return {
            ...app,
            status: newStatus,
            statusHistory: updatedHistory
          };
        }
        return app;
      })
    );
    showToast(`Status pelamar diubah menjadi "${newStatus}"`);
  };

  const scheduleInterview = (interviewData: Omit<InterviewSchedule, 'id' | 'status'>) => {
    const newInterview: InterviewSchedule = {
      ...interviewData,
      id: `int-${Date.now()}`,
      status: 'scheduled'
    };

    setInterviews((prev) => [newInterview, ...prev]);

    // Also update the target application status to 'interview'
    updateApplicationStatus(
      interviewData.applicationId,
      'interview',
      `Jadwal interview pada ${interviewData.date} pukul ${interviewData.time} (${interviewData.type}).`
    );

    // Auto send message to applicant
    sendMessage(
      `Halo ${interviewData.applicantName}, kami mengundang Anda untuk sesi wawancara:\n📅 Tanggal: ${interviewData.date}\n⏰ Jam: ${interviewData.time}\n📍 Tempat/Link: ${interviewData.locationOrLink}\n📝 Catatan: ${interviewData.notes}`,
      `comp-${activeCompany.id}_seeker-abdul-1`,
      true,
      newInterview
    );

    showToast('Jadwal interview berhasil dibuat dan dikirim ke kandidat!');
  };

  const updateInterviewStatus = (interviewId: string, status: InterviewSchedule['status']) => {
    setInterviews((prev) =>
      prev.map((i) => (i.id === interviewId ? { ...i, status } : i))
    );
    showToast(`Status interview diubah menjadi ${status}`);
  };

  const sendMessage = (
    text: string,
    conversationId: string,
    isInterviewInvite?: boolean,
    interviewDetails?: InterviewSchedule
  ) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: role === 'seeker' ? seekerProfile.id : activeCompany.id,
      senderRole: role,
      senderName: role === 'seeker' ? seekerProfile.name : activeCompany.name,
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      isInterviewInvite,
      interviewDetails
    };

    setMessages((prev) => [...prev, newMsg]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Semua notifikasi telah ditandai sudah dibaca.');
  };

  const saveAssessmentResult = (result: TalentAssessmentResult) => {
    setSeekerProfile((prev) => ({
      ...prev,
      assessmentCompleted: true,
      assessmentResult: result
    }));
    showToast('Hasil tes minat & bakat berhasil disimpan di profilmu!');
  };

  const toggleCompanyVerification = (companyId: string) => {
    setAllCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, isVerified: !c.isVerified } : c))
    );
    showToast('Status verifikasi perusahaan diperbarui.');
  };

  const resolveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'resolved' } : r))
    );
    showToast('Laporan ditandai telah ditangani oleh Admin.');
  };

  // -----------------------------------------------------------
  // MONETIZATION HANDLERS (Constraints 63 - 84)
  // -----------------------------------------------------------

  const updatePaymentSettings = (settings: Partial<PaymentSettingsConfig>) => {
    setPaymentSettings((prev) => ({
      ...prev,
      ...settings
    }));
    showToast('Pengaturan pembayaran & harga paket berhasil diperbarui!', 'success');
  };

  const createInvoice = (
    packageId: PackageType | string,
    targetJobId?: string,
    customAmount?: number
  ): Invoice => {
    const pkg = paymentSettings.packages.find((p) => p.id === packageId);
    const targetJob = targetJobId ? jobs.find((j) => j.id === targetJobId) : undefined;
    const now = new Date();
    const prefix = paymentSettings.invoicePrefix || 'KB';
    const invoiceNum = String(invoices.length + 1).padStart(4, '0');
    const monthStr = String(now.getMonth() + 1).padStart(2, '0');
    const invoiceId = `${prefix}-${now.getFullYear()}${monthStr}-${invoiceNum}`;

    const amount = customAmount !== undefined ? customAmount : (pkg ? pkg.price : 0);
    const packageName = pkg ? `${pkg.name} (${pkg.periodLabel})` : 'Paket Custom';
    const periodDays = pkg ? pkg.durationDays : 30;

    const due = new Date();
    due.setDate(due.getDate() + 1);
    const dueDateStr = due.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const createdAtStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const newInvoice: Invoice = {
      id: invoiceId,
      companyId: activeCompany.id,
      companyName: activeCompany.name,
      companyEmail: activeCompany.email,
      companyPhone: activeCompany.phone,
      packageId,
      packageName,
      targetJobId,
      targetJobTitle: targetJob?.title,
      amount,
      periodDays,
      createdAt: createdAtStr,
      dueDate: dueDateStr,
      status: 'pending',
      paymentMethod: `Transfer Bank (${paymentSettings.bankName})`,
      bankDetails: {
        bankName: paymentSettings.bankName,
        accountHolder: paymentSettings.accountHolder,
        accountNumber: paymentSettings.accountNumber
      },
      notes: 'Menunggu pembayaran transfer bank'
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    setActiveInvoiceModal(newInvoice);
    showToast(`Invoice ${invoiceId} berhasil dibuat. Silakan selesaikan pembayaran.`, 'info');
    return newInvoice;
  };

  const uploadProofOfPayment = (invoiceId: string, proofData: Omit<ProofOfPayment, 'uploadedAt'>) => {
    const uploadedAtStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const fullProof: ProofOfPayment = {
      ...proofData,
      uploadedAt: uploadedAtStr
    };

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: 'pending',
              proofOfPayment: fullProof,
              notes: 'Menunggu verifikasi admin'
            }
          : inv
      )
    );

    // Add notification to admin
    const newNotif: NotificationItem = {
      id: `notif-pay-${Date.now()}`,
      userId: 'admin-1',
      title: '💳 Bukti Pembayaran Masuk',
      message: `${activeCompany.name} telah mengunggah bukti pembayaran untuk invoice ${invoiceId} sebesar Rp${proofData.nominal.toLocaleString('id-ID')}.`,
      type: 'system',
      timestamp: 'Baru saja',
      read: false,
      actionUrl: 'payments'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('Bukti transfer berhasil dikirim! Status kini: Menunggu Verifikasi Admin.', 'success');
  };

  const verifyPayment = (invoiceId: string) => {
    const targetInvoice = invoices.find((i) => i.id === invoiceId);
    if (!targetInvoice) return;

    const now = new Date();
    const verifiedAtStr = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    // 1. Update invoice status to 'verified'
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: 'verified',
              verifiedAt: verifiedAtStr,
              verifiedBy: 'Admin Kerja Bogor',
              notes: 'Pembayaran telah diverifikasi. Layanan aktif.'
            }
          : inv
      )
    );

    // 2. If targetJobId was specified, update the job with badges/flags
    if (targetInvoice.targetJobId) {
      setJobs((prev) =>
        prev.map((j) => {
          if (j.id === targetInvoice.targetJobId) {
            const updatedTags = [...j.tags];
            let isUrgent = j.isUrgentHiring;

            if (targetInvoice.packageId === 'urgent') {
              isUrgent = true;
              if (!updatedTags.includes('⚡ Butuh Hari Ini')) updatedTags.unshift('⚡ Butuh Hari Ini');
            } else if (targetInvoice.packageId === 'featured') {
              if (!updatedTags.includes('⭐ Featured Job')) updatedTags.unshift('⭐ Featured Job');
            } else if (targetInvoice.packageId === 'boost') {
              if (!updatedTags.includes('🚀 Boosted')) updatedTags.unshift('🚀 Boosted');
            }

            return {
              ...j,
              isUrgentHiring: isUrgent,
              tags: updatedTags
            };
          }
          return j;
        })
      );
    }

    // 3. If subscription package (pro, business, enterprise) or general package:
    const startDateObj = new Date();
    const endDateObj = new Date();
    endDateObj.setDate(startDateObj.getDate() + (targetInvoice.periodDays || 30));

    const startDateStr = startDateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const endDateStr = endDateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    if (['pro', 'business', 'enterprise'].includes(targetInvoice.packageId as string)) {
      const activeSlots = targetInvoice.packageId === 'business' ? 15 : targetInvoice.packageId === 'enterprise' ? 99 : 5;
      setCompanySubscription({
        id: `sub-${targetInvoice.companyId}-${Date.now()}`,
        companyId: targetInvoice.companyId,
        packageId: targetInvoice.packageId as PackageType,
        packageName: targetInvoice.packageName,
        status: 'active',
        startDate: startDateStr,
        endDate: endDateStr,
        daysRemaining: targetInvoice.periodDays || 30,
        activeJobSlots: activeSlots,
        isFeaturedCompany: true,
        hasAiMatching: true,
        hasCandidateDirectChat: true,
        hasInterviewScheduler: true,
        lastInvoiceId: targetInvoice.id
      });
    }

    // 4. Send notification to employer
    const compNotif: NotificationItem = {
      id: `notif-comp-verified-${Date.now()}`,
      userId: targetInvoice.companyId,
      title: '🎉 Pembayaran Berhasil Diverifikasi',
      message: `Pembayaran ${targetInvoice.id} (${targetInvoice.packageName}) telah diverifikasi. Fitur aktif sampai ${endDateStr}.`,
      type: 'system',
      timestamp: 'Baru saja',
      read: false,
      actionUrl: 'subscription'
    };
    setNotifications((prev) => [compNotif, ...prev]);

    showToast(`✓ Invoice ${invoiceId} berhasil diverifikasi! Fitur otomatis aktif.`, 'success');
  };

  const rejectPayment = (invoiceId: string, reason: string) => {
    const targetInvoice = invoices.find((i) => i.id === invoiceId);
    if (!targetInvoice) return;

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: 'rejected',
              rejectedReason: reason,
              notes: `Ditolak: ${reason}`
            }
          : inv
      )
    );

    const compNotif: NotificationItem = {
      id: `notif-comp-rej-${Date.now()}`,
      userId: targetInvoice.companyId,
      title: '✕ Pembayaran Ditolak',
      message: `Bukti transfer invoice ${invoiceId} ditolak. Alasan: ${reason}. Silakan upload bukti yang sesuai.`,
      type: 'system',
      timestamp: 'Baru saja',
      read: false,
      actionUrl: 'subscription'
    };
    setNotifications((prev) => [compNotif, ...prev]);

    showToast(`Invoice ${invoiceId} ditolak.`, 'warning');
  };

  const submitRecruitmentRequest = (req: Omit<RecruitmentServiceRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: RecruitmentServiceRequest = {
      ...req,
      id: `rec-req-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'pending'
    };

    setRecruitmentRequests((prev) => [newReq, ...prev]);

    // Admin notification
    const adminNotif: NotificationItem = {
      id: `notif-rec-srv-${Date.now()}`,
      userId: 'admin-1',
      title: '🤝 Permintaan Recruitment Service Baru',
      message: `${req.companyName} mengajukan permintaan ${req.packageName} untuk posisi ${req.positionTitle} (${req.candidateCount} kandidat).`,
      type: 'system',
      timestamp: 'Baru saja',
      read: false,
      actionUrl: 'payments'
    };
    setNotifications((prev) => [adminNotif, ...prev]);

    showToast('Permintaan Recruitment Service berhasil diajukan! Tim Kerja Bogor akan segera menghubungi kontak Anda.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        authUser,
        loginUser,
        registerUser,
        logoutUser,
        adminUnlock,
        isSecretAdminModalOpen,
        setIsSecretAdminModalOpen,
        openSecretAdminModal: () => setIsSecretAdminModalOpen(true),
        closeSecretAdminModal: () => setIsSecretAdminModalOpen(false),
        siteConfig,
        updateSiteConfig,
        resetSiteConfig,
        role,
        setRole,
        seekerProfile,
        updateSeekerProfile,
        activeCompany,
        updateCompanyProfile,
        allCompanies,
        editCompany,
        addCompany,
        userLocation,
        setUserLocation,
        radiusKm,
        setRadiusKm,
        transportMode,
        setTransportMode,
        isGpsActive,
        requestGpsLocation,
        jobs: computedJobs,
        savedJobIds,
        toggleSaveJob,
        addJob,
        editJob,
        deleteJob,
        updateJobStatus,
        applications,
        applyToJob,
        updateApplicationStatus,
        interviews,
        scheduleInterview,
        updateInterviewStatus,
        messages,
        sendMessage,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        saveAssessmentResult,
        reports,
        toggleCompanyVerification,
        resolveReport,
        toast,
        showToast,
        selectedJobId,
        setSelectedJobId,
        selectedCompanyId,
        setSelectedCompanyId,
        activeTab,
        setActiveTab,
        paymentSettings,
        updatePaymentSettings,
        invoices,
        createInvoice,
        uploadProofOfPayment,
        verifyPayment,
        rejectPayment,
        companySubscription,
        recruitmentRequests,
        submitRecruitmentRequest,
        activeInvoiceModal,
        setActiveInvoiceModal
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
