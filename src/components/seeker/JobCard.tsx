import React from 'react';
import { Job } from '../../types';
import { useApp } from '../../context/AppContext';
import { MapPin, Bookmark, CheckCircle2, Zap, Sparkles } from 'lucide-react';
import { formatRupiah, calculateJobMatch } from '../../utils/distance';

interface JobCardProps {
  job: Job;
  onClick: () => void;
  featured?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick, featured = false }) => {
  const { savedJobIds, toggleSaveJob, seekerProfile } = useApp();
  const isSaved = savedJobIds.includes(job.id);
  const matchInfo = calculateJobMatch(job, seekerProfile);

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden p-3.5 ${
        featured
          ? 'border-emerald-300 shadow-sm ring-1 ring-emerald-500/20'
          : 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md'
      }`}
    >
      {/* Top row: Urgent badge or Match Score + Bookmark */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {job.isUrgentHiring && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
              <Zap className="w-3 h-3 fill-rose-600 text-rose-600" />
              BUTUH HARI INI
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
            {matchInfo.badge}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveJob(job.id);
          }}
          className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition"
          title="Simpan Lowongan"
        >
          <Bookmark
            className={`w-4 h-4 ${
              isSaved ? 'fill-emerald-600 text-emerald-600' : 'text-slate-400'
            }`}
          />
        </button>
      </div>

      {/* Main info row: Logo & Position & Company */}
      <div className="flex items-start gap-3">
        <img
          src={job.companyLogo}
          alt={job.companyName}
          className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0 bg-slate-50"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition">
            {job.title}
          </h3>
          <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1 mt-0.5 truncate">
            <span className="truncate">{job.companyName}</span>
            {job.isVerifiedCompany && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            )}
          </div>
        </div>
      </div>

      {/* Distance & Location bar */}
      <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-500 font-medium bg-slate-50/80 px-2.5 py-1.5 rounded-xl border border-slate-100">
        <div className="flex items-center gap-1 text-emerald-700 font-bold truncate">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{job.distanceKm !== undefined ? `${job.distanceKm} KM dari rumah` : job.location.district}</span>
        </div>
        <span className="text-slate-300">•</span>
        <span className="truncate text-slate-600">{job.location.district}</span>
      </div>

      {/* Salary & Meta Tags */}
      <div className="mt-2.5 flex items-center justify-between gap-1 pt-2 border-t border-slate-100 text-xs">
        <div className="font-extrabold text-slate-900 text-xs">
          {job.salaryDisclosed
            ? `${formatRupiah(job.salaryMin, true)}${
                job.salaryMax > job.salaryMin ? `–${formatRupiah(job.salaryMax, true)}` : ''
              }/${job.salaryPeriod}`
            : 'Gaji Dinegosiasikan'}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
            {job.education}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
            {job.jobType}
          </span>
        </div>
      </div>
    </div>
  );
};
