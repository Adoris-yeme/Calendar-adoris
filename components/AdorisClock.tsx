import React, { useRef, useEffect, useState } from 'react';
import {
  ADORIS_HOUR_NAMES,
  ADORIS_CYCLE_THEMES,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../constants';

interface AdorisClockProps {
  time: {
    hour: number;
    minute: number;
    second: number;
    tick: number;
  }
}

export const AdorisClock: React.FC<AdorisClockProps> = ({ time }) => {
    const { hour, minute, second, tick } = time;
    const hourIndex = hour - 1;

    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState(320);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            if (entries[0]) {
                const newSize = Math.min(entries[0].contentRect.width, entries[0].contentRect.height);
                setSize(newSize);
            }
        });
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const cycleIndex = Math.floor(hourIndex / 7);
    const currentTheme = ADORIS_CYCLE_THEMES[cycleIndex];
    const currentHourName = ADORIS_HOUR_NAMES[hourIndex];
    
    const secondsWithTicks = second + tick / 49;
    const minutesWithSeconds = minute + secondsWithTicks / SECONDS_PER_MINUTE;
    const hoursWithMinutes = hourIndex + minutesWithSeconds / MINUTES_PER_HOUR;

    const secondsRotation = (secondsWithTicks / SECONDS_PER_MINUTE) * 360;
    const minutesRotation = (minutesWithSeconds / MINUTES_PER_HOUR) * 360;
    const hoursRotation = (hoursWithMinutes / 21) * 360;

    const prevSecondsRotationRef = useRef(secondsRotation);
    useEffect(() => {
        prevSecondsRotationRef.current = secondsRotation;
    });
    const disableSecondsTransition = Math.abs(prevSecondsRotationRef.current - secondsRotation) > 180;

    return (
        <div className="flex flex-col items-center w-full font-sans">
            {/* Digital Display */}
            <div 
                className={`w-full p-3 sm:p-4 rounded-lg shadow-inner mb-4 sm:mb-6 text-center transition-colors border bg-slate-100/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700`}
                title={`${hour}. ${currentHourName}`}
            >
                <h3 className="text-base sm:text-lg font-bold text-indigo-700 dark:text-indigo-400">{currentTheme.name}</h3>
                <p className="text-2xl sm:text-3xl font-mono my-1 tracking-tight text-gray-800 dark:text-gray-200">
                    {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}:{String(second).padStart(2, '0')}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 truncate">{currentHourName}</p>
            </div>

            {/* Analog Watch */}
            <div
                ref={containerRef}
                className="relative w-full rounded-full shadow-lg"
                style={{
                    aspectRatio: '1 / 1',
                    padding: `${size * 0.04}px`, // Equivalent to border width
                    background: 'linear-gradient(145deg, #b9932f, #faf0c4, #b9932f)',
                }}
            >
                {/* Dial */}
                <div className="relative w-full h-full rounded-full flex items-center justify-center bg-white dark:bg-slate-800">

                    {/* Minute Markers */}
                    {Array.from({ length: 49 }).map((_, i) => {
                        const angle = i * (360 / 49);
                        return (
                             <div key={`m-${i}`} className="absolute top-0 left-1/2 w-px h-full" style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}>
                                <div
                                    className="bg-gray-300 dark:bg-slate-600 absolute"
                                    style={{
                                        width: `1px`,
                                        height: '4%',
                                        top: '0%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                    }}
                                />
                            </div>
                        )
                    })}
                    
                     {/* Hour Markers */}
                    {Array.from({ length: 21 }).map((_, i) => {
                        const angle = i * (360 / 21);
                        return (
                             <div key={`h-marker-${i}`} className="absolute top-0 left-1/2 w-px h-full" style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}>
                                <div
                                    className="bg-gray-800 dark:bg-gray-200 absolute rounded-full"
                                    style={{
                                        width: `${size * 0.02}px`,
                                        height: `${size * 0.02}px`,
                                        top: '5%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                            </div>
                        )
                    })}

                    {/* Numbers */}
                    {Array.from({ length: 21 }).map((_, i) => {
                        const angle = i * (360 / 21);
                        const isMajorHour = (i + 1) % 3 === 0;
                        const radius = size * (isMajorHour ? 0.38 : 0.4);
                        const x = size / 2 + radius * Math.cos((angle - 90) * Math.PI / 180);
                        const y = size / 2 + radius * Math.sin((angle - 90) * Math.PI / 180);
                        if (!isMajorHour) return null; // Affiche seulement 3, 6, 9, etc pour la clarté
                        return (
                            <div
                                key={`n-${i}`}
                                className="absolute text-center flex items-center justify-center"
                                style={{
                                    left: `${x}px`,
                                    top: `${y}px`,
                                    transform: 'translate(-50%, -50%)',
                                    color: '#1f2937', // gray-800
                                    fontSize: `${size * 0.1}px`,
                                    fontWeight: '600',
                                }}
                            >
                                <span className="dark:text-gray-200">{i + 1}</span>
                            </div>
                        )
                    })}
                    
                    {/* Hour Hand */}
                    <div className="absolute bottom-1/2 left-1/2 z-10" style={{ height: '25%', width: `${Math.max(4, size * 0.025)}px`, transformOrigin: 'bottom', transform: `translateX(-50%) rotate(${hoursRotation}deg)`, transition: 'transform 0.1s linear' }}>
                        <div className="w-full h-full bg-slate-900 dark:bg-slate-200" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                    </div>
                    
                    {/* Minute Hand */}
                    <div className="absolute bottom-1/2 left-1/2 z-10" style={{ height: '38%', width: `${Math.max(3, size * 0.02)}px`, transformOrigin: 'bottom', transform: `translateX(-50%) rotate(${minutesRotation}deg)`, transition: 'transform 0.1s linear' }}>
                         <div className="w-full h-full bg-slate-900 dark:bg-slate-200" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                    </div>

                    {/* Second Hand */}
                    <div className="absolute bottom-1/2 left-1/2 z-20" style={{ height: '40%', width: `${Math.max(1, size*0.005)}px`, transformOrigin: 'bottom', transform: `translateX(-50%) rotate(${secondsRotation}deg)`, transition: disableSecondsTransition ? 'none' : 'transform 0.1s linear' }}>
                        <div className="w-full h-[90%] bg-amber-500"></div>
                    </div>

                    {/* Center Pivot */}
                    <div className="absolute w-4 h-4 rounded-full z-30 bg-amber-500 dark:bg-amber-400" style={{ 
                        width: `${size*0.035}px`, 
                        height: `${size*0.035}px`, 
                    }} />
                </div>
            </div>
        </div>
    );
};