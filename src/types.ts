export type UserRole = 'seeker' | 'employer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  district?: string;
  companyId?: string;
  avatarUrl?: string;
}

export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  logoUrl?: string;
  logoType: 'text' | 'image';
  primaryColor: string; // e.g. '#059669' (emerald-600)
  primaryColorHover: string; // e.g. '#047857' (emerald-700)
  secondaryColor: string; // e.g. '#0f766e' (teal-700)
  accentColor: string; // e.g. '#10b981' (emerald-500)
  titleColor: string; // e.g. '#0f172a' (slate-900)
  themePreset: 'emerald' | 'teal' | 'indigo' | 'blue' | 'purple' | 'rose' | 'amber' | 'custom';
  heroTitle: string;
  heroSubtitle: string;
  footerText: string;
  contactWhatsapp: string;
  announcement: {
    enabled: boolean;
    text: string;
    linkText?: string;
  };
  adminSecretPin: string;
}

export type JobType = 'Full Time' | 'Part Time' | 'Freelance' | 'Magang' | 'Harian';

export type EducationLevel = 'Semua Pendidikan' | 'SMP' | 'SMA/SMK' | 'D3' | 'D4/S1' | 'S2';

export type TransportMode = 'all' | 'walk' | 'motor' | 'car' | 'transit';

export type ApplicationStatus = 
  | 'submitted'    // Lamaran Terkirim
  | 'received'     // Lamaran Diterima
  | 'screening'    // Screening / Peninjauan
  | 'in_progress'  // Sedang Diproses
  | 'interview'    // Jadwal Interview
  | 'accepted'     // Diterima Kerja
  | 'rejected';    // Tidak Sesuai

export interface BogorLocation {
  id: string;
  name: string;
  type: 'Kota Bogor' | 'Kabupaten Bogor';
  district: string; // Kecamatan
  latitude: number;
  longitude: number;
}

export interface VideoIntroLink {
  id: string;
  title: string;
  platform: 'youtube' | 'tiktok' | 'instagram';
  url: string;
  embedUrl?: string;
  description?: string;
  thumbnailUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  category: string;
}

export interface JobSeekerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  headline: string;
  title?: string;
  workStatus?: 'Siap Bekerja' | 'Sedang Bekerja' | 'Terbuka untuk Tawaran';
  bio: string;
  avatarUrl: string;
  location: BogorLocation;
  addressDetail: string;
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan';
  educationLevel: EducationLevel;
  major: string;
  expectedSalaryMin: number;
  expectedSalaryMax: number;
  preferredJobTypes: JobType[];
  preferredCategories: string[];
  skills: string[];
  experiences: ExperienceItem[];
  experience?: ExperienceItem[];
  educations: EducationItem[];
  education?: EducationItem[];
  certificates: CertificateItem[];
  certifications?: CertificateItem[];
  portfolios: PortfolioItem[];
  videoLinks: VideoIntroLink[];
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    github?: string;
    portfolio?: string;
  };
  assessmentCompleted: boolean;
  assessmentResult?: TalentAssessmentResult;
  isFreshGraduate: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  industry: string;
  description: string;
  location: BogorLocation;
  address: string;
  website: string;
  phone: string;
  email: string;
  isVerified: boolean;
  employeeCount: string;
  workplacePhotos: string[];
  benefits: string[];
  rating: number;
  reviewCount: number;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  isVerifiedCompany: boolean;
  location: BogorLocation;
  distanceKm?: number; // Calculated dynamically based on seeker location
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: 'bulan' | 'hari' | 'project';
  salaryDisclosed: boolean;
  jobType: JobType;
  category: string;
  education: EducationLevel;
  experienceRequiredYears: number; // 0 for fresh grad/no experience
  isFreshGraduateFriendly: boolean;
  isTrainingProvided: boolean;
  isUrgentHiring: boolean; // "BUTUH ORANG HARI INI"
  urgentStartDate?: string;
  urgentDuration?: string;
  openPositions: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  workingHours: string;
  skillsRequired: string[];
  screeningQuestions?: string[];
  postedDate: string;
  deadline: string;
  status: 'active' | 'closed' | 'draft';
  recruitmentProcessDays: number; // e.g. 1-3 hari for Kerja Cepat
  tags: string[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  applicantId: string;
  applicantName: string;
  applicantAvatar: string;
  applicantHeadline: string;
  applicantEducation: string;
  applicantSkills: string[];
  applicantLocation: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusHistory: {
    status: ApplicationStatus;
    updatedAt: string;
    note?: string;
  }[];
  coverLetter?: string;
  answers?: { question: string; answer: string }[];
  portfolioUrl?: string;
  videoLink?: VideoIntroLink;
  matchScore: number;
  aiFitSummary?: string;
  interviewSchedule?: InterviewSchedule;
  notes?: string;
}

