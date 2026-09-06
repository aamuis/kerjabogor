import { BogorLocation, Company, Job, TalentAssessmentQuestion, CareerArticle, CompanyReview } from '../types';

export const BOGOR_LOCATIONS: BogorLocation[] = [
  // Kota Bogor
  { id: 'loc-kt-1', name: 'Bogor Tengah (Paledang & Sempur)', type: 'Kota Bogor', district: 'Bogor Tengah', latitude: -6.5971, longitude: 106.7949 },
  { id: 'loc-kt-2', name: 'Bogor Timur (Baranangsiang & Pajajaran)', type: 'Kota Bogor', district: 'Bogor Timur', latitude: -6.6085, longitude: 106.8123 },
  { id: 'loc-kt-3', name: 'Bogor Selatan (Batutulis & Empang)', type: 'Kota Bogor', district: 'Bogor Selatan', latitude: -6.6262, longitude: 106.8015 },
  { id: 'loc-kt-4', name: 'Bogor Barat (Menteng & Cilendek)', type: 'Kota Bogor', district: 'Bogor Barat', latitude: -6.5789, longitude: 106.7725 },
  { id: 'loc-kt-5', name: 'Bogor Utara (Bantarjati & Pandu Raya)', type: 'Kota Bogor', district: 'Bogor Utara', latitude: -6.5684, longitude: 106.8089 },
  { id: 'loc-kt-6', name: 'Tanah Sareal (Kebon Pedes & Kayumanis)', type: 'Kota Bogor', district: 'Tanah Sareal', latitude: -6.5562, longitude: 106.7865 },

  // Kabupaten Bogor
  { id: 'loc-kb-1', name: 'Cibinong (Pusat Pemkab & CCM)', type: 'Kabupaten Bogor', district: 'Cibinong', latitude: -6.4837, longitude: 106.8528 },
  { id: 'loc-kb-2', name: 'Babakan Madang (Sentul City & Stadion Pakansari)', type: 'Kabupaten Bogor', district: 'Babakan Madang', latitude: -6.5412, longitude: 106.8624 },
  { id: 'loc-kb-3', name: 'Gunung Putri (Kawasan Industri Wanaherang)', type: 'Kabupaten Bogor', district: 'Gunung Putri', latitude: -6.4489, longitude: 106.9082 },
  { id: 'loc-kb-4', name: 'Citeureup (Pabrik & Pergudangan Tarikolot)', type: 'Kabupaten Bogor', district: 'Citeureup', latitude: -6.4921, longitude: 106.8791 },
  { id: 'loc-kb-5', name: 'Cileungsi (Metland & Transyogi)', type: 'Kabupaten Bogor', district: 'Cileungsi', latitude: -6.4012, longitude: 106.9634 },
  { id: 'loc-kb-6', name: 'Dramaga (Kawasan Kampus IPB Dramaga)', type: 'Kabupaten Bogor', district: 'Dramaga', latitude: -6.5891, longitude: 106.7312 },
  { id: 'loc-kb-7', name: 'Bojonggede (Dekat Stasiun Bojonggede)', type: 'Kabupaten Bogor', district: 'Bojonggede', latitude: -6.4934, longitude: 106.7978 },
  { id: 'loc-kb-8', name: 'Sukaraja (Ciluar & Cijujung)', type: 'Kabupaten Bogor', district: 'Sukaraja', latitude: -6.5418, longitude: 106.8284 },
  { id: 'loc-kb-9', name: 'Ciawi (Pintu Tol Jagorawi & Gadog)', type: 'Kabupaten Bogor', district: 'Ciawi', latitude: -6.6573, longitude: 106.8542 },
  { id: 'loc-kb-10', name: 'Parung (Pasar Parung & Kemang)', type: 'Kabupaten Bogor', district: 'Parung', latitude: -6.4389, longitude: 106.7321 },
  { id: 'loc-kb-11', name: 'Cisarua (Puncak & Agrowisata)', type: 'Kabupaten Bogor', district: 'Cisarua', latitude: -6.6984, longitude: 106.9387 },
  { id: 'loc-kb-12', name: 'Leuwiliang (Bogor Barat Kabupaten)', type: 'Kabupaten Bogor', district: 'Leuwiliang', latitude: -6.5732, longitude: 106.6341 },
];

