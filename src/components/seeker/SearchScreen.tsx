import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCard } from './JobCard';
import { JobType, EducationLevel, TransportMode } from '../../types';
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Check,
  RotateCcw,
  Zap,
  GraduationCap,
  Bike,
  Sparkles
} from 'lucide-react';
import { BOGOR_LOCATIONS } from '../../data/bogorData';

interface SearchScreenProps {
  onSelectJob: (jobId: string) => void;
  initialFilter?: { key: string; value: any };
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onSelectJob, initialFilter }) => {
  const { jobs, userLocation } = useApp();

  const [query, setQuery] = useState<string>(
    initialFilter?.key === 'query' ? initialFilter.value : ''
  );
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  // Filter States
  const [selectedRadius, setSelectedRadius] = useState<number>(
    initialFilter?.key === 'radius' ? initialFilter.value : 15
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialFilter?.key === 'category' ? initialFilter.value : 'all'
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<EducationLevel>('Semua Pendidikan');
  const [freshGradOnly, setFreshGradOnly] = useState<boolean>(
    initialFilter?.key === 'freshGradOnly' ? true : false
  );
  const [urgentOnly, setUrgentOnly] = useState<boolean>(
    initialFilter?.key === 'urgentOnly' ? true : false
  );
  const [transportEase, setTransportEase] = useState<TransportMode>('all');
  const [minSalary, setMinSalary] = useState<number>(0);

  const popularKeywords = ['Admin', 'Sales', 'Operator Pabrik', 'Warehouse', 'Customer Service', 'Barista', 'Kurir Motor', 'TikTok'];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Keyword search
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.companyName.toLowerCase().includes(q);
        const matchesCategory = job.category.toLowerCase().includes(q);
        const matchesSkill = job.skillsRequired.some((s) => s.toLowerCase().includes(q));
        const matchesDistrict = job.location.district.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesCategory && !matchesSkill && !matchesDistrict) {
          return false;
        }
      }

      // 2. Radius / Distance
      if (selectedRadius > 0 && (job.distanceKm ?? 0) > selectedRadius) {
        return false;
      }

      // 3. Category
      if (selectedCategory !== 'all' && job.category !== selectedCategory) {
        return false;
      }

      // 4. District
      if (selectedDistrict !== 'all' && job.location.district !== selectedDistrict) {
        return false;
      }

      // 5. Job Type
      if (selectedJobTypes.length > 0 && !selectedJobTypes.includes(job.jobType)) {
        return false;
      }

      // 6. Education
      if (selectedEducation !== 'Semua Pendidikan') {
        if (job.education !== 'Semua Pendidikan' && job.education !== selectedEducation) {
          return false;
        }
      }

      // 7. Fresh Graduate
      if (freshGradOnly && !job.isFreshGraduateFriendly) {
        return false;
      }

      // 8. Urgent
      if (urgentOnly && !job.isUrgentHiring) {
        return false;
      }

      // 9. Min Salary
      if (minSalary > 0 && job.salaryMax < minSalary) {
        return false;
      }

      // 10. Transport ease (e.g. walk <= 2km, motor <= 10km)
      if (transportEase === 'walk' && (job.distanceKm ?? 0) > 2.5) {
        return false;
      }

      return true;
    });
  }, [
    jobs,
    query,
    selectedRadius,
    selectedCategory,
    selectedDistrict,
    selectedJobTypes,
    selectedEducation,
    freshGradOnly,
    urgentOnly,
    minSalary,
    transportEase
  ]);

  const resetFilters = () => {
    setSelectedRadius(15);
    setSelectedCategory('all');
    setSelectedDistrict('all');
    setSelectedJobTypes([]);
    setSelectedEducation('Semua Pendidikan');
    setFreshGradOnly(false);
    setUrgentOnly(false);
    setTransportEase('all');
    setMinSalary(0);
    setQuery('');
  };

  const activeFilterCount = [
    selectedRadius !== 15,
    selectedCategory !== 'all',
    selectedDistrict !== 'all',
    selectedJobTypes.length > 0,
    selectedEducation !== 'Semua Pendidikan',
    freshGradOnly,
    urgentOnly,
    transportEase !== 'all',
    minSalary > 0
  ].filter(Boolean).length;

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-200">
      {/* Search Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md pt-1 pb-2 z-20 space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari posisi atau perusahaan Bogor..."
              className="w-full pl-9 pr-8 py-2.5 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              autoFocus={!initialFilter}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilterModal(true)}
            className={`p-2.5 rounded-2xl border transition relative flex items-center justify-center ${
              activeFilterCount > 0
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Quick chip bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setUrgentOnly(!urgentOnly)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${
              urgentOnly
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            <Zap className="w-3 h-3 fill-current" />
            ⚡ Butuh Hari Ini
          </button>

          <button
            onClick={() => setFreshGradOnly(!freshGradOnly)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${
              freshGradOnly
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            🎓 Tanpa Pengalaman
          </button>

          <button
            onClick={() => setSelectedRadius(selectedRadius === 5 ? 15 : 5)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition ${
              selectedRadius === 5
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            📍 Dekat (&lt;5 KM)
          </button>
        </div>
      </div>

      {/* Popular keywords when search is empty and no filters */}
      {!query && activeFilterCount === 0 && (
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Pencarian Populer di Bogor
          </div>
          <div className="flex flex-wrap gap-1.5">
            {popularKeywords.map((kw, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(kw)}
                className="px-2.5 py-1 text-xs bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 text-slate-700 rounded-xl border border-slate-200 transition"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Meta */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-slate-600">
          Menampilkan <strong className="text-slate-900">{filteredJobs.length} lowongan</strong>
        </span>

        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Filter
          </button>
        )}
      </div>

      {/* Job List */}
      <div className="space-y-2.5">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => onSelectJob(job.id)}
          />
        ))}

        {filteredJobs.length === 0 && (
          <div className="py-12 px-4 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">Tidak ada lowongan yang sesuai</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Coba perluas radius jarak atau kurangi filter pencarian kamu.
            </p>
            <button
              onClick={resetFilters}
              className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-xs"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>

      {/* 55. Filter Bottom Sheet Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-2xs p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-[430px] max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                Filter Lowongan Kerja Bogor
              </h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
              {/* Radius Jarak */}
              <div>
                <label className="font-bold text-slate-900 block mb-1.5">
                  Radius Jarak dari {userLocation.district}
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 3, 5, 10, 15].map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRadius(r)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        selectedRadius === r
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {r} KM
                    </button>
                  ))}
                </div>
              </div>

              {/* Tipe Pekerjaan */}
              <div>
                <label className="font-bold text-slate-900 block mb-1.5">
                  Tipe Pekerjaan
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Full Time', 'Part Time', 'Freelance', 'Magang', 'Harian'] as JobType[]).map(
                    (type) => {
                      const isSelected = selectedJobTypes.includes(type);
                      return (
                        <button
                          key={type}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedJobTypes(selectedJobTypes.filter((t) => t !== type));
                            } else {
                              setSelectedJobTypes([...selectedJobTypes, type]);
                            }
                          }}
                          className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Pendidikan Minimal */}
              <div>
                <label className="font-bold text-slate-900 block mb-1.5">
                  Pendidikan Minimal
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['Semua Pendidikan', 'SMA/SMK', 'D3', 'D4/S1'] as EducationLevel[]).map(
                    (edu) => (
                      <button
                        key={edu}
                        onClick={() => setSelectedEducation(edu)}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border text-left flex items-center justify-between transition ${
                          selectedEducation === edu
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        <span>{edu}</span>
                        {selectedEducation === edu && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Kemudahan Transportasi (Constraint 24) */}
              <div>
                <label className="font-bold text-slate-900 block mb-1.5">
                  Akses Transportasi dari Rumah
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setTransportEase(transportEase === 'walk' ? 'all' : 'walk')}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      transportEase === 'walk'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🚶 Bisa Jalan Kaki (&lt;2.5 KM)
                  </button>
                  <button
                    onClick={() => setTransportEase('all')}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      transportEase === 'all'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🛵 Motor / Angkot / KRL
                  </button>
                </div>
              </div>

              {/* Kecamatan Bogor */}
              <div>
                <label className="font-bold text-slate-900 block mb-1.5">
                  Wilayah / Kecamatan Spesifik
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Semua Wilayah Bogor</option>
                  {BOGOR_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.district}>
                      {loc.district} ({loc.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkboxes: Fresh Grad & Urgent */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="flex items-center gap-2 p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={freshGradOnly}
                    onChange={(e) => setFreshGradOnly(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded-sm"
                  />
                  <div>
                    <div className="font-bold text-amber-950 text-xs">🎓 Hanya Tanpa Pengalaman / Fresh Grad</div>
                    <div className="text-[10px] text-amber-800">Lowongan yang menyediakan training kerja</div>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={urgentOnly}
                    onChange={(e) => setUrgentOnly(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded-sm"
                  />
                  <div>
                    <div className="font-bold text-rose-950 text-xs">⚡ Butuh Orang Hari Ini (Urgent)</div>
                    <div className="text-[10px] text-rose-800">Proses cepat 1–3 hari dan gaji harian</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center gap-2 bg-slate-50">
              <button
                onClick={resetFilters}
                className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-100 transition"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition shadow-xs"
              >
                Terapkan Filter ({filteredJobs.length} Lowongan)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
