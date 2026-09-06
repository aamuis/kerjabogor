import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus, Application, InterviewSchedule } from '../../types';
import {
  Briefcase,
  Calendar,
  Bookmark,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  AlertCircle,
  Video,
  FileText,
  MessageSquare
} from 'lucide-react';
import { JobCard } from './JobCard';
import { ChatModal } from '../common/ChatModal';

interface ApplicationsScreenProps {
  onSelectJob: (jobId: string) => void;
}

export const ApplicationsScreen: React.FC<ApplicationsScreenProps> = ({ onSelectJob }) => {
  const { applications, interviews, savedJobIds, jobs } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'interviews' | 'saved'>('applications');
  const [selectedAppForChat, setSelectedAppForChat] = useState<Application | null>(null);

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return { label: 'Terkirim', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'received':
        return { label: 'Dibuka HRD', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' };
      case 'screening':
        return { label: 'Screening', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'in_progress':
        return { label: 'Diproses', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'interview':
        return { label: 'Undangan Interview', color: 'bg-purple-100 text-purple-800 border-purple-200 animate-pulse' };
      case 'accepted':
        return { label: '🎉 Diterima Kerja', color: 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold' };
      case 'rejected':
        return { label: 'Belum Sesuai', color: 'bg-rose-100 text-rose-800 border-rose-200' };
    }
  };

  const statusSteps: ApplicationStatus[] = ['submitted', 'received', 'screening', 'interview', 'accepted'];

  const getStepProgressIndex = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted': return 0;
      case 'received': return 1;
      case 'screening': return 2;
      case 'in_progress': return 2;
      case 'interview': return 3;
      case 'accepted': return 4;
      case 'rejected': return 2;
    }
  };

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-200">
      {/* Tab Switcher */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => setActiveSubTab('applications')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'applications'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Lamaran ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('interviews')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'interviews'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Interview ({interviews.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('saved')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'saved'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Tersimpan ({savedJobs.length})</span>
        </button>
      </div>

      {/* Subtab 1: Lamaran Saya */}
      {activeSubTab === 'applications' && (
        <div className="space-y-3">
          {applications.map((app) => {
            const badge = getStatusBadge(app.status);
            const currentStepIdx = getStepProgressIndex(app.status);

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs space-y-3.5"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 min-w-0">
                    <img
                      src={app.companyLogo}
                      alt={app.companyName}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shrink-0 bg-slate-50 shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                        {app.jobTitle}
                      </h3>
                      <div className="text-[11px] text-slate-600 truncate mt-0.5">
                        {app.companyName}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Dilamar pada {app.appliedDate}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-xl border shrink-0 ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Visual Status Stepper (Constraint 16) */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Tahapan Seleksi Rekrutmen:
                  </div>

                  <div className="grid grid-cols-4 gap-1 relative text-center">
                    {['Terkirim', 'Screening', 'Interview', 'Keputusan'].map((step, idx) => {
                      const isPassed = currentStepIdx >= idx;
                      const isCurrent = currentStepIdx === idx;

                      return (
                        <div key={idx} className="space-y-1">
                          <div
                            className={`h-1.5 rounded-full transition ${
                              isPassed ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                          ></div>
                          <span
                            className={`text-[9px] block font-bold ${
                              isCurrent
                                ? 'text-emerald-700 font-extrabold'
                                : isPassed
                                ? 'text-slate-700'
                                : 'text-slate-400'
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Latest Status Note */}
                {app.statusHistory.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      Update Terakhir ({app.statusHistory[app.statusHistory.length - 1].updatedAt})
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      {app.statusHistory[app.statusHistory.length - 1].note}
                    </p>
                  </div>
                )}

                {/* Interview Action Card inside Application */}
                {app.status === 'interview' && app.interviewSchedule && (
                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs space-y-2">
                    <div className="font-extrabold text-purple-900 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-purple-700" />
                      Jadwal Interview: {app.interviewSchedule.date} pukul {app.interviewSchedule.time}
                    </div>
                    <div className="text-[11px] text-purple-800">
                      📍 {app.interviewSchedule.locationOrLink}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setSelectedAppForChat(app)}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Hubungi HRD</span>
                  </button>

                  <button
                    onClick={() => onSelectJob(app.jobId)}
                    className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition"
                  >
                    <span>Detail Lowongan</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {applications.length === 0 && (
            <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Belum ada lamaran terkirim</h3>
              <p className="text-xs text-slate-500 mt-1">
                Cari lowongan di sekitar rumahmu dan kirimkan CV sekarang.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Jadwal Interview (Constraint 18) */}
      {activeSubTab === 'interviews' && (
        <div className="space-y-3">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-3xl p-4 border border-purple-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase">
                  {interview.type}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Terjadwal
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{interview.jobTitle}</h3>
                <p className="text-xs text-slate-600">{interview.companyName}</p>
              </div>

              <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-100 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-purple-950">
                  <Calendar className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>{interview.date}</span>
                  <span>•</span>
                  <Clock className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>{interview.time}</span>
                </div>

                <div className="flex items-start gap-2 text-slate-700 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>{interview.locationOrLink}</span>
                </div>

                {interview.notes && (
                  <div className="text-[11px] text-slate-600 pt-1 border-t border-purple-200/60">
                    <strong>Catatan HRD:</strong> {interview.notes}
                  </div>
                )}
              </div>
            </div>
          ))}

          {interviews.length === 0 && (
            <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Belum ada jadwal interview</h3>
              <p className="text-xs text-slate-500 mt-1">
                HRD akan mengirimkan undangan interview saat lamaranmu lolos screening.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Subtab 3: Lowongan Tersimpan */}
      {activeSubTab === 'saved' && (
        <div className="space-y-3">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => onSelectJob(job.id)}
            />
          ))}

          {savedJobs.length === 0 && (
            <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Bookmark className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Belum ada lowongan tersimpan</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tekan tombol bookmark pada kartu lowongan untuk menyimpannya di sini.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Chat with HRD Modal */}
      {selectedAppForChat && (
        <ChatModal
          isOpen={!!selectedAppForChat}
          onClose={() => setSelectedAppForChat(null)}
          companyName={selectedAppForChat.companyName}
          jobTitle={selectedAppForChat.jobTitle}
        />
      )}
    </div>
  );
};