export const JOB_CATEGORIES = [
  { id: 'all', name: 'Semua Kategori', icon: 'Sparkles', count: 48 },
  { id: 'urgent', name: '⚡ Butuh Hari Ini', icon: 'Flame', count: 8 },
  { id: 'fresh', name: '🎓 Tanpa Pengalaman', icon: 'GraduationCap', count: 14 },
  { id: 'admin', name: 'Admin & Office', icon: 'FileSpreadsheet', count: 12 },
  { id: 'marketing', name: 'Marketing & Sales', icon: 'Megaphone', count: 15 },
  { id: 'customer-service', name: 'Customer Service', icon: 'Headset', count: 9 },
  { id: 'it', name: 'IT & Programmer', icon: 'Code', count: 7 },
  { id: 'desain', name: 'Desain Grafis & DKV', icon: 'Palette', count: 8 },
  { id: 'warehouse', name: 'Warehouse & Logistik', icon: 'Boxes', count: 11 },
  { id: 'driver', name: 'Driver & Kurir', icon: 'Truck', count: 10 },
  { id: 'restoran', name: 'Restoran & Cafe', icon: 'Utensils', count: 16 },
  { id: 'hotel', name: 'Hotel & Hospitality', icon: 'Building2', count: 6 },
  { id: 'pendidikan', name: 'Guru & Pendidikan', icon: 'BookOpen', count: 5 },
  { id: 'kesehatan', name: 'Kesehatan & Medis', icon: 'HeartPulse', count: 4 },
  { id: 'manufaktur', name: 'Pabrik & Operator', icon: 'Factory', count: 13 },
  { id: 'teknisi', name: 'Teknisi & Mekanik', icon: 'Wrench', count: 7 },
  { id: 'security', name: 'Security & Keamanan', icon: 'ShieldCheck', count: 5 },
  { id: 'cleaning', name: 'Cleaning Service', icon: 'Sparkle', count: 6 },
  { id: 'umkm', name: 'Toko & UMKM', icon: 'Store', count: 18 }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'PT Nutrifood Sentul Indonesia',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    industry: 'Manufaktur & FMCG',
    description: 'Produsen makanan dan minuman kesehatan terkemuka di Kawasan Industri Sentul, Babakan Madang, Bogor.',
    location: BOGOR_LOCATIONS[7], // Babakan Madang Sentul
    address: 'Kawasan Industri Sentul, Jl. Olympic Raya No. 9, Babakan Madang, Kab. Bogor',
    website: 'https://nutrifood.co.id',
    phone: '0251-8791000',
    email: 'recruitment@nutrifoodbogor.demo',
    isVerified: true,
    employeeCount: '500-1000 Karyawan',
    workplacePhotos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80'
    ],
    benefits: ['BPJS Lengkap', 'Makan Siang Katering', 'Bonus Kinerja', 'Gym Karyawan', 'Training & Sertifikasi'],
    rating: 4.8,
    reviewCount: 42
  },
  {
    id: 'comp-2',
    name: 'Kopi Nako & Warung Nako Pajajaran',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    industry: 'Food & Beverage / Cafe',
    description: 'Jaringan coffeeshop dan kuliner modern ikonik Bogor dengan konsep kaca nako estetis dan suasana hangat.',
    location: BOGOR_LOCATIONS[1], // Bogor Timur Pajajaran
    address: 'Jl. Pajajaran Indah V No. 7, Baranangsiang, Bogor Timur, Kota Bogor',
    website: 'https://kopinako.demo',
    phone: '0812-9988-1234',
    email: 'karir@kopinako.demo',
    isVerified: true,
    employeeCount: '100-250 Karyawan',
    workplacePhotos: [
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&auto=format&fit=crop&q=80'
    ],
    benefits: ['Tips Harian', 'Diskon Minuman & Makan', 'Jenjang Karir Barista', 'Jadwal Fleksibel'],
    rating: 4.7,
    reviewCount: 38
  },
  {
    id: 'comp-3',
    name: 'PT Kahatex Logistik Citeureup',
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&auto=format&fit=crop&q=80',
    industry: 'Logistik & Pergudangan',
    description: 'Pusat distribusi logistik dan pergudangan terpadu untuk wilayah Jabodetabek dan Jawa Barat.',
    location: BOGOR_LOCATIONS[9], // Citeureup
    address: 'Jl. Raya Mayor Oking Jaya Atmaja No. 88, Citeureup, Kab. Bogor',
    website: 'https://kahatexlogistik.demo',
    phone: '021-8761234',
    email: 'hrd.citeureup@kahatex.demo',
    isVerified: true,
    employeeCount: '250-500 Karyawan',
    workplacePhotos: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80'
    ],
    benefits: ['Uang Lembur Rutin', 'BPJS Ketenagakerjaan', 'Seragam & Safety Shoes', 'Mess Karyawan'],
    rating: 4.5,
    reviewCount: 19
  },
  {
    id: 'comp-4',
    name: 'Bogor Digital Creative Studio',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    industry: 'Teknologi & Digital Agency',
    description: 'Agensi digital, software house, dan rumah produksi konten kreatif untuk UMKM dan brand nasional di Bogor.',
    location: BOGOR_LOCATIONS[4], // Bogor Utara Pandu Raya
    address: 'Jl. Pandu Raya No. 45, Bantarjati, Bogor Utara, Kota Bogor',
    website: 'https://bogordigital.demo',
    phone: '0857-1122-3344',
    email: 'halo@bogordigital.demo',
    isVerified: true,
    employeeCount: '20-50 Karyawan',
    workplacePhotos: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80'
    ],
    benefits: ['Hybrid / Remote Friendly', 'MacBook Kerja', 'Snack & Kopi Gratis', 'Budget Kursus AI/Desain'],
    rating: 4.9,
    reviewCount: 15
  },
  {
    id: 'comp-5',
    name: 'Roti Unyil Venus Bakery Bogor',
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80',
    industry: 'Retail & Oleh-oleh Khas Bogor',
    description: 'Pusat oleh-oleh roti mini legendaris Kota Bogor dengan cabang tersebar di Pajajaran dan V-Point.',
    location: BOGOR_LOCATIONS[1], // Bogor Timur
    address: 'Ruko V-Point, Jl. Pajajaran No. 1, Baranangsiang, Kota Bogor',
    website: 'https://rotiunyilvenus.demo',
    phone: '0251-8364000',
    email: 'hrd@venusroti.demo',
    isVerified: true,
    employeeCount: '150-300 Karyawan',
    workplacePhotos: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
    ],
    benefits: ['Gaji Pokok + Insentif Penjualan', 'THR & Bonus Tahunan', 'Produk Roti Gratis'],
    rating: 4.6,
    reviewCount: 31
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Staff Admin Warehouse & Inventory',
    companyId: 'comp-3',
    companyName: 'PT Kahatex Logistik Citeureup',
    companyLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80',
    isVerifiedCompany: true,
    location: BOGOR_LOCATIONS[9], // Citeureup
    salaryMin: 4500000,
    salaryMax: 5500000,
    salaryPeriod: 'bulan',
    salaryDisclosed: true,
    jobType: 'Full Time',
    category: 'Admin & Office',
    education: 'SMA/SMK',
    experienceRequiredYears: 0,
    isFreshGraduateFriendly: true,
    isTrainingProvided: true,
    isUrgentHiring: false,
    openPositions: 3,
    description: 'Bertanggung jawab melakukan pencatatan barang masuk/keluar, stock opname harian, dan input data sistem warehouse menggunakan Microsoft Excel dan sistem barcode.',
    responsibilities: [
      'Mencatat surat jalan masuk dan keluar barang logistik',
      'Melakukan verifikasi jumlah fisik barang dengan sistem WMS',
      'Menyiapkan laporan inventory harian dan mingguan',
      'Berkoordinasi dengan tim picker dan driver armada'
    ],
    requirements: [
      'Lulusan SMA/SMK semua jurusan (Administrasi Perkantoran diutamakan)',
      'Teliti, disiplin, dan mampu mengoperasikan komputer (Excel dasar)',
      'Bersedia bekerja sistem shift (Pagi/Siang)',
      'Domisili Citeureup, Cibinong, Sukaraja, atau sekitarnya'
    ],
    benefits: ['Gaji Pokok UMK Bogor', 'BPJS Kesehatan & Ketenagakerjaan', 'Uang Lembur', 'Seragam Lengkap'],
    workingHours: 'Senin - Sabtu (Shift 8 Jam)',
    skillsRequired: ['Microsoft Excel', 'Administrasi', 'Stock Opname', 'Ketelitian'],
    screeningQuestions: [
      'Apakah Anda siap bekerja dengan sistem shift di Citeureup?',
      'Seberapa mahir Anda menggunakan Microsoft Excel (VLOOKUP, SUM)?'
    ],
    postedDate: '2026-08-20',
    deadline: '2026-09-15',
    status: 'active',
    recruitmentProcessDays: 3,
    tags: ['Loker Citeureup', 'SMA/SMK', 'Fresh Graduate', 'Admin Gudang']
  },
  {
    id: 'job-2',
    title: '⚡ 2 Waiter / Kasir Cafe (Mulai Besok)',
    companyId: 'comp-2',
    companyName: 'Kopi Nako & Warung Nako Pajajaran',
    companyLogo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=160&auto=format&fit=crop&q=80',
    isVerifiedCompany: true,
    location: BOGOR_LOCATIONS[1], // Bogor Timur Pajajaran
    salaryMin: 160000,
    salaryMax: 180000,
    salaryPeriod: 'hari',
    salaryDisclosed: true,
    jobType: 'Harian',
    category: 'Restoran & Cafe',
    education: 'SMA/SMK',
    experienceRequiredYears: 0,
    isFreshGraduateFriendly: true,
    isTrainingProvided: true,
    isUrgentHiring: true,
    urgentStartDate: 'Besok Pagi (09:00 WIB)',
    urgentDuration: 'Kontrak Harian / Proyek Weekend Event',
    openPositions: 2,
    description: 'Dibutuhkan segera 2 waiter/kasir ramah dan cekatan untuk melayani pelanggan Kopi Nako Pajajaran pada weekend rush dan event kuliner Bogor.',
    responsibilities: [
      'Menyambut tamu dan mencatat pesanan dengan ramah via POS Kasir',
      'Mengantarkan pesanan minuman & snack ke meja pengunjung',
      'Menjaga kebersihan area dining dan meja makan',
      'Membantu briefing singkat tim operasional harian'
    ],
    requirements: [
      'Pria/Wanita usia 18-27 tahun',
      'Ramah, komunikatif, berpenampilan rapi, dan energik',
      'Bisa langsung kerja mulai besok',
      'Punya kendaraan pribadi untuk ke lokasi Pajajaran'
    ],
    benefits: ['Gaji Harian Cair Tiap Sore', 'Makan Siang & Kopi Gratis', 'Tips Pelanggan'],
    workingHours: '09.00 - 18.00 WIB (8 Jam + Istirahat)',
    skillsRequired: ['Pelayanan Ramah', 'Komunikasi', 'Kasir POS', 'Cekatan'],
    screeningQuestions: [
      'Apakah Anda bisa hadir besok pagi pukul 08.45 WIB di Jl. Pajajaran?'
    ],
    postedDate: '2026-08-22',
    deadline: '2026-08-23',
    status: 'active',
    recruitmentProcessDays: 1,
    tags: ['Urgent Hiring', 'Gaji Harian', 'Cafe Bogor', 'Pajajaran']
  },
  {
    id: 'job-3',
    title: 'Digital Marketing & Content Creator TikTok',
    companyId: 'comp-4',
    companyName: 'Bogor Digital Creative Studio',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=160&auto=format&fit=crop&q=80',
    isVerifiedCompany: true,
    location: BOGOR_LOCATIONS[4], // Bogor Utara Pandu Raya
    salaryMin: 4800000,
    salaryMax: 6500000,
    salaryPeriod: 'bulan',
    salaryDisclosed: true,
    jobType: 'Full Time',
    category: 'Marketing & Sales',
    education: 'D3',
    experienceRequiredYears: 1,
    isFreshGraduateFriendly: true,
    isTrainingProvided: true,
    isUrgentHiring: false,
    openPositions: 1,
    description: 'Menciptakan konten video pendek viral untuk TikTok, Instagram Reels, dan mengelola strategi kampanye digital klien kuliner & properti di Bogor.',
    responsibilities: [
      'Membuat ide konsep, scripting, shooting, dan editing video CapCut/Premiere',
      'Menjadi talent/voiceover di beberapa konten video studio',
      'Menganalisis performa FYP, engagement, dan conversion campaign',
      'Riset tren terkini seputar kuliner dan lifestyle Bogor'
    ],
    requirements: [
      'Pendidikan D3/S1 atau SMA/SMK dengan portofolio video TikTok/IG aktif',
      'Percaya diri di depan kamera dan kreatif mengikuti audio tren',
      'Menguasai CapCut, Canva, dan dasar Meta Ads adalah nilai tambah',
      'Melampirkan link TikTok/Instagram/YouTube saat melamar'
    ],
    benefits: ['Gaji Pokok + Bonus Konten Viral', 'MacBook & Perlengkapan Lighting', 'Kerja Hybrid (3 hari kantor, 2 hari remote)', 'Kopi & Snack'],
    workingHours: 'Senin - Jumat 09.00 - 17.00 WIB',
    skillsRequired: ['Content Creation', 'CapCut', 'TikTok Ads', 'Copywriting', 'Public Speaking'],
    screeningQuestions: [
      'Tuliskan akun TikTok / Instagram yang pernah kamu kelola atau akun pribadimu!'
    ],
    postedDate: '2026-08-21',
    deadline: '2026-09-20',
    status: 'active',
    recruitmentProcessDays: 2,
    tags: ['Content Creator', 'TikTok', 'Creative Studio', 'Hybrid Bogor']
  },
  {
    id: 'job-4',
    title: 'Operator Produksi & Packaging (Fresh Grad Welcome)',
    companyId: 'comp-1',
    companyName: 'PT Nutrifood Sentul Indonesia',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=160&auto=format&fit=crop&q=80',
    isVerifiedCompany: true,
    location: BOGOR_LOCATIONS[7], // Babakan Madang Sentul
    salaryMin: 4900000,
    salaryMax: 5600000,
    salaryPeriod: 'bulan',
    salaryDisclosed: true,
    jobType: 'Full Time',
    category: 'Pabrik & Operator',
    education: 'SMA/SMK',
    experienceRequiredYears: 0,
    isFreshGraduateFriendly: true,
    isTrainingProvided: true,
    isUrgentHiring: false,
    openPositions: 8,
    description: 'Menjalankan mesin packaging otomatis, menjaga higienitas area proses produksi makanan sehat, dan melakukan quality check kemasan produk akhir.',
    responsibilities: [
      'Mengoperasikan mesin packing sesuai SOP Good Manufacturing Practice (GMP)',
      'Memeriksa tanggal kadaluarsa dan kerapian seal kemasan',
      'Menjaga sanitasi dan kebersihan ruang produksi',
      'Mengisi form checklist mesin harian'
    ],
    requirements: [
      'Pria/Wanita, lulusan SMA/SMK (Teknik Mesin, Otomotif, Listrik, Kimia, Tata Boga, dll)',
      'Sehat jasmani dan tidak buta warna',
      'Disiplin tinggi dan siap bekerja dalam tim shift',
      'Disediakan pelatihan awal intensif (Training 2 Minggu)'
    ],
    benefits: ['Gaji UMK Kab Bogor + Lembur', 'Katering Makan Siang Sehat', 'BPJS Kesehatan & Ketenagakerjaan', 'Fasilitas Olahraga & Klinik'],
    workingHours: '3 Shift (Rotasi Mingguan)',
    skillsRequired: ['GMP', 'Operasional Mesin', 'Kedisiplinan', 'Quality Control'],
    screeningQuestions: [
      'Apakah Anda tidak memiliki riwayat buta warna dan siap bekerja 3 shift?'
    ],
    postedDate: '2026-08-19',
    deadline: '2026-09-10',
    status: 'active',
    recruitmentProcessDays: 3,
    tags: ['Operator Pabrik', 'Sentul Bogor', 'Training Disediakan', 'UMK Bogor']
  },
  {
    id: 'job-5',
    title: 'Pramuniaga & Kasir Toko Oleh-oleh',
    companyId: 'comp-5',
    companyName: 'Roti Unyil Venus Bakery Bogor',
    companyLogo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&auto=format&fit=crop&q=80',
    isVerifiedCompany: true,
    location: BOGOR_LOCATIONS[1], // Bogor Timur
    salaryMin: 3800000,
    salaryMax: 4500000,
    salaryPeriod: 'bulan',
    salaryDisclosed: true,
    jobType: 'Full Time',
    category: 'Toko & UMKM',
    education: 'SMA/SMK',
    experienceRequiredYears: 0,
    isFreshGraduateFriendly: true,
    isTrainingProvided: true,
    isUrgentHiring: false,
    openPositions: 4,
    description: 'Melayani pembeli roti unyil dengan senyum, mengemas paket pesanan kotak oleh-oleh, dan mengoperasikan mesin kasir secara teliti.',
    responsibilities: [
      'Menyusun roti segar di etalase display toko',
      'Melayani pemilihan varian rasa dan mengemas box pesanan pembeli',
      'Melakukan transaksi pembayaran tunai/QRIS/kartu',
      'Membuat laporan closing kasir harian'
    ],
    requirements: [
      'Pria/Wanita minimal lulusan SMA/SMK sederajat',
      'Berpenampilan rapi, ramah, jujur, dan berorientasi pada pelayanan pelanggan',
      'Fresh graduate dipersilakan melamar (training langsung dibimbing senior)',
      'Domisili Kota Bogor (Baranangsiang, Pajajaran, Sukasari lebih disukai)'
    ],
    benefits: ['Gaji Pokok', 'Insentif Omset Harian', 'BPJS Ketenagakerjaan', 'Roti jatah mingguan'],
    workingHours: 'Shift Pagi (06.30 - 15.00) / Shift Siang (13.00 - 21.30)',
    skillsRequired: ['Pelayanan Konsumen', 'Kasir', 'Komunikasi', 'Kejujuran'],
    screeningQuestions: [
      'Apakah Anda bersedia ditempatkan di outlet Pajajaran / V-Point Kota Bogor?'
    ],
    postedDate: '2026-08-21',
    deadline: '2026-09-18',
    status: 'active',
    recruitmentProcessDays: 2,
    tags: ['Toko Roti', 'Kota Bogor', 'Kasir', 'Fresh Graduate']
  },
  {
    id: 'job-6',
    title: '⚡ Kurir Ekspedisi Paket Wilayah Cibinong (Butuh 3 Orang)',
    companyId: 'comp-3',
    companyName: 'PT Kahatex Logistik Citeureup',
    companyLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80',
    isVerifiedCompany: true,
    location: BOGOR_LOCATIONS[6], // Cibinong
    salaryMin: 180000,
    salaryMax: 240000,
    salaryPeriod: 'hari',
    salaryDisclosed: true,
    jobType: 'Harian',
    category: 'Driver & Kurir',
    education: 'Semua Pendidikan',
    experienceRequiredYears: 0,
    isFreshGraduateFriendly: true,
    isTrainingProvided: true,
    isUrgentHiring: true,
    urgentStartDate: 'Lusa (Langsung Jalan)',
    urgentDuration: 'Mitra Kurir Harian / Bulanan',
    openPositions: 3,
    description: 'Mengantarkan paket e-commerce ke alamat penerima di sekitar Cibinong, Pakansari, Sukaraja, dan Bojonggede.',
    responsibilities: [
      'Mengambil paket dari drop point hub Cibinong',
      'Mengantar paket sesuai rute aplikasi maps dengan aman',
      'Konfirmasi serah terima paket foto bukti pengantaran'
    ],
    requirements: [
      'Pria/Wanita memiliki motor pribadi & SIM C aktif',
      'Memiliki smartphone Android untuk aplikasi kurir',
      'Hafal jalanan dan gang di area Cibinong & sekitarnya',
      'Jujur, gesit, dan bertanggung jawab'
    ],
    benefits: ['Upah Per Paket + Uang Bensin Harian', 'Insentif Target Harian', 'Langsung Diterima jika Berkas Lengkap'],
    workingHours: '08.00 WIB sampai pengantaran rute selesai',
    skillsRequired: ['Mengemudi Motor', 'Navigasi Maps', 'Komunikasi'],
    screeningQuestions: [
      'Apakah motor Anda memiliki pajak aktif dan Anda memiliki SIM C yang masih berlaku?'
    ],
    postedDate: '2026-08-22',
    deadline: '2026-08-24',
    status: 'active',
    recruitmentProcessDays: 1,
    tags: ['Kurir Motor', 'Cibinong', 'Gaji Harian', 'Urgent Hiring']
  },
  {
    id: 'job-7',
    title: 'Junior Web Developer (React / Next.js & Tailwind)',
    companyId: 'comp-4',
    companyName: 'Bogor Digital Creative Studio',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=160&auto=format&fit=crop&q=80',
    isVerifiedCompany: true,
    location: BOGOR_LOCATIONS[4], // Bogor Utara Pandu Raya
    salaryMin: 5500000,
    salaryMax: 7500000,
    salaryPeriod: 'bulan',
    salaryDisclosed: true,
    jobType: 'Full Time',
    category: 'IT & Programmer',
    education: 'D3',
    experienceRequiredYears: 1,
    isFreshGraduateFriendly: true,
    isTrainingProvided: true,
    isUrgentHiring: false,
    openPositions: 2,
    description: 'Membangun aplikasi web dan landing page interaktif untuk klien lokal Bogor menggunakan React/TypeScript dan Tailwind CSS.',
    responsibilities: [
      'Slicing UI desain Figma ke komponen React & Tailwind secara pixel-perfect',
      'Mengintegrasikan API REST / Firebase / GraphQL',
      'Melakukan optimasi performa web dan responsivitas mobile'
    ],
    requirements: [
      'Memahami JavaScript/TypeScript, React/Next.js, dan Tailwind CSS',
      'Memiliki portofolio proyek web yang bisa diakses online atau GitHub',
      'Fresh graduate lulusan IT/Ilmu Komputer dengan portofolio dipersilakan melamar'
    ],
    benefits: ['Kerja Hybrid (Bogor)', 'Fasilitas Laptop / Monitor External', 'Tunjangan Kuota & Kopi', 'Budget Sertifikasi'],
    workingHours: 'Senin - Jumat 09.00 - 18.00 WIB',
    skillsRequired: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Git'],
    screeningQuestions: [
      'Lampirkan link GitHub atau portfolio web yang pernah kamu buat!'
    ],
    postedDate: '2026-08-20',
    deadline: '2026-09-25',
    status: 'active',
    recruitmentProcessDays: 2,
    tags: ['Web Developer', 'React', 'IT Bogor', 'Hybrid']
  },
  {
    id: 'job-8',
    title: 'Customer Service & Telemarketing Ramah',
    companyId: 'comp-1',
    companyName: 'PT Nutrifood Sentul Indonesia',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=160&auto=format&fit=crop&q=80',
    isVerifiedCompany: true,
    location: BOGOR_LOCATIONS[7], // Sentul
    salaryMin: 4600000,
    salaryMax: 5400000,
    salaryPeriod: 'bulan',
    salaryDisclosed: true,
    jobType: 'Full Time',
    category: 'Customer Service',
    education: 'SMA/SMK',
    experienceRequiredYears: 0,
    isFreshGraduateFriendly: true,
    isTrainingProvided: true,
    isUrgentHiring: false,
    openPositions: 3,
    description: 'Menjawab pertanyaan konsumen seputar produk nutrisi, menangani pesan WhatsApp official, dan memberikan solusi informatif dengan nada bicara santun.',
    responsibilities: [
      'Membalas chat WhatsApp Customer Care & DM Instagram dengan template terstandar',
      'Mencatat kendala pesanan di dashboard CRM',
      'Melakukan follow up kepuasan pelanggan secara berkala'
    ],
    requirements: [
      'Pria/Wanita minimal lulusan SMA/SMK sederajat',
      'Memiliki tutur kata sopan, artikulasi jelas, dan empati tinggi',
      'Cepat mengetik di komputer dan smartphone',
      'Fresh graduate dipersilakan melamar (ada pelatihan komunikasi CS)'
    ],
    benefits: ['Gaji Pokok UMK + Bonus CS Excellent', 'BPJS Lengkap', 'Makan Siang Katering', 'Suasana Kantor Nyaman AC'],
    workingHours: 'Senin - Jumat (08.30 - 17.30 WIB)',
    skillsRequired: ['Komunikasi Efektif', 'Customer Service', 'WhatsApp Business', 'CRM'],
    screeningQuestions: [
      'Bagaimana cara Anda menanggapi pelanggan yang sedang komplain barang terlambat tiba?'
    ],
    postedDate: '2026-08-21',
    deadline: '2026-09-15',
    status: 'active',
    recruitmentProcessDays: 2,
    tags: ['Customer Service', 'Sentul', 'Fresh Graduate', 'Kantor AC']
  }
];

