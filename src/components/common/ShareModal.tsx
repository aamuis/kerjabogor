import React from 'react';
import { Job } from '../../types';
import { X, Copy, Check, MessageCircle, Twitter, Facebook, Share2 } from 'lucide-react';
import { formatRupiah } from '../../utils/distance';

interface ShareModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ job, isOpen, onClose, onCopy }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !job) return null;

  const shareUrl = `https://kerjabogor.id/loker/${job.id}`;
  const shareText = `Loker Bogor: ${job.title} di ${job.companyName} (${job.location.district}, ${job.location.type}) - Gaji ${formatRupiah(job.salaryMin, true)} s/d ${formatRupiah(job.salaryMax, true)}/${job.salaryPeriod}. Lamar di Kerja Bogor: ${shareUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText}`);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  const handleTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(fbUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-2xs p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-[400px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Share2 className="w-4 h-4 text-emerald-600" />
            Bagikan Lowongan Kerja
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Job preview snippet */}
        <div className="my-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
          <div className="font-bold text-slate-900">{job.title}</div>
          <div className="text-slate-500 mt-0.5">{job.companyName} • {job.location.district}</div>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-3 gap-2.5 my-4">
          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center justify-center p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-2xl transition group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold">WhatsApp</span>
          </button>

          <button
            onClick={handleTwitter}
            className="flex flex-col items-center justify-center p-3 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-2xl transition group"
          >
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
              <Twitter className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold">X / Twitter</span>
          </button>

          <button
            onClick={handleFacebook}
            className="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl transition group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition">
              <Facebook className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold">Facebook</span>
          </button>
        </div>

        {/* Copy Link input */}
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl border border-slate-200">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="bg-transparent text-xs text-slate-700 flex-1 px-2 focus:outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Tersalin' : 'Salin'}
          </button>
        </div>
      </div>
    </div>
  );
};
