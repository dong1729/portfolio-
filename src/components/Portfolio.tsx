import React, { useEffect, useState } from 'react';
import { Header } from './portfolio/Header';
import { DeveloperMetrics } from './portfolio/DeveloperMetrics';
import { About } from './portfolio/About';
import { Skills } from './portfolio/Skills';
import { ProjectsSection } from './portfolio/ProjectsSection';
import { AchievementsSection } from './portfolio/AchievementsSection';
import { BlogsSection } from './portfolio/BlogsSection';
import { Footer } from './portfolio/Footer';
import { userData } from '../data/portfolioData';
import { AnimatedBackground } from './portfolio/AnimatedBackground';
import { useTheme } from '../hooks/useTheme';
export function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const {
    isDarkMode
  } = useTheme();
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    // Track scroll position for parallax effects
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  if (isLoading) {
    return <div className={`w-full h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-[#0A0A14] text-cyan-400' : 'bg-gray-50 text-blue-600'}`}>
        <div className={`w-16 h-16 border-4 ${isDarkMode ? 'border-cyan-400 border-t-transparent' : 'border-blue-600 border-t-transparent'} rounded-full animate-spin mb-4`}></div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-mono mb-2">Loading portfolio...</p>
          <div className={`w-48 h-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div className={`h-full ${isDarkMode ? 'bg-gradient-to-r from-cyan-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'} animate-pulse`} style={{
            width: `${Math.random() * 30 + 70}%`
          }}></div>
          </div>
        </div>
      </div>;
  }
  return <div className={`w-full min-h-screen ${isDarkMode ? 'bg-[#0A0A14] text-gray-200' : 'bg-gray-50 text-gray-800'} font-mono relative`}>
      {isDarkMode && <AnimatedBackground />}
      <div className="relative z-10">
        <Header userData={userData} />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <DeveloperMetrics />
          <About />
          <Skills />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <ProjectsSection />
          </div>
          <AchievementsSection />
          <BlogsSection />
        </main>
        <Footer />
      </div>
      {/* Fixed corner decoration - only in dark mode */}
      {isDarkMode && <>
          <div className="fixed top-0 right-0 w-64 h-64 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none z-0"></div>
          <div className="fixed bottom-0 left-0 w-64 h-64 bg-gradient-to-t from-pink-500/10 to-transparent rounded-tr-full pointer-events-none z-0"></div>
        </>}
    </div>;
}