export const TALENT_ASSESSMENT_QUESTIONS: TalentAssessmentQuestion[] = [
  {
    id: 1,
    question: 'Aktivitas apa yang paling membuatmu bersemangat dan nyaman saat bekerja?',
    options: [
      { label: 'Mengobrol, meyakinkan orang lain, dan menjalin relasi baru', trait: 'Komunikasi', score: 3 },
      { label: 'Membuat desain, video, foto, atau menulis cerita kreatif', trait: 'Kreatif', score: 3 },
      { label: 'Mengatur data, menyusun tabel excel, dan mencatat keuangan rapi', trait: 'Administrasi & Angka', score: 3 },
      { label: 'Bekerja aktif bergerak, mengecek barang di gudang, atau mengemudi', trait: 'Logistik & Fisik', score: 3 }
    ]
  },
  {
    id: 2,
    question: 'Ketika menghadapi masalah baru, bagaimana caramu menyelesaikannya?',
    options: [
      { label: 'Menganalisis logika dan mencari solusi teknis/kode/tutorial', trait: 'Teknis & IT', score: 3 },
      { label: 'Mendengarkan keluhan orang dan mencari jalan tengah yang memuaskan', trait: 'Pelayanan & Hospitality', score: 3 },
      { label: 'Membuat konsep visual atau sudut pandang yang unik dan berbeda', trait: 'Kreatif', score: 3 },
      { label: 'Mengecek dokumen, aturan SOP, dan memastikan semua langkah sesuai prosedur', trait: 'Administrasi & Angka', score: 3 }
    ]
  },
  {
    id: 3,
    question: 'Lingkungan kerja seperti apa yang paling kamu sukai di wilayah Bogor?',
    options: [
      { label: 'Cafe atau resto yang ramai bertemu banyak orang dan pengunjung', trait: 'Pelayanan & Hospitality', score: 3 },
      { label: 'Kantor digital modern yang fleksibel dengan laptop dan koneksi internet cepat', trait: 'Teknis & IT', score: 3 },
      { label: 'Pusat logistik / lapangan / industri dengan ritme kerja dinamis', trait: 'Logistik & Fisik', score: 3 },
      { label: 'Ruang kerja tenang untuk fokus administrasi dan berkas kantor', trait: 'Administrasi & Angka', score: 3 }
    ]
  },
  {
    id: 4,
    question: 'Jika kamu diminta memimpin proyek kecil, tugas apa yang ingin kamu pegang?',
    options: [
      { label: 'Presentasi, mencari sponsor, dan mengajak partner baru bergabung', trait: 'Komunikasi', score: 3 },
      { label: 'Mengatur jadwal waktu, budgeting anggaran, dan checklist tugas', trait: 'Administrasi & Angka', score: 3 },
      { label: 'Merancang branding poster, logo, dan video promosi sosmed', trait: 'Kreatif', score: 3 },
      { label: 'Mengatur pengiriman logistik alat, sound system, dan operasional lapangan', trait: 'Logistik & Fisik', score: 3 }
    ]
  },
  {
    id: 5,
    question: 'Keahlian apa yang saat ini paling ingin kamu asah lebih dalam?',
    options: [
      { label: 'Teknik negosiasi penjualan dan public speaking di depan umum', trait: 'Komunikasi', score: 3 },
      { label: 'Programming web/mobile, analitik data, dan AI tools', trait: 'Teknis & IT', score: 3 },
      { label: 'Video editing profesional, animasi, dan storytelling visual', trait: 'Kreatif', score: 3 },
      { label: 'Hospitality kelas hotel/resto dan seni membuat kopi barista', trait: 'Pelayanan & Hospitality', score: 3 }
    ]
  }
];

