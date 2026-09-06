import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BOGOR_LOCATIONS } from '../../data/bogorData';
import { MapPin, Navigation, Check, ChevronRight, X } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { userLocation, setUserLocation, requestGpsLocation, isGpsActive, radiusKm, setRadiusKm } = useApp();
  const [selectedType, setSelectedType] = useState<'Semua' | 'Kota Bogor' | 'Kabupaten Bogor'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredLocations = BOGOR_LOCATIONS.filter((loc) => {
    const matchesType = selectedType === 'Semua' || loc.type === selectedType;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const radiusOptions = [1, 3, 5, 10, 15];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[430px] max-h-[88vh] bg-white rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-5 h-5 text-emerald-600" />
              Pilih Lokasi Kamu di Bogor
            </h3>
            <p className="text-xs text-slate-500">Agar kami bisa mencari lowongan terdekat dari rumahmu</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Button */}
        <div className="p-4 bg-emerald-50/70 border-b border-emerald-100">
          <button
            onClick={async () => {
              await requestGpsLocation();
              onClose();
            }}
            className="w-full flex items-center justify-between p-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl shadow-xs transition text-sm font-semibold"
          >
            <span className="flex items-center gap-2">
              <Navigation className="w-4 h-4 animate-pulse" />
              Gunakan Lokasi GPS Saat Ini
            </span>
            {isGpsActive ? (
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-emerald-50">Aktif</span>
            ) : (
              <ChevronRight className="w-4 h-4 text-emerald-100" />
            )}
          </button>

          {/* Radius Selector */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Radius Jarak Maksimal:</span>
              <span className="text-emerald-700 font-bold">{radiusKm} KM dari rumah</span>
            </div>
            <div className="flex gap-1.5">
              {radiusOptions.map((r) => (
                <button
                  key={r}
                  onClick={() => setRadiusKm(r)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                    radiusKm === r
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-emerald-200 hover:bg-emerald-100/50'
                  }`}
                >
                  {r} KM
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Area Tabs */}
        <div className="px-4 pt-3 pb-2 flex gap-1.5">
          {(['Semua', 'Kota Bogor', 'Kabupaten Bogor'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition ${
                selectedType === type
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="px-4 py-2">
          <input
            type="text"
            placeholder="Cari nama kecamatan (cth: Cibinong, Pajajaran, Dramaga)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
        </div>

        {/* Location List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-72 custom-scrollbar">
          {filteredLocations.map((loc) => {
            const isSelected = userLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => {
                  setUserLocation(loc);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900'
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div>
                  <div className="font-semibold text-xs text-slate-900 flex items-center gap-1.5">
                    {loc.district}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      loc.type === 'Kota Bogor' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {loc.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{loc.name}</div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
