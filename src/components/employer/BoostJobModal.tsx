import React from 'react';
import { useApp } from '../../context/AppContext';
import { Job } from '../../types';
import {
  X,
  Rocket,
  Sparkles,
  Flame,
  Check,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface BoostJobModalProps {
  job: Job | null;
  onClose: () => void;
}

export const BoostJobModal: React.FC<BoostJobModalProps> = ({ job, onClose }) => {
  const { paymentSettings, createInvoice } = useApp();

  if (!job) return null;

  const boostOptions = [
    {
      id: 'boost',
      name: 'BOOST LOWONGAN',
      badge: '🚀 Prioritas Pencarian',
      price: 49000,
      duration: '14 Hari',
      description: 'Naikkan posisi loker Anda agar muncul lebih awal saat pencari kerja memfilter bidang ini.',
      features: [
        'Prioritas dalam hasil pencarian loker',
        'Badge biru cerah "Boosted"',
        'Masa aktif 14 hari penuh',
        'Statistik view & klik kandidat'
      ],
      cta: 'Pilih Boost (Rp49.000)',
      color: 'indigo'
    },
    {
      id: 'featured',
      name: 'FEATURED JOB',
      badge: '⭐ Paling Direkomendasikan',
      price: 99000,
      duration: '30 Hari',
      description: 'Tampil di banner teratas, carousel Featured Jobs, dan notifikasi rekomendasi kandidat.',
      features: [
        'Semua fitur Boost',
        'Tampil di slot Featured teratas beranda',
        'Badge Emas "⭐ Featured Job"',
        'Promosi sorotan 30 hari penuh',
        'Distribusi notifikasi ke pelamar match 90%+'
      ],
      cta: 'Jadikan Featured (Rp99.000)',
      highlight: true,
      color: 'amber'
    },
    {
      id: 'urgent',
      name: 'URGENT HIRING',
      badge: '⚡ Butuh Hari Ini',
      price: 149000,
      duration: '7 Hari Kilat',
      description: 'Butuh karyawan secepatnya? Aktifkan badge merah menyala & kirim broadcast ke pencari kerja terdekat.',
      features: [
        'Semua fitur Featured',
        'Badge Menyala "⚡ Butuh Orang Hari Ini"',
        'Prioritas no. 1 di tab Urgent & peta loker',
        'Highlight border merah menyala',
        'Rekomendasi instan ke kandidat berstatus Siap Bekerja'
      ],
      cta: 'Aktifkan Urgent Hiring (Rp149.000)',
      color: 'rose'
    }
  ];

  const handleSelectOption = (pkgId: string, price: number) => {
    createInvoice(pkgId, job.id, price);
    onClose();
  };

  return (
    <div
      id="boost-job-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
    >
      <div
        id="boost-job-modal-card"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-7 relative">
          <button
            id="btn-close-boost-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-xl">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 inline-block mb-2">
              Promosi & Boost Lowongan
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Tingkatkan Jangkauan Pelamar untuk Lowongan Ini
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Lowongan: <strong className="text-white">{job.title}</strong> • {job.companyName}
            </p>
          </div>
        </div>

        {/* Options Grid (Constraint 78) */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {boostOptions.map((opt) => (
              <div
                key={opt.id}
                id={`boost-opt-${opt.id}`}
                className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all ${
                  opt.highlight
                    ? 'bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 border-2 border-amber-400 shadow-lg'
                    : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Badge */}
                <div className="mb-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      opt.id === 'urgent'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : opt.id === 'featured'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                    }`}
                  >
                    {opt.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-2">{opt.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 min-h-[36px]">{opt.description}</p>
                </div>

                {/* Price */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 my-3">
                  <span className="text-xl font-black text-slate-900">
                    Rp{opt.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[11px] text-slate-500 block">Masa Aktif {opt.duration}</span>
                </div>

                {/* Features */}
                <ul className="space-y-1.5 text-xs text-slate-700 mb-5 grow">
                  {opt.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  id={`btn-choose-boost-${opt.id}`}
                  onClick={() => handleSelectOption(opt.id, opt.price)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    opt.id === 'urgent'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20'
                      : opt.id === 'featured'
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                  }`}
                >
                  <span>{opt.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Setelah diverifikasi admin, badge loker akan otomatis aktif dan menyala.</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};
