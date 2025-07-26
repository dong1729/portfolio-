import React, { useState } from 'react';
import { communitiesData, projectsData } from '../../data/portfolioData';
export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('communities');
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
  return <>
      {/* Communities Section */}
      <section id="communities" className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-purple-400 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-400"></span>
            Communities & Projects
          </h2>
          <div className="flex rounded-md overflow-hidden">
            <button onClick={() => setActiveTab('communities')} className={`px-3 py-1 text-xs ${activeTab === 'communities' ? 'bg-purple-700 text-white' : 'bg-[#121520] text-gray-400'}`}>
              COMMUNITIES
            </button>
            <button onClick={() => setActiveTab('projects')} className={`px-3 py-1 text-xs ${activeTab === 'projects' ? 'bg-cyan-700 text-white' : 'bg-[#121520] text-gray-400'}`}>
              PROJECTS
            </button>
          </div>
        </div>
        {activeTab === 'communities' && <div className="space-y-4">
            {communitiesData.map((community, index) => {
          const colorClasses = getColorClasses(community.color);
          return <div key={index} className={`border ${colorClasses.border} rounded-lg p-4 ${colorClasses.bg} hover:translate-x-1 transition-transform duration-200`}>
                  <div className="flex justify-between items-start">
                    <h3 className={`text-lg font-semibold ${colorClasses.text}`}>
                      {community.name}
                    </h3>
                    <span className="text-xs bg-[#121520] px-2 py-1 rounded">
                      {community.period}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-2 mb-3">
                    {community.role}
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    {community.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {community.tags.map((tag, tagIndex) => <span key={tagIndex} className="text-xs px-2 py-0.5 rounded bg-[#121520] text-gray-400">
                        #{tag}
                      </span>)}
                  </div>
                </div>;
        })}
          </div>}
        {activeTab === 'projects' && <div className="space-y-4">
            {projectsData.map((project, index) => {
          const colorClasses = getColorClasses(project.color);
          return <div key={index} className={`border ${colorClasses.border} rounded-lg p-4 ${colorClasses.bg} hover:translate-x-1 transition-transform duration-200`}>
                  <div className="flex justify-between items-start">
                    <h3 className={`text-lg font-semibold ${colorClasses.text}`}>
                      {project.name}
                    </h3>
                    <span className="text-xs bg-[#121520] px-2 py-1 rounded">
                      {project.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => <span key={tagIndex} className="text-xs px-2 py-0.5 rounded bg-[#121520] text-gray-400">
                        #{tag}
                      </span>)}
                  </div>
                  <div className="mt-3">
                    <a href={project.link} className={`text-xs ${colorClasses.text} hover:underline`}>
                      View Project →
                    </a>
                  </div>
                </div>;
        })}
          </div>}
      </section>
    </>;
}