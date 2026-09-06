import { VideoIntroLink, Job, JobSeekerProfile } from '../types';

/**
 * Calculates the great-circle distance between two points on the Earth (Haversine formula) in kilometers.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10; // 1 decimal place
}

/**
 * Estimates commute time in minutes based on distance and transport mode
 */
export function estimateCommute(distanceKm: number) {
  return {
    walk: {
      timeMinutes: Math.round((distanceKm / 4.5) * 60),
      label: 'Jalan Kaki',
      icon: 'Footprints',
      speed: '4.5 km/j'
    },
    motor: {
      timeMinutes: Math.max(3, Math.round((distanceKm / 32) * 60) + 2),
      label: 'Motor',
      icon: 'Bike',
      speed: '32 km/j'
    },
    car: {
      timeMinutes: Math.max(5, Math.round((distanceKm / 22) * 60) + 5),
      label: 'Mobil / Angkot',
      icon: 'Car',
      speed: '22 km/j'
    },
    transit: {
      timeMinutes: Math.max(8, Math.round((distanceKm / 25) * 60) + 8),
      label: 'KRL / Biskita',
      icon: 'Train',
      speed: '25 km/j'
    }
  };
}

/**
 * Parses and validates YouTube, TikTok, and Instagram URLs to produce valid embed structures
 */
export function parseSocialVideoUrl(url: string, title?: string): VideoIntroLink | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  // 1. YouTube validation
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      id: `yt_${videoId}_${Date.now()}`,
      title: title || 'Video Perkenalan YouTube',
      platform: 'youtube',
      url: trimmed,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`,
      description: 'Video perkenalan dan portofolio resmi pelamar di YouTube.'
    };
  }

  // 2. TikTok validation
  const ttMatch = trimmed.match(
    /(?:tiktok\.com\/@[\w.-]+\/video\/(\d+)|vm\.tiktok\.com\/(\w+)|vt\.tiktok\.com\/(\w+))/i
  );
  if (ttMatch) {
    const videoId = ttMatch[1] || ttMatch[2] || ttMatch[3] || 'tiktok-video';
    return {
      id: `tt_${videoId}_${Date.now()}`,
      title: title || 'Video Portofolio TikTok',
      platform: 'tiktok',
      url: trimmed,
      embedUrl: `https://www.tiktok.com/embed/v2/${videoId}`,
      description: 'Klip perkenalan dan karya praktis pelamar di TikTok.'
    };
  }

  // 3. Instagram validation
  const igMatch = trimmed.match(/instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/i);
  if (igMatch && igMatch[1]) {
    const igId = igMatch[1];
    return {
      id: `ig_${igId}_${Date.now()}`,
      title: title || 'Video Aktivitas Instagram',
      platform: 'instagram',
      url: trimmed,
      embedUrl: `https://www.instagram.com/p/${igId}/embed/captioned/`,
      description: 'Aktivitas profesional dan video perkenalan pelamar di Instagram.'
    };
  }

  return null;
}

/**
 * Calculates AI Match Score and rationale between seeker and job
 */
export function calculateJobMatch(job: Job, seeker: JobSeekerProfile): {
  score: number;
  badge: string;
  reasons: string[];
  missingSkills: string[];
} {
  let score = 50;
  const reasons: string[] = [];
  const missingSkills: string[] = [];

  // 1. Skill Match
  const seekerSkillsLower = seeker.skills.map((s) => s.toLowerCase());
  const matchingSkills = job.skillsRequired.filter((s) =>
    seekerSkillsLower.includes(s.toLowerCase())
  );
  const unmatchingSkills = job.skillsRequired.filter(
    (s) => !seekerSkillsLower.includes(s.toLowerCase())
  );

  missingSkills.push(...unmatchingSkills);

  if (job.skillsRequired.length > 0) {
    const skillRatio = matchingSkills.length / job.skillsRequired.length;
    score += Math.round(skillRatio * 25);
    if (matchingSkills.length > 0) {
      reasons.push(`Menguasai ${matchingSkills.length} skill yang dibutuhkan: ${matchingSkills.slice(0, 2).join(', ')}`);
    }
  } else {
    score += 20;
  }

  // 2. Education match
  if (
    job.education === 'Semua Pendidikan' ||
    seeker.educationLevel === job.education ||
    (seeker.educationLevel === 'D4/S1' && (job.education === 'SMA/SMK' || job.education === 'D3'))
  ) {
    score += 15;
    reasons.push(`Pendidikan sesuai (${seeker.educationLevel})`);
  }

  // 3. Location / Distance Match
  const dist = job.distanceKm ?? 3.5;
  if (dist <= 3) {
    score += 10;
    reasons.push(`Lokasi sangat dekat (${dist} KM dari rumah)`);
  } else if (dist <= 8) {
    score += 5;
    reasons.push(`Akses mudah dijangkau (${dist} KM)`);
  }

  // 4. Job Type & Preference
  if (seeker.preferredJobTypes.includes(job.jobType)) {
    score += 5;
    reasons.push(`Sesuai preferensi kerja ${job.jobType}`);
  }

  // 5. Fresh Graduate friendliness
  if (seeker.isFreshGraduate && job.isFreshGraduateFriendly) {
    score += 5;
    reasons.push('Menerima fresh graduate & disediakan training');
  }

  // Bound score
  const finalScore = Math.min(99, Math.max(45, score));

  return {
    score: finalScore,
    badge: `${finalScore}% MATCH`,
    reasons,
    missingSkills
  };
}

/**
 * Formats Indonesian Rupiah
 */
export function formatRupiah(amount: number, short = false): string {
  if (amount === 0) return 'Dinegosiasikan';
  if (short) {
    if (amount >= 1_000_000) {
      const juta = amount / 1_000_000;
      return `Rp${juta % 1 === 0 ? juta : juta.toFixed(1)} Juta`;
    }
    if (amount >= 1_000) {
      return `Rp${(amount / 1000).toFixed(0)} Ribu`;
    }
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}
