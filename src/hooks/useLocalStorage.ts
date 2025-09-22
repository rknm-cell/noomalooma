import { useState, useEffect } from 'react';
import type { PlayMoment } from '~/types/playMoment';

const STORAGE_KEY = 'noomalooma-play-moments';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedItem = JSON.parse(item) as T;
        setStoredValue(parsedItem);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
};

export const usePlayMoments = () => {
  const [moments, setMoments] = useLocalStorage<Record<string, PlayMoment[]>>(
    STORAGE_KEY,
    {}
  );

  const savePlayMoment = (moment: PlayMoment) => {
    const date = moment.timestamp.toISOString().split('T')[0];
    if (date) {
      setMoments(prev => ({
        ...prev,
        [date]: [...(prev[date] ?? []), moment]
      }));
    }
  };

  const getPlayMoments = (date?: string) => {
    if (date) {
      return moments[date] ?? [];
    }
    return Object.values(moments).flat();
  };

  const getPlayMomentsByMood = (mood: string) => {
    return Object.values(moments)
      .flat()
      .filter(moment => moment.mood === mood);
  };

  return {
    moments,
    savePlayMoment,
    getPlayMoments,
    getPlayMomentsByMood
  };
};
