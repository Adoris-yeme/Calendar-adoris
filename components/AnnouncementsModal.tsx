import React from 'react';
import type { Announcement } from '../types';
import { MegaphoneIcon } from './icons';

interface AnnouncementsModalProps {
    isOpen: boolean;
    onClose: () => void;
    announcements: Announcement[];
    isLoading: boolean;
    error: string | null;
}

export const AnnouncementsModal: React.FC<AnnouncementsModalProps> = ({ isOpen, onClose, announcements, isLoading, error }) => {
    if (!isOpen) return null;

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                </div>
            );
        }

        if (error) {
            return <p className="text-center text-red-500 dark:text-red-400 p-4">{error}</p>;
        }

        if (announcements.length === 0) {
            return <p className="text-center text-gray-500 dark:text-gray-400 p-4">Aucune annonce pour le moment.</p>;
        }

        return (
            <ul className="space-y-4">
                {announcements.map((item, index) => (
                    <li key={index} className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{item.content}</p>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcements-modal-title"
        >
            <div
                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl w-full max-w-lg text-gray-800 dark:text-gray-200 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-5 border-b border-gray-200 dark:border-slate-700 text-center">
                    <MegaphoneIcon className="h-8 w-8 mx-auto text-indigo-500 mb-2" />
                    <h2 id="announcements-modal-title" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        Annonces
                    </h2>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {renderContent()}
                </div>
                <div className="p-4 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700 text-right">
                    <button onClick={onClose} className="bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200 font-bold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-slate-800 focus-visible:ring-gray-400 dark:focus-visible:ring-slate-500">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};
