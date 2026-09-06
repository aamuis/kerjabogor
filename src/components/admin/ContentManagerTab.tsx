import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Job, Company, BogorLocation } from '../../types';
import { BOGOR_LOCATIONS } from '../../data/bogorData';
import { formatRupiah } from '../../utils/distance';
import {
  Briefcase,
  Building2,
  Edit,
  Trash2,
  Plus,
  Search,
  CheckCircle2,
  X,
  Save,
  MapPin,
  DollarSign,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const ContentManagerTab: React.FC = () => {
  const { jobs, allCompanies, editJob, deleteJob, addJob, editCompany, addCompany, showToast } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'jobs' | 'companies'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing Job Modal State
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

  // Editing Company Modal State
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  // Filtered lists
  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompanies = allCompanies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    editJob(editingJob.id, editingJob);
    setEditingJob(null);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) return;
    editCompany(editingCompany.id, editingCompany);
    setEditingCompany(null);
  };

  const handleDeleteJobConfirm = (job: Job) => {
    if (window.confirm(`Yakin ingin menghapus lowongan "${job.title}" oleh ${job.companyName}?`)) {
      deleteJob(job.id);
    }
  };

  return (
    <div className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Sub-tab Navigation */}
      <div className="flex bg-slate-200/70 p-1 rounded-2xl gap-1">
        <button
          type="button"
          onClick={() => setActiveSubTab('jobs')}
          className={`flex-1 py-2 rounded-xl font-extrabold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'jobs' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Kelola Semua Lowongan ({jobs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('companies')}
          className={`flex-1 py-2 rounded-xl font-extrabold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'companies' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Kelola Perusahaan ({allCompanies.length})</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder={activeSubTab === 'jobs' ? 'Cari judul lowongan, perusahaan, lokasi...' : 'Cari nama perusahaan, industri...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* ----------------- JOBS LIST ----------------- */}
      {activeSubTab === 'jobs' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-slate-500 px-1">
            <span>Ditemukan {filteredJobs.length} lowongan</span>
          </div>

          <div className="space-y-2.5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-10 h-10 rounded-2xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                        {job.title}
                      </h4>
                      <div className="text-slate-500 font-medium mt-0.5">
                        {job.companyName} • {job.location.district}
                      </div>
                      <div className="text-emerald-700 font-bold mt-1">
                        {formatRupiah(job.salaryMin, true)} - {formatRupiah(job.salaryMax, true)}/{job.salaryPeriod}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                      job.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {job.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingJob({ ...job })}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Edit className="w-3.5 h-3.5 text-slate-600" />
                    <span>Edit Loker</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteJobConfirm(job)}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold transition flex items-center justify-center"
                    title="Hapus Lowongan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- COMPANIES LIST ----------------- */}
      {activeSubTab === 'companies' && (
        <div className="space-y-3">
          <div className="space-y-2.5">
            {filteredCompanies.map((comp) => (
              <div
                key={comp.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">
                          {comp.name}
                        </h4>
                        {comp.isVerified && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </div>
                      <div className="text-slate-500 font-medium">
                        {comp.industry} • {comp.location.district}
                      </div>
                      <div className="text-slate-400 text-[10px] mt-0.5 truncate">
                        {comp.address}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingCompany({ ...comp })}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Edit className="w-3.5 h-3.5 text-slate-600" />
                    <span>Edit Profil Perusahaan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- EDIT JOB MODAL ----------------- */}
      {editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-sm text-slate-900">Edit Lowongan Pekerjaan</h3>
              <button
                onClick={() => setEditingJob(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Judul Pekerjaan</label>
                <input
                  type="text"
                  required
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Perusahaan / Usaha</label>
                <input
                  type="text"
                  required
                  value={editingJob.companyName}
                  onChange={(e) => setEditingJob({ ...editingJob, companyName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gaji Minimal (Rp)</label>
                  <input
                    type="number"
                    value={editingJob.salaryMin}
                    onChange={(e) => setEditingJob({ ...editingJob, salaryMin: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gaji Maksimal (Rp)</label>
                  <input
                    type="number"
                    value={editingJob.salaryMax}
                    onChange={(e) => setEditingJob({ ...editingJob, salaryMax: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipe Lowongan</label>
                  <select
                    value={editingJob.jobType}
                    onChange={(e) => setEditingJob({ ...editingJob, jobType: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Magang">Magang</option>
                    <option value="Harian">Harian</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kecamatan Bogor</label>
                  <select
                    value={editingJob.location.district}
                    onChange={(e) => {
                      const selectedLoc = BOGOR_LOCATIONS.find((l) => l.district === e.target.value) || editingJob.location;
                      setEditingJob({ ...editingJob, location: selectedLoc });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
                  >
                    {BOGOR_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.district}>
                        {loc.district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status Lowongan</label>
                <select
                  value={editingJob.status}
                  onChange={(e) => setEditingJob({ ...editingJob, status: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:outline-none"
                >
                  <option value="active">Aktif (Ditampilkan ke Pelamar)</option>
                  <option value="closed">Ditutup</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Pekerjaan</label>
                <textarea
                  rows={3}
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- EDIT COMPANY MODAL ----------------- */}
      {editingCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-sm text-slate-900">Edit Profil Perusahaan</h3>
              <button
                onClick={() => setEditingCompany(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCompany} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Perusahaan / Usaha</label>
                <input
                  type="text"
                  required
                  value={editingCompany.name}
                  onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Bidang / Industri</label>
                <input
                  type="text"
                  required
                  value={editingCompany.industry}
                  onChange={(e) => setEditingCompany({ ...editingCompany, industry: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Alamat Lengkap di Bogor</label>
                <textarea
                  rows={2}
                  value={editingCompany.address}
                  onChange={(e) => setEditingCompany({ ...editingCompany, address: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Telepon / WhatsApp</label>
                  <input
                    type="text"
                    value={editingCompany.phone}
                    onChange={(e) => setEditingCompany({ ...editingCompany, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={editingCompany.email}
                    onChange={(e) => setEditingCompany({ ...editingCompany, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700">Status Terverifikasi (Badge Centang Biru)</span>
                <input
                  type="checkbox"
                  checked={editingCompany.isVerified}
                  onChange={(e) => setEditingCompany({ ...editingCompany, isVerified: e.target.checked })}
                  className="w-5 h-5 rounded-md text-emerald-600 cursor-pointer"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perusahaan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
