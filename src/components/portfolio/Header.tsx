import React, { useEffect, useState, Component } from 'react';
import { MailIcon, GithubIcon, TwitterIcon, MessageCircleIcon, YoutubeIcon, LinkedinIcon, MoonIcon, SunIcon, MenuIcon, XIcon, HomeIcon, UserIcon, CodeIcon, LayersIcon, FileTextIcon, CheckCircleIcon, FacebookIcon, PinIcon, GlobeIcon, Languages } from 'lucide-react';
import { MusicPlayer } from '../MusicPlayer';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
interface HeaderProps {
  userData: {
    name: string;
    displayName: string;
    tagline: string;
    avatar: string;
    socials: {
      name: string;
      url: string;
      icon: string;
    }[];
    navLinks: {
      name: string;
      url: string;
      icon: string;
    }[];
    music: {
      title: string;
      url: string;
    };
  };
}
export function Header({
  userData
}: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const {
    isDarkMode,
    toggleDarkMode
  } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    language,
    changeLanguage,
    t
  } = useLanguage();
  // Handle scroll event for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !isPinned) {
        setIsSticky(true);
      } else if (isPinned) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPinned]);
  // Handle pinning the header
  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setIsSticky(true);
    } else if (window.scrollY <= 100) {
      setIsSticky(false);
    }
  };
  // Function to get the icon component based on name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return <MailIcon size={18} />;
      case 'github':
        return <GithubIcon size={18} />;
      case 'twitter':
        return <TwitterIcon size={18} />;
      case 'facebook':
        return <FacebookIcon size={18} />;
      case 'message-circle':
        return <MessageCircleIcon size={18} />;
      case 'youtube':
        return <YoutubeIcon size={18} />;
      case 'linkedin':
        return <LinkedinIcon size={18} />;
      case 'home':
        return <HomeIcon size={18} />;
      case 'user':
        return <UserIcon size={18} />;
      case 'code':
        return <CodeIcon size={18} />;
      case 'layers':
        return <LayersIcon size={18} />;
      case 'file-text':
        return <FileTextIcon size={18} />;
      default:
        return null;
    }
  };
  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };
  // Toggle language
  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'vi' : 'en');
  };
  // Theme-specific styles
  const getThemeStyles = () => {
    if (isDarkMode) {
      return {
        headerBg: isSticky ? 'bg-[#0A0A14]/90 backdrop-blur-sm shadow-lg shadow-cyan-900/20' : 'bg-transparent',
        fixedHeaderBg: 'bg-[#0A0A14]/95 backdrop-blur-sm shadow-lg shadow-cyan-900/20',
        textColor: 'text-gray-300',
        accentColor: 'text-cyan-400',
        hoverColor: 'hover:text-cyan-400',
        navBg: 'bg-[#121520]',
        navBorder: 'border-gray-800',
        iconBg: 'bg-[#121520]',
        iconHoverBg: 'hover:bg-cyan-900',
        iconText: 'text-gray-400',
        iconHoverText: 'hover:text-cyan-300',
        activePinColor: 'text-cyan-400 bg-cyan-900/50',
        activeLanguageColor: 'text-cyan-400 bg-cyan-900/50'
      };
    } else {
      return {
        headerBg: isSticky ? 'bg-white/90 backdrop-blur-sm shadow-lg shadow-gray-200/50' : 'bg-transparent',
        fixedHeaderBg: 'bg-white/95 backdrop-blur-sm shadow-lg shadow-gray-200/50',
        textColor: 'text-gray-700',
        accentColor: 'text-blue-600',
        hoverColor: 'hover:text-blue-600',
        navBg: 'bg-white',
        navBorder: 'border-gray-200',
        iconBg: 'bg-gray-100',
        iconHoverBg: 'hover:bg-blue-100',
        iconText: 'text-gray-600',
        iconHoverText: 'hover:text-blue-600',
        activePinColor: 'text-blue-600 bg-blue-100',
        activeLanguageColor: 'text-blue-600 bg-blue-100'
      };
    }
  };
  const styles = getThemeStyles();
  // Get the translated nav links
  const getTranslatedNavLinks = () => {
    return userData.navLinks.map(link => {
      const translationKey = `nav.${link.name.toLowerCase()}`;
      return {
        ...link,
        displayName: t(translationKey)
      };
    });
  };
  const translatedNavLinks = getTranslatedNavLinks();
  return <header className={`w-full ${isSticky ? 'fixed top-0 left-0 z-50 ' + styles.fixedHeaderBg : styles.headerBg} transition-all duration-300`} id="home">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Top controls row */}
        <div className="flex justify-between items-center mb-3">
          {/* Pin header button */}
          <button onClick={togglePin} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${isPinned ? styles.activePinColor : `${styles.iconBg} ${styles.iconHoverBg} ${styles.iconText} ${styles.iconHoverText}`}`} aria-label={isPinned ? t('header.unpin') : t('header.pin')} data-tooltip={isPinned ? t('header.unpin') : t('header.pin')}>
            <PinIcon size={18} className={isPinned ? 'rotate-45' : ''} />
          </button>
          {/* Music Player */}
          <MusicPlayer title={userData.music.title} url={userData.music.url} isDarkMode={isDarkMode} />
          {/* Language toggle */}
          <button onClick={toggleLanguage} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${language === 'vi' ? styles.activeLanguageColor : `${styles.iconBg} ${styles.iconHoverBg} ${styles.iconText} ${styles.iconHoverText}`}`} aria-label={t('language.switch')} data-tooltip={t('language.switch')}>
            <GlobeIcon size={18} />
            <span className="ml-1 text-xs font-bold">
              {language.toUpperCase()}
            </span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Avatar and Name */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 animate-spin-slow blur-sm group-hover:blur opacity-70 ${!isDarkMode && 'opacity-40'}`}></div>
                <img src={userData.avatar} alt={userData.displayName} className={`relative w-10 h-10 rounded-full border-2 ${isDarkMode ? 'border-cyan-500' : 'border-blue-500'} z-10`} />
              </div>
              <div>
                <h1 className={`${styles.accentColor} text-xl font-bold flex items-center`}>
                  {userData.name}
                  <span className={`ml-2 text-sm ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                    <CheckCircleIcon size={16} className="inline" />
                  </span>
                </h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  {userData.tagline}
                </p>
              </div>
            </div>
            {/* Mobile menu button */}
            <button className={`md:hidden ${styles.textColor} ${styles.hoverColor}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center gap-1">
              {translatedNavLinks.map((link, index) => <li key={index}>
                  <a href={link.url} className={`${styles.textColor} ${styles.hoverColor} transition-colors duration-200 relative group px-3 py-2 flex items-center gap-1 rounded-md hover:bg-opacity-10 ${isDarkMode ? 'hover:bg-cyan-900' : 'hover:bg-blue-50'}`}>
                    {getIconComponent(link.icon)}
                    {link.displayName}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'} transition-all duration-300 group-hover:w-full`}></span>
                  </a>
                </li>)}
              {/* Theme toggle */}
              <li className="ml-2">
                <button onClick={toggleDarkMode} className={`w-8 h-8 flex items-center justify-center rounded-full ${styles.iconBg} ${styles.iconHoverBg} ${styles.iconText} ${styles.iconHoverText} transition-all duration-200 hover:-translate-y-1`} aria-label={isDarkMode ? t('theme.light') : t('theme.dark')} data-tooltip={isDarkMode ? t('theme.light') : t('theme.dark')}>
                  {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {/* Mobile Navigation */}
        {mobileMenuOpen && <nav className={`md:hidden mt-4 ${styles.navBg} rounded-lg p-4 border ${styles.navBorder}`}>
            <ul className="flex flex-col items-center gap-4">
              {translatedNavLinks.map((link, index) => <li key={index} className="w-full">
                  <a href={link.url} className={`flex items-center gap-2 justify-center py-2 ${styles.textColor} ${styles.hoverColor} transition-colors duration-200 border-b ${styles.navBorder}`} onClick={handleNavLinkClick}>
                    {getIconComponent(link.icon)}
                    {link.displayName}
                  </a>
                </li>)}
              {/* Language toggle in mobile menu */}
              <li className="w-full pt-2 flex justify-center">
                <button onClick={toggleLanguage} className={`flex items-center gap-2 ${styles.textColor} ${styles.hoverColor} transition-colors duration-200`}>
                  <GlobeIcon size={18} />
                  {language === 'en' ? t('language.vi') : t('language.en')}
                </button>
              </li>
              {/* Theme toggle in mobile menu */}
              <li className="w-full pt-2 flex justify-center">
                <button onClick={toggleDarkMode} className={`flex items-center gap-2 ${styles.textColor} ${styles.hoverColor} transition-colors duration-200`}>
                  {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                  {isDarkMode ? t('theme.light') : t('theme.dark')}
                </button>
              </li>
            </ul>
          </nav>}
        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-3 mt-4">
          {userData.socials.map((social, index) => <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 flex items-center justify-center rounded-full ${styles.iconBg} ${styles.iconHoverBg} ${styles.iconText} ${styles.iconHoverText} transition-all duration-200 hover:-translate-y-1`} data-tooltip={social.name}>
              {getIconComponent(social.icon)}
            </a>)}
        </div>
      </div>
    </header>;
}