export const CAREER_ARTICLES: CareerArticle[] = [
  {
    id: 'art-1',
    title: 'Panduan Lolos Kerja di Bogor untuk Lulusan SMA/SMK 2026',
    category: 'Fresh Graduate',
    excerpt: 'Simak tips menyusun CV tanpa pengalaman, cara menjawab interview perusahaan Sentul & Citeureup, serta sertifikat gratis yang dicari HRD.',
    content: 'Bagi kamu lulusan baru SMA atau SMK di Kota dan Kabupaten Bogor, jangan berkecil hati jika belum punya pengalaman kerja formal. Perusahaan di Bogor seperti retail, logistik, dan F&B sangat mengutamakan sikap jujur, disiplin waktu, dan kemauan belajar...',
    author: 'Tim Karir Kerja Bogor',
    readTime: '3 Menit Baca',
    publishedAt: '21 Agustus 2026',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=80',
    tags: ['SMA/SMK', 'Tips Interview', 'Bogor Karir']
  },
  {
    id: 'art-2',
    title: 'Daftar 7 Skill yang Paling Banyak Dicari Perusahaan di Bogor Saat Ini',
    category: 'Skill In-Demand',
    excerpt: 'Berdasarkan data lowongan Kerja Bogor, inilah keahlian praktis yang membuat gajimu melesat di kawasan industri & UMKM Bogor.',
    content: 'Dari sektor pergudangan Citeureup hingga cafe modern di Pajajaran, skill komunikasi, Excel inventaris, content creation TikTok, serta pelayanan ramah kasir menempati posisi teratas kebutuhan rekrutmen...',
    author: 'Riset Pasar Kerja Bogor',
    readTime: '4 Menit Baca',
    publishedAt: '19 Agustus 2026',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    tags: ['Gaji UMK', 'Skill Populer', 'Sentul Industri']
  },
  {
    id: 'art-3',
    title: 'Cara Bikin Video Perkenalan 60 Detik yang Bikin HRD Langsung Kepincut',
    category: 'Tips Interview',
    excerpt: 'Manfaatkan fitur Video Perkenalan YouTube/TikTok di profil Kerja Bogor agar lamaranmu 3x lebih cepat dipanggil interview.',
    content: 'HRD menghargai pelamar yang percaya diri dan berinisiatif. Rekam dirimu dengan pencahayaan terang, pakaian sopan, dan perkenalkan nama, domisili kecamatan Bogor, serta antusiasmemu dalam bekerja...',
    author: 'Konsultan HRD Bogor',
    readTime: '3 Menit Baca',
    publishedAt: '18 Agustus 2026',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    tags: ['Video Perkenalan', 'TikTok HRD', 'CV Kreatif']
  }
];

