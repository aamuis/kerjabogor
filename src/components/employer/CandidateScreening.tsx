import React, { useState } from 'react';
import { Application, ApplicationStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Video,
  FileText,
  MessageSquare,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Send,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { ChatModal } from '../common/ChatModal';

interface CandidateScreeningProps {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
}

export const CandidateScreening: React.FC<CandidateScreeningProps> = ({
  application,
  isOpen,
  onClose
}) => {
  const { updateApplicationStatus, scheduleInterview, showToast } = useApp();

  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [interviewDate, setInterviewDate] = useState('2026-08-25');
  const [interviewTime, setInterviewTime] = useState('10:00 WIB');
  const [interviewLocation, setInterviewLocation] = useState('Kantor Utama Cabang Pajajaran Bogor');
  const [interviewNotes, setInterviewNotes] = useState('Harap membawa KTP asli dan berpakaian rapi.');
  const [showChat, setShowChat] = useState(false);

  if (!isOpen) return null;

  const handleStatusChange = (newStatus: ApplicationStatus, note: string) => {
    updateApplicationStatus(application.id, newStatus, note);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleInterview(application.id, {
      date: interviewDate,
      time: interviewTime,
      type: 'offline',
      locationOrLink: interviewLocation,
      notes: interviewNotes
    });
    setShowInterviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-2xs p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-[430px] max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
              Screening Pelamar
            </span>
            <h3 className="font-black text-sm">{application.applicantName}</h3>
            <p className="text-xs text-slate-300">Posisi: {application.jobTitle}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs custom-scrollbar">
          {/* Candidate Profile Summary */}
          <div className="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <img
              src={application.applicantAvatar}
              alt={application.applicantName}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-900">{application.applicantName}</h4>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {application.matchScore}% Match
                </span>
              </div>
              <div className="text-slate-600 text-xs mt-0.5">
                📍 {application.applicantDistrict} • {application.distanceKm} KM dari kantor
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                📞 {application.applicantPhone}
              </div>
            </div>
          </div>

          {/* Social Video Intro (Constraint 13) */}
          {application.videoLink && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-bold text-rose-950 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-rose-600" />
                  <span>Video Perkenalan Pelamar ({application.videoLink.platform})</span>
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-200/60 px-2 py-0.5 rounded-md">
                  Tersedia
                </span>
              </div>
              <p className="text-[11px] text-rose-900">{application.videoLink.title}</p>
              <a
                href={application.videoLink.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Video Perkenalan Daring</span>
              </a>
            </div>
          )}

          {/* Cover letter */}
          {application.coverLetter && (
            <div className="space-y-1">
              <div className="font-bold text-slate-900">Surat Lamaran Singkat:</div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 leading-relaxed text-[11px]">
                {application.coverLetter}
              </div>
            </div>
          )}

          {/* Answers to Screening Questions */}
          {application.screeningAnswers && application.screeningAnswers.length > 0 && (
            <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="font-bold text-slate-900">Jawaban Pertanyaan Screening:</div>
              {application.screeningAnswers.map((item, idx) => (
                <div key={idx} className="space-y-0.5 text-[11px]">
                  <div className="font-semibold text-slate-600">Q: {item.question}</div>
                  <div className="text-slate-900 font-medium bg-white p-2 rounded-xl border border-slate-100">
                    A: {item.answer}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Current Status */}
          <div className="flex items-center justify-between p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl">
            <span className="font-bold text-emerald-950">Status Lamaran Saat Ini:</span>
            <span className="font-black text-emerald-800 uppercase text-xs">
              {application.status}
            </span>
          </div>

          {/* Action: Undangan Interview Form (Constraint 18) */}
          {showInterviewForm ? (
            <form onSubmit={handleScheduleSubmit} className="p-3 bg-purple-50 border border-purple-200 rounded-2xl space-y-2 text-xs">
              <div className="font-bold text-purple-950 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-700" />
                Kirim Undangan Jadwal Interview
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full p-2 bg-white border border-purple-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Waktu</label>
                  <input
                    type="text"
                    required
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full p-2 bg-white border border-purple-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">Lokasi / Link Meet</label>
                <input
                  type="text"
                  required
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                  className="w-full p-2 bg-white border border-purple-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">Catatan Tambahan</label>
                <input
                  type="text"
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  className="w-full p-2 bg-white border border-purple-200 rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowInterviewForm(false)}
                  className="px-3 py-2 bg-white text-slate-600 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold shadow-xs"
                >
                  Kirim Undangan Resmi
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowInterviewForm(true)}
              className="w-full py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Calendar className="w-4 h-4 text-purple-700" />
              <span>Jadwalkan Interview Kerja</span>
            </button>
          )}

          {/* Decision Quick Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                handleStatusChange('accepted', 'Selamat! Anda diterima bekerja di perusahaan kami.');
                onClose();
              }}
              className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Terima Bekerja</span>
            </button>

            <button
              onClick={() => {
                handleStatusChange('rejected', 'Terima kasih atas partisipasi Anda, kualifikasi belum sesuai kebutuhan saat ini.');
                onClose();
              }}
              className="py-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <XCircle className="w-4 h-4" />
              <span>Tolak Lamaran</span>
            </button>
          </div>

          <button
            onClick={() => setShowChat(true)}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Langsung dengan Kandidat</span>
          </button>
        </div>
      </div>

      {showChat && (
        <ChatModal
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          companyName={application.companyName}
          jobTitle={application.jobTitle}
        />
      )}
    </div>
  );
};
