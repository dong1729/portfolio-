import React, { useState } from 'react';
import { blogsData, timelineData } from '../../data/portfolioData';
import { ClockIcon, GlobeIcon, LayoutIcon, RocketIcon, PaletteIcon } from 'lucide-react';
export function BlogsSection() {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
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
  // Function to get timeline icon
  const getTimelineIcon = (iconName: string) => {
    switch (iconName) {
      case 'globe':
        return <GlobeIcon size={16} />;
      case 'layout':
        return <LayoutIcon size={16} />;
      case 'rocket':
        return <RocketIcon size={16} />;
      case 'palette':
        return <PaletteIcon size={16} />;
      default:
        return null;
    }
  };
  return <>
      {/* Timeline Section */}
      <section className="mb-16">
        <h2 className="text-lg text-blue-400 mb-6 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
          Timeline <span className="text-xs text-gray-500">/ 2023</span>
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
          {/* Timeline events */}
          <div className="space-y-8 ml-8">
            {timelineData.map((event, index) => <div key={index} className={`relative transition-all duration-300 ${activeTimelineIndex === index ? 'scale-105' : 'opacity-70'}`} onClick={() => setActiveTimelineIndex(index)}>
                {/* Timeline dot */}
                <div className={`absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center ${activeTimelineIndex === index ? 'bg-blue-500 text-white' : 'bg-[#121520] text-blue-400'} border-2 border-blue-700`}>
                  {getTimelineIcon(event.icon)}
                </div>
                {/* Event content */}
                <div className="bg-[#121520] p-4 rounded-lg border border-blue-900/50">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium">{event.title}</h3>
                    <span className="text-xs text-blue-400">
                      {event.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    {event.description}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Blogs Section */}
      <section id="blogs" className="mb-16">
        <h2 className="text-lg text-pink-400 mb-6 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-pink-400"></span>
          Blogs <span className="text-xs text-gray-500">/ recent</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogsData.map((blog, index) => {
          const colorClasses = getColorClasses(blog.color);
          return <div key={index} className="bg-[#121520] rounded-lg overflow-hidden border border-gray-800 hover:border-pink-700 transition-all duration-300 group cursor-pointer">
                <div className="relative h-40">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] to-transparent"></div>
                  <span className={`absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded ${colorClasses.bg} ${colorClasses.text}`}>
                    {blog.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-pink-400 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{blog.date}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <ClockIcon size={12} />
                      {blog.readTime}
                    </span>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </section>
    </>;
}