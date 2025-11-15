import { useState, useEffect } from 'react';
import type { Prayer } from '../types';

const STORAGE_KEY = 'adoris_prayers';

export const usePrayers = () => {
    const [prayers, setPrayers] = useState<Prayer[]>(() => {
        try {
            const storedPrayers = window.localStorage.getItem(STORAGE_KEY);
            return storedPrayers ? JSON.parse(storedPrayers) : [];
        } catch (error) {
            console.error("Error reading prayers from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prayers));
        } catch (error) {
            console.error("Error writing prayers to localStorage", error);
        }
    }, [prayers]);

    const addPrayer = (prayerData: Omit<Prayer, 'id' | 'isAnswered'>) => {
        const newPrayer: Prayer = {
            ...prayerData,
            id: new Date().toISOString() + Math.random(),
            isAnswered: false,
        };
        setPrayers(prevPrayers => [...prevPrayers, newPrayer]);
    };

    const togglePrayer = (prayerId: string) => {
        setPrayers(prevPrayers =>
            prevPrayers.map(prayer =>
                prayer.id === prayerId ? { ...prayer, isAnswered: !prayer.isAnswered } : prayer
            )
        );
    };

    const deletePrayer = (prayerId: string) => {
        setPrayers(prevPrayers => prevPrayers.filter(prayer => prayer.id !== prayerId));
    };

    return { prayers, addPrayer, togglePrayer, deletePrayer };
};
