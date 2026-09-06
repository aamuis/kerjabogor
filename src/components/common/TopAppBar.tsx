import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Bell, UserCheck, Building2, ChevronDown, LogOut, Sparkles } from 'lucide-react';
import { LocationModal } from './LocationModal';
import { UserRole } from '../../types';

interface TopAppBarProps {
  onOpenNotifications: () => void;
  onOpenLocationModal: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onOpenNotifications, onOpenLocationModal }) => {
  const {
    role,
    setRole,
    userLocation,
    radiusKm,
    notifications,
    seekerProfile,
    activeCompany,
    setActiveTab,
    siteConfig,
    authUser,
    logoutUser
  } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; color: string }> = {
    seeker: {
      label: 'Pencari Kerja',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      color: 'bg-emerald-600 text-white'
    },
    employer: {
      label: 'Perusahaan',
      icon: <Building2 className="w-3.5 h-3.5" />,
      color: 'bg-indigo-600 text-white'
    },
    admin: {
      label: 'Admin Panel',
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />,
      color: 'bg-slate-900 text-white'
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 pt-2.5 pb-2.5 transition-all">
      {/* Optional Top Announcement Bar from Admin Config */}
      {siteConfig.announcement.enabled && siteConfig.announcement.text && (
        <div className="mb-2 py-1 px-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-[10px] font-bold rounded-xl flex items-center justify-between shadow-xs animate-in fade-in">
          <span className="truncate">{siteConfig.announcement.text}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <div className="flex items-center justify-between gap-2">
        {/* Brand & Slogan */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 text-left group"
        >
          {siteConfig.logoUrl ? (
            <img
              src={siteConfig.logoUrl}
              alt={siteConfig.brandName}
              className="w-8 h-8 rounded-xl object-contain shadow-xs group-hover:scale-105 transition"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-xs group-hover:scale-105 transition"
              style={{ backgroundColor: siteConfig.primaryColor }}
            >
              {siteConfig.brandName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <div
              className="font-extrabold text-sm tracking-tight leading-none flex items-center gap-1"
              style={{ color: siteConfig.titleColor }}
            >
              {siteConfig.brandName}
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: siteConfig.accentColor }}
              ></span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium tracking-tight">
              {siteConfig.brandTagline}
            </span>
          </div>
        </button>

        {/* Right Actions: Role Switcher & Notifications */}
        <div className="flex items-center gap-1.5">
          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-2xs transition ${roleLabels[role]?.color || 'bg-emerald-600 text-white'}`}
            >
              {roleLabels[role]?.icon}
              <span className="text-[11px] font-semibold">{roleLabels[role]?.label}</span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            {/* Role Dropdown (Public only has Seeker & Employer, no Admin) */}
            {showRoleMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowRoleMenu(false)}
                />
                <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Mode Pengguna
                  </div>
                  <button
                    onClick={() => {
                      setRole('seeker');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition ${
                      role === 'seeker' ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="text-left min-w-0 truncate">
                      <div className="text-xs font-semibold truncate">Pencari Kerja</div>
                      <div className="text-[10px] text-slate-500 truncate">{seekerProfile.name}</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setRole('employer');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition ${
                      role === 'employer' ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div className="text-left min-w-0 truncate">
                      <div className="text-xs font-semibold truncate">Perusahaan / UMKM</div>
                      <div className="text-[10px] text-slate-500 truncate">Pasang Loker & Rekrutmen</div>
                    </div>
                  </button>

                  {/* If Admin is logged in, show Admin option */}
                  {authUser?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setRole('admin');
                        setShowRoleMenu(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition ${
                        role === 'admin' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="text-left min-w-0 truncate">
                        <div className="text-xs font-semibold truncate">Panel Pengelola</div>
                        <div className="text-[10px] text-slate-400 truncate">Kustomisasi & Finansial</div>
                      </div>
                    </button>
                  )}

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      logoutUser();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition"
            title="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Seeker Location Selector Bar */}
      {role === 'seeker' && (
        <div className="mt-2.5 flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs text-slate-700">
          <button
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 font-medium truncate text-left hover:text-emerald-700 transition flex-1"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              <strong className="text-slate-900 font-semibold">{userLocation.district}</strong>, {userLocation.type}
            </span>
          </button>

          <button
            onClick={onOpenLocationModal}
            className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 hover:bg-emerald-200/70 px-2 py-0.5 rounded-md shrink-0 ml-1 transition"
          >
            ±{radiusKm} KM
          </button>
        </div>
      )}
    </header>
  );
};
