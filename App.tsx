
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AdorisClock } from './components/AdorisClock';
import { CalendarHeader, MonthGrid } from './components/CalendarComponents';
import { YearPickerModal } from './components/YearPickerModal';
import { TaskModal } from './components/TaskModal';
import { CountryPickerModal } from './components/CountryPickerModal';
import { FeaturedClockDisplay } from './components/FeaturedClockDisplay';
import { AlarmModal } from './components/AlarmModal';
import { SettingsModal } from './components/SettingsModal';
import { UpcomingTasksDropdown } from './components/UpcomingTasksDropdown';
import { MeaningOfTheDayModal } from './components/MeaningOfTheDayModal';
import { InfoModal } from './components/InfoModal';
import { AnnouncementsModal } from './components/AnnouncementsModal';
import { useAdorisTime } from './hooks/useAdorisTime';
import { useTasks } from './hooks/useTasks';
import { usePrayers } from './hooks/usePrayers';
import { useTaskNotifications } from './hooks/useTaskNotifications';
import { useCalendarPreferences } from './hooks/useCalendarPreferences';
import { useAnnouncements } from './hooks/useAnnouncements';
import { generateYear, convertAdorisTimeToMillis } from './utils/calendar';
import { TIMEZONES, PERFECT_YEAR_DAYS_PER_MONTH, ADORIS_DAYS_PER_YEAR, GREGORIAN_EPOCH_DATE } from './constants';
import type { DayIdentifier, TimeZone, Task, Prayer } from './types';
import { BellIcon, SettingsIcon, InformationCircleIcon, MegaphoneIcon } from './components/icons';

