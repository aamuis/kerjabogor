import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Printer,
  Sparkles,
  ArrowLeft,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Video,
  Download,
  Share2
} from 'lucide-react';

interface CvBuilderScreenProps {
  onBack: () => void;
}

export const CvBuilderScreen: React.FC<CvBuilderScreenProps> = ({ onBack }) => {
  const { seekerProfile, showToast } = useApp();
  const [template, setTemplate] = useState<'modern' | 'minimal' | 'executive'>('modern');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-200">
      {/* Top action header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md pt-1 pb-3 z-20 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition flex items-center gap-1 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Template Selector */}
      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
        <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
          Pilih Template CV Kerja Bogor:
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'modern', name: 'Modern Emerald' },
            { id: 'minimal', name: 'Clean Minimal' },
            { id: 'executive', name: 'Corporate Dark' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id as any)}
              className={`p-2 rounded-xl text-xs font-bold border transition ${
                template === t.id
                  ? 'bg-white border-emerald-600 text-emerald-900 shadow-2xs'
                  : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* CV Sheet Container (Printable Paper simulation) */}
      <div
        id="printable-cv"
        className={`bg-white rounded-3xl p-6 border shadow-lg space-y-6 text-slate-800 ${
          template === 'modern'
            ? 'border-emerald-200'
            : template === 'executive'
            ? 'border-slate-800'
            : 'border-slate-200'
        }`}
      >
        {/* CV Header */}
        <div
          className={`pb-4 border-b flex items-center gap-4 ${
            template === 'modern'
              ? 'border-emerald-100'
              : template === 'executive'
              ? 'border-slate-800 bg-slate-900 text-white p-4 rounded-2xl -mx-2 -mt-2'
              : 'border-slate-200'
          }`}
        >
          <img
            src={seekerProfile.avatarUrl}
            alt={seekerProfile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-black tracking-tight leading-tight">
              {seekerProfile.name}
            </h1>
            <p
              className={`text-xs font-semibold mt-0.5 ${
                template === 'executive' ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              {seekerProfile.title} • {seekerProfile.educationLevel}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" />
                {seekerProfile.location.district}, {seekerProfile.location.type}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-600" />
                {seekerProfile.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-emerald-600" />
                {seekerProfile.email}
              </span>
            </div>
          </div>
        </div>

        {/* Ringkasan Profil */}
        <div className="space-y-1.5">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-600" />
            Tentang Saya
          </h2>
          <p className="text-xs leading-relaxed text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            {seekerProfile.bio}
          </p>
        </div>

        {/* Pengalaman Kerja */}
        <div className="space-y-3">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            Pengalaman Kerja & Organisasi
          </h2>

          <div className="space-y-2.5">
            {(seekerProfile.experiences || []).map((exp) => (
              <div key={exp.id} className="p-3 bg-slate-50/70 rounded-2xl border border-slate-100 text-xs space-y-1">
                <div className="flex items-start justify-between">
                  <div className="font-bold text-slate-900">{exp.position}</div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {exp.startDate} - {exp.current ? 'Sekarang' : exp.endDate}
                  </span>
                </div>
                <div className="text-slate-600 text-[11px]">{exp.company} • {exp.location}</div>
                <p className="text-slate-700 text-[11px] leading-relaxed pt-1">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pendidikan */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            Riwayat Pendidikan
          </h2>

          <div className="space-y-2">
            {(seekerProfile.educations || []).map((edu) => (
              <div key={edu.id} className="p-3 bg-slate-50/70 rounded-2xl border border-slate-100 text-xs">
                <div className="flex items-start justify-between">
                  <div className="font-bold text-slate-900">{edu.institution}</div>
                  <span className="text-[10px] text-slate-500">{edu.endYear}</span>
                </div>
                <div className="text-emerald-700 font-semibold text-[11px]">
                  {edu.degree} - {edu.fieldOfStudy}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keterampilan / Skills */}
        <div className="space-y-2">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Keahlian & Kemampuan
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {(seekerProfile.skills || []).map((skill, idx) => (
              <span
                key={idx}
                className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Sertifikat & Pelatihan */}
        {(seekerProfile.certificates || []).length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Sertifikat & Pelatihan Kerja
            </h2>
            <div className="space-y-1.5">
              {(seekerProfile.certificates || []).map((cert) => (
                <div key={cert.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{cert.title}</div>
                    <div className="text-[10px] text-slate-500">{cert.issuer}</div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Profil QR & Link Preview */}
        {seekerProfile.videoLinks.length > 0 && (
          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-700" />
              <div>
                <div className="font-bold text-emerald-950">Video Perkenalan Daring</div>
                <div className="text-[10px] text-emerald-800">
                  {seekerProfile.videoLinks[0].title} ({seekerProfile.videoLinks[0].platform})
                </div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-1 rounded-lg border border-emerald-200">
              Verified Media
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
