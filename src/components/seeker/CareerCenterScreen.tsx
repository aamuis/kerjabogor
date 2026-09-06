import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  TrendingUp,
  Award,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Coins,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { CAREER_ARTICLES } from '../../data/bogorData';

interface CareerCenterScreenProps {
  onBack: () => void;
}

export const CareerCenterScreen: React.FC<CareerCenterScreenProps> = ({ onBack }) => {
  const { setActiveTab } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md pt-1 pb-3 z-20 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition flex items-center gap-1 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <span className="text-xs font-extrabold text-slate-900">Pusat Karier Bogor</span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-5 shadow-lg space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
          Edukasi & Pengembangan Diri
        </span>
        <h1 className="text-base sm:text-lg font-black leading-tight">
          Panduan Sukses Bekerja di Wilayah Bogor
        </h1>
        <p className="text-xs text-emerald-100 leading-relaxed">
          Tips interview HRD pabrik & cafe, standar UMK Kota/Kab. Bogor, serta pelatihan gratis.
        </p>
      </div>

      {/* UMK Bogor 2026 Information Box (Constraint 34) */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-900">
              Informasi Resmi UMK Bogor 2026
            </h3>
            <p className="text-[10px] text-slate-500">Upah Minimum Kota & Kabupaten Bogor</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-[10px] text-slate-500 font-semibold">Kota Bogor</div>
            <div className="font-black text-slate-900 text-sm mt-0.5">Rp 5.012.000</div>
            <div className="text-[9px] text-emerald-700 font-bold mt-1">Sektor Jasa & Niaga</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-[10px] text-slate-500 font-semibold">Kabupaten Bogor</div>
            <div className="font-black text-slate-900 text-sm mt-0.5">Rp 4.870.000</div>
            <div className="text-[9px] text-emerald-700 font-bold mt-1">Sektor Manufaktur</div>
          </div>
        </div>
      </div>

      {/* Career Test Quick CTA */}
      <div
        onClick={() => setActiveTab('assessment')}
        className="p-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-3xl cursor-pointer hover:shadow-md transition space-y-2 shadow-xs"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="font-black text-xs">Tes Minat & Kecocokan Karier Bogor</span>
          </div>
          <ChevronRight className="w-4 h-4 text-purple-300" />
        </div>
        <p className="text-xs text-purple-200">
          Jawab 5 pertanyaan kilat untuk mengetahui posisi yang paling sesuai dengan kepribadianmu.
        </p>
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        <h3 className="font-black text-xs text-slate-900 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          Artikel & Tips Karier Terbaru
        </h3>

        <div className="space-y-2.5">
          {CAREER_ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-400 cursor-pointer transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                  {art.category}
                </span>
                <span className="text-[10px] text-slate-400">{art.readTime}</span>
              </div>
              <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                {art.title}
              </h4>
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                {art.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-2xs p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-[430px] max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/70">
              <span className="text-xs font-black text-emerald-900">{selectedArticle.category}</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                Tutup
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3.5 text-xs text-slate-800 custom-scrollbar leading-relaxed">
              <h2 className="text-base font-black text-slate-900 leading-tight">
                {selectedArticle.title}
              </h2>
              <div className="text-[11px] text-slate-400">
                Ditulis oleh Tim Karier Kerja Bogor • {selectedArticle.readTime}
              </div>
              <div className="space-y-3 pt-2 border-t border-slate-100 text-slate-700">
                <p className="font-medium text-slate-900">{selectedArticle.summary}</p>
                <p>{selectedArticle.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
