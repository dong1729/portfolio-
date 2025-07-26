import React, { useEffect, useState } from 'react';
import { metricsData } from '../../data/portfolioData';
import { TrendingUpIcon, CodeIcon, GitBranchIcon, CalendarIcon } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
export function DeveloperMetrics() {
  const [animatedCounts, setAnimatedCounts] = useState({
    projects: 0,
    languages: 0,
    contributions: 0,
    experience: 0
  });
  const {
    ref: sectionRef,
    isVisible
  } = useScrollReveal<HTMLElement>();
  // Animate the counting
  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000; // 2 seconds
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      setAnimatedCounts({
        projects: Math.floor(progress * metricsData.projects.count),
        languages: Math.floor(progress * metricsData.languages.count),
        contributions: Math.floor(progress * metricsData.contributions.count),
        experience: Math.floor(progress * metricsData.experience.count)
      });
      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / framesPerSecond);
    return () => clearInterval(timer);
  }, [isVisible]);
  // Function to get the icon for each metric
  const getMetricIcon = (metricKey: string) => {
    switch (metricKey) {
      case 'projects':
        return <TrendingUpIcon className="w-6 h-6" />;
      case 'languages':
        return <CodeIcon className="w-6 h-6" />;
      case 'contributions':
        return <GitBranchIcon className="w-6 h-6" />;
      case 'experience':
        return <CalendarIcon className="w-6 h-6" />;
      default:
        return null;
    }
  };
  // Function to get the color class for each metric
  const getColorClass = (color: string) => {
    switch (color) {
      case 'cyan':
        return 'from-cyan-600 to-cyan-900 text-cyan-400 border-cyan-600';
      case 'pink':
        return 'from-pink-600 to-pink-900 text-pink-400 border-pink-600';
      case 'purple':
        return 'from-purple-600 to-purple-900 text-purple-400 border-purple-600';
      case 'green':
        return 'from-green-600 to-green-900 text-green-400 border-green-600';
      default:
        return 'from-cyan-600 to-cyan-900 text-cyan-400 border-cyan-600';
    }
  };
  return <section ref={sectionRef} id="metrics-section" className={`mb-16 relative transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-lg text-cyan-400 mb-6 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
        Developer Metrics <span className="text-xs text-gray-500">/ 2023</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(metricsData).map(([key, metric], index) => <div key={key} className={`rounded-lg border bg-gradient-to-br ${getColorClass(metric.color)} border-opacity-50 p-4 relative overflow-hidden
                       hover:shadow-lg hover:shadow-${metric.color}-900/20 transition-all duration-300 transform hover:-translate-y-1`} style={{
        animationDelay: `${index * 100}ms`,
        transitionDelay: `${index * 100}ms`
      }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-bold">
                  {animatedCounts[key as keyof typeof animatedCounts]}+
                </h3>
                <p className="text-sm opacity-80">{metric.label}</p>
                <p className="text-xs opacity-60 mt-2">{metric.description}</p>
              </div>
              <div className={`p-2 rounded-full bg-opacity-50`} style={{
            backgroundColor: `rgba(${key === 'projects' ? '6,182,212' : key === 'languages' ? '236,72,153' : key === 'contributions' ? '124,58,237' : '16,185,129'}, 0.2)`
          }}>
                {getMetricIcon(key)}
              </div>
            </div>
          </div>)}
      </div>
    </section>;
}