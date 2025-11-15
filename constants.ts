// Constantes pour le Calendrier ADORIS (basé sur la perfection du chiffre 7)
import type { TimeZone } from './types';

// Noms pour les 9 mois de l'année parfaite
export const MONTH_NAMES = [
  'ELOHIM',     // Mois 1
  'TSIDKENU',   // Mois 2
  'YIREH',      // Mois 3
  'RAPHA',      // Mois 4
  'SHALOM',     // Mois 5
  'EL-ROI',     // Mois 6
  'YESHUA',     // Mois 7
  'NISSI',      // Mois 8
  'SABAOTH',    // Mois 9
];

// Noms pour les 7 jours de la semaine
export const WEEKDAY_NAMES = [
  'Elohim',
  'Tsidkenu',
  'Yireh',
  'Rapha',
  'Shalom',
  'El-Roi',
  'Yeshua'
];

// --- Règles de Génération du Calendrier ---
export const MONTH_COUNT = 9;
export const WEEKDAY_COUNT = 7;

// Répartition fixe des jours pour l'année parfaite de 343 jours (7x7x7).
export const PERFECT_YEAR_DAYS_PER_MONTH = [
    40, 35, 41, 36, 41, 36, 41, 36, 37
];

// L'index du jour "Yeshua" (0-6), qui est le 7ème jour.
export const YESHUA_WEEKDAY_INDEX = 6;


// --- Constantes pour le Temps ADORIS ---
export const MINUTES_PER_HOUR = 49; // 7^2
export const SECONDS_PER_MINUTE = 49; // 7^2
export const TICKS_PER_SECOND = 49; // 7 Esprits x 7 Connaissances

export const ADORIS_HOURS_PER_DAY = 21;
export const ADORIS_DAYS_PER_YEAR = 343; // 7^3
export const GREGORIAN_EPOCH_DATE = new Date('2000-01-01T00:00:00Z');

export const ADORIS_TOTAL_TICKS_PER_DAY = ADORIS_HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * TICKS_PER_SECOND;
export const GREGORIAN_MILLIS_PER_ADORIS_TICK = (24 * 60 * 60 * 1000) / ADORIS_TOTAL_TICKS_PER_DAY;


export const ADORIS_HOUR_NAMES = [
  // AUBE - Père (Heures 1-7)
  'Souffle', 'Décret', 'Source', 'Alliance', 'Sagesse', 'Forme', 'Repos du Père',
  // JOUR - Fils (Heures 8-14)
  'Incarnation', 'Chemin', 'Parole', 'Croix', 'Résurrection', 'Ascension', 'Trône du Fils',
  // SOIR - Saint-Esprit (Heures 15-21)
  'Souffle intérieur', 'Conseil', 'Feu', 'Mystère', 'Unité', 'Gloire', 'Silence sacré'
];

export const ADORIS_CYCLE_THEMES = [
    { name: 'AUBE – Père', bg: 'bg-amber-100/60', text: 'text-amber-800', border: 'border-amber-300/80' },
    { name: 'JOUR – Fils', bg: 'bg-gray-200/60', text: 'text-gray-800', border: 'border-gray-300/80' },
    { name: 'SOIR – Saint-Esprit', bg: 'bg-sky-100/60', text: 'text-sky-800', border: 'border-sky-300/80' }
];

// --- Constantes pour les sons d'alarme ---
export const ALARM_SOUNDS = [
  { id: 'chime', name: 'Carillon Spirituel' },
  { id: 'bell', name: 'Cloche du Temple' },
  { id: 'vibration', name: 'Vibration Cosmique' },
] as const;


// --- Constantes pour les horloges mondiales ---
// Utilise les noms de fuseaux horaires IANA pour un calcul précis du décalage (y compris l'heure d'été).
export const TIMEZONES: TimeZone[] = [
  { city: 'Temps Universel', country: 'UTC', flag: '🌐', timeZone: 'UTC' },
  { city: 'Paris', country: 'France', flag: '🇫🇷', timeZone: 'Europe/Paris' },
  { city: 'London', country: 'United Kingdom', flag: '🇬🇧', timeZone: 'Europe/London' },
  { city: 'Moscow', country: 'Russia', flag: '🇷🇺', timeZone: 'Europe/Moscow' },
  { city: 'New York', country: 'USA', flag: '🇺🇸', timeZone: 'America/New_York' },
  { city: 'Los Angeles', country: 'USA', flag: '🇺🇸', timeZone: 'America/Los_Angeles' },
  { city: 'São Paulo', country: 'Brazil', flag: '🇧🇷', timeZone: 'America/Sao_Paulo' },
  { city: 'Cairo', country: 'Egypt', flag: '🇪🇬', timeZone: 'Africa/Cairo' },
  { city: 'Johannesburg', country: 'South Africa', flag: '🇿🇦', timeZone: 'Africa/Johannesburg' },
  { city: 'Dubai', country: 'UAE', flag: '🇦🇪', timeZone: 'Asia/Dubai' },
  { city: 'Mumbai', country: 'India', flag: '🇮🇳', timeZone: 'Asia/Kolkata' },
  { city: 'Shanghai', country: 'China', flag: '🇨🇳', timeZone: 'Asia/Shanghai' },
  { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', timeZone: 'Asia/Tokyo' },
  { city: 'Sydney', country: 'Australia', flag: '🇦🇺', timeZone: 'Australia/Sydney' },
];