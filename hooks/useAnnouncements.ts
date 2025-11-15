import { useState, useEffect } from 'react';
import type { Announcement } from '../types';

export const useAnnouncements = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch from the public folder
                const response = await fetch('/announcements.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAnnouncements(data);
            } catch (e: any) {
                console.error("Failed to fetch announcements:", e);
                setError("Impossible de charger les annonces. Veuillez réessayer plus tard.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    return { announcements, isLoading, error };
};
