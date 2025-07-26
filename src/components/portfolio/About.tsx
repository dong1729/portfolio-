import React from 'react';
import { aboutData } from '../../data/portfolioData';
import { CodeIcon, MusicIcon, PlaneIcon, GamepadIcon, CameraIcon, PaletteIcon, BookOpenIcon, DumbbellIcon, MapPinIcon, BriefcaseIcon, GraduationCapIcon } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
export function About() {
  const {
    ref: sectionRef,
    isVisible
  } = useScrollReveal<HTMLElement>();
  // Function to get the icon component based on name
  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <CodeIcon size={14} />;
      case 'music':
        return <MusicIcon size={14} />;
      case 'plane':
        return <PlaneIcon size={14} />;
      case 'gamepad':
        return <GamepadIcon size={14} />;
      case 'camera':
        return <CameraIcon size={14} />;
      case 'palette':
        return <PaletteIcon size={14} />;
      case 'book-open':
        return <BookOpenIcon size={14} />;
      case 'dumbbell':
        return <DumbbellIcon size={14} />;
      default:
        return null;
    }
  };
  return <section ref={sectionRef} id="about" className={`mb-16 border-l-2 border-pink-600 pl-4 transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-lg text-pink-400 mb-6 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-pink-400"></span>
        {aboutData.title}{' '}
        <span className="text-xs text-gray-500">/ {aboutData.subtitle}</span>
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="bg-[#121520] rounded-lg p-4 border border-pink-900 border-opacity-30 hover:shadow-lg hover:shadow-pink-900/10 transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative group mb-4">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur group-hover:animate-spin-slow"></div>
              <img src={aboutData.avatar} alt={aboutData.name} className="relative w-24 h-24 rounded-full border-2 border-pink-600 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-center text-white">
              {aboutData.name}
            </h3>
            <p className="text-pink-400 text-sm text-center mb-4">
              {aboutData.role}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 hover:bg-pink-900/10 p-2 rounded-md transition-colors">
                <MapPinIcon size={16} className="text-pink-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">{aboutData.location}</p>
              </div>
              <div className="flex items-start gap-2 hover:bg-pink-900/10 p-2 rounded-md transition-colors">
                <BriefcaseIcon size={16} className="text-pink-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">{aboutData.experience}</p>
              </div>
              <div className="flex items-start gap-2 hover:bg-pink-900/10 p-2 rounded-md transition-colors">
                <GraduationCapIcon size={16} className="text-pink-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">{aboutData.education}</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                Hobbies
              </h4>
              <div className="flex flex-wrap gap-2">
                {aboutData.hobbies.map((hobby, index) => <div key={index} className="bg-[#1A1A2E] p-2 rounded-md text-pink-300 hover:bg-pink-900 hover:bg-opacity-30 transition-colors duration-200 cursor-default hover:scale-110 transform" data-tooltip={hobby.name} style={{
                transitionDelay: `${index * 50}ms`
              }}>
                    {getHobbyIcon(hobby.icon)}
                  </div>)}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <div className="bg-[#121520] rounded-lg p-6 border border-pink-900 border-opacity-30 h-full hover:shadow-lg hover:shadow-pink-900/10 transition-all duration-300 transform hover:-translate-y-1">
            <p className="text-gray-300 mb-6 leading-relaxed first-letter:text-2xl first-letter:text-pink-400 first-letter:font-bold">
              {aboutData.description}
            </p>
            <blockquote className="border-l-4 border-pink-600 pl-4 py-2 mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-600/10 to-transparent"></div>
              <p className="text-pink-300 italic relative z-10">
                {aboutData.quote}
              </p>
            </blockquote>
            <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-lg p-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-600 to-purple-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/5 to-purple-600/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <p className="text-white text-sm relative z-10">
                I'm passionate about creating clean, efficient code and
                beautiful user interfaces. My goal is to build applications that
                are not only functional but also intuitive and enjoyable to use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}