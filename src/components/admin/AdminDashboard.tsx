import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  Search,
  Filter,
  Check,
  AlertTriangle,
  CreditCard,
  Settings,
  DollarSign,
  Palette,
  Layers,
  LogOut
} from 'lucide-react';
import { formatRupiah } from '../../utils/distance';
import { PaymentsAdminTab } from './PaymentsAdminTab';
import { RevenueAdminTab } from './RevenueAdminTab';
import { PaymentSettingsTab } from './PaymentSettingsTab';
import { SiteCustomizerTab } from './SiteCustomizerTab';
import { ContentManagerTab } from './ContentManagerTab';

export const AdminDashboard: React.FC = () => {
  const { jobs, allCompanies, applications, invoices, role, setRole, logoutUser, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<
    'customizer' | 'content' | 'payments' | 'revenue' | 'settings' | 'moderation' | 'companies'
  >('customizer');

  const pendingPaymentsCount = invoices.filter((i) => i.status === 'pending').length;
  const verifiedRevenue = invoices
    .filter((i) => i.status === 'verified')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Role Switcher & Admin Exit */}
      <div className="p-3 bg-slate-900 text-white rounded-3xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-extrabold">Panel Rahasia Pengelola & Admin</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setRole('seeker')}
            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl shadow-xs transition"
          >
            Lihat Situs →
          </button>
          <button
            onClick={logoutUser}
            className="p-1 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 rounded-xl transition"
            title="Keluar Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Analytics Metric Counter Grid */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
            Sistem Kendali Penuh & Monetisasi Kerja Bogor
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
            Live Database
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-base font-black text-emerald-400">{jobs.length}</div>
            <div className="text-[9px] text-slate-300 mt-0.5">Total Loker</div>
          </div>

          <div className="p-2 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-base font-black text-sky-400">{allCompanies.length}</div>
            <div className="text-[9px] text-slate-300 mt-0.5">Perusahaan</div>
          </div>

          <div className="p-2 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-base font-black text-amber-400">{pendingPaymentsCount}</div>
            <div className="text-[9px] text-slate-300 mt-0.5">Pending Bayar</div>
          </div>

          <div className="p-2 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-base font-black text-emerald-300 truncate">
              Rp{(verifiedRevenue / 1000).toFixed(0)}k
            </div>
            <div className="text-[9px] text-slate-300 mt-0.5">Omset Masuk</div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('customizer')}
          className={`py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
            activeTab === 'customizer'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Kustomisasi Tampilan Situs</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
            activeTab === 'content'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Kelola Semua Konten & Loker</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
            activeTab === 'payments'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Verifikasi Bayar ({pendingPaymentsCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('revenue')}
          className={`py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
            activeTab === 'revenue'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Revenue & Omset</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Rekening & Paket</span>
        </button>

        <button
          onClick={() => setActiveTab('moderation')}
          className={`py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-1.5 ${
            activeTab === 'moderation'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Moderasi QC</span>
        </button>
      </div>

      {/* Tab: Site Customizer (White-labeling) */}
      {activeTab === 'customizer' && <SiteCustomizerTab />}

      {/* Tab: Content Manager (Edit jobs & companies) */}
      {activeTab === 'content' && <ContentManagerTab />}

      {/* Tab: Payments Admin (Constraint 69) */}
      {activeTab === 'payments' && <PaymentsAdminTab />}

      {/* Tab: Revenue Analytics (Constraint 79, 80) */}
      {activeTab === 'revenue' && <RevenueAdminTab />}

      {/* Tab: Payment Settings & Pricing (Constraint 74, 84) */}
      {activeTab === 'settings' && <PaymentSettingsTab />}

      {/* Tab: Moderation List */}
      {activeTab === 'moderation' && (
        <div className="space-y-3">
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Semua lowongan diverifikasi bebas biaya pendaftaran (Gratis 100%).</span>
          </div>

          <div className="space-y-2.5">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-sm text-slate-900 truncate">{job.title}</h4>
                    <div className="text-slate-500 font-medium">
                      {job.companyName} • {job.location.district}
                    </div>
                    <div className="text-emerald-700 font-bold mt-1">
                      {formatRupiah(job.salaryMin, true)} - {formatRupiah(job.salaryMax, true)}/{job.salaryPeriod}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Terverifikasi
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => showToast('Lowongan lolos verifikasi keamanan.')}
                    className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-bold flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Lolos QC</span>
                  </button>

                  <button
                    onClick={() => showToast('Peringatan moderasi dikirim ke HRD.')}
                    className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold flex items-center justify-center gap-1"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Tinjau Ulang</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

