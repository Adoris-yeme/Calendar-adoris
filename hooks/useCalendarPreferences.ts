import { useState, useEffect, useCallback } from 'react';
import type { CalendarPreferences, CalendarTheme } from '../types';

const STORAGE_KEY = 'adoris_calendar_preferences';

const defaultPreferences: CalendarPreferences = {
    theme: 'spiritual',
    showTaskCount: true,
    isDarkMode: false,
};

export const useCalendarPreferences = () => {
    const [preferences, setPreferences] = useState<CalendarPreferences>(() => {
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (stored) {
                // Merge stored prefs with defaults to prevent missing keys on update
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error("Error reading preferences from localStorage", error);
        }
        return defaultPreferences;
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        } catch (error) {
            console.error("Error writing preferences to localStorage", error);
        }
    }, [preferences]);

    const setTheme = useCallback((theme: CalendarTheme) => {
        setPreferences(p => ({ ...p, theme }));
    }, []);

    const setShowTaskCount = useCallback((show: boolean) => {
        setPreferences(p => ({ ...p, showTaskCount: show }));
    }, []);

    const toggleDarkMode = useCallback(() => {
        setPreferences(p => ({ ...p, isDarkMode: !p.isDarkMode }));
    }, []);

    return {
        preferences,
        setTheme,
        setShowTaskCount,
        toggleDarkMode,
    };
};