export interface InterviewSchedule {
  id: string;
  applicationId: string;
  jobTitle: string;
  companyName: string;
  applicantName: string;
  date: string;
  time: string;
  type: 'Online (Google Meet / Zoom)' | 'Tatap Muka di Kantor';
  locationOrLink: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: UserRole;
  senderName: string;
  text: string;
  timestamp: string;
  isInterviewInvite?: boolean;
  interviewDetails?: InterviewSchedule;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'application' | 'interview' | 'job_match' | 'urgent' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface TalentAssessmentQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    trait: 'Komunikasi' | 'Logistik & Fisik' | 'Teknis & IT' | 'Kreatif' | 'Pelayanan & Hospitality' | 'Administrasi & Angka';
    score: number;
  }[];
}

export interface TalentAssessmentResult {
  completedAt: string;
  primaryTrait: string;
  secondaryTrait: string;
  scores: Record<string, number>;
  summary: string;
  recommendedRoles: string[];
  skillsToDevelop: string[];
}

export interface CompanyReview {
  id: string;
  companyId: string;
  companyName: string;
  reviewerName: string;
  rating: number; // 1-5
  categories: {
    workEnvironment: number;
    communication: number;
    recruitmentProcess: number;
    professionalism: number;
  };
  reviewText: string;
  createdAt: string;
  isModerated: boolean;
}

export interface CareerArticle {
  id: string;
  title: string;
  category: 'CV & Lamaran' | 'Tips Interview' | 'Fresh Graduate' | 'Skill In-Demand' | 'Info Bogor';
  excerpt: string;
  summary?: string;
  content: string;
  author: string;
  readTime: string;
  publishedAt: string;
  imageUrl: string;
  tags: string[];
}

export interface ModerationReport {
  id: string;
  type: 'job' | 'company' | 'user';
  targetId: string;
  targetName: string;
  reporterName: string;
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

// -------------------------------------------------------------
// MONETIZATION & PAYMENT TYPES (Constraints 63 - 84)
// -------------------------------------------------------------

export type PackageType = 'free' | 'boost' | 'featured' | 'urgent' | 'pro' | 'business' | 'enterprise';

export type InvoiceStatus = 'pending' | 'verified' | 'rejected' | 'expired' | 'refunded';

export interface EmployerPackageConfig {
  id: PackageType;
  name: string;
  badge?: string;
  price: number;
  periodLabel: string;
  description: string;
  features: string[];
  ctaText: string;
  highlight?: boolean;
  perJob?: boolean;
  durationDays: number;
}

export interface RecruitmentServiceConfig {
  id: string;
  name: string;
  minPrice: number;
  description: string;
  features: string[];
  durationLabel: string;
}

export interface PaymentSettingsConfig {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  paymentInstructions: string;
  supportContact: string;
  currency: string;
  invoicePrefix: string;
  packages: EmployerPackageConfig[];
  recruitmentServices: RecruitmentServiceConfig[];
}

export interface ProofOfPayment {
  transferDate: string;
  senderBank: string;
  senderName: string;
  senderAccount?: string;
  nominal: number;
  proofImageUrl: string;
  notes?: string;
  uploadedAt: string;
}

export interface Invoice {
  id: string; // e.g. KB-202608-0001
  companyId: string;
  companyName: string;
  companyEmail: string;
  companyPhone?: string;
  packageId: PackageType | string;
  packageName: string;
  targetJobId?: string;
  targetJobTitle?: string;
  amount: number;
  periodDays: number;
  createdAt: string;
  dueDate: string;
  status: InvoiceStatus;
  paymentMethod: string;
  bankDetails: {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
  };
  proofOfPayment?: ProofOfPayment;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectedReason?: string;
  notes?: string;
}

export interface CompanySubscription {
  id: string;
  companyId: string;
  packageId: PackageType;
  packageName: string;
  status: 'active' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  daysRemaining: number;
  activeJobSlots: number;
  isFeaturedCompany: boolean;
  hasAiMatching: boolean;
  hasCandidateDirectChat: boolean;
  hasInterviewScheduler: boolean;
  lastInvoiceId: string;
}

export interface RecruitmentServiceRequest {
  id: string;
  companyId: string;
  companyName: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  packageId: string;
  packageName: string;
  estimatedPrice: number;
  positionTitle: string;
  candidateCount: number;
  districtLocation: string;
  requirements: string;
  salaryRange: string;
  status: 'pending' | 'contacted' | 'in_progress' | 'completed';
  createdAt: string;
  notes?: string;
}

