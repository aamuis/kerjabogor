import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Palette,
  Type,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Sparkles,
  Save,
  MessageSquare,
  Lock,
  Globe,
  BellRing
} from 'lucide-react';

const THEME_PRESETS = [
  {
    id: 'emerald',
    name: 'Bogor Emerald (Hijau Khas Bogor)',
    primary: '#059669',
    hover: '#047857',
    secondary: '#0f766e',
    accent: '#10b981',
    title: '#0f172a'
  },
  {
    id: 'teal',
    name: 'Kebun Raya Teal (Botanikal)',
    primary: '#0d9488',
    hover: '#0f766e',
    secondary: '#115e59',
    accent: '#14b8a6',
    title: '#0f172a'
  },
  {
    id: 'blue',
    name: 'Salak Royal Blue (Biru Elegan)',
    primary: '#2563eb',
    hover: '#1d4ed8',
    secondary: '#1e40af',
    accent: '#3b82f6',
    title: '#0f172a'
  },
  {
    id: 'indigo',
    name: 'Modern Indigo (Professional Corporate)',
    primary: '#4f46e5',
    hover: '#4338ca',
    secondary: '#3730a3',
    accent: '#6366f1',
    title: '#0f172a'
  },
  {
    id: 'purple',
    name: 'Puncak Velvet (Ungu Premium)',
    primary: '#7c3aed',
    hover: '#6d28d9',
    secondary: '#5b21b6',
    accent: '#8b5cf6',
    title: '#0f172a'
  },
  {
    id: 'rose',
    name: 'Cisarua Ruby (Merah Elegan)',
    primary: '#e11d48',
    hover: '#be123c',
    secondary: '#9f1239',
    accent: '#f43f5e',
    title: '#0f172a'
  },
  {
    id: 'amber',
    name: 'Surken Warm Gold (Kuning Emas)',
    primary: '#d97706',
    hover: '#b45309',
    secondary: '#92400e',
    accent: '#f59e0b',
    title: '#0f172a'
  }
];

