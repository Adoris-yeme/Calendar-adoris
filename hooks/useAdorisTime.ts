
import { useState, useEffect } from 'react';
import {
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
  TICKS_PER_SECOND,
  PERFECT_YEAR_DAYS_PER_MONTH,
  ADORIS_HOURS_PER_DAY,
  ADORIS_DAYS_PER_YEAR,
  GREGORIAN_EPOCH_DATE,
  GREGORIAN_MILLIS_PER_ADORIS_TICK,
} from '../constants';
import type { AdorisDate } from '../types';

// Facteur de conversion : il y a 24 heures grégoriennes dans une journée et 21 heures ADORIS.
// Cette constante représente le nombre de millisecondes du monde réel qui correspondent à un seul "tick" ADORIS.
const GREGORIAN_EPOCH = GREGORIAN_EPOCH_DATE.getTime();


const calculateCurrentAdorisDateFromMillis = (millisSinceEpoch: number, currentJewishYear: number): AdorisDate => {
    // 1 jour grégorien fait avancer d'1 jour ADORIS.
    const totalAdorisDays = Math.floor(millisSinceEpoch / (24 * 60 * 60 * 1000));
    
    // L'année est maintenant directement fournie par le calendrier hébraïque.
    const year = currentJewishYear;

    let dayOfYear = totalAdorisDays % ADORIS_DAYS_PER_YEAR;
    let monthIndex = 0;
    let day = 0;

    for (let i = 0; i < PERFECT_YEAR_DAYS_PER_MONTH.length; i++) {
        const daysInMonth = PERFECT_YEAR_DAYS_PER_MONTH[i];
        if (dayOfYear < daysInMonth) {
            monthIndex = i;
            day = dayOfYear + 1;
            break;
        }
        dayOfYear -= daysInMonth;
    }
    return { year, monthIndex, day };
};


export const useAdorisTime = (timeZone?: string, baseDate?: Date) => {
    const [state, setState] = useState({
        adorisTime: { hour: 1, minute: 1, second: 1, tick: 1 },
        adorisDate: { year: 5784, monthIndex: 0, day: 1 },
        totalAdorisDays: 0,
    });

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            // Utilise `baseDate` pour la partie date, mais `now` pour la partie heure afin que l'horloge continue de tourner.
            const effectiveDate = baseDate ? new Date(baseDate) : now;
            if (baseDate) {
                effectiveDate.setHours(now.getHours());
                effectiveDate.setMinutes(now.getMinutes());
                effectiveDate.setSeconds(now.getSeconds());
                effectiveDate.setMilliseconds(now.getMilliseconds());
            }

            
            // --- Calcul de l'année hébraïque ---
            let jewishYear = 5784; // Valeur par défaut robuste
            try {
                // Utilise `effectiveDate` pour le calcul pour rester synchronisé.
                const hebrewDateFormatter = new Intl.DateTimeFormat('en-US-u-ca-hebrew', { year: 'numeric' });
                const yearNumber = parseInt(hebrewDateFormatter.format(effectiveDate), 10);
                if (!isNaN(yearNumber)) {
                    jewishYear = yearNumber;
                }
            } catch (e) {
                console.warn("Impossible de déterminer l'année hébraïque via Intl.DateTimeFormat, utilisation d'une solution de repli.", e);
                // Solution de repli approximative si Intl échoue.
                jewishYear = effectiveDate.getFullYear() + 3760;
            }

            // --- Calcul de l'heure ---
            const timeOptions: Intl.DateTimeFormatOptions = {
                timeZone: timeZone || undefined,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hourCycle: 'h23',
            };
            
            let gregorianHour = 0, gregorianMinute = 0, gregorianSecond = 0;

            try {
              const parts = new Intl.DateTimeFormat('en-GB', timeOptions).formatToParts(effectiveDate);
              const timeParts: Record<string, number> = {};
              parts.forEach(({ type, value }) => {
                  if (type !== 'literal' && !isNaN(parseInt(value, 10))) {
                      timeParts[type] = parseInt(value, 10);
                  }
              });
              gregorianHour = timeParts.hour ?? 0;
              gregorianMinute = timeParts.minute ?? 0;
              gregorianSecond = timeParts.second ?? 0;

            } catch (e) {
                console.warn("Intl.DateTimeFormat a échoué, utilisation d'une solution de repli moins fiable.", e);
                const d = new Date(effectiveDate.toLocaleString('en-US', { timeZone: timeZone || undefined }));
                gregorianHour = d.getHours();
                gregorianMinute = d.getMinutes();
                gregorianSecond = d.getSeconds();
            }

            const millisecondsSinceStartOfDay = (gregorianHour * 3600 + gregorianMinute * 60 + gregorianSecond) * 1000 + effectiveDate.getMilliseconds();
            
            let totalTicksToday = Math.floor(millisecondsSinceStartOfDay / GREGORIAN_MILLIS_PER_ADORIS_TICK);
            
            const tick = (totalTicksToday % TICKS_PER_SECOND) + 1;
            totalTicksToday = Math.floor(totalTicksToday / TICKS_PER_SECOND);
            
            const second = (totalTicksToday % SECONDS_PER_MINUTE) + 1;
            totalTicksToday = Math.floor(totalTicksToday / SECONDS_PER_MINUTE);
            
            const minute = (totalTicksToday % MINUTES_PER_HOUR) + 1;
            totalTicksToday = Math.floor(totalTicksToday / MINUTES_PER_HOUR);
            
            const hour = (totalTicksToday % ADORIS_HOURS_PER_DAY) + 1;
            
            // --- Calcul de la date (toujours basé sur le temps absolu écoulé depuis une époque fixe en UTC) ---
            const totalMillisSinceEpoch = effectiveDate.getTime() - GREGORIAN_EPOCH;
            const totalAdorisDays = Math.floor(totalMillisSinceEpoch / (24 * 60 * 60 * 1000));
            const adorisDate = calculateCurrentAdorisDateFromMillis(totalMillisSinceEpoch, jewishYear);
            
            setState({
                adorisTime: { hour, minute, second, tick },
                adorisDate: adorisDate,
                totalAdorisDays: totalAdorisDays,
            });
        };

        calculateTime();
        const intervalId = setInterval(calculateTime, 20); // ~50fps

        return () => clearInterval(intervalId);
    }, [timeZone, baseDate]);

    return state;
};
