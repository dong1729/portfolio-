import React, { useEffect, useState } from 'react';
import {
  BellIcon,
  XIcon,
  CheckIcon,
  ChevronRightIcon,
  WrenchIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  MailIcon,
  ClockIcon
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useNoticePanel } from '../hooks/useNoticePanel';
import { ThemeToggle } from './ThemeToggle';
import { toast } from 'sonner'; // ✅ THÊM toast

interface NoticePanelProps {
  closeOverride?: () => void;
}

export function NoticePanel({ closeOverride }: NoticePanelProps) {
  const { theme, changeTheme } = useTheme();
  const { isVisible, hideForFiveMinutes, closePanel: originalClosePanel } = useNoticePanel();
  const [hideToggle, setHideToggle] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');

  const closePanel = () => {
    if (closeOverride) {
      closeOverride();
    } else {
      originalClosePanel();
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentDateTime(`${formattedDate} (${formattedTime})`);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHideToggle(e.target.checked);
    hideForFiveMinutes(e.target.checked);
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'neon-blue':
        return {
          bgColor: 'bg-[#121a2a]',
          borderColor: 'border-cyan-500',
          textColor: 'text-cyan-400',
          shadowColor: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]',
          iconColor: 'text-cyan-400',
          headingColor: 'text-cyan-300',
          buttonBgColor: 'bg-cyan-600',
          buttonHoverColor: 'hover:bg-cyan-500'
        };
      case 'cyberpunk-pink':
        return {
          bgColor: 'bg-[#1a121a]',
          borderColor: 'border-pink-500',
          textColor: 'text-pink-400',
          shadowColor: 'shadow-[0_0_15px_rgba(236,72,153,0.3)]',
          iconColor: 'text-pink-400',
          headingColor: 'text-pink-300',
          buttonBgColor: 'bg-pink-600',
          buttonHoverColor: 'hover:bg-pink-500'
        };
      case 'solarized-dark':
        return {
          bgColor: 'bg-[#002b36]',
          borderColor: 'border-amber-500',
          textColor: 'text-amber-400',
          shadowColor: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
          iconColor: 'text-amber-400',
          headingColor: 'text-amber-300',
          buttonBgColor: 'bg-amber-600',
          buttonHoverColor: 'hover:bg-amber-500'
        };
    }
  };

  const styles = getThemeStyles();
  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        w-full max-w-md rounded-lg border ${styles.borderColor} ${styles.bgColor} ${styles.shadowColor}
        flex flex-col max-h-[80vh] animate-fadeIn overflow-hidden z-50`}
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      {/* Header */}
      <div className={`flex justify-between items-center p-4 border-b ${styles.borderColor}`}>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${styles.buttonBgColor} ${styles.buttonHoverColor}`}>
            <BellIcon className={`w-5 h-5 ${styles.iconColor}`} />
          </div>
          <h2 className={`text-xl font-bold ${styles.headingColor}`}>Important Notice</h2>
        </div>
        <button
          onClick={closePanel}
          className={`p-2 rounded-full transition-colors duration-200 ${styles.buttonHoverColor}`}
          aria-label="Close panel"
        >
          <XIcon className={`w-5 h-5 ${styles.iconColor}`} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {/* Checklist Section */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${styles.textColor}`}>
            <CheckIcon className="w-5 h-5" /> Checklist
          </h3>
          <div className="space-y-2 pl-7">
            <div className="flex items-start gap-2">
              <CheckIcon className={`w-4 h-4 mt-0.5 ${styles.iconColor}`} />
              <p className="text-gray-300">My chatbot UI</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckIcon className={`w-4 h-4 mt-0.5 ${styles.iconColor}`} />
              <p className="text-gray-300">Source available for sale</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckIcon className={`w-4 h-4 mt-0.5 ${styles.iconColor}`} />
              <p className="text-gray-300">All updates run on localStorage</p>
            </div>
          </div>
        </div>

        {/* Upcoming Updates Section */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${styles.textColor}`}>
            <ChevronRightIcon className="w-5 h-5" /> Upcoming Updates
          </h3>
          <div className="space-y-3 pl-7">
            <div className="flex items-start gap-2">
              <ChevronRightIcon className={`w-4 h-4 mt-0.5 ${styles.iconColor}`} />
              <p className="text-gray-300">Add bilingual feature (Vietnamese/English) → postponed for inspection.</p>
            </div>
            <div className="flex items-start gap-2">
              <ChevronRightIcon className={`w-4 h-4 mt-0.5 ${styles.iconColor}`} />
              <p className="text-gray-300">
                Update the content of the blog section to be complete → completed earlier than expected on (15/6).
              </p>
            </div>
          </div>
        </div>

        {/* Maintenance Notice Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-amber-400">
            <WrenchIcon className="w-5 h-5" /> Maintenance Notice
          </h3>
          <div className="space-y-2 pl-7">
            <div className="flex items-start gap-2">
              <AlertTriangleIcon className="w-4 h-4 mt-0.5 text-amber-400" />
              <p className="text-gray-300 italic">
                Website will be updated continuously to optimize user experience, please regularly clear the web history
                to update the latest interface from us.
              </p>
            </div>
          </div>
        </div>

        {/* Important Warning Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-red-500">
            <AlertCircleIcon className="w-5 h-5" /> Important Warning
          </h3>
          <div className="space-y-2 pl-7">
            <div className="flex items-start gap-2">
              <AlertTriangleIcon className="w-4 h-4 mt-0.5 text-amber-400" />
              <p className="text-gray-300">Please refresh the page if you encounter display errors.</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangleIcon className="w-4 h-4 mt-0.5 text-amber-400" />
              <p className="text-gray-300">
                This website is still under development. Content may not be complete. Please do not share website
                content with others.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mb-4">
          <div className={`p-4 rounded-lg border ${styles.borderColor} bg-opacity-20 bg-black`}>
            <div className="flex items-start gap-2">
              <MailIcon className={`w-5 h-5 mt-0.5 ${styles.iconColor}`} />
              <div>
                <p className="text-gray-300">For support or to report bugs, please contact via email:</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('dong07ztao@gmail.com');
                    toast.success('Email copied to clipboard!');
                  }}
                  className={`${styles.textColor} hover:underline focus:outline-none`}
                >
                  dong07ztao@gmail.com
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle theme={theme} changeTheme={changeTheme} />
      </div>

      {/* Footer */}
      <div className={`flex flex-wrap justify-between items-center p-4 border-t ${styles.borderColor} gap-2`}>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <ClockIcon className="w-4 h-4" />
          <span>Updated: {currentDateTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Hide for 5 minutes</span>
          <label className="relative inline-block w-12 h-6">
            <input type="checkbox" className="opacity-0 w-0 h-0" checked={hideToggle} onChange={handleToggleChange} />
            <span
              className={`
                absolute cursor-pointer top-0 left-0 right-0 bottom-0 
                rounded-full transition-all duration-300 
                ${hideToggle ? styles.buttonBgColor : 'bg-gray-700'} 
                before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 
                before:bg-white before:rounded-full before:transition-all before:duration-300
                ${hideToggle ? 'before:translate-x-6' : ''}
              `}
            ></span>
          </label>
        </div>
      </div>
    </div>
  );
}
