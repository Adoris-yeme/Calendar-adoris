import React from 'react';
import type { Task } from '../types';

interface AlarmModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
}

export const AlarmModal: React.FC<AlarmModalProps> = ({ isOpen, onClose, task }) => {
    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-pulse-slow">
            <div 
              className="bg-white dark:bg-slate-800 border-2 border-indigo-300 dark:border-indigo-600 rounded-2xl shadow-2xl w-full max-w-sm text-gray-800 dark:text-gray-200 p-8 text-center relative overflow-hidden"
              style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.4), 0 0 80px rgba(99, 102, 241, 0.2)' }}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="alarm-title"
              aria-describedby="alarm-description"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20 dark:opacity-10"></div>
                <h2 id="alarm-title" className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Rappel ADORIS</h2>
                <div id="alarm-description">
                    <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{task.time}</p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 break-words">{task.text}</p>
                </div>
                <button 
                    onClick={onClose}
                    className="w-full bg-red-600 text-white font-bold text-lg py-4 px-4 rounded-lg hover:bg-red-500 transition-colors focus:outline-none focus:ring-4 focus:ring-red-500/50 transform hover:scale-105"
                    aria-label="Arrêter l'alarme"
                >
                    Arrêter
                </button>
            </div>
        </div>
    );
};