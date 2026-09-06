import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VideoIntroLink, ExperienceItem, EducationItem, CertificateItem, PortfolioItem } from '../../types';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Sparkles,
  Video,
  Plus,
  Trash2,
  Edit2,
  Check,
  FileText,
  Building2,
  ShieldCheck,
  ExternalLink,
  Play,
  Award,
  FolderGit2,
  LogOut,
  X,
  Save
} from 'lucide-react';
import { BOGOR_LOCATIONS } from '../../data/bogorData';

interface ProfileScreenProps {
  onOpenCvBuilder: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onOpenCvBuilder }) => {
  const { seekerProfile, updateSeekerProfile, logoutUser, showToast } = useApp();

  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [basicForm, setBasicForm] = useState({
    name: seekerProfile.name,
    title: seekerProfile.title || seekerProfile.headline,
    phone: seekerProfile.phone,
    email: seekerProfile.email,
    district: seekerProfile.location.district,
    bio: seekerProfile.bio,
    workStatus: seekerProfile.workStatus || 'Siap Bekerja'
  });

  // Video Link Form State
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [showAddVideo, setShowAddVideo] = useState(false);

  // Skill Input State
  const [newSkill, setNewSkill] = useState('');

  // Experience Form State
  const [showAddExp, setShowAddExp] = useState(false);
  const [expForm, setExpForm] = useState<Partial<ExperienceItem>>({
    company: '',
    position: '',
    location: 'Bogor',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  // Education Form State
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [eduForm, setEduForm] = useState<Partial<EducationItem>>({
    institution: '',
    degree: 'SMA/SMK',
    fieldOfStudy: '',
    startYear: '2020',
    endYear: '2023',
    grade: ''
  });

  // Certificate Form State
  const [showAddCert, setShowAddCert] = useState(false);
  const [certForm, setCertForm] = useState<Partial<CertificateItem>>({
    title: '',
    issuer: '',
    issueDate: '2025'
  });

  const handleSaveBasic = (e: React.FormEvent) => {
    e.preventDefault();
    const locObj = BOGOR_LOCATIONS.find((l) => l.district === basicForm.district) || seekerProfile.location;
    updateSeekerProfile({
      name: basicForm.name,
      title: basicForm.title,
      headline: basicForm.title,
      phone: basicForm.phone,
      email: basicForm.email,
      location: locObj,
      bio: basicForm.bio,
      workStatus: basicForm.workStatus as any
    });
    setIsEditingBasic(false);
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoUrl.trim()) return;

    let platform: 'youtube' | 'tiktok' | 'instagram' = 'youtube';
    if (newVideoUrl.includes('tiktok.com')) platform = 'tiktok';
    else if (newVideoUrl.includes('instagram.com')) platform = 'instagram';

    const newLink: VideoIntroLink = {
      id: `vid-${Date.now()}`,
      platform,
      url: newVideoUrl,
      title: newVideoTitle || `Video Perkenalan Diri (${platform.toUpperCase()})`,
      thumbnailUrl:
        platform === 'youtube'
          ? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&auto=format&fit=crop&q=80'
    };

    updateSeekerProfile({
      videoLinks: [newLink, ...(seekerProfile.videoLinks || [])]
    });

    setNewVideoUrl('');
    setNewVideoTitle('');
    setShowAddVideo(false);
    showToast('Video perkenalan berhasil ditambahkan ke profil!');
  };

  const handleDeleteVideo = (id: string) => {
    updateSeekerProfile({
      videoLinks: (seekerProfile.videoLinks || []).filter((v) => v.id !== id)
    });
    showToast('Video dihapus.');
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!seekerProfile.skills.includes(newSkill.trim())) {
      updateSeekerProfile({
        skills: [...seekerProfile.skills, newSkill.trim()]
      });
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateSeekerProfile({
      skills: seekerProfile.skills.filter((s) => s !== skillToRemove)
    });
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.company || !expForm.position) return;
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: expForm.company || '',
      position: expForm.position || '',
      location: expForm.location || 'Bogor',
      startDate: expForm.startDate || '2023',
      endDate: expForm.current ? 'Sekarang' : (expForm.endDate || '2024'),
      current: !!expForm.current,
      description: expForm.description || ''
    };

    const currentExps = seekerProfile.experiences || [];
    updateSeekerProfile({
      experiences: [newExp, ...currentExps],
      experience: [newExp, ...currentExps]
    });
    setExpForm({
      company: '',
      position: '',
      location: 'Bogor',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    setShowAddExp(false);
    showToast('Pengalaman kerja berhasil ditambahkan!');
  };

  const handleDeleteExperience = (id: string) => {
    const nextExps = (seekerProfile.experiences || []).filter((e) => e.id !== id);
    updateSeekerProfile({
      experiences: nextExps,
      experience: nextExps
    });
    showToast('Pengalaman kerja dihapus.');
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.institution) return;
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: eduForm.institution || '',
      degree: eduForm.degree || 'SMA/SMK',
      fieldOfStudy: eduForm.fieldOfStudy || '',
      startYear: eduForm.startYear || '2020',
      endYear: eduForm.endYear || '2023',
      grade: eduForm.grade || ''
    };

    const currentEdus = seekerProfile.educations || [];
    updateSeekerProfile({
      educations: [newEdu, ...currentEdus],
      education: [newEdu, ...currentEdus]
    });
    setEduForm({
      institution: '',
      degree: 'SMA/SMK',
      fieldOfStudy: '',
      startYear: '2020',
      endYear: '2023',
      grade: ''
    });
    setShowAddEdu(false);
    showToast('Riwayat pendidikan berhasil ditambahkan!');
  };

  const handleDeleteEducation = (id: string) => {
    const nextEdus = (seekerProfile.educations || []).filter((e) => e.id !== id);
    updateSeekerProfile({
      educations: nextEdus,
      education: nextEdus
    });
    showToast('Pendidikan dihapus.');
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) return;
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      title: certForm.title || '',
      issuer: certForm.issuer || '',
      issueDate: certForm.issueDate || '2025'
    };
    const currentCerts = seekerProfile.certificates || [];
    updateSeekerProfile({
      certificates: [newCert, ...currentCerts],
      certifications: [newCert, ...currentCerts]
    });
    setCertForm({ title: '', issuer: '', issueDate: '2025' });
    setShowAddCert(false);
    showToast('Sertifikat berhasil ditambahkan!');
  };

  const handleDeleteCertificate = (id: string) => {
    const nextCerts = (seekerProfile.certificates || []).filter((c) => c.id !== id);
    updateSeekerProfile({
      certificates: nextCerts,
      certifications: nextCerts
    });
    showToast('Sertifikat dihapus.');
  };

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Profile Top Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={seekerProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80'}
                alt={seekerProfile.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                ✓
              </span>
            </div>

            <div>
              <h2 className="font-black text-base text-slate-900 leading-tight">
                {seekerProfile.name}
              </h2>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">
                {seekerProfile.title || seekerProfile.headline}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{seekerProfile.location?.district || 'Bogor'}, {seekerProfile.location?.type || 'Kota Bogor'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditingBasic(!isEditingBasic)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Edit Profil"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Work Status Badge */}
        <div className="flex items-center justify-between p-2.5 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-xs">
          <span className="font-bold text-emerald-950">Status Ketersediaan Kerja:</span>
          <span className="font-extrabold text-emerald-800 bg-white px-2.5 py-1 rounded-xl shadow-2xs border border-emerald-200">
            🟢 {seekerProfile.workStatus || 'Siap Bekerja'}
          </span>
        </div>

        {/* Edit Basic Form */}
        {isEditingBasic ? (
          <form onSubmit={handleSaveBasic} className="space-y-3 pt-3 border-t border-slate-100 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={basicForm.name}
                onChange={(e) => setBasicForm({ ...basicForm, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Posisi / Keahlian</label>
                <input
                  type="text"
                  required
                  value={basicForm.title}
                  onChange={(e) => setBasicForm({ ...basicForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Domisili Kecamatan</label>
                <select
                  value={basicForm.district}
                  onChange={(e) => setBasicForm({ ...basicForm, district: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                >
                  {BOGOR_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.district}>
                      {loc.district} ({loc.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">No. WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={basicForm.phone}
                  onChange={(e) => setBasicForm({ ...basicForm, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status Bekerja</label>
                <select
                  value={basicForm.workStatus}
                  onChange={(e) => setBasicForm({ ...basicForm, workStatus: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                >
                  <option value="Siap Bekerja">Siap Bekerja Segera</option>
                  <option value="Sedang Bekerja">Sedang Bekerja</option>
                  <option value="Terbuka untuk Tawaran">Terbuka untuk Tawaran</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Ringkasan Bio Profil</label>
              <textarea
                rows={2}
                value={basicForm.bio}
                onChange={(e) => setBasicForm({ ...basicForm, bio: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditingBasic(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow-xs"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        ) : (
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
            {seekerProfile.bio}
          </p>
        )}

        {/* Open CV Builder Button */}
        <button
          onClick={onOpenCvBuilder}
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 text-white rounded-2xl font-black text-xs transition shadow-md flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>Buka & Cetak CV Otomatis (Format Bogor)</span>
        </button>
      </div>

      {/* Skills Manager */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Keterampilan & Keahlian ({seekerProfile.skills?.length || 0})
        </h3>

        <form onSubmit={handleAddSkill} className="flex gap-2">
          <input
            type="text"
            placeholder="Tambah skill baru (cth: Kasir POS, Barista)..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700"
          >
            Tambah
          </button>
        </form>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {(seekerProfile.skills || []).map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="text-emerald-700 hover:text-rose-600 font-bold ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Pengalaman Kerja with CRUD */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            Pengalaman Kerja ({seekerProfile.experiences?.length || 0})
          </h3>
          <button
            onClick={() => setShowAddExp(!showAddExp)}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </div>

        {showAddExp && (
          <form onSubmit={handleAddExperience} className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2 text-xs">
            <div className="font-bold text-emerald-950">Tambah Pengalaman Kerja Baru:</div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Posisi / Jabatan</label>
              <input
                type="text"
                required
                placeholder="contoh: Staff Admin Gudang"
                value={expForm.position}
                onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
                className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Nama Perusahaan / Tempat Usaha</label>
              <input
                type="text"
                required
                placeholder="contoh: PT Kahatex Logistik / Cafe Sentul"
                value={expForm.company}
                onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Tahun Masuk</label>
                <input
                  type="text"
                  placeholder="2023"
                  value={expForm.startDate}
                  onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                  className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Tahun Keluar</label>
                <input
                  type="text"
                  placeholder="2024 / Sekarang"
                  value={expForm.endDate}
                  onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                  className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Deskripsi Singkat Pekerjaan</label>
              <textarea
                rows={2}
                placeholder="Menghandle pencatatan stok, surat jalan, dan input laporan..."
                value={expForm.description}
                onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
              />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowAddExp(false)}
                className="px-3 py-1.5 bg-white text-slate-600 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl font-bold shadow-xs"
              >
                Simpan Pengalaman
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2.5">
          {(seekerProfile.experiences || []).map((exp) => (
            <div key={exp.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1 relative group">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-slate-900">{exp.position}</div>
                  <div className="text-slate-600 text-[11px]">{exp.company} • {exp.location}</div>
                  <div className="text-[10px] text-emerald-700 font-bold">{exp.startDate} - {exp.current ? 'Sekarang' : exp.endDate}</div>
                </div>
                <button
                  onClick={() => handleDeleteExperience(exp.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Hapus Pengalaman"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {exp.description && <p className="text-slate-700 text-[11px] pt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Pendidikan with CRUD */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            Riwayat Pendidikan ({seekerProfile.educations?.length || 0})
          </h3>
          <button
            onClick={() => setShowAddEdu(!showAddEdu)}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </div>

        {showAddEdu && (
          <form onSubmit={handleAddEducation} className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2 text-xs">
            <div className="font-bold text-emerald-950">Tambah Riwayat Pendidikan:</div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Nama Sekolah / Kampus</label>
              <input
                type="text"
                required
                placeholder="contoh: SMKN 1 Bogor / Universitas Pakuan"
                value={eduForm.institution}
                onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Jenjang</label>
                <select
                  value={eduForm.degree}
                  onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                  className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
                >
                  <option value="SMP">SMP</option>
                  <option value="SMA/SMK">SMA/SMK</option>
                  <option value="D3">D3</option>
                  <option value="D4/S1">D4/S1</option>
                  <option value="S2">S2</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Jurusan</label>
                <input
                  type="text"
                  placeholder="Administrasi / Akuntansi"
                  value={eduForm.fieldOfStudy}
                  onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })}
                  className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Tahun Lulus</label>
                <input
                  type="text"
                  placeholder="2023"
                  value={eduForm.endYear}
                  onChange={(e) => setEduForm({ ...eduForm, endYear: e.target.value })}
                  className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Nilai / IPK (Opsional)</label>
                <input
                  type="text"
                  placeholder="88.5 / 3.75"
                  value={eduForm.grade}
                  onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                  className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowAddEdu(false)}
                className="px-3 py-1.5 bg-white text-slate-600 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl font-bold shadow-xs"
              >
                Simpan Pendidikan
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {(seekerProfile.educations || []).map((edu) => (
            <div key={edu.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">{edu.institution}</div>
                <div className="text-emerald-700 font-semibold text-[11px]">{edu.degree} - {edu.fieldOfStudy} (Lulus {edu.endYear})</div>
              </div>
              <button
                onClick={() => handleDeleteEducation(edu.id)}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Hapus Pendidikan"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sertifikasi with CRUD */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" />
            Sertifikat & Pelatihan ({seekerProfile.certificates?.length || 0})
          </h3>
          <button
            onClick={() => setShowAddCert(!showAddCert)}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </div>

        {showAddCert && (
          <form onSubmit={handleAddCertificate} className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2 text-xs">
            <div className="font-bold text-emerald-950">Tambah Sertifikasi:</div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Nama Sertifikat / Pelatihan</label>
              <input
                type="text"
                required
                placeholder="contoh: Sertifikasi BNSP Administrasi / Barista Kopi"
                value={certForm.title}
                onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Penerbit / Lembaga</label>
                <input
                  type="text"
                  required
                  placeholder="BNSP / BLK Bogor"
                  value={certForm.issuer}
                  onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                  className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Tahun</label>
                <input
                  type="text"
                  placeholder="2025"
                  value={certForm.issueDate}
                  onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                  className="w-full p-2 bg-white border border-emerald-200 rounded-xl"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowAddCert(false)}
                className="px-3 py-1.5 bg-white text-slate-600 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl font-bold shadow-xs"
              >
                Simpan Sertifikat
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {(seekerProfile.certificates || []).map((cert) => (
            <div key={cert.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">{cert.title}</div>
                <div className="text-slate-500 text-[11px]">{cert.issuer} • {cert.issueDate}</div>
              </div>
              <button
                onClick={() => handleDeleteCertificate(cert.id)}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Hapus Sertifikat"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Perkenalan Sosial Media */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-slate-900">
                Video Perkenalan Diri (Sosmed)
              </h3>
              <p className="text-[10px] text-slate-500">
                Link YouTube Shorts, TikTok, atau Reels Instagram
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddVideo(!showAddVideo)}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah
          </button>
        </div>

        {/* Add video form */}
        {showAddVideo && (
          <form onSubmit={handleAddVideo} className="p-3 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-2 text-xs">
            <div>
              <label className="font-bold text-rose-950 block mb-1">
                Tautan Video (YouTube / TikTok / IG)
              </label>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=... atau tiktok.com/@..."
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                className="w-full p-2 bg-white border border-rose-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-rose-950 block mb-1">Judul Video (Opsional)</label>
              <input
                type="text"
                placeholder="Perkenalan Diri & Portofolio Admin"
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
                className="w-full p-2 bg-white border border-rose-200 rounded-xl"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddVideo(false)}
                className="px-3 py-1.5 bg-white text-slate-600 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-rose-600 text-white rounded-xl font-bold shadow-xs"
              >
                Simpan Video
              </button>
            </div>
          </form>
        )}

        {/* Video list cards */}
        <div className="space-y-2">
          {(seekerProfile.videoLinks || []).map((vid) => (
            <div
              key={vid.id}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center relative overflow-hidden shrink-0">
                  {vid.thumbnailUrl ? (
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : null}
                  <Play className="w-4 h-4 text-white absolute" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-slate-900 truncate">{vid.title}</div>
                  <span className="text-[10px] font-bold text-rose-600 uppercase">
                    {vid.platform}
                  </span>
                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-slate-400 hover:text-emerald-600 block truncate"
                  >
                    {vid.url}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleDeleteVideo(vid.id)}
                className="p-2 text-slate-400 hover:text-rose-600 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Account Logout Card */}
      <div className="pt-2">
        <button
          onClick={logoutUser}
          className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs rounded-2xl border border-rose-200 transition flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar dari Akun</span>
        </button>
      </div>
    </div>
  );
};