function App() {
  const { adorisTime, adorisDate, totalAdorisDays } = useAdorisTime(); // Local time
  
  const [viewedYear, setViewedYear] = useState(adorisDate.year);
  const [viewedMonthIndex, setViewedMonthIndex] = useState(adorisDate.monthIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewedDate, setViewedDate] = useState(() => new Date());

  const { preferences, setTheme, setShowTaskCount, toggleDarkMode } = useCalendarPreferences();

  useEffect(() => {
    if (preferences.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.isDarkMode]);

  useEffect(() => {
    setViewedYear(adorisDate.year);
    setViewedMonthIndex(adorisDate.monthIndex);
  }, [adorisDate.year, adorisDate.monthIndex]);

  useEffect(() => {
    const getDayOfYear = (monthIndex: number, dayOfMonth: number): number => {
        let dayOfYear = 0;
        for (let i = 0; i < monthIndex; i++) {
            dayOfYear += PERFECT_YEAR_DAYS_PER_MONTH[i];
        }
        return dayOfYear + dayOfMonth - 1;
    };

    const yearDelta = viewedYear - adorisDate.year;
    const viewedDayOfYear = getDayOfYear(viewedMonthIndex, 1);
    const currentDayOfYear = getDayOfYear(adorisDate.monthIndex, adorisDate.day);
    const dayDelta = viewedDayOfYear - currentDayOfYear;
    const totalDayDifference = dayDelta + (yearDelta * ADORIS_DAYS_PER_YEAR);
    const targetTotalAdorisDays = totalAdorisDays + totalDayDifference;
    const gregorianMillis = GREGORIAN_EPOCH_DATE.getTime() + (targetTotalAdorisDays * 24 * 60 * 60 * 1000);
    
    setViewedDate(new Date(gregorianMillis));
  }, [viewedYear, viewedMonthIndex, adorisDate, totalAdorisDays]);


  const yearCalendar = useMemo(() => generateYear(viewedYear), [viewedYear]);
  const currentMonth = yearCalendar.months[viewedMonthIndex];

  const [isYearPickerOpen, setYearPickerOpen] = useState(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isMeaningModalOpen, setMeaningModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isAnnouncementsModalOpen, setAnnouncementsModalOpen] = useState(false);
  const [isCountryPickerOpen, setCountryPickerOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isUpcomingTasksOpen, setIsUpcomingTasksOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayIdentifier | null>(null);
  const [featuredTimeZone, setFeaturedTimeZone] = useState<TimeZone | null>(null);

  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const { prayers, addPrayer, togglePrayer, deletePrayer } = usePrayers();
  const { upcomingTasks, ringingTask, dismissAlarm, initializeAudio } = useTaskNotifications(tasks);
  const { announcements, isLoading: areAnnouncementsLoading, error: announcementsError } = useAnnouncements();
  
  useEffect(() => {
    const initAudioOnFirstInteraction = () => {
        initializeAudio();
        window.removeEventListener('click', initAudioOnFirstInteraction);
        window.removeEventListener('touchstart', initAudioOnFirstInteraction);
    };

    window.addEventListener('click', initAudioOnFirstInteraction);
    window.addEventListener('touchstart', initAudioOnFirstInteraction);

    return () => {
        window.removeEventListener('click', initAudioOnFirstInteraction);
        window.removeEventListener('touchstart', initAudioOnFirstInteraction);
    };
  }, [initializeAudio]);


  const tasksForSelectedDay = useMemo(() => {
    if (!selectedDay) return [];
    return tasks.filter(task => 
      task.year === selectedDay.year &&
      task.monthIndex === selectedDay.monthIndex &&
      task.dayOfMonth === selectedDay.dayOfMonth
    );
  }, [tasks, selectedDay]);

  const prayersForSelectedDay = useMemo(() => {
    if (!selectedDay) return [];
    return prayers.filter(prayer =>
        prayer.year === selectedDay.year &&
        prayer.monthIndex === selectedDay.monthIndex &&
        prayer.dayOfMonth === selectedDay.dayOfMonth
    );
  }, [prayers, selectedDay]);
  
  const handleAddTask = useCallback((taskData: Omit<Task, 'id' | 'isCompleted' | 'reminderDateTime'>) => {
    const getDayOfYear = (monthIndex: number, dayOfMonth: number): number => {
        let dayOfYear = 0;
        for (let i = 0; i < monthIndex; i++) {
            dayOfYear += PERFECT_YEAR_DAYS_PER_MONTH[i];
        }
        return dayOfYear + dayOfMonth - 1;
    };

    const targetDayId = {
        year: taskData.year,
        monthIndex: taskData.monthIndex,
        dayOfMonth: taskData.dayOfMonth,
    };

    const targetDayOfYear = getDayOfYear(targetDayId.monthIndex, targetDayId.dayOfMonth);
    const currentDayOfYear = getDayOfYear(adorisDate.monthIndex, adorisDate.day);

    const dayDelta = targetDayOfYear - currentDayOfYear;
    const yearDelta = targetDayId.year - adorisDate.year;
    const totalDayDifference = dayDelta + (yearDelta * ADORIS_DAYS_PER_YEAR);
    const targetTotalAdorisDays = totalAdorisDays + totalDayDifference;

    const gregorianDayStartMillis = GREGORIAN_EPOCH_DATE.getTime() + (targetTotalAdorisDays * 24 * 60 * 60 * 1000);
    
    const [taskHour, taskMinute] = taskData.time.split(':').map(Number);
    const gregorianMillisIntoDay = convertAdorisTimeToMillis(taskHour, taskMinute);
    
    const reminderDateTime = new Date(gregorianDayStartMillis + gregorianMillisIntoDay).toISOString();

    addTask({ ...taskData, reminderDateTime });
  }, [adorisDate, totalAdorisDays, addTask]);

  const handleAddPrayer = useCallback((prayerData: Omit<Prayer, 'id' | 'isAnswered'>) => {
    addPrayer(prayerData);
  }, [addPrayer]);

  const changeMonth = (newIndexCallback: (prev: number) => number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setViewedMonthIndex(newIndexCallback);
      setIsAnimating(false);
    }, 150);
  };
  const goToNextMonth = () => changeMonth(prev => (prev + 1) % yearCalendar.months.length);
  const goToPrevMonth = () => changeMonth(prev => (prev - 1 + yearCalendar.months.length) % yearCalendar.months.length);

  const selectYear = (year: number) => {
    setViewedYear(year);
    setYearPickerOpen(false);
  };

  const handleDayClick = useCallback((day: number, weekdayIndex: number, isEnabled: boolean) => {
    if (!isEnabled) return;
    setSelectedDay({ year: viewedYear, monthIndex: viewedMonthIndex, dayOfMonth: day, weekdayIndex });
    setMeaningModalOpen(true);
  }, [viewedYear, viewedMonthIndex]);

  const handleSwitchToTasks = useCallback(() => {
    setMeaningModalOpen(false);
    setTaskModalOpen(true);
  }, []);

  const selectTimeZone = (tz: TimeZone) => {
    setFeaturedTimeZone(tz);
    setCountryPickerOpen(false);
  }

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 shadow-sm p-4 flex justify-between items-center border-b border-gray-200 dark:border-slate-700">
        <h1 className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400" style={{textShadow: '0 0 8px rgba(99, 102, 241, 0.2)'}}>Calendrier ADORIS</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => setAnnouncementsModalOpen(true)} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 rounded-full p-1" aria-label="Annonces">
            <MegaphoneIcon className="h-7 w-7" />
          </button>
          <button onClick={() => setInfoModalOpen(true)} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 rounded-full p-1" aria-label="Informations">
            <InformationCircleIcon className="h-7 w-7" />
          </button>
          <div className="relative">
            <button 
                onClick={() => setIsUpcomingTasksOpen(prev => !prev)}
                className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 rounded-full p-1"
                aria-label="Voir les rappels à venir"
            >
                <BellIcon className="h-7 w-7"/>
                {upcomingTasks.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-white text-xs items-center justify-center">
                      {upcomingTasks.length > 9 ? '9+' : upcomingTasks.length}
                    </span>
                  </span>
                )}
            </button>
          </div>
          <button onClick={() => setSettingsOpen(true)} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 rounded-full p-1" aria-label="Préférences">
            <SettingsIcon className="h-7 w-7" />
          </button>
        </div>
      </header>

      <main className="container mx-auto p-2 sm:p-4 md:p-6 flex flex-col items-center gap-6 md:gap-8">
        
        <section className="w-full flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center text-indigo-700 dark:text-indigo-400">Horloge Spirituelle (Heure Locale)</h2>
            <div className="w-full max-w-sm sm:max-w-md mx-auto">
                <AdorisClock time={adorisTime} />
            </div>
        </section>

        <section className="w-full max-w-7xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg p-2 sm:p-4 md:p-6 border border-gray-200 dark:border-slate-700">
           <CalendarHeader 
              monthIndex={viewedMonthIndex}
              monthName={currentMonth.name}
              year={viewedYear}
              onPrevMonth={goToPrevMonth}
              onNextMonth={goToNextMonth}
              onYearClick={() => setYearPickerOpen(true)}
            />
            <div className={`transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <MonthGrid 
                    month={currentMonth}
                    onDayClick={handleDayClick}
                    tasks={tasks}
                    viewedYear={viewedYear}
                    currentDate={adorisDate}
                    preferences={preferences}
                />
            </div>
        </section>
        
        <section className="w-full max-w-7xl text-center p-4">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Explorateur du Temps Mondial</h2>
            <button 
                onClick={() => setCountryPickerOpen(true)}
                className="bg-indigo-600 dark:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-500 shadow-lg"
            >
                Choisir un lieu
            </button>
            <div className="mt-6">
                <FeaturedClockDisplay featuredTimeZone={featuredTimeZone} baseDate={viewedDate} />
            </div>
        </section>

      </main>

      <AnnouncementsModal
        isOpen={isAnnouncementsModalOpen}
        onClose={() => setAnnouncementsModalOpen(false)}
        announcements={announcements}
        isLoading={areAnnouncementsLoading}
        error={announcementsError}
      />

      <InfoModal isOpen={isInfoModalOpen} onClose={() => setInfoModalOpen(false)} />

      <UpcomingTasksDropdown
        isOpen={isUpcomingTasksOpen}
        onClose={() => setIsUpcomingTasksOpen(false)}
        tasks={upcomingTasks}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
        preferences={preferences}
        setTheme={setTheme}
        setShowTaskCount={setShowTaskCount}
        toggleDarkMode={toggleDarkMode}
      />

      {isYearPickerOpen && (
          <YearPickerModal 
              isOpen={isYearPickerOpen}
              onClose={() => setYearPickerOpen(false)}
              currentYear={viewedYear}
              onSelectYear={selectYear}
          />
      )}
      
      {isMeaningModalOpen && selectedDay && (
          <MeaningOfTheDayModal
              isOpen={isMeaningModalOpen}
              onClose={() => setMeaningModalOpen(false)}
              dayId={selectedDay}
              onOpenTasks={handleSwitchToTasks}
              isToday={
                selectedDay.year === adorisDate.year &&
                selectedDay.monthIndex === adorisDate.monthIndex &&
                selectedDay.dayOfMonth === adorisDate.day
              }
              currentTime={adorisTime}
              prayers={prayersForSelectedDay}
              addPrayer={handleAddPrayer}
              togglePrayer={togglePrayer}
              deletePrayer={deletePrayer}
          />
      )}

      {isTaskModalOpen && selectedDay && (
          <TaskModal 
              isOpen={isTaskModalOpen}
              onClose={() => setTaskModalOpen(false)}
              dayId={selectedDay}
              tasks={tasksForSelectedDay}
              addTask={handleAddTask}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
          />
      )}

      {isCountryPickerOpen && (
          <CountryPickerModal
              isOpen={isCountryPickerOpen}
              onClose={() => setCountryPickerOpen(false)}
              timezones={TIMEZONES}
              onSelect={selectTimeZone}
          />
      )}

      <AlarmModal 
        isOpen={!!ringingTask}
        onClose={dismissAlarm}
        task={ringingTask}
      />
    </div>
  );
}

export default App;
