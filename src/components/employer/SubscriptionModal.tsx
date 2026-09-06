import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PackageType, EmployerPackageConfig } from '../../types';
import {
  X,
  Check,
  Zap,
  Sparkles,
  Crown,
  Building,
  Rocket,
  Flame,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Clock
} from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetJobId?: string;
  defaultCategory?: 'subscription' | 'single' | 'all';
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  targetJobId,
  defaultCategory = 'all'
}) => {
  const { paymentSettings, createInvoice, showToast, companySubscription } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'monthly' | 'per_job'>(
    defaultCategory === 'single' ? 'per_job' : defaultCategory === 'subscription' ? 'monthly' : 'all'
  );

  if (!isOpen) return null;

  const packages = paymentSettings.packages || [];

  const handleSelectPackage = (pkg: EmployerPackageConfig) => {
    if (pkg.id === 'free') {
      showToast('Paket Free telah aktif untuk akun perusahaan Anda!', 'info');
      onClose();
      return;
    }

    if (pkg.id === 'enterprise') {
      showToast(
        `Silakan hubungi tim enterprise kami melalui WhatsApp: ${paymentSettings.supportContact}`,
        'info'
      );
      return;
    }

    // Generate invoice and automatically open payment invoice modal
    createInvoice(pkg.id, targetJobId, pkg.price);
    onClose();
  };

  const getPackageIcon = (id: PackageType) => {
    switch (id) {
      case 'free':
        return <ShieldCheck className="w-5 h-5 text-slate-600" />;
      case 'boost':
        return <Rocket className="w-5 h-5 text-indigo-500" />;
      case 'featured':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'urgent':
        return <Flame className="w-5 h-5 text-rose-500" />;
      case 'pro':
        return <Crown className="w-5 h-5 text-emerald-500" />;
      case 'business':
        return <Zap className="w-5 h-5 text-violet-500" />;
      case 'enterprise':
        return <Building className="w-5 h-5 text-blue-500" />;
      default:
        return <Crown className="w-5 h-5 text-emerald-500" />;
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    if (filterType === 'monthly') return !pkg.perJob && pkg.id !== 'free';
    if (filterType === 'per_job') return pkg.perJob;
    return true;
  });

  return (
    <div
      id="subscription-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
    >
      <div
        id="subscription-modal-card"
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 relative shrink-0">
          <button
            id="btn-close-sub-modal"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 inline-block mb-2">
              Paket Rekrutmen Kerja Bogor
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Pilih Paket yang Sesuai dengan Kebutuhan Rekrutmen Perusahaan Anda
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Pencari kerja gratis 100%. Perusahaan berinvestasi untuk mendapatkan kandidat berkualitas, cepat, dan terpercaya di wilayah Bogor.
            </p>
          </div>

          {/* Current Subscription Active Pill */}
          {companySubscription && companySubscription.status === 'active' && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-xs text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>
                Paket Aktif Anda saat ini: <strong>{companySubscription.packageName}</strong> (Sisa {companySubscription.daysRemaining} hari)
              </span>
            </div>
          )}
        </div>

        {/* Tab Filters */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-wrap gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              Semua Paket
            </button>
            <button
              onClick={() => setFilterType('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterType === 'monthly'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              👑 Langganan Bulanan (Pro & Business)
            </button>
            <button
              onClick={() => setFilterType('per_job')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterType === 'per_job'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              🚀 Pay Per Lowongan (Boost & Urgent)
            </button>
          </div>

          <span className="text-xs text-slate-500 hidden sm:inline">
            Harga resmi dapat dikonfigurasi via Admin Panel
          </span>
        </div>

        {/* Packages Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => {
              const isHighlight = pkg.highlight;
              const isCurrent = companySubscription?.packageId === pkg.id && companySubscription.status === 'active';

              return (
                <div
                  key={pkg.id}
                  id={`card-package-${pkg.id}`}
                  className={`relative rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between ${
                    isHighlight
                      ? 'bg-gradient-to-b from-white to-emerald-50/60 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10'
                      : 'bg-white border border-slate-200 hover:border-slate-300 shadow-md'
                  }`}
                >
                  {/* Top Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3 left-6">
                      <span
                        className={`px-3 py-0.5 rounded-full text-[11px] font-bold shadow-sm ${
                          isHighlight
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                            : 'bg-slate-900 text-white'
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-slate-100">{getPackageIcon(pkg.id)}</span>
                        <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                      </div>
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                          Aktif
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mb-4 min-h-[32px] leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Price Block */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 mb-5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                          {pkg.price === 0
                            ? 'Rp0'
                            : pkg.id === 'enterprise'
                            ? 'Custom'
                            : `Rp${pkg.price.toLocaleString('id-ID')}`}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium block mt-0.5">
                        {pkg.periodLabel}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-6">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Fitur Utama:
                      </span>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    id={`btn-select-pkg-${pkg.id}`}
                    onClick={() => handleSelectPackage(pkg)}
                    disabled={isCurrent && pkg.id === 'free'}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isHighlight
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35'
                        : pkg.id === 'enterprise'
                        ? 'bg-slate-900 hover:bg-slate-800 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Pembayaran melalui Transfer Bank Syariah Indonesia (BSI). Verifikasi resmi & aktivasi cepat.
            </span>
          </div>
          <span className="font-semibold text-slate-700">
            CS & Hotline: {paymentSettings.supportContact}
          </span>
        </div>
      </div>
    </div>
  );
};
