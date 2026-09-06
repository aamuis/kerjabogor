import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, Job } from '../../types';
import {
  Building2,
  Plus,
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  Sparkles,
  MapPin,
  MessageSquare,
  Clock,
  Zap,
  ChevronRight,
  ShieldCheck,
  Edit2,
  Crown,
  Rocket,
  Headphones
} from 'lucide-react';
import { PostJobModal } from './PostJobModal';
import { CandidateScreening } from './CandidateScreening';
import { SubscriptionManagementScreen } from './SubscriptionManagementScreen';
import { SubscriptionModal } from './SubscriptionModal';
import { BoostJobModal } from './BoostJobModal';
import { RecruitmentServiceModal } from './RecruitmentServiceModal';
import { formatRupiah } from '../../utils/distance';

export const EmployerDashboard: React.FC = () => {
  const { activeCompany, jobs, applications, role, setRole, companySubscription } = useApp();

  const [activeTab, setActiveTab] = useState<'applicants' | 'jobs' | 'subscription' | 'profile'>('applicants');
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showRecruitmentServiceModal, setShowRecruitmentServiceModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
  const [jobToBoost, setJobToBoost] = useState<Job | null>(null);

  const companyJobs = jobs.filter((j) => j.companyId === activeCompany.id);
  const companyApplicants = applications.filter((a) => a.companyId === activeCompany.id);

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Role Switcher */}
      <div className="p-3 bg-slate-900 text-white rounded-3xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-extrabold">Portal HRD / Bisnis:</span>
        </div>
        <button
          onClick={() => setRole('seeker')}
          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl shadow-xs transition"
        >
          Beralih ke Pelamar →
        </button>
      </div>

      {/* Top Company Header Card */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-5 shadow-lg space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeCompany.logo}
              alt={activeCompany.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400/40 shrink-0 bg-white"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-base leading-tight">{activeCompany.name}</h1>
                {activeCompany.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                )}
              </div>
              <p className="text-xs text-emerald-200 font-medium mt-0.5">{activeCompany.industry}</p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-300 mt-1 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeCompany.location.district}, {activeCompany.location.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Plan Active Badge */}
        <div className="bg-white/10 p-2.5 rounded-2xl border border-white/15 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-300" />
            <div>
              <span className="text-[10px] text-emerald-200 block">Paket Rekrutmen Aktif:</span>
              <strong className="text-white font-black">{companySubscription?.packageName || 'EMPLOYER PRO'}</strong>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('subscription')}
            className="px-2.5 py-1 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-[10px] rounded-lg transition"
          >
            Kelola / Billing →
          </button>
        </div>

        {/* Metric Counter Grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 bg-white/10 rounded-2xl border border-white/10">
            <div className="text-lg font-black text-emerald-300">{companyJobs.length}</div>
            <div className="text-[10px] text-emerald-100 font-medium">Loker Aktif</div>
          </div>

          <div className="p-2.5 bg-white/10 rounded-2xl border border-white/10">
            <div className="text-lg font-black text-amber-300">{companyApplicants.length}</div>
            <div className="text-[10px] text-emerald-100 font-medium">Lamaran Masuk</div>
          </div>

          <div className="p-2.5 bg-white/10 rounded-2xl border border-white/10">
            <div className="text-lg font-black text-purple-300">
              {companyApplicants.filter((a) => a.status === 'interview').length}
            </div>
            <div className="text-[10px] text-emerald-100 font-medium">Interview</div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowPostJobModal(true)}
            className="py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-xs shadow-md transition flex items-center justify-center gap-1.5 active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>+ PASANG LOKER</span>
          </button>
          <button
            onClick={() => setShowRecruitmentServiceModal(true)}
            className="py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-2xl font-bold text-xs border border-white/20 transition flex items-center justify-center gap-1.5 active:scale-98"
          >
            <Headphones className="w-3.5 h-3.5 text-teal-300" />
            <span>Assisted Hiring</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('applicants')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
            activeTab === 'applicants'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Pelamar ({companyApplicants.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
            activeTab === 'jobs'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Lowongan ({companyJobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subscription')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
            activeTab === 'subscription'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Crown className="w-3.5 h-3.5 text-amber-500" />
          <span>Subscription & Billing</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
            activeTab === 'profile'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Profil</span>
        </button>
      </div>

      {/* Tab 1: Applicants List (Constraint 17) */}
      {activeTab === 'applicants' && (
        <div className="space-y-3">
          {companyApplicants.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedApplicant(app)}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs hover:border-emerald-400 cursor-pointer transition space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 min-w-0">
                  <img
                    src={app.applicantAvatar}
                    alt={app.applicantName}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-black text-xs sm:text-sm text-slate-900 truncate">
                      {app.applicantName}
                    </h3>
                    <div className="text-emerald-700 font-bold text-[11px] truncate">
                      Posisi: {app.jobTitle}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      📍 {app.applicantDistrict} • {app.distanceKm} KM dari kantor
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 block">
                    ✨ {app.matchScore}% Match
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 mt-1 block uppercase">
                    {app.status}
                  </span>
                </div>
              </div>

              {/* Badges preview */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                <span className="text-slate-500">
                  Dilamar: <strong>{app.appliedDate}</strong>
                </span>

                <button className="text-emerald-700 font-extrabold flex items-center gap-0.5">
                  <span>Proses & Review</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {companyApplicants.length === 0 && (
            <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">Belum ada pelamar baru</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Lowongan aktif Anda sedang ditampilkan kepada pencari kerja di sekitar Bogor.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Company Jobs List (Constraint 78 Boost Option) */}
      {activeTab === 'jobs' && (
        <div className="space-y-3">
          {companyJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    {job.isUrgentHiring && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                        ⚡ Urgent Hiring
                      </span>
                    )}
                    {job.isFeatured && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                        ⭐ Featured
                      </span>
                    )}
                    {job.tags?.includes('Boosted') && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                        🚀 Boosted
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">{job.title}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    📍 {job.location.district} • {job.jobType} • {job.education}
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Aktif
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-2xl flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Gaji:</span>
                <span className="font-extrabold text-slate-900">
                  {formatRupiah(job.salaryMin, true)} - {formatRupiah(job.salaryMax, true)}/{job.salaryPeriod}
                </span>
              </div>

              {/* Boost CTA (Constraint 78) */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500 text-[11px]">
                  👥 {job.openPositions} posisi • {job.postedAt}
                </span>

                <button
                  id={`btn-boost-job-${job.id}`}
                  onClick={() => setJobToBoost(job)}
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-bold text-[11px] rounded-xl transition shadow-xs flex items-center gap-1"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>🚀 Boost Lowongan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Subscription & Billing Management (Constraints 71, 72, 77) */}
      {activeTab === 'subscription' && (
        <SubscriptionManagementScreen />
      )}

      {/* Tab 4: Company Profile (Constraint 14) */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <img
              src={activeCompany.logo}
              alt={activeCompany.name}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
            />
            <div>
              <h3 className="font-black text-sm text-slate-900">{activeCompany.name}</h3>
              <p className="text-slate-500">{activeCompany.industry} • {activeCompany.businessType}</p>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                ✓ Terverifikasi Kerja Bogor
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-slate-900">Deskripsi Perusahaan / Usaha:</div>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {activeCompany.description}
            </p>
          </div>

          <div className="space-y-1">
            <div className="font-bold text-slate-900">Alamat Lengkap Kantor / Outlet:</div>
            <p className="text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {activeCompany.address}, Kecamatan {activeCompany.location.district}, {activeCompany.location.type}
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-900">Foto Suasana Tempat Kerja & Outlet:</div>
            <div className="grid grid-cols-2 gap-2">
              {activeCompany.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt="Workplace"
                  className="w-full h-24 rounded-2xl object-cover border border-slate-100 shadow-2xs"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={useApp().logoutUser}
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Keluar dari Akun Perusahaan</span>
            </button>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      <PostJobModal
        isOpen={showPostJobModal}
        onClose={() => setShowPostJobModal(false)}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />

      {/* Recruitment Service Modal */}
      <RecruitmentServiceModal
        isOpen={showRecruitmentServiceModal}
        onClose={() => setShowRecruitmentServiceModal(false)}
      />

      {/* Boost Job Modal */}
      {jobToBoost && (
        <BoostJobModal
          job={jobToBoost}
          onClose={() => setJobToBoost(null)}
        />
      )}

      {/* Candidate Screening Modal */}
      {selectedApplicant && (
        <CandidateScreening
          application={selectedApplicant}
          isOpen={!!selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </div>
  );
};

