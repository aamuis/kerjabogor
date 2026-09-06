import React, { useState } from 'react';
import { Job, VideoIntroLink } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, FileText, Send, Video, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, isOpen, onClose, onSuccess }) => {
  const { seekerProfile, applyToJob } = useApp();

  const [coverLetter, setCoverLetter] = useState(
    `Dengan hormat HRD ${job.companyName}, perkenalkan saya ${seekerProfile.name}. Saya berdomisili di ${seekerProfile.location.district} dan sangat tertarik untuk mengisi posisi ${job.title}. Saya memiliki motivasi kerja tinggi dan siap berkontribusi optimal.`
  );
  const [portfolioUrl, setPortfolioUrl] = useState(seekerProfile.portfolios[0]?.projectUrl || '');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedVideo, setSelectedVideo] = useState<VideoIntroLink | undefined>(
    seekerProfile.videoLinks[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAnswerChange = (index: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [index]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedAnswers = (job.screeningQuestions || []).map((q, idx) => ({
      question: q,
      answer: answers[idx] || 'Siap dan bersedia mematuhi instruksi perusahaan.'
    }));

    setTimeout(() => {
      const success = applyToJob(job.id, {
        coverLetter,
        portfolioUrl,
        answers: formattedAnswers,
        videoLink: selectedVideo
      });

      setIsSubmitting(false);

      if (success) {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch {}
        onSuccess();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-2xs p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-[430px] max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/60">
          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">
              Formulir Lamaran Kerja
            </span>
            <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">
              {job.title}
            </h3>
            <p className="text-xs text-slate-600 truncate">{job.companyName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 text-xs custom-scrollbar">
          {/* 1. CV Attached Badge */}
          <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900">CV Profil Kerja Bogor</div>
                <div className="text-[10px] text-slate-600">
                  {seekerProfile.name} • {seekerProfile.educationLevel} ({seekerProfile.location.district})
                </div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-1 rounded-lg border border-emerald-200">
              Otomatis Terlampir
            </span>
          </div>

          {/* 2. Video Perkenalan (Constraint 13) */}
          {seekerProfile.videoLinks.length > 0 && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-rose-500" />
                  Sertakan Video Perkenalan Sosial Media
                </label>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-md">
                  +3x Dipanggil
                </span>
              </div>
              <div className="text-[11px] text-slate-600">
                Pilih video YouTube / TikTok / Instagram dari profilmu:
              </div>
              <div className="space-y-1.5">
                {seekerProfile.videoLinks.map((vl) => (
                  <label
                    key={vl.id}
                    className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition ${
                      selectedVideo?.id === vl.id
                        ? 'bg-white border-emerald-500 text-slate-900 shadow-2xs font-semibold'
                        : 'bg-white/50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <input
                        type="radio"
                        name="videoIntro"
                        checked={selectedVideo?.id === vl.id}
                        onChange={() => setSelectedVideo(vl)}
                        className="text-emerald-600"
                      />
                      <span className="truncate">{vl.title} ({vl.platform})</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 3. Screening Questions from Company */}
          {job.screeningQuestions && job.screeningQuestions.length > 0 && (
            <div className="space-y-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Pertanyaan Tambahan dari Perusahaan
              </div>
              {job.screeningQuestions.map((q, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 block">
                    {idx + 1}. {q}
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Tuliskan jawaban singkat Anda di sini..."
                    value={answers[idx] || ''}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 4. Cover Letter (Surat Lamaran Singkat) */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-900 block">
              Surat Lamaran Singkat / Cover Letter (Opsional)
            </label>
            <textarea
              rows={3}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
              placeholder="Jelaskan secara singkat mengapa Anda cocok untuk posisi ini..."
            />
          </div>

          {/* 5. Portfolio Link */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-900 block">
              Link Portofolio Tambahan (Opsional)
            </label>
            <input
              type="url"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://drive.google.com/... atau https://github.com/..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[10px] text-amber-900 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-700" />
            <span>
              Dengan mengirimkan lamaran, profil dan kontak resmi Anda akan diteruskan ke tim HRD {job.companyName} untuk proses seleksi.
            </span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white rounded-2xl font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-98"
          >
            {isSubmitting ? (
              <span>Mengirimkan Lamaran...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>KIRIM LAMARAN SEKARANG</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
