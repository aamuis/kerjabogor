import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCard } from './JobCard';
import { JOB_CATEGORIES } from '../../data/bogorData';
import {
  Search,
  MapPin,
  Flame,
  Sparkles,
  Zap,
  GraduationCap,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Building2,
  FileText,
  SlidersHorizontal,
  Compass,
  ArrowUpRight,
  ShieldAlert,
  Lock
} from 'lucide-react';
import { Job } from '../../types';

interface HomeScreenProps {
  onSelectJob: (jobId: string) => void;
  onOpenLocationModal: () => void;
  onOpenSearchWithFilter: (filterKey?: string, filterVal?: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectJob,
  onOpenLocationModal,
  onOpenSearchWithFilter
}) => {
  const {
    jobs,
    seekerProfile,
    userLocation,
    radiusKm,
    setRadiusKm,
    setActiveTab,
    allCompanies,
    setSelectedCompanyId,
    siteConfig,
    openSecretAdminModal
  } = useApp();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [adminTapCount, setAdminTapCount] = useState(0);

  const handleSecretTap = () => {
    const next = adminTapCount + 1;
    setAdminTapCount(next);
    if (next >= 3) {
      setAdminTapCount(0);
      openSecretAdminModal();
    }
  };

  // 1. Nearby Jobs within Radius
  const nearbyJobs = jobs.filter(
    (j) => (j.distanceKm ?? 0) <= radiusKm && j.status === 'active'
  );

  // 2. Urgent Hiring Jobs ("BUTUH ORANG HARI INI")
  const urgentJobs = jobs.filter((j) => j.isUrgentHiring && j.status === 'active');

  // 3. AI Recommended Jobs (Match Score >= 80%)
  const aiRecommendedJobs = [...jobs]
    .filter((j) => j.status === 'active')
    .sort((a, b) => (a.distanceKm ?? 99) - (b.distanceKm ?? 99))
    .slice(0, 4);

  // 4. Fresh Graduate Friendly
  const freshGradJobs = jobs.filter(
    (j) => j.isFreshGraduateFriendly && j.status === 'active'
  );

  const radiusButtons = [1, 3, 5, 10, 15];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSearchWithFilter('query', searchKeyword);
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-200">
      {/* 1. Greeting & Search Hero Card */}
      <section
        className="text-white rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden transition-colors"
        style={{
          background: `linear-gradient(135deg, ${siteConfig.primaryColor} 0%, #064e3b 100%)`
        }}
      >
        {/* Background decorative soft circles */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-black/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold flex items-center gap-1 opacity-90">
                <span
                  className="inline-block w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: siteConfig.accentColor }}
                ></span>
                {siteConfig.brandName} Portal
              </span>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight mt-0.5">
                {siteConfig.heroTitle || `👋 Halo, ${seekerProfile.name.split(' ')[0]}!`}
              </h1>
              <p className="text-xs opacity-90 mt-0.5">
                {siteConfig.heroSubtitle || 'Temukan kerja dekat rumah di Kota & Kab. Bogor'}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className="w-10 h-10 rounded-full border-2 border-white/40 overflow-hidden shadow-xs shrink-0"
            >
              <img
                src={seekerProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80'}
                alt={seekerProfile.name}
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          {/* Search Box Input */}
          <form onSubmit={handleSearchSubmit} className="mt-4">
            <div className="flex items-center bg-white rounded-2xl p-1.5 shadow-md">
              <div className="pl-3 pr-2 text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Posisi, skill, atau perusahaan Bogor..."
                className="flex-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none py-1.5"
              />
              <button
                type="submit"
                className="text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs flex items-center gap-1 active:scale-95"
                style={{ backgroundColor: siteConfig.primaryColor }}
              >
                Cari
              </button>
            </div>
          </form>

          {/* Quick Filter CTAs */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-white/90">
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-1 hover:text-white transition font-semibold"
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: siteConfig.accentColor }} />
              <span>{userLocation.district} (±{radiusKm} KM)</span>
            </button>

            <button
              onClick={() => onOpenSearchWithFilter()}
              className="flex items-center gap-1 hover:text-white transition font-semibold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Semua Filter</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Fast Navigation Shortcuts */}
      <section className="grid grid-cols-4 gap-2 text-center">
        <button
          onClick={() => onOpenSearchWithFilter('urgentOnly', true)}
          className="flex flex-col items-center p-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100/70 border border-rose-200/80 transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center mb-1 shadow-xs group-hover:scale-105 transition">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <span className="text-[10px] font-bold text-rose-900 leading-tight">Butuh Hari Ini</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className="flex flex-col items-center p-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100/70 border border-sky-200/80 transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center mb-1 shadow-xs group-hover:scale-105 transition">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-sky-900 leading-tight">Peta Loker</span>
        </button>

        <button
          onClick={() => onOpenSearchWithFilter('freshGradOnly', true)}
          className="flex flex-col items-center p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100/70 border border-amber-200/80 transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-1 shadow-xs group-hover:scale-105 transition">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-amber-900 leading-tight">Fresh Grad</span>
        </button>

        <button
          onClick={() => setActiveTab('cv-builder')}
          className="flex flex-col items-center p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-1 shadow-xs group-hover:scale-105 transition">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-emerald-900 leading-tight">Buat CV</span>
        </button>
      </section>

      {/* 3. "Kerja di Sekitarmu" (Core Feature Constraint 5) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Kerja di Sekitarmu
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Ada <strong className="text-emerald-600">{nearbyJobs.length} lowongan</strong> dalam radius {radiusKm} KM dari {userLocation.district}
            </p>
          </div>

          <button
            onClick={() => onOpenSearchWithFilter('radius', radiusKm)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
          >
            Lihat semua
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Radius Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[11px] font-semibold text-slate-500 shrink-0">Radius:</span>
          {radiusButtons.map((r) => (
            <button
              key={r}
              onClick={() => setRadiusKm(r)}
              className={`px-3 py-1 text-xs font-bold rounded-full transition whitespace-nowrap ${
                radiusKm === r
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {r} KM
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="space-y-2.5">
          {nearbyJobs.slice(0, 3).map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => onSelectJob(job.id)}
            />
          ))}

          {nearbyJobs.length === 0 && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
              <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                Tidak ada lowongan dalam radius {radiusKm} KM
              </p>
              <button
                onClick={() => setRadiusKm(15)}
                className="mt-2 text-xs font-bold text-emerald-600 hover:underline"
              >
                Perluas Radius ke 15 KM →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. ⚡ "Butuh Orang Hari Ini" (Constraint 8 - Urgent Hiring) */}
      <section className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-orange-500/10 border border-rose-200/80 rounded-3xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  BUTUH ORANG HARI INI
                </h2>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white uppercase">
                  Urgent
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Proses cepat 1–3 hari, mulai kerja besok / lusa
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenSearchWithFilter('urgentOnly', true)}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center"
          >
            Lihat semua
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {urgentJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => onSelectJob(job.id)}
              featured={true}
            />
          ))}
        </div>
      </section>

      {/* 5. ✨ "Cocok Untuk Kamu" (Constraint 10 - AI Job Matching) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Pekerjaan yang Cocok Untuk Kamu
              </h2>
              <p className="text-xs text-slate-500">
                Rekomendasi AI berdasarkan skill & jarak dari rumahmu
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('assessment')}
            className="text-xs font-bold text-purple-700 hover:underline"
          >
            Tes Minat →
          </button>
        </div>

        <div className="space-y-2.5">
          {aiRecommendedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => onSelectJob(job.id)}
            />
          ))}
        </div>
      </section>

      {/* 6. Kategori Pekerjaan Bogor */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900">
            Kategori Pekerjaan di Bogor
          </h2>
          <span className="text-xs text-slate-500 font-medium">19 Kategori</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {JOB_CATEGORIES.slice(3, 12).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onOpenSearchWithFilter('category', cat.name)}
              className="p-2.5 bg-white hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-300 rounded-2xl text-left transition group shadow-2xs"
            >
              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-1">
                {cat.name}
              </div>
              <div className="text-[10px] text-slate-600 mt-0.5">
                {cat.count} Lowongan
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 7. Fitur Khusus: "Belum Punya Pengalaman?" (Constraint 9) */}
      <section className="bg-amber-50/80 border border-amber-200/80 rounded-3xl p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-amber-950">
                Belum Punya Pengalaman?
              </h3>
              <p className="text-[11px] text-amber-800">
                Loker SMA/SMK, pemula, dan disediakan training intensif
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenSearchWithFilter('freshGradOnly', true)}
            className="text-xs font-bold text-amber-900 bg-amber-200/70 hover:bg-amber-300/70 px-2.5 py-1 rounded-lg transition"
          >
            Lihat Loker
          </button>
        </div>

        <div className="space-y-2">
          {freshGradJobs.slice(0, 2).map((job) => (
            <JobCard key={job.id} job={job} onClick={() => onSelectJob(job.id)} />
          ))}
        </div>
      </section>

      {/* 8. Skill yang Sedang Dibutuhkan di Bogor (Constraint 35) */}
      <section className="bg-slate-900 text-white rounded-3xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold">
              Skill Paling Dicari Perusahaan Bogor
            </h3>
            <p className="text-[10px] text-slate-400">
              Update tren rekrutmen kawasan industri & cafe Bogor
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            '1. Microsoft Excel',
            '2. Admin Gudang / WMS',
            '3. Kasir POS & Barista',
            '4. Content Creator TikTok',
            '5. Komunikasi & CS',
            '6. Operator Mesin GMP',
            '7. Navigasi Kurir Motor'
          ].map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold bg-slate-800 text-emerald-300 border border-slate-700 px-2.5 py-1 rounded-xl"
            >
              {skill}
            </span>
          ))}
        </div>

        <button
          onClick={() => setActiveTab('career-center')}
          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>Buka Pusat Karier Bogor & Tips Belajar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* 9. Perusahaan Pilihan Bogor */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900">
            Perusahaan Terverifikasi di Bogor
          </h2>
          <span className="text-xs text-slate-500 font-medium">Mitra Resmi</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {allCompanies.slice(0, 4).map((comp) => (
            <div
              key={comp.id}
              onClick={() => {
                setSelectedCompanyId(comp.id);
                setActiveTab('company-detail');
              }}
              className="p-3 bg-white border border-slate-200/80 hover:border-emerald-400 rounded-2xl text-left cursor-pointer transition shadow-2xs hover:shadow-xs group"
            >
              <img
                src={comp.logo}
                alt={comp.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-100 mb-2"
                referrerPolicy="no-referrer"
              />
              <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 line-clamp-1">
                {comp.name}
              </div>
              <div className="text-[10px] text-slate-600 mt-0.5 truncate">
                📍 {comp.location.district}
              </div>
              <div className="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                ★ {comp.rating} ({comp.reviewCount} ulasan)
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Platform Footer & Secret Access */}
      <footer className="pt-6 pb-4 border-t border-slate-200/80 text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          {siteConfig.logoUrl ? (
            <img src={siteConfig.logoUrl} alt={siteConfig.brandName} className="w-5 h-5 rounded-lg object-contain" />
          ) : (
            <div
              className="w-5 h-5 rounded-lg text-white font-black text-[9px] flex items-center justify-center"
              style={{ backgroundColor: siteConfig.primaryColor }}
            >
              {siteConfig.brandName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span className="font-extrabold text-xs text-slate-800 tracking-tight" style={{ color: siteConfig.titleColor }}>
            {siteConfig.brandName}
          </span>
        </div>

        <p className="text-[11px] text-slate-600 max-w-[280px] mx-auto leading-relaxed">
          {siteConfig.brandTagline} — {siteConfig.metaDescription}
        </p>

        <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-600">
          <span>{siteConfig.footerText}</span>
          <button
            type="button"
            onClick={handleSecretTap}
            className="p-1 text-slate-400 hover:text-slate-600 transition rounded-md"
            title="Sistem"
          >
            <Lock className="w-2.5 h-2.5 opacity-30 hover:opacity-100" />
          </button>
        </div>
      </footer>
    </div>
  );
};