export const INITIAL_COMPANY_REVIEWS: CompanyReview[] = [
  {
    id: 'rev-1',
    companyId: 'comp-1',
    companyName: 'PT Nutrifood Sentul Indonesia',
    reviewerName: 'Rian S. (Ex-Operator)',
    rating: 5,
    categories: {
      workEnvironment: 5,
      communication: 5,
      recruitmentProcess: 5,
      professionalism: 5
    },
    reviewText: 'Lingkungan kerja sangat positif dan higienis. Fasilitas kantin katering sehat dan makan gratis sangat membantu karyawan. Pembayaran gaji selalu tepat waktu.',
    createdAt: '15 Agustus 2026',
    isModerated: true
  },
  {
    id: 'rev-2',
    companyId: 'comp-2',
    companyName: 'Kopi Nako & Warung Nako Pajajaran',
    reviewerName: 'Dimas A. (Barista)',
    rating: 5,
    categories: {
      workEnvironment: 5,
      communication: 4,
      recruitmentProcess: 5,
      professionalism: 5
    },
    reviewText: 'Timnya asik dan kekeluargaan banget. Sangat cocok buat anak muda Bogor yang mau belajar hospitality dan kopi. Jadwal fleksibel dan tips harian lancar.',
    createdAt: '12 Agustus 2026',
    isModerated: true
  }
];

