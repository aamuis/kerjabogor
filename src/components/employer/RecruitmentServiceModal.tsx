import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  Users,
  Briefcase,
  Search,
  Check,
  Send,
  Building2,
  Sparkles,
  Phone,
  HelpCircle
} from 'lucide-react';
import { BOGOR_LOCATIONS } from '../../data/bogorData';

interface RecruitmentServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruitmentServiceModal: React.FC<RecruitmentServiceModalProps> = ({
  isOpen,
  onClose
}) => {
  const { paymentSettings, submitRecruitmentRequest, activeCompany } = useApp();

  const services = paymentSettings.recruitmentServices || [];

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    services[0]?.id || 'rec-basic'
  );

  // Form states
  const [positionTitle, setPositionTitle] = useState('');
  const [candidateCount, setCandidateCount] = useState<number>(3);
  const [districtLocation, setDistrictLocation] = useState(
    activeCompany.location?.district || BOGOR_LOCATIONS[0].district
  );
  const [requirements, setRequirements] = useState('');
  const [salaryRange, setSalaryRange] = useState('Rp4.500.000 - Rp6.500.000 / bulan');
  const [contactPerson, setContactPerson] = useState('Tim HRD / Ibu Rina');
  const [contactPhone, setContactPhone] = useState(activeCompany.phone || '0812-9988-7766');
  const [contactEmail, setContactEmail] = useState(activeCompany.email || 'hrd@perusahaan.com');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentSelectedService = services.find((s) => s.id === selectedServiceId) || services[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!positionTitle || !requirements) {
      alert('Mohon isi posisi pekerjaan dan persyaratan kandidat.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitRecruitmentRequest({
        companyId: activeCompany.id,
        companyName: activeCompany.name,
        contactPerson,
        contactPhone,
        contactEmail,
        packageId: currentSelectedService.id,
        packageName: currentSelectedService.name,
        estimatedPrice: currentSelectedService.minPrice,
        positionTitle,
        candidateCount,
        districtLocation,
        requirements,
        salaryRange,
        notes
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div
      id="recruitment-service-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
    >
      <div
        id="recruitment-service-modal-card"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white p-6 sm:p-7 relative shrink-0">
          <button
            id="btn-close-recruitment-service"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/30 text-teal-200 border border-teal-400/30 inline-block mb-2">
              Layanan End-to-End Headhunting & Screening
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Recruitment Service Kerja Bogor
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1">
              Serahkan proses pencarian, screening CV, tes bakat, dan kurasi awal kepada tim HR profesional Kerja Bogor. Perusahaan Anda terima kandidat terbaik siap interview.
            </p>
          </div>
        </div>

        {/* 8-Step Workflow Banner (Constraint 65) */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 shrink-0">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Alur Layanan 8 Langkah Mudah:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
            <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">1</span>
              <span>Isi Kebutuhan</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">2</span>
              <span>Jumlah Kandidat</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">3</span>
              <span>Posisi & Lokasi</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">4</span>
              <span>Syarat & Gaji</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">5</span>
              <span>Screening CV</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">6</span>
              <span>Tes & Interview</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">7</span>
              <span>Kandidat Top Fit</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">8</span>
              <span>Onboarding Sukses</span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto grow">
          {isSuccess ? (
            <div className="text-center py-8 max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Permintaan Rekrutmen Berhasil Terkirim!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tim HR Specialist Kerja Bogor telah menerima spesifikasi lowongan <strong>{positionTitle}</strong>. Kami akan segera menghubungi kontak <strong>{contactPhone}</strong> untuk konfirmasi brief dan estimasi timeline penyerahan kandidat.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
              >
                Kembali ke Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Service Package Selector (Constraint 65) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  Pilih Tingkat Layanan Recruitment:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {services.map((srv) => {
                    const isSelected = selectedServiceId === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedServiceId(srv.id)}
                        className={`cursor-pointer rounded-2xl p-4 transition-all border-2 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-200'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-slate-900 text-sm">{srv.name}</h4>
                          <input
                            type="radio"
                            checked={isSelected}
                            onChange={() => setSelectedServiceId(srv.id)}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                        </div>
                        <span className="text-base font-extrabold text-emerald-800 block">
                          Mulai Rp{srv.minPrice.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[11px] text-slate-500 block mb-2">{srv.durationLabel}</span>
                        <p className="text-xs text-slate-600 mb-3">{srv.description}</p>
                        <ul className="space-y-1 text-[11px] text-slate-700 border-t pt-2">
                          {srv.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recruitment Intake Form */}
              <form onSubmit={handleSubmit} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span>Formulir Kebutuhan Tenaga Kerja</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      1. Posisi / Jabatan yang Dicari *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Supervisor Restoran / Operator Mesin CNC"
                      value={positionTitle}
                      onChange={(e) => setPositionTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      2. Jumlah Kandidat yang Dibutuhkan *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      required
                      value={candidateCount}
                      onChange={(e) => setCandidateCount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      3. Wilayah Penempatan di Bogor *
                    </label>
                    <select
                      value={districtLocation}
                      onChange={(e) => setDistrictLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      {BOGOR_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.district}>
                          {loc.name} ({loc.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      4. Estimasi Kisaran Gaji *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rp4.500.000 - Rp6.000.000 / bulan"
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      5. Persyaratan & Kualifikasi Utama *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Contoh: Minimal D3/S1, Pengalaman 2 tahun di bidang F&B, jujur, menguasai sistem POS dan Excel, domisili Kota Bogor lebih diutamakan."
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nama PIC / Kontak Perusahaan
                    </label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp Aktif
                    </label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-xs text-slate-500">
                    Paket: <strong className="text-slate-800">{currentSelectedService.name}</strong> • Mulai Rp{currentSelectedService.minPrice.toLocaleString('id-ID')}
                  </div>

                  <button
                    id="btn-submit-recruitment-service"
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Mengirim...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim Permintaan Recruitment Service</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-xs text-slate-500 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Garansi penggantian kandidat tanpa biaya tambahan jika tidak sesuai dalam masa garansi.</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
