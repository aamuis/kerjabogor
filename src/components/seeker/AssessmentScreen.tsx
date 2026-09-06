import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Briefcase,
  TrendingUp,
  Award
} from 'lucide-react';
import { JobCard } from './JobCard';

interface AssessmentScreenProps {
  onBack: () => void;
  onSelectJob: (jobId: string) => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ onBack, onSelectJob }) => {
  const { jobs, setActiveTab } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      q: 'Suasana kerja seperti apa yang paling membuatmu nyaman dan produktif?',
      options: [
        { text: 'Kantor rapi, meja kerja, berkas, dan komputer', category: 'Administrasi & Perkantoran' },
        { text: 'Interaksi langsung dengan pelanggan, ramah, dan dinamis', category: 'Restoran, Cafe & Kuliner' },
        { text: 'Aktivitas fisik, bergerak bebas, gudang, dan jalanan', category: 'Gudang, Logistik & Kurir' },
        { text: 'Pabrik modern dengan SOP jelas dan mesin produksi', category: 'Pabrik & Manufaktur' }
      ]
    },
    {
      q: 'Bagaimana preferensi jam kerja yang kamu harapkan di Bogor?',
      options: [
        { text: 'Jam kerja standar 08.00 - 17.00 (Senin - Jumat)', category: 'Full Time' },
        { text: 'Sistem Shift fleksibel (Pagi / Siang / Malam)', category: 'Shift' },
        { text: 'Paruh waktu / Part time untuk sambilan', category: 'Part Time' },
        { text: 'Gaji harian / freelance siap kerja kapan saja', category: 'Harian' }
      ]
    },
    {
      q: 'Kemampuan utama apa yang paling kamu kuasai saat ini?',
      options: [
        { text: 'Komunikasi, ketelitian data, dan mengetik cepat', category: 'Admin' },
        { text: 'Pelayanan prima, ramah, membuat kopi / racikan menu', category: 'F&B' },
        { text: 'Hafal rute jalanan Bogor & mengendarai motor gesit', category: 'Logistik' },
        { text: 'Kreativitas digital, edit video sosial media / TikTok', category: 'Kreatif' }
      ]
    },
    {
      q: 'Berapa jarak maksimal dari rumah yang kamu inginkan untuk bekerja?',
      options: [
        { text: 'Sangat dekat, bisa jalan kaki (< 2 KM)', category: '2' },
        { text: 'Cukup 5-10 menit naik motor (< 5 KM)', category: '5' },
        { text: 'Bisa sampai pusat kota / kawasan industri (< 15 KM)', category: '15' },
        { text: 'Fleksibel di seluruh wilayah Bogor', category: '25' }
      ]
    },
    {
      q: 'Apa target utama kariermu dalam 1 tahun ke depan?',
      options: [
        { text: 'Mendapat penghasilan tetap bulanan & jenjang karier', category: 'Career' },
        { text: 'Mencari pengalaman pertama kerja (Fresh Graduate)', category: 'Fresh' },
        { text: 'Mengumpulkan modal usaha mandiri di Bogor', category: 'Capital' },
        { text: 'Mengasah skill spesifik industri profesional', category: 'Skill' }
      ]
    }
  ];

  const handleSelectOption = (index: number) => {
    const nextAnswers = [...answers, index];
    setAnswers(nextAnswers);

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Top recommended jobs based on quiz
  const recommended = jobs.slice(0, 3);

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md pt-1 pb-3 z-20 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition flex items-center gap-1 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <span className="text-xs font-extrabold text-slate-900">Tes Minat Karier AI</span>
      </div>

      {!isCompleted ? (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-700">Pertanyaan {currentStep + 1} dari 5</span>
              <span className="text-slate-400">{Math.round(((currentStep + 1) / 5) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-black text-sm sm:text-base text-slate-900 leading-snug">
              {questions[currentStep].q}
            </h2>

            <div className="space-y-2">
              {questions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 text-left transition group active:scale-98 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-900 leading-relaxed">
                    {opt.text}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="space-y-4 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-5 shadow-lg space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                Hasil Analisis Profil AI
              </span>
              <h2 className="text-lg font-black mt-0.5">
                Tipe: «Pelaksana Operasional & Pelayanan Andal»
              </h2>
              <p className="text-xs text-purple-200 mt-1 leading-relaxed max-w-xs mx-auto">
                Kamu memiliki potensi kuat dalam posisi administratif, komunikasi pelanggan, dan manajemen operasional harian yang terstruktur.
              </p>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-xs text-left space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Rekomendasi Karir Terbaik di Bogor:
              </div>
              <div className="text-[11px] text-slate-200">
                1. Staf Administrasi & Kasir (Kota Bogor)<br/>
                2. Barista & Customer Support (Cafe & Resto)<br/>
                3. Admin Gudang & Logistik (Cibinong / Sentul)
              </div>
            </div>

            <button
              onClick={handleReset}
              className="py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Tes</span>
            </button>
          </div>

          {/* Recommended Jobs */}
          <div className="space-y-3">
            <h3 className="font-black text-xs text-slate-900">
              Lowongan yang Sangat Cocok dengan Hasil Tes Kamu:
            </h3>

            <div className="space-y-2.5">
              {recommended.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => onSelectJob(job.id)}
                  featured={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
