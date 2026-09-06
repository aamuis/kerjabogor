import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, KeyRound, Lock, X, ArrowRight, Sparkles } from 'lucide-react';

interface AdminSecretLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSecretLoginModal: React.FC<AdminSecretLoginModalProps> = ({ isOpen, onClose }) => {
  const { adminUnlock, siteConfig } = useApp();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = adminUnlock(pin);
    if (success) {
      setPin('');
      onClose();
    } else {
      setErrorMsg('PIN Akses Admin Salah! Silakan periksa kembali.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-3xl p-5 w-full max-w-sm border border-slate-700 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/30">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-100">Akses Pengelola Situs</h3>
              <p className="text-[10px] text-slate-400">Khusus Pemilik & Administrator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-[11px] text-amber-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sistem Administrasi Kerja Bogor</span>
          </div>
          <p className="text-[10px] text-amber-300/80">
            Halaman ini tersembunyi dari publik. Masukkan PIN keamanan untuk mengubah warna tema, logo, judul, tagline, konten loker, & verifikasi keuangan.
          </p>
          <div className="text-[9px] text-amber-400/90 font-mono pt-1">
            Default PIN: <span className="underline font-bold">bogor2026</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-300 block mb-1">PIN Keamanan Admin</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                autoFocus
                placeholder="Masukkan PIN Rahasia"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono placeholder:text-slate-500 focus:bg-slate-850 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            {errorMsg && (
              <p className="text-[11px] text-rose-400 font-bold mt-1.5">{errorMsg}</p>
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl transition shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
            >
              <span>Buka Admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
