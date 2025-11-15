import React, { useState, FormEvent, useMemo } from 'react';
import { MONTH_NAMES, ALARM_SOUNDS } from '../constants';
import { TrashIcon } from './icons';
import type { Task, DayIdentifier, AlarmSound } from '../types';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    dayId: DayIdentifier;
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'isCompleted' | 'reminderDateTime'>) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

type SortOrder = 'time-asc' | 'time-desc' | 'status-incomplete' | 'status-completed';

const HOUR_OPTIONS = Array.from({ length: 21 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTE_OPTIONS = Array.from({ length: 49 }, (_, i) => String(i + 1).padStart(2, '0'));

export const TaskModal: React.FC<TaskModalProps> = ({
    isOpen, onClose, dayId, tasks, addTask, toggleTask, deleteTask
}) => {
    const [taskText, setTaskText] = useState('');
    const [taskHour, setTaskHour] = useState('09');
    const [taskMinute, setTaskMinute] = useState('01');
    const [sortOrder, setSortOrder] = useState<SortOrder>('time-asc');
    const [alarmSound, setAlarmSound] = useState<AlarmSound>('chime');

    const sortedTasks = useMemo(() => {
        const tasksCopy = [...tasks];
        switch (sortOrder) {
            case 'time-desc':
                return tasksCopy.sort((a, b) => b.time.localeCompare(a.time));
            case 'status-completed':
                return tasksCopy.sort((a, b) => Number(b.isCompleted) - Number(a.isCompleted));
            case 'status-incomplete':
                return tasksCopy.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
            case 'time-asc':
            default:
                return tasksCopy.sort((a, b) => a.time.localeCompare(a.time));
        }
    }, [tasks, sortOrder]);

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (taskText.trim()) {
            const timeString = `${taskHour}:${taskMinute}`;
            
            addTask({
                text: taskText,
                time: timeString,
                year: dayId.year,
                monthIndex: dayId.monthIndex,
                dayOfMonth: dayId.dayOfMonth,
                alarmSound: alarmSound,
            });
            setTaskText('');
        }
    };
    
    return (
        <div 
          className="fixed inset-0 bg-black/60 z-30 flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="task-modal-title"
        >
            <div 
              className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl w-full max-w-md text-gray-800 dark:text-gray-200"
              onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 id="task-modal-title" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        Rappels pour le {dayId.dayOfMonth} / {dayId.monthIndex + 1} - {MONTH_NAMES[dayId.monthIndex]}
                    </h2>
                </div>
                
                 <div className="px-6 pt-4">
                    {tasks.length > 0 && (
                        <div className="flex items-center justify-end">
                            <label htmlFor="sort-tasks" className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">Trier par :</label>
                            <select
                                id="sort-tasks"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                                className="block w-auto pl-3 pr-10 py-2 text-base bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="time-asc">Heure (croissant)</option>
                                <option value="time-desc">Heure (décroissant)</option>
                                <option value="status-incomplete">Statut (non terminé)</option>
                                <option value="status-completed">Statut (terminé)</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="p-6 max-h-[50vh] overflow-y-auto">
                    {sortedTasks.length > 0 ? (
                        <ul className="space-y-3">
                            {sortedTasks.map(task => (
                                <li key={task.id} className="flex items-center justify-between bg-gray-50 dark:bg-slate-700/50 p-3 rounded-md">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={task.isCompleted}
                                            onChange={() => toggleTask(task.id)}
                                            className="h-5 w-5 rounded border-gray-400 dark:border-slate-500 bg-gray-100 dark:bg-slate-600 text-indigo-600 focus:ring-indigo-500"
                                            aria-label={`Mark task ${task.text} as complete`}
                                        />
                                        <div className="ml-3">
                                            <p className={`text-gray-800 dark:text-gray-200 ${task.isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>{task.text}</p>
                                            <p className={`text-sm font-mono ${task.isCompleted ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>{task.time}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteTask(task.id)} className="text-gray-400 dark:text-gray-500 hover:text-red-500 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500" aria-label={`Delete task ${task.text}`}>
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center">Aucun rappel pour ce jour.</p>
                    )}
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Ajouter un nouveau rappel</h3>
                        <div>
                            <label htmlFor="task-text" className="sr-only">Description du rappel</label>
                            <input
                                id="task-text"
                                type="text"
                                value={taskText}
                                onChange={e => setTaskText(e.target.value)}
                                placeholder="Nouvelle tâche..."
                                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                         <div className="flex gap-4">
                            <div className="flex-1">
                                <label htmlFor="task-hour" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Heure (1-21)</label>
                                <select
                                    id="task-hour"
                                    value={taskHour}
                                    onChange={e => setTaskHour(e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {HOUR_OPTIONS.map(h => (
                                        <option key={h} value={h}>
                                            {h}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                 <label htmlFor="task-minute" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Minute (1-49)</label>
                                 <select
                                    id="task-minute"
                                    value={taskMinute}
                                    onChange={e => setTaskMinute(e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                     {MINUTE_OPTIONS.map(m => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="alarm-sound" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Son de l'alarme</label>
                            <select
                                id="alarm-sound"
                                value={alarmSound}
                                onChange={e => setAlarmSound(e.target.value as AlarmSound)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {ALARM_SOUNDS.map(sound => (
                                    <option key={sound.id} value={sound.id}>
                                        {sound.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-800 focus:ring-indigo-500">
                            Ajouter le rappel
                        </button>
                    </form>
                </div>
                <div className="p-4 bg-gray-50/50 dark:bg-slate-900/50 text-right">
                    <button onClick={onClose} className="bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200 font-bold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-800 focus:ring-gray-400 dark:focus:ring-slate-500">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};