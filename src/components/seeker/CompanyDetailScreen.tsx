import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  MapPin,
  CheckCircle2,
  Star,
  ArrowLeft,
  Briefcase,
  Globe,
  Share2,
  ExternalLink,
  MessageSquare,
  Plus
} from 'lucide-react';
import { JobCard } from './JobCard';
import { ChatModal } from '../common/ChatModal';

interface CompanyDetailScreenProps {
  companyId: string;
  onBack: () => void;
  onSelectJob: (jobId: string) => void;
}

export const CompanyDetailScreen: React.FC<CompanyDetailScreenProps> = ({
  companyId,
  onBack,
  onSelectJob
}) => {
  const { allCompanies, jobs, companyReviews, addCompanyReview, showToast } = useApp();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewRole, setReviewRole] = useState('Karyawan Aktif');
  const [showChat, setShowChat] = useState(false);

  const company = allCompanies.find((c) => c.id === companyId) || allCompanies[0];
  const companyJobs = jobs.filter((j) => j.companyId === company.id && j.status === 'active');
  const reviews = companyReviews.filter((r) => r.companyId === company.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    addCompanyReview({
      companyId: company.id,
      reviewerName: 'Pencari Kerja Bogor',
      rating: reviewRating,
      comment: reviewText,
      roleAtCompany: reviewRole
    });

    setReviewText('');
    setShowReviewForm(false);
  };

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

        <span className="text-xs font-extrabold text-slate-900">Profil Perusahaan</span>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-start gap-3.5">
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shrink-0 bg-slate-50 shadow-2xs"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-sm sm:text-base text-slate-900 leading-tight">
                {company.name}
              </h1>
              {company.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {company.industry} • {company.businessType}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{company.location.district}, {company.location.type}</span>
            </div>
          </div>
        </div>

        {/* Rating & Fast Stats */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
          <div>
            <div className="font-black text-amber-500 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{company.rating}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              {reviews.length} Ulasan
            </div>
          </div>

          <div>
            <div className="font-black text-slate-900">{companyJobs.length}</div>
            <div className="text-[10px] text-slate-500 font-medium">Loker Aktif</div>
          </div>

          <div>
            <div className="font-black text-emerald-600">Terpercaya</div>
            <div className="text-[10px] text-slate-500 font-medium">Mitra Resmi</div>
          </div>
        </div>

        {/* Action Button: Chat HRD */}
        <button
          onClick={() => setShowChat(true)}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Kirim Pesan Resmi ke HRD {company.name}</span>
        </button>
      </div>

      {/* About & Address */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs leading-relaxed text-slate-700">
        <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">
          Tentang Perusahaan
        </h3>
        <p>{company.description}</p>
        <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-slate-600 text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span>{company.address}</span>
        </div>
      </div>

      {/* Workplace Photos */}
      {company.photos && company.photos.length > 0 && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">
            Foto Kantor & Suasana Kerja
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {company.photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt="Workspace"
                className="w-full h-24 rounded-2xl object-cover border border-slate-100 shadow-2xs"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      )}

      {/* Active Jobs by this company */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-xs text-slate-900 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            Lowongan Tersedia ({companyJobs.length})
          </h3>
        </div>

        <div className="space-y-2.5">
          {companyJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => onSelectJob(job.id)}
            />
          ))}

          {companyJobs.length === 0 && (
            <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500">
              Saat ini belum ada lowongan baru yang dibuka.
            </div>
          )}
        </div>
      </div>

      {/* Employee Reviews & Ratings (Constraint 22) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">
            Ulasan Karyawan & Pelamar ({reviews.length})
          </h3>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-0.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Tulis Ulasan
          </button>
        </div>

        {/* Add Review Form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div>
              <label className="font-bold text-slate-900 block mb-1">Rating Bintang</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= reviewRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Ulasan Pengalaman Kerja</label>
              <textarea
                rows={2}
                required
                placeholder="Bagikan pengalaman lingkungan kerja, gaji tepat waktu, atau proses rekrutmen..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-3 py-1.5 bg-white text-slate-600 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl font-bold shadow-xs"
              >
                Kirim Ulasan
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-2.5">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-900">{rev.reviewerName}</div>
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                  <span>{rev.rating}</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400">{rev.roleAtCompany} • {rev.date}</div>
              <p className="text-slate-700 text-[11px] leading-relaxed pt-1">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {showChat && (
        <ChatModal
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          companyName={company.name}
        />
      )}
    </div>
  );
};
