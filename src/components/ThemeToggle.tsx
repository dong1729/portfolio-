import React from 'react';
import { ThemeType } from '../hooks/useTheme';
interface ThemeToggleProps {
  theme: ThemeType;
  changeTheme: (theme: ThemeType) => void;
}
export function ThemeToggle({
  theme,
  changeTheme
}: ThemeToggleProps) {
  return <div className="flex items-center gap-2 mt-2">
      <button onClick={() => changeTheme('neon-blue')} className={`w-6 h-6 rounded-full border transition-all duration-300 ${theme === 'neon-blue' ? 'border-cyan-400 bg-cyan-600 shadow-[0_0_10px_rgba(34,211,238,0.7)]' : 'border-cyan-700 bg-cyan-900'}`} aria-label="Neon Blue Theme" />
      <button onClick={() => changeTheme('cyberpunk-pink')} className={`w-6 h-6 rounded-full border transition-all duration-300 ${theme === 'cyberpunk-pink' ? 'border-pink-400 bg-pink-600 shadow-[0_0_10px_rgba(236,72,153,0.7)]' : 'border-pink-700 bg-pink-900'}`} aria-label="Cyberpunk Pink Theme" />
      <button onClick={() => changeTheme('solarized-dark')} className={`w-6 h-6 rounded-full border transition-all duration-300 ${theme === 'solarized-dark' ? 'border-amber-400 bg-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.7)]' : 'border-amber-700 bg-amber-900'}`} aria-label="Solarized Dark Theme" />
    </div>;
}