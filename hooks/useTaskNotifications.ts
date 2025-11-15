import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { Task, AlarmSound } from '../types';

/**
 * Hook pour gérer les notifications, les alarmes sonores et la liste des tâches à venir.
 */
export const useTaskNotifications = (tasks: Task[]) => {
    const [notificationPermission, setNotificationPermission] = useState('default');
    const [ringingTask, setRingingTask] = useState<Task | null>(null);
    
    const audioContextRef = useRef<AudioContext | null>(null);
    const [isAudioInitialized, setIsAudioInitialized] = useState(false);
    const soundSources = useRef(new Set<AudioNode>());
    
    const notifiedTaskIds = useRef(new Set<string>());

    const initializeAudio = useCallback(() => {
        if (isAudioInitialized || audioContextRef.current) return;

        try {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (context.state === 'suspended') {
                context.resume().then(() => {
                    console.log("AudioContext resumed successfully.");
                    audioContextRef.current = context;
                    setIsAudioInitialized(true);
                }).catch(e => console.error("Failed to resume AudioContext", e));
            } else {
                 audioContextRef.current = context;
                 setIsAudioInitialized(true);
                 console.log("AudioContext started successfully.");
            }
        } catch (e) {
            console.error("Web Audio API is not supported.", e);
        }
    }, [isAudioInitialized]);

    const playSound = useCallback(async (soundType: AlarmSound = 'chime') => {
        if (!isAudioInitialized || !audioContextRef.current) {
            console.warn("Audio not initialized, cannot play sound.");
            return;
        }
        
        stopSound(); // Stop any currently playing sound
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const now = ctx.currentTime;
        switch (soundType) {
            case 'bell':
                [800, 1200, 1500].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.frequency.value = freq + (Math.random() - 0.5) * 10;
                    osc.type = 'sine';
                    gain.gain.setValueAtTime(0.2 / (i + 1), now);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5 + (i * 0.2));
                    osc.connect(gain).connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 2);
                    soundSources.current.add(osc);
                });
                break;
            case 'vibration':
                const oscVib = ctx.createOscillator();
                const gainVib = ctx.createGain();
                oscVib.type = 'sawtooth';
                oscVib.frequency.value = 60;
                gainVib.gain.setValueAtTime(0.3, now);
                gainVib.gain.linearRampToValueAtTime(0, now + 1);
                oscVib.connect(gainVib).connect(ctx.destination);
                oscVib.start(now);
                oscVib.stop(now + 1);
                soundSources.current.add(oscVib);
                break;
            case 'chime':
            default:
                 [880, 884].forEach(freq => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.2, now);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
                    osc.connect(gain).connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 1);
                    soundSources.current.add(osc);
                });
                break;
        }
    }, [isAudioInitialized]);
    
    const stopSound = () => {
        soundSources.current.forEach(source => {
            try { (source as OscillatorNode).stop(); } catch (e) {}
            source.disconnect();
        });
        soundSources.current.clear();
    };

    useEffect(() => {
        if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
            Notification.requestPermission().then(setNotificationPermission);
        } else if (typeof Notification !== 'undefined') {
            setNotificationPermission(Notification.permission);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (ringingTask) return;

            const now = new Date();
            const dueTask = tasks.find(task => {
                if (task.isCompleted || notifiedTaskIds.current.has(task.id)) {
                    return false;
                }
                const taskTime = new Date(task.reminderDateTime);
                return now.getTime() >= taskTime.getTime();
            });

            if (dueTask) {
                setRingingTask(dueTask);
                notifiedTaskIds.current.add(dueTask.id);

                if (notificationPermission === 'granted') {
                    new Notification('Rappel ADORIS', {
                        body: `${dueTask.text} à ${dueTask.time}`,
                        icon: 'https://www.gstatic.com/images/branding/product/1x/google_gemini_32dp.png',
                        tag: dueTask.id,
                    });
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [tasks, notificationPermission, ringingTask]);

    useEffect(() => {
        let soundInterval: number | null = null;
        if (ringingTask) {
            const loopSound = () => playSound(ringingTask.alarmSound);
            loopSound(); 
            soundInterval = window.setInterval(loopSound, 2000);
        }
        return () => {
            if (soundInterval) {
                clearInterval(soundInterval);
            }
            stopSound();
        };
    }, [ringingTask, playSound]);
    
    const dismissAlarm = () => {
        stopSound();
        setRingingTask(null);
    };

    const upcomingTasks = useMemo(() => {
        const now = new Date();
        return tasks
            .filter(task => !task.isCompleted && new Date(task.reminderDateTime) > now)
            .sort((a, b) => new Date(a.reminderDateTime).getTime() - new Date(b.reminderDateTime).getTime());
    }, [tasks]);

    return { upcomingTasks, ringingTask, dismissAlarm, initializeAudio };
};