// -------------------------------------------------------------
// DEFAULT MONETIZATION DATA (Constraints 63 - 84)
// -------------------------------------------------------------

export const DEFAULT_EMPLOYER_PACKAGES = [
  {
    id: 'free',
    name: 'FREE',
    price: 0,
    periodLabel: 'Selamanya',
    description: 'Cocok untuk UMKM atau usaha mikro yang baru memulai rekrutmen pertama di Bogor.',
    features: [
      '1 lowongan aktif',
      'Menerima lamaran masuk',
      'Profil perusahaan dasar',
      'Dashboard rekrutmen dasar',
      'Melihat profil kandidat'
    ],
    ctaText: 'Mulai Gratis',
    durationDays: 365,
    perJob: false
  },
  {
    id: 'boost',
    name: 'BOOST',
    badge: '🚀 Popular Single',
    price: 49000,
    periodLabel: 'per lowongan (14 hari)',
    description: 'Tingkatkan jangkauan pelamar hingga 3x lipat dengan posisi prioritas.',
    features: [
      'Semua fitur Free',
      'Lowongan diprioritaskan dalam pencarian',
      'Badge khusus "Boosted" warna cerah',
      'Masa promosi aktif 14 hari',
      'Statistik view & klik pelamar'
    ],
    ctaText: 'Boost Lowongan',
    durationDays: 14,
    perJob: true
  },
  {
    id: 'featured',
    name: 'FEATURED',
    badge: '⭐ Paling Populer',
    price: 99000,
    periodLabel: 'per lowongan (30 hari)',
    description: 'Tampil di banner teratas dan carousel Rekomendasi Unggulan pencari kerja.',
    features: [
      'Semua fitur Boost',
      'Tampil di bagian "Featured Jobs" teratas',
      'Posisi paling tinggi dalam listing pencarian',
      'Badge Emas "Featured"',
      'Promosi sorotan 30 hari penuh',
      'Distribusi notifikasi matching ke pelamar'
    ],
    ctaText: 'Jadikan Featured',
    highlight: true,
    durationDays: 30,
    perJob: true
  },
  {
    id: 'urgent',
    name: 'URGENT HIRING',
    badge: '⚡ Butuh Hari Ini',
    price: 149000,
    periodLabel: 'per lowongan (7 hari kilat)',
    description: 'Dapatkan kandidat siap kerja dalam waktu 24 jam dengan highlight khusus.',
    features: [
      'Semua fitur Featured',
      'Badge Menyala "⚡ Butuh Orang Hari Ini"',
      'Prioritas paling atas pada pencari kerja terdekat',
      'Rekomendasi instan ke kandidat siap kerja',
      'Broadcast notifikasi push ke pengguna radius terdekat',
      'Highlight khusus border merah'
    ],
    ctaText: 'Aktifkan Urgent Hiring',
    durationDays: 7,
    perJob: true
  },
  {
    id: 'pro',
    name: 'EMPLOYER PRO',
    badge: '👑 Best Value',
    price: 299000,
    periodLabel: 'per bulan (30 hari)',
    description: 'Solusi lengkap bagi bisnis & restoran/cafe yang aktif merekrut setiap bulan.',
    features: [
      '5 lowongan aktif sekaligus',
      'Akses database pelamar tanpa batas',
      'Filter kandidat multi-kriteria',
      'AI Job Matching score otomatis',
      'Fitur Direct Chat dengan kandidat',
      'Interview Management & Auto Invite',
      'Statistik rekrutmen mendalam',
      'Profil perusahaan bercentang biru (Verified)',
      'Featured Company spotlight',
      'Dashboard HRD lengkap & unduh rekap data'
    ],
    ctaText: 'Berlangganan Pro',
    highlight: true,
    durationDays: 30,
    perJob: false
  },
  {
    id: 'business',
    name: 'BUSINESS',
    badge: '🏢 Solusi Korporasi',
    price: 599000,
    periodLabel: 'per bulan (30 hari)',
    description: 'Dirancang untuk pabrik, retail chain, supermarket, dan perusahaan berkembang pesat.',
    features: [
      'Semua fitur Employer Pro',
      '15 lowongan aktif sekaligus',
      'AI Candidate Auto-Shortlisting',
      'Advanced recruitment dashboard',
      'Advanced analytics & visual export',
      'Dedicated Customer Support Prioritas',
      'Employer branding banner di Home',
      'Multiple user HR team access (3 login)'
    ],
    ctaText: 'Pilih Business',
    durationDays: 30,
    perJob: false
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    badge: '🏭 Skala Besar',
    price: 1500000,
    periodLabel: 'Custom / Tahun',
    description: 'Untuk pabrik manufaktur besar, grup holding, jaringan hotel bintang, & rumah sakit di Bogor.',
    features: [
      'Lowongan aktif tak terbatas',
      'Integrasi HRIS / ATS eksternal',
      'Dedicated Account Manager khusus wilayah Bogor',
      'Custom branding & Video advertorial',
      'Assisted On-site Mass Recruitment',
      'SLA Rekrutmen terjamin'
    ],
    ctaText: 'Hubungi Sales Enterprise',
    durationDays: 365,
    perJob: false
  }
];

