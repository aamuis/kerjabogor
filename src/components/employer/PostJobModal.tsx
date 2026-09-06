import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Job, JobType, EducationLevel } from '../../types';
import { X, Plus, Zap, Check, Sparkles, Building2, MapPin } from 'lucide-react';
import { BOGOR_LOCATIONS } from '../../data/bogorData';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose }) => {
  const { createJob, activeCompany, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Administrasi & Perkantoran');
  const [jobType, setJobType] = useState<JobType>('Full Time');
  const [district, setDistrict] = useState(activeCompany.location.district);
  const [salaryMin, setSalaryMin] = useState(4000000);
  const [salaryMax, setSalaryMax] = useState(5500000);
  const [salaryPeriod, setSalaryPeriod] = useState<'bulan' | 'hari' | 'jam' | 'borongan'>('bulan');
  const [salaryDisclosed, setSalaryDisclosed] = useState(true);
  const [education, setEducation] = useState<EducationLevel>('SMA/SMK');
  const [minExpYears, setMinExpYears] = useState(0);
  const [isFreshGradFriendly, setIsFreshGradFriendly] = useState(true);
  const [isUrgentHiring, setIsUrgentHiring] = useState(false);
  const [description, setDescription] = useState('');
  const [skillsString, setSkillsString] = useState('Komunikasi, Microsoft Office, Teliti, Kerja Tim');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const locObj = BOGOR_LOCATIONS.find((l) => l.district === district) || activeCompany.location;

    createJob({
      title,
      companyId: activeCompany.id,
      companyName: activeCompany.name,
      companyLogo: activeCompany.logo,
      isVerifiedCompany: activeCompany.isVerified,
      category,
      jobType,
      location: locObj,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      salaryPeriod,
      salaryDisclosed,
      education,
      minExperienceYears: Number(minExpYears),
      isFreshGraduateFriendly: isFreshGradFriendly,
      isUrgentHiring,
      urgentStartDate: isUrgentHiring ? 'Mulai Besok / 2 Hari ke Depan' : undefined,
      description: description || `Dibutuhkan segera posisi ${title} untuk penempatan di cabang Bogor.`,
      responsibilities: [
        `Melaksanakan tugas operasional ${title} sesuai SOP perusahaan`,
        'Bekerja sama dengan tim divisi dan melapor kepada supervisor',
        'Menjaga ketelitian, kerapihan, dan standar pelayanan'
      ],
      requirements: [
        `Pendidikan minimal ${education}`,
        isFreshGradFriendly ? 'Terbuka untuk fresh graduate / tanpa pengalaman' : `Pengalaman minimal ${minExpYears} tahun`,
        'Domisili di wilayah Bogor diutamakan'
      ],
      skillsRequired: skillsString.split(',').map((s) => s.trim()).filter(Boolean),
      benefits: ['Gaji Pokok Kompetitif', 'BPJS Ketenagakerjaan & Kesehatan', 'Insentif & Bonus Performa', 'Tunjangan Transport'],
      screeningQuestions: [
        'Apakah Anda bersedia bekerja di wilayah ' + district + '?',
        'Berapa lama waktu yang Anda butuhkan untuk mulai bergabung?'
      ],
      openPositions: 2,
      recruitmentProcessDays: isUrgentHiring ? 2 : 5
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-2xs p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-[430px] max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/70">
          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">
              Employer Hub
            </span>
            <h3 className="font-extrabold text-sm text-slate-900">
              Pasang Lowongan Kerja Baru
            </h3>
            <p className="text-xs text-slate-600">{activeCompany.name}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs custom-scrollbar">
          {/* Urgent Hiring Switch (Constraint 8) */}
          <label className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 border border-rose-200 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <div>
                <div className="font-extrabold text-rose-950 text-xs">⚡ Butuh Orang Hari Ini (Urgent)</div>
                <div className="text-[10px] text-rose-800">Tampilkan banner urgent & proses 1-3 hari</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isUrgentHiring}
              onChange={(e) => setIsUrgentHiring(e.target.checked)}
              className="w-5 h-5 text-rose-600 rounded-md"
            />
          </label>

          {/* Posisi */}
          <div>
            <label className="font-bold text-slate-900 block mb-1">Judul Posisi / Loker</label>
            <input
              type="text"
              required
              placeholder="Cth: Barista & Kasir Cafe, Admin Gudang, dll"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          {/* Kategori & Tipe */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-900 block mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option>Administrasi & Perkantoran</option>
                <option>Restoran, Cafe & Kuliner</option>
                <option>Gudang, Logistik & Kurir</option>
                <option>Sales, Kasir & Toko</option>
                <option>Pabrik & Manufaktur</option>
                <option>Hotel & Pariwisata</option>
                <option>Teknologi Informasi</option>
                <option>Pendidikan & Guru</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Tipe Pekerjaan</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Harian</option>
                <option>Freelance</option>
                <option>Magang</option>
              </select>
            </div>
          </div>

          {/* Lokasi Kecamatan */}
          <div>
            <label className="font-bold text-slate-900 block mb-1">Lokasi Penempatan (Kecamatan)</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
            >
              {BOGOR_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.district}>
                  {loc.district} ({loc.type})
                </option>
              ))}
            </select>
          </div>

          {/* Gaji */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Rentang Gaji Ditawarkan</span>
              <select
                value={salaryPeriod}
                onChange={(e) => setSalaryPeriod(e.target.value as any)}
                className="text-xs p-1 bg-white border border-slate-200 rounded-lg"
              >
                <option value="bulan">Per Bulan</option>
                <option value="hari">Per Hari</option>
                <option value="jam">Per Jam</option>
                <option value="borongan">Per Borongan</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 block">Min (Rp)</label>
                <input
                  type="number"
                  step="50000"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block">Max (Rp)</label>
                <input
                  type="number"
                  step="50000"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Pendidikan & Pengalaman */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-900 block mb-1">Pendidikan Min.</label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option>Semua Pendidikan</option>
                <option>SMA/SMK</option>
                <option>D3</option>
                <option>D4/S1</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-950">
                <input
                  type="checkbox"
                  checked={isFreshGradFriendly}
                  onChange={(e) => setIsFreshGradFriendly(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm"
                />
                <span className="text-xs">✨ Fresh Grad OK</span>
              </label>
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="font-bold text-slate-900 block mb-1">
              Keahlian yang Dibutuhkan (Pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={skillsString}
              onChange={(e) => setSkillsString(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              placeholder="Cth: Kasir POS, Barista, Komunikasi"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="font-bold text-slate-900 block mb-1">Deskripsi Singkat</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan gambaran umum pekerjaan..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl font-black text-xs shadow-md transition"
          >
            TERBITKAN LOWONGAN SEKARANG
          </button>
        </form>
      </div>
    </div>
  );
};
