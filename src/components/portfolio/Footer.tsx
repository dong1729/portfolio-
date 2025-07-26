import React from 'react';
import { GithubIcon, TwitterIcon, LinkedinIcon, FacebookIcon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
export function Footer() {
  const {
    isDarkMode
  } = useTheme();
  const {
    t
  } = useLanguage();
  const footerBg = isDarkMode ? 'bg-[#0A0A14] border-gray-800' : 'bg-white border-gray-200';
  const headingColor = isDarkMode ? 'text-cyan-400' : 'text-blue-600';
  const subHeadingColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const textColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverColor = isDarkMode ? 'hover:text-cyan-400' : 'hover:text-blue-600';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const mutedTextColor = isDarkMode ? 'text-gray-500' : 'text-gray-400';
  return <footer className={`${footerBg} border-t py-6`} id="contact">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className={`text-lg ${headingColor} mb-4`}>Nguyễn Hòa Đông</h3>
            <p className={`text-sm ${textColor}`}>{t('footer.description')}</p>
          </div>
          <div>
            <h3 className={`text-lg ${subHeadingColor} mb-4`}>
              {t('footer.links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className={`text-sm ${textColor} ${hoverColor} transition-colors`}>
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#about" className={`text-sm ${textColor} ${hoverColor} transition-colors`}>
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#projects" className={`text-sm ${textColor} ${hoverColor} transition-colors`}>
                  {t('nav.projects')}
                </a>
              </li>
              <li>
                <a href="#blogs" className={`text-sm ${textColor} ${hoverColor} transition-colors`}>
                  {t('nav.blog')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg ${subHeadingColor} mb-4`}>
              {t('footer.connect')}
            </h3>
            <div className="flex space-x-4">
              <a href="https://github.com/nguyenhoadong" target="_blank" rel="noopener noreferrer" className={`${textColor} ${hoverColor} transition-colors`}>
                <GithubIcon size={20} />
              </a>
              <a href="https://twitter.com/nguyenhoadong" target="_blank" rel="noopener noreferrer" className={`${textColor} ${hoverColor} transition-colors`}>
                <TwitterIcon size={20} />
              </a>
              <a href="https://www.facebook.com/1101010110101001110001010101a" target="_blank" rel="noopener noreferrer" className={`${textColor} ${hoverColor} transition-colors`}>
                <FacebookIcon size={20} />
              </a>
              <a href="https://linkedin.com/in/nguyenhoadong" target="_blank" rel="noopener noreferrer" className={`${textColor} ${hoverColor} transition-colors`}>
                <LinkedinIcon size={20} />
              </a>
            </div>
            <div className="mt-4">
              <p className={`text-sm ${textColor}`}>
                Email:{' '}
                <a href="mailto:dong07ztao@gmail.com" className={`${hoverColor} underline`}>
                  dong07ztao@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={`mt-8 pt-4 border-t ${borderColor} flex flex-col md:flex-row justify-between items-center`}>
          <p className={`text-xs ${mutedTextColor}`}>
            © {new Date().getFullYear()} Nguyễn Hòa Đông. {t('footer.rights')}
          </p>
          <p className={`text-xs ${mutedTextColor} mt-2 md:mt-0`}>
            {t('footer.made')}
          </p>
        </div>
      </div>
    </footer>;
}