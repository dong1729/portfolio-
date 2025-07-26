import React, { useEffect, useState, useRef } from 'react';
import {
  PlayIcon,
  PauseIcon,
  VolumeXIcon,
  Volume2Icon,
  SkipBackIcon,
  SkipForwardIcon
} from 'lucide-react';

interface MusicPlayerProps {
  title: string;
  url: string;
  isDarkMode: boolean;
}

export function MusicPlayer({ title, url, isDarkMode }: MusicPlayerProps) {
  const internalPlaylist = [
    { title, url },
    { title: 'Focus Beats', url: '/music/focus.mp3' },
    { title: 'Chill Coding', url: '/music/chill.mp3' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const currentSong = internalPlaylist[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    audioRef.current = new Audio(currentSong.url);
    audioRef.current.loop = false;
    audioRef.current.volume = 0.5;
    audioRef.current.muted = isMuted;

    audioRef.current.onended = () => {
      handleNext();
    };

    if (isPlaying) {
      audioRef.current.play();
      startProgressTracking();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [currentSong.url]);

  const startProgressTracking = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (
        audioRef.current &&
        audioRef.current.duration &&
        !isSeeking
      ) {
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      }
    }, 500);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      audioRef.current.play();
      startProgressTracking();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % internalPlaylist.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const prevIndex =
      currentIndex === 0 ? internalPlaylist.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.MouseEvent | MouseEvent) => {
    if (!audioRef.current || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = (e as MouseEvent).clientX - rect.left;
    const newProgress = clickX / rect.width;
    audioRef.current.currentTime = newProgress * audioRef.current.duration;
    setProgress(newProgress * 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsSeeking(true);
    handleSeek(e);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleSeek(moveEvent);
    };

    const handleMouseUp = () => {
      setIsSeeking(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const bgColor = isDarkMode
    ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30'
    : 'bg-gradient-to-r from-blue-100 to-purple-100';
  const textColor = isDarkMode ? 'text-cyan-400' : 'text-blue-700';
  const buttonBgColor = isDarkMode ? 'bg-blue-900/50' : 'bg-blue-200';
  const buttonHoverColor = isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-300';
  const progressColor = isDarkMode ? 'bg-cyan-500' : 'bg-blue-500';
  const progressBgColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';

  return (
    <div className={`flex items-center space-x-2 rounded-full py-1 px-3 ${bgColor}`}>
      <button
        onClick={handlePrev}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${buttonBgColor} ${buttonHoverColor} transition-colors`}
        aria-label="Previous song"
      >
        <SkipBackIcon size={16} className={textColor} />
      </button>

      <button
        onClick={togglePlay}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${buttonBgColor} ${buttonHoverColor} transition-colors`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <PauseIcon size={16} className={textColor} />
        ) : (
          <PlayIcon size={16} className={textColor} />
        )}
      </button>

      <button
        onClick={handleNext}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${buttonBgColor} ${buttonHoverColor} transition-colors`}
        aria-label="Next song"
      >
        <SkipForwardIcon size={16} className={textColor} />
      </button>

      <div className="hidden sm:block">
        <p className={`text-xs ${textColor} truncate max-w-[100px] md:max-w-[200px]`}>
          {currentSong.title}
        </p>
      </div>

      {/* Progress bar with rounded corners and drag support */}
      <div
        ref={progressBarRef}
        className={`relative w-16 sm:w-24 h-2 cursor-pointer overflow-hidden ${progressBgColor} hover:scale-105 transition-transform duration-200 rounded-full`}
        onMouseDown={handleMouseDown}
      >
        <div
          className={`${progressColor} h-full transition-all duration-200 rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        onClick={toggleMute}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${buttonBgColor} ${buttonHoverColor} transition-colors`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeXIcon size={16} className={textColor} />
        ) : (
          <Volume2Icon size={16} className={textColor} />
        )}
      </button>
    </div>
  );
}
