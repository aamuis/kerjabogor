import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopAppBar } from './components/common/TopAppBar';
import { BottomNav } from './components/common/BottomNav';
import { LocationModal } from './components/common/LocationModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { HomeScreen } from './components/seeker/HomeScreen';
import { SearchScreen } from './components/seeker/SearchScreen';
import { JobDetailScreen } from './components/seeker/JobDetailScreen';
import { JobMapScreen } from './components/seeker/JobMapScreen';
import { ApplicationsScreen } from './components/seeker/ApplicationsScreen';
import { ProfileScreen } from './components/seeker/ProfileScreen';
import { CvBuilderScreen } from './components/seeker/CvBuilderScreen';
import { CareerCenterScreen } from './components/seeker/CareerCenterScreen';
import { AssessmentScreen } from './components/seeker/AssessmentScreen';
import { CompanyDetailScreen } from './components/seeker/CompanyDetailScreen';
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminSecretLoginModal } from './components/admin/AdminSecretLoginModal';
import { PaymentInvoiceModal } from './components/employer/PaymentInvoiceModal';
import { CheckCircle, AlertCircle, Smartphone, Info } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedJobId,
    setSelectedJobId,
    selectedCompanyId,
    setSelectedCompanyId,
    role,
    toast,
    activeInvoiceModal,
    setActiveInvoiceModal,
    siteConfig,
    isSecretAdminModalOpen,
    closeSecretAdminModal,
    openSecretAdminModal
  } = useApp();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [searchFilterParam, setSearchFilterParam] = useState<{ key: string; value: any } | undefined>();

  // Secret keyboard listener for admin access: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        openSecretAdminModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSecretAdminModal]);

  const handleOpenSearchWithFilter = (filterKey?: string, filterVal?: any) => {
    if (filterKey) {
      setSearchFilterParam({ key: filterKey, value: filterVal });
    } else {
      setSearchFilterParam(undefined);
    }
    setActiveTab('search');
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setActiveTab('job-detail');
  };

  const handleOpenCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setActiveTab('company-detail');
  };

  const renderCurrentScreen = () => {
    // If user is in Employer Mode
    if (role === 'employer') {
      return <EmployerDashboard />;
    }

    // If user is in Admin Mode
    if (role === 'admin') {
      return <AdminDashboard />;
    }

    // Default Seeker Screens
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onSelectJob={handleSelectJob}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onOpenSearchWithFilter={handleOpenSearchWithFilter}
          />
        );
      case 'search':
        return (
          <SearchScreen
            onSelectJob={handleSelectJob}
            initialFilter={searchFilterParam}
          />
        );
      case 'map':
        return <JobMapScreen onSelectJob={handleSelectJob} />;
      case 'applications':
        return <ApplicationsScreen onSelectJob={handleSelectJob} />;
      case 'profile':
        return (
          <ProfileScreen
            onOpenCvBuilder={() => setActiveTab('cv-builder')}
          />
        );
      case 'job-detail':
        return (
          <JobDetailScreen
            jobId={selectedJobId || 'job-1'}
            onBack={() => setActiveTab('home')}
            onOpenCompany={handleOpenCompany}
          />
        );
      case 'company-detail':
        return (
          <CompanyDetailScreen
            companyId={selectedCompanyId || 'comp-1'}
            onBack={() => setActiveTab('home')}
            onSelectJob={handleSelectJob}
          />
        );
      case 'cv-builder':
        return <CvBuilderScreen onBack={() => setActiveTab('profile')} />;
      case 'career-center':
        return <CareerCenterScreen onBack={() => setActiveTab('home')} />;
      case 'assessment':
        return (
          <AssessmentScreen
            onBack={() => setActiveTab('home')}
            onSelectJob={handleSelectJob}
          />
        );
      default:
        return (
          <HomeScreen
            onSelectJob={handleSelectJob}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onOpenSearchWithFilter={handleOpenSearchWithFilter}
          />
        );
    }
  };

  const isDetailOrCvScreen = ['job-detail', 'cv-builder', 'company-detail', 'assessment'].includes(activeTab);

  return (
    <div
      className="min-h-screen bg-slate-950 flex justify-center items-center font-sans antialiased text-slate-800"
      style={{
        fontFamily: siteConfig.fontFamily ? `"${siteConfig.fontFamily}", system-ui, sans-serif` : undefined
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% -20%, ${siteConfig.primaryColor}40, rgba(255,255,255,0))`
        }}
      ></div>

      {/* Center Phone Container (Constraint: Mobile-First always 390-430px centered) */}
      <div className="relative w-full max-w-[430px] h-screen sm:h-[92vh] sm:max-h-[890px] bg-white sm:rounded-[36px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden sm:border-[6px] sm:border-slate-800/80">
        {/* Top App Bar */}
        {!isDetailOrCvScreen && (
          <TopAppBar
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onOpenNotifications={() => setIsNotifDrawerOpen(true)}
          />
        )}

        {/* Dynamic Scrollable Screen Body */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-4 bg-slate-50/70">
          {renderCurrentScreen()}
        </main>

        {/* Fixed Bottom Navigation (Seeker Mode only & not inside full-page flow) */}
        {role === 'seeker' && !['cv-builder', 'job-detail', 'assessment'].includes(activeTab) && (
          <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
        )}

        {/* Toast Alert Banner */}
        {toast && (
          <div className="fixed sm:absolute bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700/80 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150 whitespace-nowrap">
            {toast.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        )}

        {/* Location Selector Modal */}
        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
        />

        {/* Notification Drawer */}
        <NotificationDrawer
          isOpen={isNotifDrawerOpen}
          onClose={() => setIsNotifDrawerOpen(false)}
        />

        {/* Payment & Invoice Modal Flow */}
        {activeInvoiceModal && (
          <PaymentInvoiceModal
            invoice={activeInvoiceModal}
            onClose={() => setActiveInvoiceModal(null)}
          />
        )}

        {/* Secret Admin Login Modal */}
        <AdminSecretLoginModal
          isOpen={isSecretAdminModalOpen}
          onClose={closeSecretAdminModal}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
