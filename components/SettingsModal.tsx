import React from 'react';
import type { CalendarPreferences, CalendarTheme } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    preferences: CalendarPreferences;
    setTheme: (theme: CalendarTheme) => void;
    setShowTaskCount: (show: boolean) => void;
    toggleDarkMode: () => void;
}

const THEMES: { id: CalendarTheme, name: string }[] = [
    { id: 'spiritual', name: 'Spirituel' },
    { id: 'minimalist', name: 'Minimaliste' },
    { id: 'cosmic', name: 'Cosmique' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    preferences,
    setTheme,
    setShowTaskCount,
    toggleDarkMode,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-modal-title"
        >
            <div
                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl w-full max-w-md text-gray-800 dark:text-gray-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 id="settings-modal-title" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        Préférences d'Affichage
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    {/* Theme Selection */}
                    <div>
                        <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Thème Visuel</label>
                        <div className="grid grid-cols-3 gap-3">
                            {THEMES.map(theme => (
                                <button
                                    key={theme.id}
                                    onClick={() => setTheme(theme.id)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800 focus-visible:ring-indigo-500 ${
                                        preferences.theme === theme.id
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                                    }`}
                                >
                                    {theme.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-gray-100 dark:bg-slate-700 p-3 rounded-md">
                            <label htmlFor="dark-mode-toggle" className="font-medium text-gray-700 dark:text-gray-300">Mode Sombre</label>
                            <button
                                id="dark-mode-toggle"
                                role="switch"
                                aria-checked={preferences.isDarkMode}
                                onClick={toggleDarkMode}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800 ${
                                    preferences.isDarkMode ? 'bg-indigo-500' : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        preferences.isDarkMode ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between bg-gray-100 dark:bg-slate-700 p-3 rounded-md">
                            <label htmlFor="show-task-count" className="font-medium text-gray-700 dark:text-gray-300">Afficher le nombre de tâches</label>
                            <button
                                id="show-task-count"
                                role="switch"
                                aria-checked={preferences.showTaskCount}
                                onClick={() => setShowTaskCount(!preferences.showTaskCount)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800 ${
                                    preferences.showTaskCount ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        preferences.showTaskCount ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                 <div className="p-4 bg-gray-50/50 dark:bg-slate-900/50 text-right">
                    <button onClick={onClose} className="bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200 font-bold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus-visible:ring-offset-slate-800 focus:ring-gray-400 dark:focus:ring-slate-500">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};
