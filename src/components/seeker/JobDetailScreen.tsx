import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  MapPin,
  CheckCircle2,
  Calendar,
  Clock,
  Briefcase,
  GraduationCap,
  Sparkles,
  Zap,
  Footprints,
  Bike,
  Car,
  Train,
  Building2,
  Check,
  MessageSquare,
  AlertTriangle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { formatRupiah, calculateJobMatch, estimateCommute } from '../../utils/distance';
import { ShareModal } from '../common/ShareModal';
import { ChatModal } from '../common/ChatModal';
import { ApplyModal } from './ApplyModal';

interface JobDetailScreenProps {
  jobId: string;
  onBack: () => void;
  onOpenCompany: (companyId: string) => void;
}

export const JobDetailScreen: React.FC<JobDetailScreenProps> = ({
  jobId,
  onBack,
  onOpenCompany
}) => {
  const {
    jobs,
    savedJobIds,
    toggleSaveJob,
    seekerProfile,
    applications,
    showToast,
    setActiveTab
  } = useApp();

  const [showShareModal, setShowShareModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-xs text-slate-500">Lowongan kerja tidak ditemukan.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          Kembali
        </button>
      </div>
    );
  }

  const isSaved = savedJobIds.includes(job.id);
  const existingApplication = applications.find(
    (app) => app.jobId === job.id && app.applicantId === seekerProfile.id
  );
  const isApplied = !!existingApplication;

  const matchInfo = calculateJobMatch(job, seekerProfile);
  const distance = job.distanceKm ?? 3.5;
  const commutes = estimateCommute(distance);

  return (
    <div className="pb-28 animate-in fade-in duration-200">
      {/* 1. Header Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between z-30">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowShareModal(true)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
            title="Bagikan Lowongan"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleSaveJob(job.id)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-emerald-600 transition"
            title="Simpan Lowongan"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isSaved ? 'fill-emerald-600 text-emerald-600' : 'text-slate-500'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 2. Top Job Banner Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
          {/* Urgent Hiring Badge if applicable */}
          {job.isUrgentHiring && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-rose-800 font-bold">
                <Zap className="w-4 h-4 fill-rose-600 text-rose-600 animate-bounce" />
                <span>BUTUH ORANG HARI INI</span>
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                {job.urgentStartDate || 'Mulai Besok'}
              </span>
            </div>
          )}

          {/* Company & Title */}
          <div className="flex items-start gap-3.5">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shrink-0 bg-slate-50 shadow-2xs"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <h1 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                {job.title}
              </h1>
              <button
                onClick={() => onOpenCompany(job.companyId)}
                className="text-xs font-semibold text-slate-600 hover:text-emerald-700 flex items-center gap-1 mt-1 group text-left"
              >
                <span>{job.companyName}</span>
                {job.isVerifiedCompany && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                )}
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          </div>

          {/* Location & Distance Badge */}
          <div className="flex items-center gap-2 text-xs bg-emerald-50/80 border border-emerald-100 text-emerald-900 p-2.5 rounded-2xl font-semibold">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
            <div className="truncate flex-1">
              <span>{job.location.district}, {job.location.type}</span>
            </div>
            <span className="font-black text-emerald-800 shrink-0 bg-white/80 px-2 py-0.5 rounded-lg border border-emerald-200">
              📍 {distance} KM dari rumah
            </span>
          </div>

          {/* Salary Display */}
          <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Tawaran Gaji</span>
              <div className="text-sm sm:text-base font-extrabold text-emerald-400">
                {job.salaryDisclosed
                  ? `${formatRupiah(job.salaryMin)} – ${formatRupiah(job.salaryMax)}`
                  : 'Gaji Kompetitif'}
              </div>
            </div>
            <span className="text-xs text-slate-300 font-semibold uppercase px-2.5 py-1 bg-slate-800 rounded-lg border border-slate-700">
              Per {job.salaryPeriod}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800">
              🎓 {job.education}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800">
              🕐 {job.jobType}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800">
              👥 {job.openPositions} Posisi Dibutuhkan
            </span>
            {job.isFreshGraduateFriendly && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900">
                ✨ Fresh Graduate OK
              </span>
            )}
          </div>
        </div>

        {/* 3. Estimasi Waktu Perjalanan / Commute (Constraint 24) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
              <Bike className="w-4 h-4 text-emerald-600" />
              Estimasi Perjalanan dari Tempat Tinggalmu
            </h3>
            <span className="text-[10px] text-slate-600 font-bold">{distance} KM</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
            <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100">
              <Footprints className="w-4 h-4 text-slate-600 mx-auto mb-1" />
              <div className="font-bold text-slate-900 text-[11px]">{commutes.walk.timeMinutes} mnt</div>
              <div className="text-[9px] text-slate-600">Jalan</div>
            </div>

            <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-200">
              <Bike className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="font-bold text-emerald-900 text-[11px]">{commutes.motor.timeMinutes} mnt</div>
              <div className="text-[9px] text-emerald-700 font-semibold">Motor</div>
            </div>

            <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100">
              <Car className="w-4 h-4 text-slate-600 mx-auto mb-1" />
              <div className="font-bold text-slate-900 text-[11px]">{commutes.car.timeMinutes} mnt</div>
              <div className="text-[9px] text-slate-600">Mobil / Angkot</div>
            </div>

            <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100">
              <Train className="w-4 h-4 text-slate-600 mx-auto mb-1" />
              <div className="font-bold text-slate-900 text-[11px]">{commutes.transit.timeMinutes} mnt</div>
              <div className="text-[9px] text-slate-600">KRL / Biskita</div>
            </div>
          </div>
        </div>

        {/* 4. AI Match Analysis Card (Constraint 10 & 36) */}
        <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center text-purple-200">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-xs">Analisis Kecocokan AI</h3>
                <p className="text-[10px] text-purple-200">Berdasarkan profil & CV kamu</p>
              </div>
            </div>

            <span className="text-xs font-black px-2.5 py-1 bg-emerald-500 text-white rounded-xl shadow-xs">
              {matchInfo.badge}
            </span>
          </div>

          {/* Rationale bullet points */}
          <div className="space-y-1.5 text-xs text-purple-100">
            {matchInfo.reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>

          {/* Skill Gap & Learn Recommendation (Constraint 36) */}
          {matchInfo.missingSkills.length > 0 && (
            <div className="p-2.5 bg-white/10 rounded-2xl border border-white/10 text-[11px] space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Skill Tambahan yang Disarankan:
              </div>
              <div className="text-slate-200">
                Kamu sangat cocok, tapi akan lebih unggul jika memperdalam:{' '}
                <strong className="text-white">{matchInfo.missingSkills.join(', ')}</strong>.
              </div>
            </div>
          )}
        </div>

        {/* 5. Deskripsi Pekerjaan */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2.5 text-xs leading-relaxed text-slate-700">
          <h3 className="font-extrabold text-slate-900 text-sm">Deskripsi Pekerjaan</h3>
          <p>{job.description}</p>
        </div>

        {/* 6. Tanggung Jawab */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2.5 text-xs text-slate-700">
          <h3 className="font-extrabold text-slate-900 text-sm">Tanggung Jawab Utama</h3>
          <ul className="space-y-2">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 7. Persyaratan Pelamar */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2.5 text-xs text-slate-700">
          <h3 className="font-extrabold text-slate-900 text-sm">Kualifikasi & Persyaratan</h3>
          <ul className="space-y-2">
            {job.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 8. Benefit & Fasilitas */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2.5 text-xs text-slate-700">
          <h3 className="font-extrabold text-slate-900 text-sm">Benefit & Fasilitas</h3>
          <div className="grid grid-cols-2 gap-2">
            {job.benefits.map((benefit, idx) => (
              <div key={idx} className="p-2 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 9. Profil Perusahaan Card */}
        <div
          onClick={() => onOpenCompany(job.companyId)}
          className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3 cursor-pointer hover:border-emerald-400 transition"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <div>
                <h4 className="font-bold text-xs text-slate-900">{job.companyName}</h4>
                <p className="text-[10px] text-slate-600">Klik untuk melihat profil & foto kantor</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xs text-slate-600 line-clamp-2">
            Alamat: {job.location.district}, {job.location.type} • Proses rekrutmen: {job.recruitmentProcessDays} hari
          </div>
        </div>
      </div>

      {/* 10. Sticky Bottom CTA (Constraint 53) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-40 flex items-center gap-2 shadow-2xl">
        <button
          onClick={() => setShowChatModal(true)}
          className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl flex items-center justify-center transition"
          title="Tanya HRD"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {isApplied ? (
          <button
            onClick={() => setActiveTab('applications')}
            className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Lamaran Terkirim (Lihat Status)
          </button>
        ) : (
          <button
            onClick={() => setShowApplyModal(true)}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-md active:scale-98"
          >
            <Briefcase className="w-4 h-4" />
            LAMAR SEKARANG
          </button>
        )}
      </div>

      {/* Modals */}
      <ShareModal
        job={job}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onCopy={() => showToast('Tautan lowongan berhasil disalin!')}
      />

      <ChatModal
        companyName={job.companyName}
        jobTitle={job.title}
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
      />

      <ApplyModal
        job={job}
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        onSuccess={() => {
          setShowApplyModal(false);
        }}
      />
    </div>
  );
};
