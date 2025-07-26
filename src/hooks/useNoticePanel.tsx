import React, { useEffect, useState } from 'react';
export function useNoticePanel() {
  const [isVisible, setIsVisible] = useState(true);
  const [hideUntil, setHideUntil] = useState<number | null>(null);
  // Check localStorage on mount
  useEffect(() => {
    const savedHideUntil = localStorage.getItem('notice-panel-hide-until');
    if (savedHideUntil) {
      const hideUntilTime = parseInt(savedHideUntil, 10);
      if (hideUntilTime > Date.now()) {
        // Still within hide period
        setIsVisible(false);
        setHideUntil(hideUntilTime);
      } else {
        // Hide period expired, clear localStorage
        localStorage.removeItem('notice-panel-hide-until');
      }
    }
  }, []);
  // Set up timer to show panel after hide period
  useEffect(() => {
    if (hideUntil && !isVisible) {
      const timeRemaining = hideUntil - Date.now();
      if (timeRemaining <= 0) {
        setIsVisible(true);
        setHideUntil(null);
        localStorage.removeItem('notice-panel-hide-until');
        return;
      }
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHideUntil(null);
        localStorage.removeItem('notice-panel-hide-until');
      }, timeRemaining);
      return () => clearTimeout(timer);
    }
  }, [hideUntil, isVisible]);
  // Function to hide panel for 5 minutes
  const hideForFiveMinutes = (hide: boolean) => {
    if (hide) {
      const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
      setHideUntil(fiveMinutesFromNow);
      setIsVisible(false);
      localStorage.setItem('notice-panel-hide-until', fiveMinutesFromNow.toString());
    } else {
      setIsVisible(true);
      setHideUntil(null);
      localStorage.removeItem('notice-panel-hide-until');
    }
  };
  // Function to close panel immediately
  const closePanel = () => {
    setIsVisible(false);
  };
  return {
    isVisible,
    hideForFiveMinutes,
    closePanel
  };
}