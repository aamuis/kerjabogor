import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, X, Briefcase, Calendar, Sparkles, AlertCircle } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, clearAllNotifications, setActiveTab } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'urgent':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      case 'job_match':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      default:
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
      <div className="w-full max-w-[390px] h-full bg-white flex flex-col shadow-2xl border-l border-slate-100 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Notifikasi</h3>
              <p className="text-[11px] text-slate-600">Update lamaran & loker Bogor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {notifications.length} pemberitahuan
          </span>
          <button
            onClick={clearAllNotifications}
            className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Tandai semua dibaca
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Belum ada notifikasi baru.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.actionUrl) {
                    setActiveTab(notif.actionUrl);
                    onClose();
                  }
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                  notif.read
                    ? 'bg-white border-slate-100 hover:bg-slate-50'
                    : 'bg-emerald-50/40 border-emerald-200/80 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-2xs shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-slate-600 mt-1.5 block">
                      {notif.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
