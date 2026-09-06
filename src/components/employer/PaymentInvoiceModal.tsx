import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Invoice } from '../../types';
import {
  X,
  Copy,
  CheckCircle2,
  AlertCircle,
  Building2,
  CreditCard,
  Upload,
  FileText,
  Clock,
  Printer,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface PaymentInvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const PaymentInvoiceModal: React.FC<PaymentInvoiceModalProps> = ({ invoice, onClose }) => {
  const { uploadProofOfPayment, showToast, paymentSettings } = useApp();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(
    invoice?.proofOfPayment ? 4 : 2 // If proof already uploaded, show review / status step
  );

  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedNominal, setCopiedNominal] = useState(false);

  // Form states for proof upload
  const [senderBank, setSenderBank] = useState('BSI Mobile');
  const [senderName, setSenderName] = useState(invoice?.companyName || '');
  const [senderAccount, setSenderAccount] = useState('');
  const [transferDate, setTransferDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [proofImageUrl, setProofImageUrl] = useState(
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!invoice) return null;

  const copyToClipboard = (text: string, type: 'bank' | 'nominal') => {
    navigator.clipboard?.writeText(text);
    if (type === 'bank') {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
      showToast('Nomor rekening BSI berhasil disalin!', 'success');
    } else {
      setCopiedNominal(true);
      setTimeout(() => setCopiedNominal(false), 2000);
      showToast('Nominal transfer berhasil disalin!', 'success');
    }
  };

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderBank) {
      showToast('Mohon lengkapi nama pengirim dan bank pengirim.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      uploadProofOfPayment(invoice.id, {
        transferDate,
        senderBank,
        senderName,
        senderAccount,
        nominal: invoice.amount,
        proofImageUrl,
        notes
      });
      setIsSubmitting(false);
      setActiveStep(4);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const bankName = invoice.bankDetails?.bankName || paymentSettings.bankName;
  const accountHolder = invoice.bankDetails?.accountHolder || paymentSettings.accountHolder;
  const accountNumber = invoice.bankDetails?.accountNumber || paymentSettings.accountNumber;

  return (
    <div
      id="payment-invoice-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
    >
      <div
        id="payment-invoice-modal-card"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white p-5 sm:p-6 relative">
          <button
            id="btn-close-invoice-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
              Kerja Bogor Payment
            </span>
            <span className="text-xs text-emerald-100/80">#{invoice.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {invoice.status === 'verified'
              ? 'Invoice Pembayaran Lunas'
              : 'Pembayaran Rekrutmen Perusahaan'}
          </h2>
          <p className="text-sm text-emerald-100/90 mt-1">
            Paket: <span className="font-semibold text-white">{invoice.packageName}</span>
            {invoice.targetJobTitle && ` • Untuk Loker: ${invoice.targetJobTitle}`}
          </p>
        </div>

        {/* Step Progress Indicator (Rule 83) */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between max-w-lg mx-auto text-xs font-medium">
            <button
              onClick={() => setActiveStep(1)}
              className={`flex items-center gap-1.5 transition-colors ${
                activeStep === 1 ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  activeStep === 1
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                1
              </span>
              <span>Invoice</span>
            </button>

            <span className="h-0.5 w-6 bg-slate-300"></span>

            <button
              onClick={() => setActiveStep(2)}
              className={`flex items-center gap-1.5 transition-colors ${
                activeStep === 2 ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  activeStep === 2
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                2
              </span>
              <span>Transfer</span>
            </button>

            <span className="h-0.5 w-6 bg-slate-300"></span>

            <button
              onClick={() => setActiveStep(3)}
              className={`flex items-center gap-1.5 transition-colors ${
                activeStep === 3 ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  activeStep === 3
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                3
              </span>
              <span>Upload Bukti</span>
            </button>

            <span className="h-0.5 w-6 bg-slate-300"></span>

            <button
              onClick={() => setActiveStep(4)}
              className={`flex items-center gap-1.5 transition-colors ${
                activeStep === 4 ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  activeStep === 4
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                4
              </span>
              <span>Status</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Ringkasan Invoice */}
          {activeStep === 1 && (
            <div id="invoice-step-1" className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Rincian Tagihan Pembayaran</h3>
                  <p className="text-xs text-slate-500">
                    Diterbitkan pada {invoice.createdAt} • Jatuh tempo {invoice.dueDate}
                  </p>
                </div>
                <div>
                  {invoice.status === 'verified' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Lunas / Verified
                    </span>
                  )}
                  {invoice.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                      <Clock className="w-3.5 h-3.5" /> Menunggu Pembayaran
                    </span>
                  )}
                  {invoice.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full">
                      <AlertCircle className="w-3.5 h-3.5" /> Pembayaran Ditolak
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Ditujukan Kepada:</span>
                  <span className="font-semibold text-slate-900 block">{invoice.companyName}</span>
                  <span className="text-xs text-slate-600 block">{invoice.companyEmail}</span>
                  {invoice.companyPhone && (
                    <span className="text-xs text-slate-600 block">{invoice.companyPhone}</span>
                  )}
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Penyedia Layanan:</span>
                  <span className="font-semibold text-slate-900 block">Platform Kerja Bogor</span>
                  <span className="text-xs text-slate-600 block">Bogor, Jawa Barat - Indonesia</span>
                  <span className="text-xs text-slate-600 block">Rekrutmen Resmi B2B</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-semibold">
                    <tr>
                      <th className="p-3">Deskripsi Layanan</th>
                      <th className="p-3 text-center">Durasi</th>
                      <th className="p-3 text-right">Nominal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3">
                        <span className="font-semibold text-slate-900 block">{invoice.packageName}</span>
                        {invoice.targetJobTitle && (
                          <span className="text-xs text-slate-500 block">
                            Target Lowongan: {invoice.targetJobTitle}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center text-slate-600">{invoice.periodDays} Hari</td>
                      <td className="p-3 text-right font-bold text-slate-900">
                        Rp{invoice.amount.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-emerald-50 text-emerald-950 font-bold">
                    <tr>
                      <td colSpan={2} className="p-3 text-right text-emerald-900">
                        Total Tagihan:
                      </td>
                      <td className="p-3 text-right text-base text-emerald-700">
                        Rp{invoice.amount.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  id="btn-goto-step-2"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-emerald-700/20"
                >
                  Lanjutkan Pembayaran →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Instruksi Transfer Bank */}
          {activeStep === 2 && (
            <div id="invoice-step-2" className="space-y-5">
              <div className="text-center max-w-md mx-auto">
                <span className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-slate-900">Instruksi Transfer Bank</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Silakan transfer tepat sesuai nominal invoice ke rekening resmi Kerja Bogor berikut.
                </p>
              </div>

              {/* Rekening Card (Constraint 66, 67, 74) */}
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/50 p-5 rounded-2xl border-2 border-emerald-300 shadow-sm relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-700" />
                    <span className="font-bold text-emerald-950 text-sm">{bankName}</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-semibold">
                    Rekening Resmi
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-inner flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Nomor Rekening:</span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-800 tracking-wider">
                      {accountNumber}
                    </span>
                    <span className="text-xs text-slate-600 font-medium block mt-0.5">
                      A.N. <strong className="text-slate-900">{accountHolder}</strong>
                    </span>
                  </div>
                  <button
                    id="btn-copy-bank"
                    onClick={() => copyToClipboard(accountNumber, 'bank')}
                    className="flex items-center gap-1 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-300 transition-colors"
                  >
                    {copiedBank ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-inner flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Nominal yang harus ditransfer:</span>
                    <span className="text-lg sm:text-xl font-bold text-slate-900">
                      Rp{invoice.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    id="btn-copy-nominal"
                    onClick={() => copyToClipboard(String(invoice.amount), 'nominal')}
                    className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
                  >
                    {copiedNominal ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Nominal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Security Box (Constraint 75) */}
              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Keamanan Pembayaran Terjamin:</strong>
                  <span>
                    Kerja Bogor tidak pernah meminta PIN ATM, OTP bank, atau password mobile banking. Pembayaran
                    hanya diverifikasi manual melalui bukti transfer resmi.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setActiveStep(1)}
                  className="w-full sm:w-auto px-4 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-medium"
                >
                  ← Lihat Invoice
                </button>
                <button
                  id="btn-goto-step-3"
                  onClick={() => setActiveStep(3)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Saya Sudah Transfer & Upload Bukti</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Form Upload Bukti Pembayaran (Constraint 68) */}
          {activeStep === 3 && (
            <form id="form-upload-proof" onSubmit={handleProofSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Konfirmasi Bukti Transfer</h3>
                  <p className="text-xs text-slate-500">
                    Kirimkan detail dan foto struk/screenshot transfer Anda
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg font-semibold">
                  Invoice #{invoice.id}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
                    value={invoice.companyName}
                    readOnly
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Paket yang Dibeli
                  </label>
                  <input
                    type="text"
                    value={invoice.packageName}
                    readOnly
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nominal Transfer (Rp) *
                  </label>
                  <input
                    type="text"
                    value={`Rp ${invoice.amount.toLocaleString('id-ID')}`}
                    readOnly
                    className="w-full px-3 py-2 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal Transfer *
                  </label>
                  <input
                    type="date"
                    required
                    value={transferDate}
                    onChange={(e) => setTransferDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bank Pengirim *
                  </label>
                  <select
                    value={senderBank}
                    onChange={(e) => setSenderBank(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="BSI Mobile / BSI Transfer">BSI (Bank Syariah Indonesia)</option>
                    <option value="BCA Transfer / KlikBCA">BCA</option>
                    <option value="Mandiri Livin">Mandiri</option>
                    <option value="BRImo / BRI Transfer">BRI</option>
                    <option value="BNI Mobile">BNI</option>
                    <option value="Bank Jabar Banten (BJB)">BJB (Bank BJB)</option>
                    <option value="SeaBank / Bank Jago / Lainnya">Bank Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Pemilik Rekening Pengirim *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Sumber Rezeki / Budi Santoso"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Bukti Upload URL / Preview */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bukti Transfer (Struk / Screenshot M-Banking) *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={proofImageUrl}
                    onChange={(e) => setProofImageUrl(e.target.value)}
                    placeholder="URL gambar bukti transfer"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <div className="w-16 h-12 rounded-lg border border-slate-300 overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={proofImageUrl}
                      alt="Preview Bukti"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Format gambar JPEG/PNG/PDF. Pastikan nominal, tanggal, dan nama penerima terlihat jelas.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Catatan untuk tim admin..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-medium"
                >
                  ← Kembali
                </button>
                <button
                  id="btn-submit-payment-proof"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Mengirim...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Kirim Bukti Pembayaran</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Status Verifikasi & Digital Invoice (Constraint 70, 76) */}
          {activeStep === 4 && (
            <div id="invoice-step-4" className="space-y-5">
              {/* Status Header */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  invoice.status === 'verified'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : invoice.status === 'rejected'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                {invoice.status === 'verified' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : invoice.status === 'rejected' ? (
                  <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}

                <div>
                  <h4 className="font-bold text-sm">
                    {invoice.status === 'verified'
                      ? '🎉 Pembayaran Berhasil Diverifikasi!'
                      : invoice.status === 'rejected'
                      ? '✕ Pembayaran Ditolak'
                      : '⏳ Menunggu Verifikasi Admin'}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    {invoice.status === 'verified'
                      ? `Paket ${invoice.packageName} Anda telah aktif. Seluruh fitur rekrutmen premium dapat langsung digunakan.`
                      : invoice.status === 'rejected'
                      ? `Alasan: ${invoice.rejectedReason || 'Bukti transfer tidak terbaca / nominal tidak cocok'}. Silakan unggah bukti yang benar.`
                      : 'Bukti transfer telah diterima oleh sistem Kerja Bogor. Tim admin memverifikasi pembayaran Anda dalam kurun waktu 15 - 30 menit pada jam kerja.'}
                  </p>
                </div>
              </div>

              {/* Digital Invoice Preview (Rule 76) */}
              <div className="border-2 border-slate-300 rounded-2xl p-5 bg-white space-y-4 shadow-sm text-slate-800">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
                      KB
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 tracking-tight">
                        KERJA BOGOR
                      </h4>
                      <span className="text-[10px] text-slate-500 block">
                        Official B2B Recruitment Invoice
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-slate-900 block">
                      #{invoice.id}
                    </span>
                    <span className="text-[10px] text-slate-500 block">{invoice.createdAt}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Billed To:</span>
                    <strong className="text-slate-900">{invoice.companyName}</strong>
                    <span className="text-slate-600 block">{invoice.companyEmail}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block font-medium">Payment Status:</span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        invoice.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : invoice.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {invoice.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1.5 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Item:</span>
                    <strong className="text-slate-900">{invoice.packageName}</strong>
                  </div>
                  {invoice.targetJobTitle && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Target Lowongan:</span>
                      <span className="text-slate-900 font-medium">{invoice.targetJobTitle}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-600">Metode:</span>
                    <span className="text-slate-900">{invoice.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1.5 font-bold text-emerald-800">
                    <span>Total Pembayaran:</span>
                    <span>Rp{invoice.amount.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {invoice.proofOfPayment && (
                  <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border flex items-center justify-between">
                    <span>
                      Bukti transfer diunggah: <strong>{invoice.proofOfPayment.uploadedAt}</strong> ({invoice.proofOfPayment.senderBank})
                    </span>
                    <a
                      href={invoice.proofOfPayment.proofImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 underline font-semibold"
                    >
                      Lihat Foto
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  id="btn-print-invoice"
                  onClick={handlePrint}
                  className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download / Cetak Invoice</span>
                </button>

                <button
                  id="btn-close-final"
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Support Info */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Butuh bantuan pembayaran? Hubungi {paymentSettings.supportContact}</span>
          </div>
          <span className="text-[11px] text-slate-400">Kerja Bogor Monetization Engine</span>
        </div>
      </div>
    </div>
  );
};
