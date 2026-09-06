import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Invoice, InvoiceStatus } from '../../types';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Building2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  DollarSign
} from 'lucide-react';
import { PaymentInvoiceModal } from '../employer/PaymentInvoiceModal';

export const PaymentsAdminTab: React.FC = () => {
  const { invoices, verifyPayment, rejectPayment, showToast } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | InvoiceStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProofInvoice, setSelectedProofInvoice] = useState<Invoice | null>(null);
  const [selectedDigitalInvoice, setSelectedDigitalInvoice] = useState<Invoice | null>(null);
  const [rejectReasonPrompt, setRejectReasonPrompt] = useState<string>('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [invoiceToReject, setInvoiceToReject] = useState<Invoice | null>(null);

  const pendingCount = invoices.filter((i) => i.status === 'pending').length;
  const verifiedCount = invoices.filter((i) => i.status === 'verified').length;
  const totalRevenue = invoices
    .filter((i) => i.status === 'verified')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesFilter = filterStatus === 'all' || inv.status === filterStatus;
    const matchesSearch =
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleVerify = (inv: Invoice) => {
    verifyPayment(inv.id);
    setSelectedProofInvoice(null);
  };

  const handleOpenReject = (inv: Invoice) => {
    setInvoiceToReject(inv);
    setRejectReasonPrompt('Bukti transfer tidak jelas / nominal tidak sesuai.');
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (invoiceToReject) {
      rejectPayment(invoiceToReject.id, rejectReasonPrompt);
      setIsRejectModalOpen(false);
      setInvoiceToReject(null);
      setSelectedProofInvoice(null);
    }
  };

  return (
    <div id="admin-payments-tab" className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
              Total Tagihan
            </span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {invoices.length}
            </span>
            <span className="text-[11px] text-slate-400">Semua invoice tercatat</span>
          </div>
          <div className="w-11 h-11 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-800 font-semibold uppercase tracking-wider block">
              Menunggu Verifikasi
            </span>
            <span className="text-2xl font-black text-amber-950 mt-1 block">
              {pendingCount}
            </span>
            <span className="text-[11px] text-amber-700">Perlu tindakan admin</span>
          </div>
          <div className="w-11 h-11 bg-amber-200 text-amber-900 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider block">
              Pembayaran Terverifikasi
            </span>
            <span className="text-2xl font-black text-emerald-950 mt-1 block">
              {verifiedCount}
            </span>
            <span className="text-[11px] text-emerald-700">Layanan & fitur aktif</span>
          </div>
          <div className="w-11 h-11 bg-emerald-200 text-emerald-900 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block">
              Total Pendapatan Terverifikasi
            </span>
            <span className="text-xl sm:text-2xl font-black text-white mt-1 block">
              Rp{totalRevenue.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-emerald-200/80">Transfer Bank BSI</span>
          </div>
          <div className="w-11 h-11 bg-white/10 text-emerald-300 rounded-xl flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari no invoice, perusahaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua ({invoices.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === 'pending'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            Pending Verification ({pendingCount})
          </button>
          <button
            onClick={() => setFilterStatus('verified')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === 'verified'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === 'rejected'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Invoices Table (Constraint 69) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Daftar Transaksi Masuk & Verifikasi Manual</span>
          </h3>
          <span className="text-xs text-slate-500">{filteredInvoices.length} invoice</span>
        </div>

        {filteredInvoices.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            Tidak ada transaksi yang cocok dengan filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Invoice</th>
                  <th className="p-4">Perusahaan</th>
                  <th className="p-4">Paket / Target</th>
                  <th className="p-4">Nominal</th>
                  <th className="p-4">Tanggal Transfer</th>
                  <th className="p-4 text-center">Bukti Transfer</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Tindakan Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900">
                      #{inv.id}
                    </td>
                    <td className="p-4">
                      <strong className="text-slate-900 block">{inv.companyName}</strong>
                      <span className="text-[11px] text-slate-500 block">{inv.companyEmail}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-800 block">{inv.packageName}</span>
                      {inv.targetJobTitle && (
                        <span className="text-[10px] text-indigo-600 font-medium block">
                          🎯 Loker: {inv.targetJobTitle}
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      Rp{inv.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="p-4 text-slate-600">
                      <span>{inv.proofOfPayment?.transferDate || inv.createdAt}</span>
                      {inv.proofOfPayment && (
                        <span className="text-[10px] text-slate-400 block">
                          via {inv.proofOfPayment.senderBank}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {inv.proofOfPayment ? (
                        <button
                          id={`btn-view-proof-${inv.id}`}
                          onClick={() => setSelectedProofInvoice(inv)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-lg text-[11px] font-semibold border border-indigo-200 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Periksa Bukti</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Belum Upload</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {inv.status === 'verified' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> Paid / Verified
                        </span>
                      )}
                      {inv.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-full text-[10px]">
                          <Clock className="w-3 h-3" /> Menunggu Verifikasi
                        </span>
                      )}
                      {inv.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-rose-100 text-rose-800 font-bold rounded-full text-[10px]">
                          <AlertCircle className="w-3 h-3" /> Ditolak
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {inv.status === 'pending' && (
                          <>
                            <button
                              id={`btn-verify-${inv.id}`}
                              onClick={() => handleVerify(inv)}
                              title="Verifikasi Pembayaran & Aktifkan Paket Otomatis"
                              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1 shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>✓ Verifikasi</span>
                            </button>
                            <button
                              id={`btn-reject-${inv.id}`}
                              onClick={() => handleOpenReject(inv)}
                              title="Tolak Pembayaran"
                              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>✕ Tolak</span>
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setSelectedDigitalInvoice(inv)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                          title="Lihat Invoice Lengkap"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Review Bukti Transfer */}
      {selectedProofInvoice && selectedProofInvoice.proofOfPayment && (
        <div
          id="proof-review-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  Pemeriksaan Bukti Transfer
                </h4>
                <span className="text-xs text-slate-500">
                  Invoice #{selectedProofInvoice.id} • {selectedProofInvoice.companyName}
                </span>
              </div>
              <button
                onClick={() => setSelectedProofInvoice(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Nominal Tagihan:</span>
                <strong className="text-slate-900">
                  Rp{selectedProofInvoice.amount.toLocaleString('id-ID')}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Pengirim:</span>
                <strong className="text-slate-900">
                  {selectedProofInvoice.proofOfPayment.senderName}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bank Pengirim:</span>
                <strong className="text-slate-900">
                  {selectedProofInvoice.proofOfPayment.senderBank}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal Transfer:</span>
                <strong className="text-slate-900">
                  {selectedProofInvoice.proofOfPayment.transferDate}
                </strong>
              </div>
              {selectedProofInvoice.proofOfPayment.notes && (
                <div className="pt-1 text-[11px] text-slate-600 italic">
                  Catatan Pengirim: "{selectedProofInvoice.proofOfPayment.notes}"
                </div>
              )}
            </div>

            {/* Proof Image Preview */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-100 max-h-64 flex items-center justify-center">
              <img
                src={selectedProofInvoice.proofOfPayment.proofImageUrl}
                alt="Bukti Transfer"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Actions (Constraint 70) */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => handleOpenReject(selectedProofInvoice)}
                className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold rounded-xl transition-colors"
              >
                ✕ Tolak Pembayaran
              </button>
              <button
                onClick={() => handleVerify(selectedProofInvoice)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>✓ Verifikasi & Aktifkan Paket</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {isRejectModalOpen && invoiceToReject && (
        <div
          id="reject-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">
              Tolak Pembayaran Invoice #{invoiceToReject.id}
            </h4>
            <p className="text-xs text-slate-600">
              Tuliskan alasan penolakan agar perusahaan dapat mengunggah bukti transfer yang sesuai.
            </p>

            <textarea
              rows={3}
              value={rejectReasonPrompt}
              onChange={(e) => setRejectReasonPrompt(e.target.value)}
              placeholder="Contoh: Nominal transfer kurang, bukti struk blur, atau rekening pengirim tidak sesuai..."
              className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
              >
                Konfirmasi Tolak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Invoice Preview Modal */}
      {selectedDigitalInvoice && (
        <PaymentInvoiceModal
          invoice={selectedDigitalInvoice}
          onClose={() => setSelectedDigitalInvoice(null)}
        />
      )}
    </div>
  );
};
