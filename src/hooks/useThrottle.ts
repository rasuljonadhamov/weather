import { useRef, useCallback } from 'react';

export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  const lastCall = useRef<number>(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const lastPromise = useRef<Promise<ReturnType<T>> | null>(null);

  const throttled = useCallback(
    (...args: Parameters<T>): Promise<ReturnType<T>> => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCall.current;

      if (lastPromise.current && timeSinceLastCall < delay) {
        return lastPromise.current;
      }

      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }

      if (timeSinceLastCall >= delay) {
        lastCall.current = now;
        lastPromise.current = Promise.resolve(func(...args));
        return lastPromise.current;
      }

      const remainingTime = delay - timeSinceLastCall;
      
      lastPromise.current = new Promise((resolve) => {
        timeout.current = setTimeout(() => {
          lastCall.current = Date.now();
          resolve(func(...args));
        }, remainingTime);
      });

      return lastPromise.current;
    },
    [func, delay]
  );

  return throttled;
}