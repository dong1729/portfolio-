import React from 'react';
import { achievementsData } from '../../data/portfolioData';
import { CheckCircleIcon, ClockIcon } from 'lucide-react';
export function AchievementsSection() {
  // Function to get color classes based on color name
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, {
      bg: string;
      border: string;
      text: string;
    }> = {
      blue: {
        bg: 'bg-blue-900/20',
        border: 'border-blue-700',
        text: 'text-blue-400'
      },
      cyan: {
        bg: 'bg-cyan-900/20',
        border: 'border-cyan-700',
        text: 'text-cyan-400'
      },
      pink: {
        bg: 'bg-pink-900/20',
        border: 'border-pink-700',
        text: 'text-pink-400'
      },
      green: {
        bg: 'bg-green-900/20',
        border: 'border-green-700',
        text: 'text-green-400'
      },
      purple: {
        bg: 'bg-purple-900/20',
        border: 'border-purple-700',
        text: 'text-purple-400'
      },
      amber: {
        bg: 'bg-amber-900/20',
        border: 'border-amber-700',
        text: 'text-amber-400'
      }
    };
    return colorMap[color] || colorMap.blue;
  };
  return <section id="achievements" className="mb-16">
      <h2 className="text-lg text-green-400 mb-6 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
        Achievements & Certificates{' '}
        <span className="text-xs text-gray-500">/ recent</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievementsData.map((achievement, index) => {
        const colorClasses = getColorClasses(achievement.color);
        const isCompleted = achievement.status === 'completed';
        return <div key={index} className={`border ${colorClasses.border} rounded-lg p-4 ${colorClasses.bg} hover:scale-[1.02] transition-transform duration-200`}>
              <div className="flex justify-between items-start">
                <h3 className={`text-lg font-semibold ${colorClasses.text}`}>
                  {achievement.name}
                </h3>
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${isCompleted ? 'bg-green-900/30 text-green-400' : 'bg-blue-900/30 text-blue-400'}`}>
                  {isCompleted ? <>
                      <CheckCircleIcon size={12} />
                      <span>Completed</span>
                    </> : <>
                      <ClockIcon size={12} />
                      <span>In Progress</span>
                    </>}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-400 text-sm">{achievement.issuer}</p>
                <span className="text-xs text-gray-500">
                  {achievement.date}
                </span>
              </div>
            </div>;
      })}
      </div>
    </section>;
}