export const DEFAULT_RECRUITMENT_SERVICES = [
  {
    id: 'rec-basic',
    name: 'Recruitment Basic',
    minPrice: 1000000,
    description: 'Kerja Bogor membantu publikasi masif, screening berkas, dan menyajikan 10 kandidat terkurasi siap interview.',
    features: [
      'Publikasi lowongan prioritas multi-channel',
      'Pre-screening & validasi identitas berkas',
      '10 kandidat top fit dalam 5 hari',
      'Garansi penggantian kandidat 14 hari',
      'Laporan evaluasi komprehensif'
    ],
    durationLabel: '5-7 Hari Kerja'
  },
  {
    id: 'rec-pro',
    name: 'Recruitment Professional',
    minPrice: 3000000,
    description: 'Layanan end-to-end dengan dedicated HR recruiter Kerja Bogor untuk posisi staf ahli, supervisor, & manajerial.',
    features: [
      'Dedicated HR Consultant berlisensi',
      'Talent mapping spesifik wilayah Jabodetabek/Bogor',
      'Pre-interview wawancara awal oleh tim HR Kerja Bogor',
      'Tes bakat & psikotes kepribadian singkat',
      '20 kandidat terbaik siap final user interview',
      'Garansi penggantian kandidat 30 hari penuh'
    ],
    durationLabel: '7-14 Hari Kerja'
  },
  {
    id: 'rec-corp',
    name: 'Recruitment Corporate & Mass Hiring',
    minPrice: 7500000,
    description: 'Layanan rekrutmen massal untuk pembukaan pabrik baru, cabang resto, atau ekspansi retail ratusan tenaga kerja.',
    features: [
      'Fasilitasi Walk-in Interview masal di Bogor',
      'Medical Check-Up (MCU) coordination',
      'Psikotes & Skill assessment on-site',
      'Onboarding kit & administrasi kontrak awal',
      'Kapasitas hingga 100+ kandidat per batch',
      'SLA penempatan waktu ketat'
    ],
    durationLabel: 'Sesuai Kebutuhan'
  }
];

