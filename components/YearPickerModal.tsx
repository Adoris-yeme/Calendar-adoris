import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface YearPickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentYear: number;
    onSelectYear: (year: number) => void;
}

const YEARS_PER_VIEW = 12;

export const YearPickerModal: React.FC<YearPickerModalProps> = ({ isOpen, onClose, currentYear, onSelectYear }) => {
    if (!isOpen) return null;

    const [viewYear, setViewYear] = useState(currentYear);

    const { startYear, endYear, years } = useMemo(() => {
        const decadeStart = Math.floor((viewYear - 1) / YEARS_PER_VIEW) * YEARS_PER_VIEW + 1;
        const yearList = Array.from({ length: YEARS_PER_VIEW }, (_, i) => decadeStart + i);
        return {
            startYear: decadeStart,
            endYear: decadeStart + YEARS_PER_VIEW - 1,
            years: yearList,
        };
    }, [viewYear]);

    const handlePrev = () => setViewYear(v => v - YEARS_PER_VIEW);
    const handleNext = () => setViewYear(v => v + YEARS_PER_VIEW);

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="year-picker-title"
        >
            <div 
                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl w-full max-w-xs text-gray-800 dark:text-gray-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
                    <button onClick={handlePrev} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label="Previous years">
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <h3 id="year-picker-title" className="font-bold text-gray-700 dark:text-gray-300 tabular-nums">{startYear} - {endYear}</h3>
                    <button onClick={handleNext} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label="Next years">
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-2 p-4">
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => onSelectYear(year)}
                            className={`p-3 rounded-md text-center font-semibold transition-colors tabular-nums
                                ${year === currentYear 
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-500' 
                                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'}
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800 focus-visible:ring-indigo-500`
                            }
                            aria-pressed={year === currentYear}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};