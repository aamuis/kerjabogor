import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Save,
  Building2,
  CreditCard,
  Phone,
  FileText,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { EmployerPackageConfig, RecruitmentServiceConfig } from '../../types';

export const PaymentSettingsTab: React.FC = () => {
  const { paymentSettings, updatePaymentSettings, showToast } = useApp();

  const [bankName, setBankName] = useState(paymentSettings.bankName);
  const [accountHolder, setAccountHolder] = useState(paymentSettings.accountHolder);
  const [accountNumber, setAccountNumber] = useState(paymentSettings.accountNumber);
  const [paymentInstructions, setPaymentInstructions] = useState(paymentSettings.paymentInstructions);
  const [supportContact, setSupportContact] = useState(paymentSettings.supportContact);
  const [currency, setCurrency] = useState(paymentSettings.currency || 'IDR');
  const [invoicePrefix, setInvoicePrefix] = useState(paymentSettings.invoicePrefix || 'KB');

  const [packages, setPackages] = useState<EmployerPackageConfig[]>(paymentSettings.packages || []);
  const [recruitmentServices, setRecruitmentServices] = useState<RecruitmentServiceConfig[]>(
    paymentSettings.recruitmentServices || []
  );

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updatePaymentSettings({
      bankName,
      accountHolder,
      accountNumber,
      paymentInstructions,
      supportContact,
      currency,
      invoicePrefix,
      packages,
      recruitmentServices
    });
  };

  const handlePriceChange = (pkgId: string, newPrice: number) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === pkgId ? { ...p, price: newPrice } : p))
    );
  };

  const handleRecruitmentPriceChange = (srvId: string, newPrice: number) => {
    setRecruitmentServices((prev) =>
      prev.map((s) => (s.id === srvId ? { ...s, minPrice: newPrice } : s))
    );
  };

  const handleResetDefaults = () => {
    setBankName('Bank Syariah Indonesia (BSI)');
    setAccountHolder('ABDUL MUIS');
    setAccountNumber('7113396371');
    setSupportContact('0857-1234-5678 (WhatsApp CS Kerja Bogor)');
    setInvoicePrefix('KB');
    showToast('Form direset ke konfigurasi default. Klik Simpan untuk menerapkan.', 'info');
  };

  return (
    <div id="admin-payment-settings-tab" className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Admin Configuration
            </span>
            <span className="text-xs text-slate-500">• Dinamis & Real-time</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Pengaturan Rekening Pembayaran & Harga Paket
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Konfigurasikan rekening transfer bank resmi, kontak support, dan penyesuaian tarif paket rekrutmen tanpa mengubah source code (Constraint 74, 84).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveGeneral} className="space-y-6">
        {/* Rekening Resmi Kerja Bogor */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>Rekening Bank Resmi Penerima Pembayaran</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nama Bank (Bank Name) *
              </label>
              <input
                type="text"
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Contoh: Bank Syariah Indonesia (BSI)"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Atas Nama Pemilik Rekening (Account Holder) *
              </label>
              <input
                type="text"
                required
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                placeholder="Contoh: ABDUL MUIS"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nomor Rekening (Account Number) *
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Contoh: 7113396371"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kontak Bantuan & WhatsApp CS
              </label>
              <input
                type="text"
                value={supportContact}
                onChange={(e) => setSupportContact(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Awalan Nomor Invoice (Prefix)
              </label>
              <input
                type="text"
                value={invoicePrefix}
                onChange={(e) => setInvoicePrefix(e.target.value)}
                placeholder="KB"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Mata Uang (Currency)
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block font-semibold text-slate-700 mb-1">
                Instruksi Transfer (Ditampilkan pada Halaman Pembayaran Perusahaan)
              </label>
              <textarea
                rows={2}
                value={paymentInstructions}
                onChange={(e) => setPaymentInstructions(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Pricing for Employer Packages (Constraint 64, 84) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>Konfigurasi Tarif Paket Rekrutmen Perusahaan</span>
            </h3>
            <span className="text-xs text-slate-500">{packages.length} paket terdaftar</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Paket ID</th>
                  <th className="p-3">Nama Paket</th>
                  <th className="p-3">Tipe / Masa Berlaku</th>
                  <th className="p-3">Harga Sekarang (Rp)</th>
                  <th className="p-3">Ubah Tarif (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-600">
                      {pkg.id}
                    </td>
                    <td className="p-3 font-semibold text-slate-900">
                      {pkg.name}
                    </td>
                    <td className="p-3 text-slate-600">
                      {pkg.periodLabel}
                    </td>
                    <td className="p-3 font-bold text-emerald-800">
                      Rp{pkg.price.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2 max-w-xs">
                        <span className="text-slate-400 font-medium">Rp</span>
                        <input
                          type="number"
                          step={1000}
                          min={0}
                          value={pkg.price}
                          onChange={(e) => handlePriceChange(pkg.id, Number(e.target.value))}
                          className="w-36 px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Pricing for Recruitment Services (Constraint 65) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>Tarif Layanan Recruitment Service & Headhunting</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recruitmentServices.map((srv) => (
              <div key={srv.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">{srv.name}</h4>
                <p className="text-xs text-slate-600 min-h-[36px]">{srv.description}</p>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Harga Mulai Dari:
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-700">Rp</span>
                    <input
                      type="number"
                      step={50000}
                      value={srv.minPrice}
                      onChange={(e) =>
                        handleRecruitmentPriceChange(srv.id, Number(e.target.value))
                      }
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            id="btn-save-payment-settings"
            type="submit"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-700/25 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Semua Perubahan Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
