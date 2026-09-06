import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BOGOR_LOCATIONS } from '../../data/bogorData';
import {
  UserCheck,
  Building2,
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';

interface AuthScreenProps {
  onOpenSecretAdmin: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onOpenSecretAdmin }) => {
  const { loginUser, registerUser, siteConfig, showToast } = useApp();

  const [activeRoleTab, setActiveRoleTab] = useState<'seeker' | 'employer'>('seeker');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Seeker Forms
  const [seekerLoginEmail, setSeekerLoginEmail] = useState('');
  const [seekerLoginPassword, setSeekerLoginPassword] = useState('');

  const [seekerRegName, setSeekerRegName] = useState('');
  const [seekerRegEmail, setSeekerRegEmail] = useState('');
  const [seekerRegPhone, setSeekerRegPhone] = useState('');
  const [seekerRegDistrict, setSeekerRegDistrict] = useState(BOGOR_LOCATIONS[0].district);
  const [seekerRegPassword, setSeekerRegPassword] = useState('');

  // Employer Forms
  const [empLoginEmail, setEmpLoginEmail] = useState('');
  const [empLoginPassword, setEmpLoginPassword] = useState('');

  const [empRegCompanyName, setEmpRegCompanyName] = useState('');
  const [empRegIndustry, setEmpRegIndustry] = useState('Food & Beverage / Cafe');
  const [empRegPicName, setEmpRegPicName] = useState('');
  const [empRegEmail, setEmpRegEmail] = useState('');
  const [empRegPhone, setEmpRegPhone] = useState('');
  const [empRegDistrict, setEmpRegDistrict] = useState(BOGOR_LOCATIONS[1].district);
  const [empRegPassword, setEmpRegPassword] = useState('');

  const handleSeekerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seekerLoginEmail.trim()) {
      showToast('Masukkan alamat email.', 'warning');
      return;
    }
    loginUser(seekerLoginEmail, 'seeker');
  };

  const handleSeekerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seekerRegName.trim() || !seekerRegEmail.trim()) {
      showToast('Mohon lengkapi nama dan email.', 'warning');
      return;
    }
    registerUser({
      name: seekerRegName,
      email: seekerRegEmail,
      role: 'seeker',
      phone: seekerRegPhone,
      district: seekerRegDistrict
    });
  };

  const handleEmployerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empLoginEmail.trim()) {
      showToast('Masukkan alamat email perusahaan.', 'warning');
      return;
    }
    loginUser(empLoginEmail, 'employer');
  };

  const handleEmployerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empRegCompanyName.trim() || !empRegEmail.trim()) {
      showToast('Mohon lengkapi nama perusahaan dan email.', 'warning');
      return;
    }
    registerUser({
      name: empRegPicName || empRegCompanyName,
      companyName: empRegCompanyName,
      email: empRegEmail,
      role: 'employer',
      phone: empRegPhone,
      district: empRegDistrict,
      industry: empRegIndustry
    });
  };

  return (
    <div className="min-h-full flex flex-col justify-between py-2 px-1 text-slate-800 animate-in fade-in duration-300">
      <div className="space-y-4">
        {/* Brand Header */}
        <div className="text-center pt-2 pb-1 space-y-1.5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-2xl shadow-lg shadow-emerald-500/20">
            {siteConfig.brandName.slice(0, 2).toUpperCase() || 'KB'}
          </div>
          <h1 className="text-xl font-black tracking-tight text-slate-900 leading-tight">
            {siteConfig.brandName}
          </h1>
          <p className="text-xs text-emerald-700 font-bold tracking-tight">
            «{siteConfig.brandTagline}»
          </p>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
            Silakan masuk atau daftar akun untuk mengakses ekosistem lowongan kerja & rekrutmen lokal Bogor.
          </p>
        </div>

        {/* Role Selector Tabs (Pencari Kerja vs Perusahaan) */}
        <div className="bg-slate-200/70 p-1 rounded-2xl grid grid-cols-2 gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setActiveRoleTab('seeker');
              setAuthMode('login');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
              activeRoleTab === 'seeker'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Pencari Kerja</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRoleTab('employer');
              setAuthMode('login');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
              activeRoleTab === 'employer'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>Perusahaan / UMKM</span>
          </button>
        </div>

        {/* Auth Mode Toggle (Masuk vs Daftar) */}
        <div className="flex items-center justify-between border-b border-slate-200 px-2 pb-2">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`text-xs font-extrabold pb-1 transition border-b-2 ${
              authMode === 'login'
                ? activeRoleTab === 'seeker'
                  ? 'text-emerald-700 border-emerald-600'
                  : 'text-indigo-700 border-indigo-600'
                : 'text-slate-400 border-transparent hover:text-slate-700'
            }`}
          >
            Masuk Akun
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`text-xs font-extrabold pb-1 transition border-b-2 ${
              authMode === 'register'
                ? activeRoleTab === 'seeker'
                  ? 'text-emerald-700 border-emerald-600'
                  : 'text-indigo-700 border-indigo-600'
                : 'text-slate-400 border-transparent hover:text-slate-700'
            }`}
          >
            Daftar Akun Baru
          </button>
        </div>

        {/* ----------------- SEEKER FLOW ----------------- */}
        {activeRoleTab === 'seeker' && (
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-2xl border border-emerald-100 text-[11px] text-emerald-900 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% GRATIS selamanya untuk seluruh warga & pencari kerja Bogor.</span>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleSeekerLogin} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Pencari Kerja</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="contoh: abdulmuis@gmail.com"
                      value={seekerLoginEmail}
                      onChange={(e) => setSeekerLoginEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kata Sandi</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={seekerLoginPassword}
                      onChange={(e) => setSeekerLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl font-black text-xs transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <span>Masuk sebagai Pencari Kerja</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Quick Demo Fill */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      loginUser('aamuisx@gmail.com', 'seeker', 'Abdul Muis');
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-[11px] transition flex items-center justify-center gap-1.5"
                  >
                    <span>Masuk Cepat Demo: Abdul Muis (Pelamar)</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSeekerRegister} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Lengkap</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap sesuai KTP"
                      value={seekerRegName}
                      onChange={(e) => setSeekerRegName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Alamat Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={seekerRegEmail}
                      onChange={(e) => setSeekerRegEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">No. WhatsApp</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="0812..."
                        value={seekerRegPhone}
                        onChange={(e) => setSeekerRegPhone(e.target.value)}
                        className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kecamatan Bogor</label>
                    <select
                      value={seekerRegDistrict}
                      onChange={(e) => setSeekerRegDistrict(e.target.value)}
                      className="w-full py-2.5 px-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                  <label className="font-bold text-slate-700 block mb-1">Buat Kata Sandi</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimal 6 karakter"
                      value={seekerRegPassword}
                      onChange={(e) => setSeekerRegPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl font-black text-xs transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <span>Daftar Akun & Mulai Buat CV</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* ----------------- EMPLOYER FLOW ----------------- */}
        {activeRoleTab === 'employer' && (
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 p-2.5 bg-indigo-50 rounded-2xl border border-indigo-100 text-[11px] text-indigo-900 font-semibold">
              <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Pasang lowongan gratis & rekrut tenaga kerja lokal Bogor cepat.</span>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleEmployerLogin} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Perusahaan / HRD</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="hrd@perusahaan.com"
                      value={empLoginEmail}
                      onChange={(e) => setEmpLoginEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kata Sandi</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={empLoginPassword}
                      onChange={(e) => setEmpLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-2xl font-black text-xs transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  <span>Masuk Dashboard Perusahaan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Quick Demo Fill */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      loginUser('recruitment@nutrifoodbogor.demo', 'employer', 'PT Nutrifood Sentul');
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-[11px] transition flex items-center justify-center gap-1.5"
                  >
                    <span>Masuk Cepat Demo: PT Nutrifood (HRD)</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleEmployerRegister} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Usaha / Perusahaan</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="contoh: Cafe Kopi Nako / PT Kahatex"
                      value={empRegCompanyName}
                      onChange={(e) => setEmpRegCompanyName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Bidang Usaha</label>
                    <select
                      value={empRegIndustry}
                      onChange={(e) => setEmpRegIndustry(e.target.value)}
                      className="w-full py-2.5 px-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Food & Beverage / Cafe">Food & Beverage / Cafe</option>
                      <option value="Retail & Toko / UMKM">Retail & Toko / UMKM</option>
                      <option value="Manufaktur & Pabrik">Manufaktur & Pabrik</option>
                      <option value="Logistik & Gudang">Logistik & Gudang</option>
                      <option value="Teknologi & Digital">Teknologi & Digital</option>
                      <option value="Kesehatan & Klinik">Kesehatan & Klinik</option>
                      <option value="Pendidikan & Sekolah">Pendidikan & Sekolah</option>
                      <option value="Jasa & Lainnya">Jasa & Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kecamatan Lokasi</label>
                    <select
                      value={empRegDistrict}
                      onChange={(e) => setEmpRegDistrict(e.target.value)}
                      className="w-full py-2.5 px-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      {BOGOR_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.district}>
                          {loc.district}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama PIC / HRD</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={empRegPicName}
                      onChange={(e) => setEmpRegPicName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">No. WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="0812..."
                      value={empRegPhone}
                      onChange={(e) => setEmpRegPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Resmi Rekrutmen</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="hrd@perusahaan.com"
                      value={empRegEmail}
                      onChange={(e) => setEmpRegEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kata Sandi Akun</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimal 6 karakter"
                      value={empRegPassword}
                      onChange={(e) => setEmpRegPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-2xl font-black text-xs transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  <span>Daftar Perusahaan & Pasang Lowongan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Footer & Secret Admin Trigger */}
      <div className="pt-4 pb-2 text-center border-t border-slate-200/60 mt-4 space-y-2">
        <p className="text-[10px] text-slate-400 font-medium">
          {siteConfig.footerText}
        </p>

        {/* Hidden / Discreet Admin Login Trigger */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onOpenSecretAdmin}
            className="text-[10px] text-slate-400/80 hover:text-slate-700 flex items-center gap-1 font-semibold transition px-2 py-1 rounded-lg hover:bg-slate-100"
            title="Akses Khusus Admin & Pemilik Situs"
          >
            <KeyRound className="w-3 h-3 text-slate-400" />
            <span>Akses Pengelola</span>
          </button>
        </div>
      </div>
    </div>
  );
};
