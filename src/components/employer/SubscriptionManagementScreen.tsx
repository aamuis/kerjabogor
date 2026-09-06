import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Crown,
  Sparkles,
  Calendar,
  Clock,
  ArrowUpRight,
  RefreshCw,
  FileText,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Building,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { SubscriptionModal } from './SubscriptionModal';
import { PaymentInvoiceModal } from './PaymentInvoiceModal';
import { Invoice } from '../../types';

export const SubscriptionManagementScreen: React.FC = () => {
  const {
    companySubscription,
    invoices,
    activeCompany,
    createInvoice,
    showToast,
    paymentSettings
  } = useApp();

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const companyInvoices = invoices.filter((inv) => inv.companyId === activeCompany.id);

  const handleRenew = () => {
    if (!companySubscription || companySubscription.packageId === 'free') {
      setIsSubscriptionModalOpen(true);
      return;
    }
    const inv = createInvoice(companySubscription.packageId);
    setSelectedInvoice(inv);
  };

  const handleUpgrade = () => {
    setIsSubscriptionModalOpen(true);
  };

  const daysRemaining = companySubscription?.daysRemaining || 0;
  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
  const isExpired = companySubscription?.status === 'expired' || daysRemaining <= 0;

  return (
    <div id="subscription-management-screen" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              B2B Monetization & Billing
            </span>
            <span className="text-xs text-slate-500">• {activeCompany.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Subscription & Paket Rekrutmen
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Kelola masa aktif paket rekrutmen perusahaan, unduh invoice digital, dan pantau riwayat transaksi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-upgrade-subscription"
            onClick={handleUpgrade}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Pilih / Upgrade Paket</span>
          </button>
        </div>
      </div>

      {/* Expiration & Reminder Alerts (Constraint 72) */}
      {isExpiringSoon && (
        <div
          id="reminder-banner-expiring"
          className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl flex items-start justify-between gap-3 text-amber-900 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">
                ⚠️ Subscription Anda akan berakhir dalam {daysRemaining} hari ({companySubscription?.endDate})
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Perpanjang sekarang untuk memastikan lowongan Anda tetap diprioritaskan dan fitur AI Match tetap aktif tanpa jeda.
              </p>
            </div>
          </div>
          <button
            onClick={handleRenew}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shrink-0 transition-colors shadow"
          >
            Perpanjang Sekarang
          </button>
        </div>
      )}

      {isExpired && companySubscription?.packageId !== 'free' && (
        <div
          id="reminder-banner-expired"
          className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl flex items-start justify-between gap-3 text-rose-900 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">
                Subscription Anda telah berakhir
              </h4>
              <p className="text-xs text-rose-800 mt-0.5">
                Data profil dan riwayat pelamar Anda tetap aman tersimpan. Perpanjang paket untuk kembali mengaktifkan fitur premium. (Sesuai Aturan Keamanan Data Kerja Bogor).
              </p>
            </div>
          </div>
          <button
            onClick={handleRenew}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shrink-0 transition-colors shadow"
          >
            Perpanjang Paket
          </button>
        </div>
      )}

      {/* Active Subscription Card (Constraint 71) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          id="card-active-subscription"
          className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" />
                <span>Paket Saat Ini</span>
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Status: {companySubscription?.status === 'active' ? '● Aktif' : '● Expired'}</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              {companySubscription?.packageName || 'EMPLOYER PRO'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-md">
              Akses penuh ke filter pelamar AI Matching, auto-interview scheduler, unlimited candidate chat, dan badge verified spotlight.
            </p>

            {/* Date Details */}
            <div className="grid grid-cols-3 gap-3 my-6 pt-4 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Tanggal Mulai</span>
                <strong className="text-white text-sm block mt-0.5">
                  {companySubscription?.startDate || '15 Agustus 2026'}
                </strong>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Tanggal Berakhir</span>
                <strong className="text-white text-sm block mt-0.5">
                  {companySubscription?.endDate || '15 September 2026'}
                </strong>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[11px]">Sisa Masa Aktif</span>
                <strong className="text-emerald-400 text-sm block mt-0.5">
                  {daysRemaining} Hari Lagi
                </strong>
              </div>
            </div>

            {/* Progress Meter */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span>Penggunaan Masa Berlaku (30 Hari)</span>
                <span>{daysRemaining} hari tersisa</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (daysRemaining / 30) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-white/10">
            <button
              id="btn-sub-renew"
              onClick={handleRenew}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Perpanjang Paket</span>
            </button>
            <button
              id="btn-sub-upgrade"
              onClick={handleUpgrade}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Upgrade ke Business</span>
            </button>
            {companySubscription?.lastInvoiceId && (
              <button
                id="btn-sub-view-last-invoice"
                onClick={() => {
                  const inv = invoices.find((i) => i.id === companySubscription.lastInvoiceId);
                  if (inv) setSelectedInvoice(inv);
                }}
                className="px-4 py-2.5 text-xs text-emerald-300 hover:text-white font-medium flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lihat Invoice Terakhir (#{companySubscription.lastInvoiceId})</span>
              </button>
            )}
          </div>
        </div>

        {/* Feature Entitlement Box */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Benefit Langganan Anda</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Fitur yang aktif secara otomatis untuk akun {activeCompany.name}.
            </p>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-center gap-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">
                  {companySubscription?.activeJobSlots || 5} Slot Lowongan Aktif
                </span>
              </li>
              <li className="flex items-center gap-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">AI Job Matching & Candidate Score</span>
              </li>
              <li className="flex items-center gap-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">Direct Chat & Interview Scheduler</span>
              </li>
              <li className="flex items-center gap-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">Centang Biru Perusahaan Terverifikasi</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
            <span>
              💡 Butuh bantuan konsultasi rekrutmen massal? Hubungi CS Kerja Bogor:{' '}
              <strong className="text-slate-800">{paymentSettings.supportContact}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Riwayat Pembayaran & Invoice (Constraint 77) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span>Riwayat Transaksi & Invoice</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar seluruh tagihan, bukti transfer, dan status verifikasi admin
            </p>
          </div>
          <span className="text-xs px-3 py-1 bg-slate-100 text-slate-700 font-semibold rounded-full border">
            {companyInvoices.length} Transaksi Tercatat
          </span>
        </div>

        {companyInvoices.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            Belum ada riwayat pembayaran untuk akun perusahaan ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">No. Invoice</th>
                  <th className="p-4">Paket / Layanan</th>
                  <th className="p-4">Nominal</th>
                  <th className="p-4">Tanggal Tagihan</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {companyInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900">
                      #{inv.id}
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-800 block">{inv.packageName}</span>
                      {inv.targetJobTitle && (
                        <span className="text-[11px] text-slate-500 block">
                          Loker: {inv.targetJobTitle}
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      Rp{inv.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="p-4 text-slate-600">{inv.createdAt}</td>
                    <td className="p-4 text-center">
                      {inv.status === 'verified' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> Paid / Verified
                        </span>
                      )}
                      {inv.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded-full text-[11px]">
                          <Clock className="w-3 h-3" /> Menunggu Verifikasi
                        </span>
                      )}
                      {inv.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-100 text-rose-800 font-bold rounded-full text-[11px]">
                          <AlertCircle className="w-3 h-3" /> Ditolak
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg border border-slate-300 transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-600" />
                        <span>Lihat Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Subscription Modals */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />

      {selectedInvoice && (
        <PaymentInvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};
