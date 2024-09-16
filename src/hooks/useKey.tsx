import { useEffect } from 'react';

export function useKey(callback: () => void, key: string) {
  useEffect(() => {
    const handleEscPress = (evt: KeyboardEvent) => {
      if (evt.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    };
    document.addEventListener('keydown', handleEscPress);
    return () => document.removeEventListener('keydown', handleEscPress);
  }, [callback, key]);
}
