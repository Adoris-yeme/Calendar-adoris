import { useState, useEffect } from 'react';
import type { Task } from '../types';

const STORAGE_KEY = 'adoris_tasks';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const storedTasks = window.localStorage.getItem(STORAGE_KEY);
            return storedTasks ? JSON.parse(storedTasks) : [];
        } catch (error) {
            console.error("Error reading tasks from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error("Error writing tasks to localStorage", error);
        }
    }, [tasks]);

    const addTask = (taskData: Omit<Task, 'id' | 'isCompleted'>) => {
        const newTask: Task = {
            ...taskData,
            id: new Date().toISOString() + Math.random(),
            isCompleted: false,
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const toggleTask = (taskId: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    const deleteTask = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    return { tasks, addTask, toggleTask, deleteTask };
};