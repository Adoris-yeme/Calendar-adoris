import {
  MONTH_NAMES,
  WEEKDAY_NAMES,
  MONTH_COUNT,
  YESHUA_WEEKDAY_INDEX,
  WEEKDAY_COUNT,
  PERFECT_YEAR_DAYS_PER_MONTH,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
  TICKS_PER_SECOND,
  GREGORIAN_MILLIS_PER_ADORIS_TICK,
} from '../constants';

// --- Data Structures ---
const SPIRITUAL_ATTRIBUTES = ['Création', 'Justice', 'Provision', 'Guérison', 'Paix', 'Vision', 'Salut'];

export interface CalendarDay {
  dayOfMonth: number;
  weekdayIndex: number;
  weekdayName: string;
  isYeshua: boolean;
  spiritualAttribute: string;
}

export interface Month {
  index: number;
  name: string;
  totalDays: number;
  days: CalendarDay[];
}

export interface YearCalendar {
  yearId: string;
  months: Month[];
  startWeekdayIndex: number;
}

// --- Conversion Utilities ---

/**
 * Converts an ADORIS time of day to the number of Gregorian milliseconds
 * that have passed since the beginning of the day.
 */
export const convertAdorisTimeToMillis = (hour: number, minute: number): number => {
    // Hour is 1-21, Minute is 1-49. Convert to 0-based for calculation.
    const totalTicks =
        ((hour - 1) * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * TICKS_PER_SECOND) +
        ((minute - 1) * SECONDS_PER_MINUTE * TICKS_PER_SECOND);
    
    return totalTicks * GREGORIAN_MILLIS_PER_ADORIS_TICK;
}

// --- Calendar Generation Logic ---

export const generateYear = (yearNumber: number, startWeekdayIndex: number = 0): YearCalendar => {
    const months: Month[] = [];
    const yearId = yearNumber.toString();
    
    // Utilise la nouvelle distribution fixe pour l'année parfaite de 343 jours.
    const daysPerMonth = PERFECT_YEAR_DAYS_PER_MONTH;

    // --- Construit les 9 mois séquentiellement ---
    let weekdayPointer = startWeekdayIndex % WEEKDAY_COUNT;
    for (let i = 0; i < MONTH_COUNT; i++) {
        const totalDays = daysPerMonth[i];
        const days: CalendarDay[] = [];
        for (let d = 1; d <= totalDays; d++) {
            const isYeshua = weekdayPointer === YESHUA_WEEKDAY_INDEX;
            const weekdayName = WEEKDAY_NAMES[weekdayPointer];
            const spiritualAttribute = SPIRITUAL_ATTRIBUTES[weekdayPointer];
            days.push({
                dayOfMonth: d,
                weekdayIndex: weekdayPointer,
                weekdayName: weekdayName,
                isYeshua: isYeshua,
                spiritualAttribute: spiritualAttribute,
            });
            weekdayPointer = (weekdayPointer + 1) % WEEKDAY_COUNT;
        }
        months.push({
            index: i,
            name: MONTH_NAMES[i],
            totalDays: totalDays,
            days: days
        });
    }

    return { yearId, months, startWeekdayIndex };
};
