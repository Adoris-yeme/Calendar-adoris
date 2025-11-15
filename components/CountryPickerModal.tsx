import React, { useState, useMemo } from 'react';
import type { TimeZone } from '../types';

interface CountryPickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    timezones: TimeZone[];
    onSelect: (tz: TimeZone) => void;
}

export const CountryPickerModal: React.FC<CountryPickerModalProps> = ({ isOpen, onClose, timezones, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTimezones = useMemo(() => {
        if (!searchTerm) return timezones;
        return timezones.filter(tz =>
            tz.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tz.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, timezones]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="country-picker-title"
        >
            <div
                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl w-full max-w-md text-gray-800 dark:text-gray-200 flex flex-col"
                style={{ height: 'clamp(300px, 80vh, 600px)' }}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                    <h3 id="country-picker-title" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Choisir un fuseau horaire</h3>
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Rechercher une ville ou un pays..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="flex-grow overflow-y-auto px-4 pb-4">
                    <ul className="space-y-1">
                        {filteredTimezones.map(tz => (
                            <li key={tz.timeZone}>
                                <button
                                    onClick={() => onSelect(tz)}
                                    className="w-full text-left p-3 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:bg-gray-100 dark:focus-visible:bg-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center"
                                >
                                    <span className="text-2xl mr-4">{tz.flag}</span>
                                    <div>
                                        <span className="font-semibold text-gray-800 dark:text-gray-200">{tz.city}</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 block">{tz.country}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};