export const SiteCustomizerTab: React.FC = () => {
  const { siteConfig, updateSiteConfig, resetSiteConfig, showToast } = useApp();

  const [formConfig, setFormConfig] = useState(siteConfig);

  const handleApplyPreset = (preset: typeof THEME_PRESETS[0]) => {
    setFormConfig((prev) => ({
      ...prev,
      themePreset: preset.id as any,
      primaryColor: preset.primary,
      primaryColorHover: preset.hover,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      titleColor: preset.title
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(formConfig);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Overview Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 border border-slate-800 space-y-2 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm">Pengaturan Kustomisasi Tampilan Situs</h3>
          </div>
          <button
            type="button"
            onClick={resetSiteConfig}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-xl text-[10px] font-bold transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Default</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-300">
          Ubah logo, nama platform, warna tema utama, warna font, tagline, kontak WhatsApp, dan PIN rahasia admin secara real-time.
        </p>
      </div>

      {/* 1. BRANDING & TEXT */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm pb-1 border-b border-slate-100">
          <Type className="w-4 h-4 text-emerald-600" />
          <span>Nama Platform, Logo & Tagline</span>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Nama Platform / Judul Situs</label>
          <input
            type="text"
            required
            value={formConfig.brandName}
            onChange={(e) => setFormConfig({ ...formConfig, brandName: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="contoh: KERJA BOGOR"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Tagline Utama</label>
          <input
            type="text"
            required
            value={formConfig.brandTagline}
            onChange={(e) => setFormConfig({ ...formConfig, brandTagline: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="contoh: Kerja Dekat, Rezeki Hebat."
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">URL Logo Kustom (Opsional)</label>
          <div className="relative">
            <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="url"
              value={formConfig.logoUrl || ''}
              onChange={(e) => setFormConfig({ ...formConfig, logoUrl: e.target.value, logoType: e.target.value ? 'image' : 'text' })}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="https://... (kosongkan jika ingin memakai inisial icon)"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Sub-Headline Pencarian di Beranda</label>
          <textarea
            rows={2}
            value={formConfig.heroSubtitle}
            onChange={(e) => setFormConfig({ ...formConfig, heroSubtitle: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 2. THEME COLOR PRESETS & PICKER */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm pb-1 border-b border-slate-100">
          <Palette className="w-4 h-4 text-emerald-600" />
          <span>Warna Tema & Identitas Visual</span>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-2">Pilih Preset Palet Warna:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition ${
                  formConfig.themePreset === preset.id
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-full shadow-xs border border-white"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div className="font-bold text-slate-800 text-[11px] truncate">
                    {preset.name}
                  </div>
                </div>
                {formConfig.themePreset === preset.id && (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Kode Hex Warna Utama</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formConfig.primaryColor}
                onChange={(e) =>
                  setFormConfig({
                    ...formConfig,
                    primaryColor: e.target.value,
                    themePreset: 'custom'
                  })
                }
                className="w-10 h-9 rounded-xl cursor-pointer border border-slate-300 p-0.5"
              />
              <input
                type="text"
                value={formConfig.primaryColor}
                onChange={(e) =>
                  setFormConfig({
                    ...formConfig,
                    primaryColor: e.target.value,
                    themePreset: 'custom'
                  })
                }
                className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs uppercase focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Kode Hex Judul/Teks</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formConfig.titleColor}
                onChange={(e) =>
                  setFormConfig({
                    ...formConfig,
                    titleColor: e.target.value
                  })
                }
                className="w-10 h-9 rounded-xl cursor-pointer border border-slate-300 p-0.5"
              />
              <input
                type="text"
                value={formConfig.titleColor}
                onChange={(e) =>
                  setFormConfig({
                    ...formConfig,
                    titleColor: e.target.value
                  })
                }
                className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs uppercase focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. ANNOUNCEMENT & CONTACT */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm pb-1 border-b border-slate-100">
          <BellRing className="w-4 h-4 text-emerald-600" />
          <span>Pengumuman & Kontak Support</span>
        </div>

        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
          <div>
            <div className="font-bold text-slate-800">Tampilkan Banner Pengumuman di Atas</div>
            <div className="text-[10px] text-slate-500">Banner siaran informasi loker/event di bagian atas layar</div>
          </div>
          <input
            type="checkbox"
            checked={formConfig.announcement.enabled}
            onChange={(e) =>
              setFormConfig({
                ...formConfig,
                announcement: { ...formConfig.announcement, enabled: e.target.checked }
              })
            }
            className="w-5 h-5 rounded-md text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </div>

        {formConfig.announcement.enabled && (
          <div>
            <label className="font-bold text-slate-700 block mb-1">Teks Pengumuman</label>
            <input
              type="text"
              value={formConfig.announcement.text}
              onChange={(e) =>
                setFormConfig({
                  ...formConfig,
                  announcement: { ...formConfig.announcement, text: e.target.value }
                })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
            />
          </div>
        )}

        <div>
          <label className="font-bold text-slate-700 block mb-1">WhatsApp Layanan Bantuan / CS</label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={formConfig.contactWhatsapp}
              onChange={(e) => setFormConfig({ ...formConfig, contactWhatsapp: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
              placeholder="0857-1234-5678"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Teks Footer Hak Cipta</label>
          <input
            type="text"
            value={formConfig.footerText}
            onChange={(e) => setFormConfig({ ...formConfig, footerText: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* 4. SECRET ADMIN PIN SECURITY */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm pb-1 border-b border-slate-100">
          <Lock className="w-4 h-4 text-amber-600" />
          <span>Keamanan PIN Akses Admin Rahasia</span>
        </div>

        <p className="text-[11px] text-slate-500">
          Hanya Anda yang mengetahui PIN ini untuk membuka dashboard Admin saat mengakses panel rahasia.
        </p>

        <div>
          <label className="font-bold text-slate-700 block mb-1">PIN Rahasia Admin Baru</label>
          <input
            type="text"
            required
            value={formConfig.adminSecretPin}
            onChange={(e) => setFormConfig({ ...formConfig, adminSecretPin: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-amber-700 focus:bg-white focus:outline-none"
            placeholder="contoh: bogor2026"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-20 z-10 pt-2">
        <button
          type="submit"
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Simpan & Terapkan Perubahan Situs</span>
        </button>
      </div>
    </form>
  );
};
