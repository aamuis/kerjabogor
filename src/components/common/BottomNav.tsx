import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, Map, Briefcase, User, Building, Shield } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { role, activeTab, setActiveTab, applications, setSelectedJobId, setSelectedCompanyId } = useApp();

  const handleNavClick = (tabId: string) => {
    setSelectedJobId(null);
    setSelectedCompanyId(null);
    setActiveTab(tabId);
  };

  const activeAppCount = applications.filter(
    (a) => a.status !== 'rejected' && a.status !== 'accepted'
  ).length;

  if (role === 'employer') {
    return (
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 z-40 shadow-lg">
        <div className="flex items-center justify-around">
          <button
            onClick={() => handleNavClick('employer-dashboard')}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
              activeTab === 'employer-dashboard' || activeTab === 'home'
                ? 'text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Dashboard</span>
          </button>

          <button
            onClick={() => handleNavClick('employer-post')}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
              activeTab === 'employer-post'
                ? 'text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
              +
            </div>
            <span className="text-[10px] mt-0.5">Pasang Loker</span>
          </button>

          <button
            onClick={() => handleNavClick('employer-applicants')}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition relative ${
              activeTab === 'employer-applicants'
                ? 'text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Kandidat</span>
            {applications.length > 0 && (
              <span className="absolute top-0 right-2 w-4 h-4 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {applications.length}
              </span>
            )}
          </button>
        </div>
      </nav>
    );
  }

  if (role === 'admin') {
    return (
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-slate-900 text-white border-t border-slate-800 px-2 py-1.5 z-40 shadow-lg">
        <div className="flex items-center justify-around">
          <button
            onClick={() => handleNavClick('admin-dashboard')}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
              activeTab === 'admin-dashboard' || activeTab === 'home'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Admin Overview</span>
          </button>

          <button
            onClick={() => handleNavClick('admin-companies')}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
              activeTab === 'admin-companies'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Verifikasi</span>
          </button>

          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-center py-1 px-3 rounded-xl text-slate-400 hover:text-white transition"
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Pratinjau User</span>
          </button>
        </div>
      </nav>
    );
  }

  // Default Seeker Mobile Bottom Navigation (Constraint 49)
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-1.5 py-1 z-40 shadow-lg">
      <div className="flex items-center justify-around">
        {/* 1. Beranda */}
        <button
          id="nav-home"
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition ${
            activeTab === 'home'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 font-medium">Beranda</span>
        </button>

        {/* 2. Cari */}
        <button
          id="nav-search"
          onClick={() => handleNavClick('search')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition ${
            activeTab === 'search'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Search className={`w-5 h-5 ${activeTab === 'search' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 font-medium">Cari</span>
        </button>

        {/* 3. Peta */}
        <button
          id="nav-map"
          onClick={() => handleNavClick('map')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition ${
            activeTab === 'map'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Map className={`w-5 h-5 ${activeTab === 'map' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 font-medium">Peta</span>
        </button>

        {/* 4. Lamaran */}
        <button
          id="nav-applications"
          onClick={() => handleNavClick('applications')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition relative ${
            activeTab === 'applications'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Briefcase className={`w-5 h-5 ${activeTab === 'applications' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 font-medium">Lamaran</span>
          {activeAppCount > 0 && (
            <span className="absolute -top-0.5 right-1.5 w-4 h-4 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {activeAppCount}
            </span>
          )}
        </button>

        {/* 5. Profil */}
        <button
          id="nav-profile"
          onClick={() => handleNavClick('profile')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition ${
            activeTab === 'profile' || activeTab === 'cv-builder' || activeTab === 'assessment'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 font-medium">Profil</span>
        </button>
      </div>
    </nav>
  );
};
