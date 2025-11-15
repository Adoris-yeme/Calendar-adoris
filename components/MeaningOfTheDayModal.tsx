import React, { useState, FormEvent } from 'react';
import { getMeaningForYear, MONTH_DATA, WEEKDAY_DATA, HOUR_DATA } from '../spiritualMeanings';
import { getPrayerSuggestionsForDay } from '../prayerSuggestions';
import type { DayIdentifier, AdorisTime, Prayer } from '../types';
import { BookOpenIcon, PlusIcon, TrashIcon, CheckIcon } from './icons';

interface MeaningOfTheDayModalProps {
    isOpen: boolean;
    onClose: () => void;
    dayId: DayIdentifier;
    onOpenTasks: () => void;
    isToday: boolean;
    currentTime: AdorisTime;
    prayers: Prayer[];
    addPrayer: (prayer: Omit<Prayer, 'id' | 'isAnswered'>) => void;
    togglePrayer: (id: string) => void;
    deletePrayer: (id: string) => void;
}

const MeaningCard: React.FC<{ title: string, subtitle: string, meaning: string, verse: string }> = ({ title, subtitle, meaning, verse }) => (
    <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
        <h4 className="font-bold text-gray-800 dark:text-gray-200">{title}: <span className="text-indigo-600 dark:text-indigo-400">{subtitle}</span></h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{meaning}</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 pt-2 border-t border-gray-200 dark:border-slate-600/50">
            <em>"{verse}"</em>
        </p>
    </div>
);


export const MeaningOfTheDayModal: React.FC<MeaningOfTheDayModalProps> = ({
    isOpen, onClose, dayId, onOpenTasks, isToday, currentTime,
    prayers, addPrayer, togglePrayer, deletePrayer
}) => {
    if (!isOpen) return null;

    const [newPrayerText, setNewPrayerText] = useState('');

    const monthMeaning = getMeaningForYear(MONTH_DATA, dayId.year, dayId.monthIndex);
    const weekdayMeaning = getMeaningForYear(WEEKDAY_DATA, dayId.year, dayId.weekdayIndex);
    const hourMeaning = getMeaningForYear(HOUR_DATA, dayId.year, currentTime.hour - 1);

    const prayerSuggestions = getPrayerSuggestionsForDay(dayId);

    const handlePrayerSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (newPrayerText.trim()) {
            addPrayer({
                text: newPrayerText,
                year: dayId.year,
                monthIndex: dayId.monthIndex,
                dayOfMonth: dayId.dayOfMonth,
            });
            setNewPrayerText('');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 z-30 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="meaning-modal-title"
        >
            <div
                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl w-full max-w-lg text-gray-800 dark:text-gray-200 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-5 border-b border-gray-200 dark:border-slate-700 text-center">
                    <BookOpenIcon className="h-8 w-8 mx-auto text-indigo-500 mb-2"/>
                    <h2 id="meaning-modal-title" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        Sens Spirituel du Jour
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">{weekdayMeaning.name} {dayId.dayOfMonth}, {monthMeaning.name} {dayId.year}</p>
                </div>

                <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
                    <MeaningCard 
                        title="Mois"
                        subtitle={monthMeaning.name}
                        meaning={monthMeaning.meaning}
                        verse={monthMeaning.verse}
                    />
                     <MeaningCard 
                        title="Jour"
                        subtitle={`${weekdayMeaning.name} (${weekdayMeaning.attribute})`}
                        meaning={weekdayMeaning.meaning}
                        verse={weekdayMeaning.verse}
                    />
                    {isToday && (
                         <MeaningCard 
                            title="Heure Actuelle"
                            subtitle={hourMeaning.name}
                            meaning={hourMeaning.meaning}
                            verse={hourMeaning.verse}
                        />
                    )}

                    {/* Prayer Section */}
                    <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Requêtes de Prière et d'Intercession</h4>
                        
                        {/* Prayer Suggestions */}
                        <div>
                          <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Suggestions de Prières</h5>
                          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                            {prayerSuggestions.map((suggestion, index) => (
                              <div key={index} className="flex items-start justify-between bg-white dark:bg-slate-800/50 p-2 rounded-md text-sm">
                                <div className="flex-1 mr-2">
                                  <p className="text-gray-700 dark:text-gray-300">{suggestion.text}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1"><em>({suggestion.verse})</em></p>
                                </div>
                                <button
                                  onClick={() => addPrayer({
                                    text: suggestion.text,
                                    year: dayId.year,
                                    monthIndex: dayId.monthIndex,
                                    dayOfMonth: dayId.dayOfMonth,
                                  })}
                                  className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 p-1.5 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors flex-shrink-0"
                                  aria-label="Ajouter cette prière à ma liste"
                                >
                                  <PlusIcon className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <hr className="my-3 border-gray-200 dark:border-slate-600"/>

                        {/* User's Prayer List */}
                        <div className="space-y-2">
                            {prayers.length > 0 ? (
                                prayers.map(prayer => (
                                    <div key={prayer.id} className="flex items-center justify-between bg-white dark:bg-slate-800/50 p-2 rounded-md">
                                        <div className="flex items-center flex-1 min-w-0">
                                            <button 
                                                onClick={() => togglePrayer(prayer.id)}
                                                className={`flex-shrink-0 h-5 w-5 rounded border-2 transition-colors ${
                                                    prayer.isAnswered ? 'bg-green-500 border-green-500' : 'border-gray-400 dark:border-slate-500'
                                                }`}
                                                aria-label={prayer.isAnswered ? "Marquer comme non exaucée" : "Marquer comme exaucée"}
                                            >
                                                {prayer.isAnswered && <CheckIcon className="h-4 w-4 text-white" />}
                                            </button>
                                            <p className={`ml-3 text-gray-700 dark:text-gray-300 break-words ${prayer.isAnswered ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                                                {prayer.text}
                                            </p>
                                        </div>
                                        <button onClick={() => deletePrayer(prayer.id)} className="ml-2 flex-shrink-0 text-gray-400 dark:text-gray-500 hover:text-red-500 p-1 rounded-full" aria-label={`Supprimer la prière`}>
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">Aucune requête personnelle pour ce jour.</p>
                            )}
                        </div>
                        <form onSubmit={handlePrayerSubmit} className="mt-3 flex gap-2">
                            <input
                                type="text"
                                value={newPrayerText}
                                onChange={(e) => setNewPrayerText(e.target.value)}
                                placeholder="Ajouter une requête personnelle..."
                                className="flex-grow w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                            <button type="submit" className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors" aria-label="Ajouter la prière">
                                <PlusIcon className="h-5 w-5" />
                            </button>
                        </form>
                    </div>

                </div>
                
                <div className="p-4 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3 justify-end">
                    <button onClick={onOpenTasks} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-800 focus:ring-indigo-500 order-1 sm:order-2">
                        Gérer les rappels
                    </button>
                    <button onClick={onClose} className="bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200 font-bold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-800 focus:ring-gray-400 dark:focus:ring-slate-500 order-2 sm:order-1">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};