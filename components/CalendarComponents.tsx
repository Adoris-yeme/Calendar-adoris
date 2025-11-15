import React, { useMemo } from 'react';
import { WEEKDAY_NAMES } from '../constants';
import type { Month } from '../utils/calendar';
import type { Task, AdorisDate, CalendarPreferences } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

// --- CalendarHeader ---

interface CalendarHeaderProps {
    monthIndex: number;
    monthName: string;
    year: number;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onYearClick: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ monthIndex, monthName, year, onPrevMonth, onNextMonth, onYearClick }) => (
    <div className="flex items-center justify-between mb-4">
        <button onClick={onPrevMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label="Mois précédent">
            <ChevronLeftIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
        <div className="text-center px-2">
            <span className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{monthIndex + 1} - {monthName}</span>
            <button onClick={onYearClick} className="block w-full sm:inline sm:ml-2 text-xl font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-2 py-1" aria-label="Changer l'année">
                {year}
            </button>
        </div>
        <button onClick={onNextMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label="Mois suivant">
            <ChevronRightIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
    </div>
);

// --- MonthGrid ---

interface MonthGridProps {
    month: Month;
    onDayClick: (day: number, weekdayIndex: number, isEnabled: boolean) => void;
    tasks: Task[];
    viewedYear: number;
    currentDate: AdorisDate;
    preferences: CalendarPreferences;
}

const dayThemeStyles = {
    spiritual: { // The balanced, default theme
        border: 'border-gray-200 dark:border-slate-700',
        yeshuaBg: 'bg-sky-100 dark:bg-sky-900/40',
        yeshuaHover: 'hover:bg-sky-200/60 dark:hover:bg-sky-800/50',
        yeshuaText: 'text-sky-800 dark:text-sky-300',
        normalBg: 'bg-white dark:bg-slate-800',
        normalHover: 'hover:bg-gray-50 dark:hover:bg-slate-700',
        normalText: 'text-gray-700 dark:text-gray-300',
        attributeText: 'text-gray-500 dark:text-slate-400',
        todayIndicator: 'bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-lg',
        todayIndicatorShadow: '0 0 15px rgba(99, 102, 241, 0.7)',
        todayIndicatorShadowDark: '0 0 15px rgba(129, 140, 248, 0.6)',
        todayText: 'text-white'
    },
    minimalist: { // Clean, flat, less decoration
        border: 'border-gray-200 dark:border-slate-700',
        yeshuaBg: '',
        yeshuaHover: 'hover:bg-gray-100 dark:hover:bg-slate-700',
        yeshuaText: 'text-sky-600 dark:text-sky-400',
        normalBg: 'bg-white dark:bg-slate-800',
        normalHover: 'hover:bg-gray-100 dark:hover:bg-slate-700',
        normalText: 'text-gray-600 dark:text-gray-300',
        attributeText: 'text-gray-400 dark:text-slate-500',
        todayIndicator: 'ring-2 ring-indigo-500 dark:ring-indigo-400 rounded-full',
        todayIndicatorShadow: 'none',
        todayIndicatorShadowDark: 'none',
        todayText: 'text-indigo-600 dark:text-indigo-400'
    },
    cosmic: { // Vibrant, glowing, ethereal
        border: 'border-indigo-200/50 dark:border-indigo-900/50',
        yeshuaBg: 'bg-purple-100/50 dark:bg-purple-900/30',
        yeshuaHover: 'hover:bg-purple-200/50 dark:hover:bg-purple-800/40',
        yeshuaText: 'text-purple-700 dark:text-purple-300',
        normalBg: 'bg-white/50 dark:bg-slate-800/30',
        normalHover: 'hover:bg-white dark:hover:bg-slate-700/50',
        normalText: 'text-gray-800 dark:text-gray-200',
        attributeText: 'text-indigo-500/80 dark:text-indigo-400/80',
        todayIndicator: 'bg-purple-500 rounded-full shadow-2xl',
        todayIndicatorShadow: '0 0 20px rgba(192, 132, 252, 0.9)',
        todayIndicatorShadowDark: '0 0 20px rgba(192, 132, 252, 0.7)',
        todayText: 'text-white'
    }
};


export const MonthGrid: React.FC<MonthGridProps> = ({ month, onDayClick, tasks, viewedYear, currentDate, preferences }) => {
    const tasksByDay = useMemo(() => {
        const map = new Map<number, number>();
        tasks.forEach(task => {
            if (task.year === viewedYear && task.monthIndex === month.index) {
                const count = map.get(task.dayOfMonth) || 0;
                map.set(task.dayOfMonth, count + 1);
            }
        });
        return map;
    }, [tasks, viewedYear, month.index]);

    const firstDayOffset = month.days[0]?.weekdayIndex || 0;
    
    const themeClasses = {
        spiritual: 'theme-spiritual',
        minimalist: 'theme-minimalist',
        cosmic: 'theme-cosmic'
    };
    
    const dayBaseClass = "relative p-1 sm:p-2 h-16 sm:h-24 border-r border-b cursor-pointer flex flex-col justify-between transition-colors";
    const currentTheme = dayThemeStyles[preferences.theme];

    const gridCells = Array.from({ length: firstDayOffset }, (_, i) => <div key={`empty-${i}`} className={`border-r border-b ${currentTheme.border}`} />);

    const gridContainerClasses = [
        'grid', 'grid-cols-7', 'border-t', 'border-l',
        currentTheme.border, themeClasses[preferences.theme]
    ];

    if (preferences.theme === 'minimalist' || preferences.theme === 'spiritual') {
        gridContainerClasses.push('rounded-lg', 'overflow-hidden');
    }

    return (
        <div className={gridContainerClasses.join(' ')}>
            {/* Weekday Headers */}
            {WEEKDAY_NAMES.map(dayName => (
                <div key={dayName} className={`text-center font-bold py-2 sm:py-3 bg-gray-50 dark:bg-slate-800/50 border-r border-b ${currentTheme.border} text-gray-500 dark:text-gray-400 text-xs sm:text-sm uppercase tracking-wider ${dayName === 'Yeshua' ? 'text-sky-600 dark:text-sky-400' : ''}`}>
                    {dayName}
                </div>
            ))}
            
            {/* Days */}
            {gridCells}
            {month.days.map(day => {
                const taskCount = tasksByDay.get(day.dayOfMonth);
                const isToday = currentDate && viewedYear === currentDate.year && month.index === currentDate.monthIndex && day.dayOfMonth === currentDate.day;

                const dayTextColor = day.isYeshua ? currentTheme.yeshuaText : currentTheme.normalText;
                const dayStyle = day.isYeshua 
                    ? `${currentTheme.yeshuaBg} ${!isToday && currentTheme.yeshuaHover}` 
                    : `${currentTheme.normalBg} ${!isToday && currentTheme.normalHover}`;
                
                const todayShadow = preferences.isDarkMode ? currentTheme.todayIndicatorShadowDark : currentTheme.todayIndicatorShadow;

                return (
                    <div
                        key={day.dayOfMonth}
                        className={`${dayBaseClass} ${dayStyle} ${currentTheme.border}`}
                        onClick={() => onDayClick(day.dayOfMonth, day.weekdayIndex, true)}
                        role="button"
                        aria-label={`Jour ${day.dayOfMonth}, ${day.weekdayName}. Cliquez pour voir la signification.`}
                    >
                        <div className="flex justify-between items-start">
                             {preferences.showTaskCount && taskCount && taskCount > 0 && (
                                <div className="flex items-center justify-center bg-indigo-500 text-white text-xs rounded-full h-5 w-5 z-10 self-start">
                                    {taskCount > 9 ? '9+' : taskCount}
                                </div>
                            )}
                            <div className="flex-grow text-right">
                                {isToday ? (
                                    <div 
                                        className={`relative ml-auto h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center font-bold ${currentTheme.todayIndicator}`}
                                        style={{boxShadow: todayShadow}}
                                    >
                                        <span className={`text-xs sm:text-sm ${currentTheme.todayText}`}>{day.dayOfMonth}</span>
                                    </div>
                                ) : (
                                    <span className={`text-xs sm:text-sm font-semibold ${dayTextColor}`}>
                                        {day.dayOfMonth}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div />
                    </div>
                );
            })}
        </div>
    );
};