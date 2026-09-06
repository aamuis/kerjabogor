import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Calendar, Clock, MapPin, CheckCircle2, MessageSquare, Bot } from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  jobTitle?: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, companyName, jobTitle }) => {
  const { messages, sendMessage, role, seekerProfile, activeCompany } = useApp();
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const conversationId = 'comp-3_seeker-abdul-1'; // active sample thread
  const relevantMessages = messages.filter((m) => m.conversationId === conversationId);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText.trim(), conversationId);
    setInputText('');
  };

  const quickTemplates = [
    'Selamat pagi Bu/Pak HRD, apakah lowongan ini masih membuka kesempatan wawancara?',
    'Saya konfirmasi siap hadir untuk jadwal interview yang ditentukan.',
    'Terima kasih banyak atas informasinya.'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-2xs p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-[430px] h-[85vh] sm:h-[650px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        {/* Chat Header */}
        <div className="p-3.5 bg-emerald-700 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white border border-white/30">
              {companyName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-xs leading-tight">{companyName}</div>
              <div className="text-[10px] text-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                HRD Online • Respons Cepat
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-emerald-100 hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice regarding privacy */}
        <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-[10px] flex items-center gap-1 border-b border-emerald-100">
          <Bot className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
          <span>Nomor pribadi Anda aman. Komunikasi resmi Kerja Bogor terjaga kerahasiaannya.</span>
        </div>

        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 custom-scrollbar">
          {relevantMessages.map((msg) => {
            const isMe = msg.senderRole === role;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-emerald-600 text-white rounded-tr-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Interview invite card embed inside message */}
                  {msg.isInterviewInvite && msg.interviewDetails && (
                    <div className="mt-2.5 p-2.5 bg-slate-900 text-white rounded-xl text-[11px] space-y-1.5">
                      <div className="font-bold text-emerald-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Undangan Interview Kerja
                      </div>
                      <div className="text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {msg.interviewDetails.date} pukul {msg.interviewDetails.time}
                      </div>
                      <div className="text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {msg.interviewDetails.locationOrLink}
                      </div>
                    </div>
                  )}

                  <div
                    className={`text-[9px] mt-1.5 text-right ${
                      isMe ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 bg-white border-t border-slate-100 overflow-x-auto no-scrollbar flex gap-1.5">
          {quickTemplates.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setInputText(t)}
              className="text-[10px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              {t.slice(0, 32)}...
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ketik pesan resmi ke HRD..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