export const DEFAULT_PAYMENT_SETTINGS = {
  bankName: 'Bank Syariah Indonesia (BSI)',
  accountHolder: 'ABDUL MUIS',
  accountNumber: '7113396371',
  paymentInstructions: 'Silakan transfer tepat sesuai nominal invoice ke rekening resmi Kerja Bogor. Simpan bukti transfer (struk/screenshot m-banking) lalu unggah pada form pembayaran di aplikasi untuk verifikasi instan oleh tim admin.',
  supportContact: '0857-1234-5678 (WhatsApp CS Kerja Bogor)',
  currency: 'IDR',
  invoicePrefix: 'KB',
  packages: DEFAULT_EMPLOYER_PACKAGES,
  recruitmentServices: DEFAULT_RECRUITMENT_SERVICES
};

export const INITIAL_INVOICES = [
  {
    id: 'KB-202608-0001',
    companyId: 'comp-1',
    companyName: 'PT Nutrifood Sentul Indonesia',
    companyEmail: 'hrd@nutrifood.co.id',
    companyPhone: '0251-8791000',
    packageId: 'pro',
    packageName: 'EMPLOYER PRO (30 Hari)',
    amount: 299000,
    periodDays: 30,
    createdAt: '15 Agustus 2026',
    dueDate: '16 Agustus 2026',
    status: 'verified' as const,
    paymentMethod: 'Transfer Bank (BSI)',
    bankDetails: {
      bankName: 'Bank Syariah Indonesia (BSI)',
      accountHolder: 'ABDUL MUIS',
      accountNumber: '7113396371'
    },
    proofOfPayment: {
      transferDate: '15 Agustus 2026',
      senderBank: 'BSI Mobile',
      senderName: 'PT NUTRIFOOD SENTUL INDONESIA',
      senderAccount: '9921827162',
      nominal: 299000,
      proofImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
      notes: 'Pembayaran langganan Employer Pro periode Agustus - September 2026',
      uploadedAt: '15 Agustus 2026 10:15 WIB'
    },
    verifiedAt: '15 Agustus 2026 10:45 WIB',
    verifiedBy: 'Admin Utama Kerja Bogor',
    notes: 'Paket Employer Pro aktif hingga 15 September 2026'
  },
  {
    id: 'KB-202608-0002',
    companyId: 'comp-1',
    companyName: 'PT Nutrifood Sentul Indonesia',
    companyEmail: 'hrd@nutrifood.co.id',
    companyPhone: '0251-8791000',
    packageId: 'featured',
    packageName: 'FEATURED JOB (30 Hari)',
    targetJobId: 'job-1',
    targetJobTitle: 'Operator Produksi Makanan & Minuman',
    amount: 99000,
    periodDays: 30,
    createdAt: '18 Agustus 2026',
    dueDate: '19 Agustus 2026',
    status: 'verified' as const,
    paymentMethod: 'Transfer Bank (BSI)',
    bankDetails: {
      bankName: 'Bank Syariah Indonesia (BSI)',
      accountHolder: 'ABDUL MUIS',
      accountNumber: '7113396371'
    },
    proofOfPayment: {
      transferDate: '18 Agustus 2026',
      senderBank: 'BCA Transfer',
      senderName: 'FINANCE NUTRIFOOD SENTUL',
      nominal: 99000,
      proofImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
      uploadedAt: '18 Agustus 2026 14:20 WIB'
    },
    verifiedAt: '18 Agustus 2026 14:35 WIB',
    verifiedBy: 'Admin Utama Kerja Bogor'
  },
  {
    id: 'KB-202608-0003',
    companyId: 'comp-2',
    companyName: 'Kopi Nako & Warung Nako Pajajaran',
    companyEmail: 'recruitment@kopinako.com',
    companyPhone: '0812-9988-7766',
    packageId: 'urgent',
    packageName: 'URGENT HIRING (7 Hari)',
    targetJobId: 'job-2',
    targetJobTitle: 'Barista & Staff Kasir Kopi Nako',
    amount: 149000,
    periodDays: 7,
    createdAt: '22 Agustus 2026',
    dueDate: '23 Agustus 2026',
    status: 'pending' as const,
    paymentMethod: 'Transfer Bank (BSI)',
    bankDetails: {
      bankName: 'Bank Syariah Indonesia (BSI)',
      accountHolder: 'ABDUL MUIS',
      accountNumber: '7113396371'
    },
    proofOfPayment: {
      transferDate: '22 Agustus 2026',
      senderBank: 'Mandiri Livin',
      senderName: 'PT KOPI NAKO BOGOR',
      nominal: 149000,
      proofImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
      notes: 'Mohon segera diaktifkan badge Butuh Hari Ini karena kami butuh barista pengganti segera.',
      uploadedAt: '22 Agustus 2026 11:30 WIB'
    },
    notes: 'Menunggu verifikasi admin'
  }
];

export const INITIAL_COMPANY_SUBSCRIPTION = {
  id: 'sub-comp-1',
  companyId: 'comp-1',
  packageId: 'pro' as const,
  packageName: 'EMPLOYER PRO',
  status: 'active' as const,
  startDate: '15 Agustus 2026',
  endDate: '15 September 2026',
  daysRemaining: 24,
  activeJobSlots: 5,
  isFeaturedCompany: true,
  hasAiMatching: true,
  hasCandidateDirectChat: true,
  hasInterviewScheduler: true,
  lastInvoiceId: 'KB-202608-0001'
};

export const DEFAULT_SITE_CONFIG = {
  brandName: 'KERJA BOGOR',
  brandTagline: 'Kerja Dekat, Rezeki Hebat.',
  logoUrl: '',
  logoType: 'text' as const,
  primaryColor: '#059669', // Emerald 600
  primaryColorHover: '#047857', // Emerald 700
  secondaryColor: '#0f766e', // Teal 700
  accentColor: '#10b981', // Emerald 500
  titleColor: '#0f172a', // Slate 900
  themePreset: 'emerald' as const,
  heroTitle: 'Cari Kerja Dekat Rumah di Wilayah Bogor',
  heroSubtitle: 'Temukan ratusan lowongan kerja UMKM, pabrik, cafe, retail, & kantor di Kota dan Kabupaten Bogor.',
  footerText: '© 2026 Kerja Bogor — Platform Ketenagakerjaan & Rekrutmen Lokal Bogor. Dibuat dengan bangga untuk warga Bogor.',
  contactWhatsapp: '0857-1234-5678',
  announcement: {
    enabled: true,
    text: '⚡ Loker Baru Hari Ini: 8 Perusahaan di Sentul & Citeureup sedang aktif merekrut!'
  },
  adminSecretPin: 'bogor2026'
};

