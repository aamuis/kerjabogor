import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Job } from '../../types';
import {
  MapPin,
  Compass,
  SlidersHorizontal,
  X,
  ChevronRight,
  Zap,
  Building2,
  Navigation,
  Sparkles,
  Layers
} from 'lucide-react';
import { formatRupiah, calculateJobMatch } from '../../utils/distance';

interface JobMapScreenProps {
  onSelectJob: (jobId: string) => void;
}

export const JobMapScreen: React.FC<JobMapScreenProps> = ({ onSelectJob }) => {
  const { jobs, userLocation, radiusKm, setRadiusKm, seekerProfile } = useApp();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [onlyUrgent, setOnlyUrgent] = useState<boolean>(false);
  const [mapZoom, setMapZoom] = useState<'normal' | 'wide'>('normal');

  // Filter jobs based on distance & category
  const mappedJobs = jobs.filter((job) => {
    if ((job.distanceKm ?? 0) > radiusKm) return false;
    if (filterCategory !== 'all' && job.category !== filterCategory) return false;
    if (onlyUrgent && !job.isUrgentHiring) return false;
    return true;
  });

  // Calculate pixel positions for pins relative to Bogor center
  // Center: Bogor Tengah (-6.5971, 106.7949)
  const centerLat = userLocation.latitude;
  const centerLng = userLocation.longitude;

  const getPinStyle = (lat: number, lng: number) => {
    const scale = mapZoom === 'normal' ? 650 : 380;
    const xOffset = 50 + (lng - centerLng) * scale;
    const yOffset = 50 - (lat - centerLat) * scale;
    // Bound within map SVG view
    const clampedX = Math.min(92, Math.max(8, xOffset));
    const clampedY = Math.min(88, Math.max(12, yOffset));
    return { left: `${clampedX}%`, top: `${clampedY}%` };
  };

  return (
    <div className="relative h-[calc(100vh-140px)] min-h-[500px] flex flex-col pb-16 animate-in fade-in duration-200">
      {/* Top Floating Controls on Map */}
      <div className="absolute top-2 left-2 right-2 z-20 space-y-2">
        {/* Search / Filter Bar */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-slate-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 pl-2 text-xs font-bold text-slate-800 truncate">
            <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">Peta Lowongan ({mappedJobs.length} Titik)</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setOnlyUrgent(!onlyUrgent)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition flex items-center gap-1 ${
                onlyUrgent
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              <Zap className="w-3 h-3 fill-current" />
              Urgent
            </button>

            <button
              onClick={() => setMapZoom(mapZoom === 'normal' ? 'wide' : 'normal')}
              className="p-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              title="Ganti Zoom Peta"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Radius Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-900/80 backdrop-blur-sm p-1.5 rounded-2xl shadow-md">
          <span className="text-[10px] font-bold text-slate-300 pl-2 shrink-0">Radius:</span>
          {[1, 3, 5, 10, 15].map((r) => (
            <button
              key={r}
              onClick={() => setRadiusKm(r)}
              className={`px-2.5 py-0.5 text-[11px] font-bold rounded-lg transition whitespace-nowrap ${
                radiusKm === r
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {r} KM
            </button>
          ))}
        </div>
      </div>

      {/* Modern Vector Map Canvas Container */}
      <div className="relative flex-1 bg-emerald-950/90 rounded-3xl overflow-hidden shadow-inner border border-slate-800">
        {/* Abstract Topographic & Road Vector Grid */}
        <svg className="w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
            <radialGradient id="radar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#059669" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Radial coverage zone based on selected radius */}
          <circle cx="50%" cy="50%" r={radiusKm * (mapZoom === 'normal' ? 18 : 10)} fill="url(#radar)" />
          <circle cx="50%" cy="50%" r={radiusKm * (mapZoom === 'normal' ? 18 : 10)} fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Stylized Bogor arterial roads (Jagorawi, Pajajaran, Jl. Raya Bogor, Soleh Iskandar) */}
          <path d="M 10 10 Q 50 45 90 90" stroke="#059669" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 90 20 Q 50 50 20 80" stroke="#047857" strokeWidth="2.5" fill="none" opacity="0.5" />
          <path d="M 50 10 L 50 90" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="6 3" />
        </svg>

        {/* Region Labels on Map */}
        <div className="absolute top-8 left-8 text-[10px] font-black tracking-widest text-emerald-500/60 uppercase pointer-events-none">
          KAB. BOGOR UTARA
        </div>
        <div className="absolute bottom-8 right-8 text-[10px] font-black tracking-widest text-emerald-500/60 uppercase pointer-events-none">
          SENTUL & CIBINONG
        </div>
        <div className="absolute bottom-8 left-8 text-[10px] font-black tracking-widest text-emerald-500/60 uppercase pointer-events-none">
          DRAMAGA & BOGOR BARAT
        </div>

        {/* Center Marker (You Are Here) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/30 animate-ping absolute"></div>
            <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-lg flex items-center justify-center text-white">
              <Navigation className="w-2.5 h-2.5" />
            </div>
          </div>
          <div className="mt-1 px-2 py-0.5 bg-slate-900/90 text-white rounded-full text-[9px] font-extrabold border border-emerald-500/40 shadow-xs whitespace-nowrap">
            Kamu ({userLocation.district})
          </div>
        </div>

        {/* Interactive Job Pins */}
        {mappedJobs.map((job) => {
          const isSelected = selectedJob?.id === job.id;
          const coords = getPinStyle(job.location.latitude, job.location.longitude);

          return (
            <button
              key={job.id}
              onClick={() => setSelectedJob(job)}
              style={coords}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-200 ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
            >
              <div
                className={`p-1.5 rounded-2xl shadow-lg flex items-center gap-1 border transition ${
                  isSelected
                    ? 'bg-emerald-500 text-white border-white ring-4 ring-emerald-500/40'
                    : job.isUrgentHiring
                    ? 'bg-rose-600 text-white border-rose-300 animate-pulse'
                    : 'bg-white text-slate-900 border-slate-200'
                }`}
              >
                {job.isUrgentHiring ? (
                  <Zap className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Building2 className="w-3.5 h-3.5" />
                )}
                <span className="text-[10px] font-black max-w-[70px] truncate">
                  {job.title.split(' ')[0]}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mx-auto -mt-0.5 opacity-60"></div>
            </button>
          );
        })}
      </div>

      {/* Bottom Popup Card when Marker Clicked */}
      {selectedJob && (
        <div className="absolute bottom-2 left-2 right-2 z-30 animate-in slide-in-from-bottom duration-200">
          <div className="bg-white rounded-3xl p-3.5 shadow-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <img
                  src={selectedJob.companyLogo}
                  alt={selectedJob.companyName}
                  className="w-11 h-11 rounded-xl object-cover border border-slate-100 shrink-0 bg-slate-50"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  {selectedJob.isUrgentHiring && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 mb-0.5 inline-block">
                      ⚡ Urgent Hiring
                    </span>
                  )}
                  <h4 className="font-extrabold text-xs text-slate-900 truncate">
                    {selectedJob.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 truncate">{selectedJob.companyName}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {selectedJob.distanceKm} KM dari kamu
              </span>
              <span className="font-extrabold text-slate-900">
                {formatRupiah(selectedJob.salaryMin, true)}/{selectedJob.salaryPeriod}
              </span>
            </div>

            <button
              onClick={() => onSelectJob(selectedJob.id)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-extrabold shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Lihat Detail & Lamar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
