import React from 'react';
import type { Task } from '../types';

interface UpcomingTasksDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    tasks: Task[];
}

const formatAdorisDate = (task: Task) => {
    return `${String(task.dayOfMonth).padStart(2, '0')}/${String(task.monthIndex + 1).padStart(2, '0')}/${task.year}`;
};

export const UpcomingTasksDropdown: React.FC<UpcomingTasksDropdownProps> = ({ isOpen, onClose, tasks }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-20" onClick={onClose} aria-hidden="true">
            <div
                className="absolute top-20 right-4 w-80 max-w-sm bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border border-gray-200 dark:border-slate-700 rounded-lg shadow-2xl text-gray-800 dark:text-gray-200"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="upcoming-tasks-title"
            >
                <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                    <h3 id="upcoming-tasks-title" className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        Rappels à venir
                    </h3>
                </div>
                {tasks.length > 0 ? (
                    <ul className="p-2 max-h-80 overflow-y-auto">
                        {tasks.map(task => (
                            <li key={task.id} className="p-3 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
                                <p className="font-semibold text-gray-900 dark:text-gray-100 break-words">{task.text}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatAdorisDate(task)} à {task.time}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                        <p>Aucun rappel à venir.</p>
                    </div>
                )}
            </div>
        </div>
    );
};