import type { ALARM_SOUNDS } from './constants';

export type AlarmSound = typeof ALARM_SOUNDS[number]['id'];

export type CalendarTheme = 'spiritual' | 'minimalist' | 'cosmic';

export interface CalendarPreferences {
    theme: CalendarTheme;
    showTaskCount: boolean;
    isDarkMode: boolean;
}

export interface Task {
  id: string;
  text: string;
  time: string; // "HH:mm"
  isCompleted: boolean;
  reminderDateTime: string; // ISO String
  alarmSound?: AlarmSound;
  // Date identifiers
  year: number;
  monthIndex: number;
  dayOfMonth: number;
}

export interface Prayer {
  id: string;
  text: string;
  isAnswered: boolean;
  // Date identifiers
  year: number;
  monthIndex: number;
  dayOfMonth: number;
}

export interface DayIdentifier {
  dayOfMonth: number;
  monthIndex: number;
  year: number;
  weekdayIndex: number;
}

export interface AdorisTime {
  hour: number;
  minute: number;
  second: number;
  tick: number;
}


export interface AdorisDate {
    year: number;
    monthIndex: number;
    day: number;
}

export interface TimeZone {
  city: string;
  country: string;
  flag: string;
  timeZone: string;
}

export interface Announcement {
  title: string;
  content: string;
}
