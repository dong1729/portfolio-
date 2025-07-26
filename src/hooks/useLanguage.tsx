import React, { useEffect, useState, createContext, useContext } from 'react';
type LanguageType = 'en' | 'vi';
interface LanguageContextType {
  language: LanguageType;
  changeLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
}
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
  t: (key: string) => key
});
export const translations = {
  en: {
    // Navigation
    'nav.home': 'HOME',
    'nav.about': 'ABOUT',
    'nav.projects': 'PROJECTS',
    'nav.skills': 'SKILLS',
    'nav.blog': 'BLOG',
    'nav.contact': 'CONTACT',
    // Theme toggle
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
    // Pin header
    'header.pin': 'Pin Header',
    'header.unpin': 'Unpin Header',
    // Language toggle
    'language.en': 'English',
    'language.vi': 'Vietnamese',
    'language.switch': 'Switch Language',
    // Footer
    'footer.links': 'Links',
    'footer.connect': 'Connect',
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with ❤️ in Vietnam',
    'footer.description': 'Full-stack developer with a passion for creating beautiful and functional web applications.'
  },
  vi: {
    // Navigation
    'nav.home': 'TRANG CHỦ',
    'nav.about': 'GIỚI THIỆU',
    'nav.projects': 'DỰ ÁN',
    'nav.skills': 'KỸ NĂNG',
    'nav.blog': 'BLOG',
    'nav.contact': 'LIÊN HỆ',
    // Theme toggle
    'theme.light': 'Chế độ sáng',
    'theme.dark': 'Chế độ tối',
    // Pin header
    'header.pin': 'Ghim thanh đầu',
    'header.unpin': 'Bỏ ghim',
    // Language toggle
    'language.en': 'Tiếng Anh',
    'language.vi': 'Tiếng Việt',
    'language.switch': 'Đổi ngôn ngữ',
    // Footer
    'footer.links': 'Liên kết',
    'footer.connect': 'Kết nối',
    'footer.rights': 'Đã đăng ký bản quyền.',
    'footer.made': 'Làm với ❤️ tại Việt Nam',
    'footer.description': 'Lập trình viên full-stack với đam mê tạo ra các ứng dụng web đẹp và chức năng.'
  }
};
interface LanguageProviderProps {
  children: ReactNode;
}
export const LanguageProvider = ({
  children
}: LanguageProviderProps) => {
  const [language, setLanguage] = useState<LanguageType>('en');
  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi')) {
      setLanguage(savedLanguage as LanguageType);
    }
  }, []);
  // Save language preference to localStorage whenever it changes
  const changeLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    localStorage.setItem('portfolio-language', lang);
  };
  // Translation function
  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key;
  };
  return <LanguageContext.Provider value={{
    language,
    changeLanguage,
    t
  }}>
      {children}
    </LanguageContext.Provider>;
};
export const useLanguage = () => useContext(LanguageContext);