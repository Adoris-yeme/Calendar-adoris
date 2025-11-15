
import React from 'react';
import type { TimeZone } from '../types';
import { useAdorisTime } from '../hooks/useAdorisTime';
import { AdorisClock } from './AdorisClock';

interface FeaturedClockDisplayProps {
    featuredTimeZone: TimeZone | null;
    baseDate: Date;
}

export const FeaturedClockDisplay: React.FC<FeaturedClockDisplayProps> = ({ featuredTimeZone, baseDate }) => {
    // Calcule le temps basé sur le fuseau horaire sélectionné ET la date de base fournie
    const { adorisTime, adorisDate } = useAdorisTime(featuredTimeZone?.timeZone, featuredTimeZone ? baseDate : undefined);
    
    return (
        <div className={`transition-all duration-500 ease-in-out grid ${featuredTimeZone ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                {featuredTimeZone && (
                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-slate-700 flex flex-col items-center">
                        <div className="text-center mb-4">
                            <p className="text-3xl">{featuredTimeZone.flag}</p>
                            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{featuredTimeZone.city}</p>
                            <p className="text-md text-gray-500 dark:text-gray-400">{featuredTimeZone.country}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-semibold tabular-nums">
                                {adorisDate.day} / {adorisDate.monthIndex + 1} / {adorisDate.year}
                            </p>
                        </div>
                        <div className="w-full max-w-[280px] sm:max-w-[320px]">
                            <AdorisClock time={adorisTime} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
