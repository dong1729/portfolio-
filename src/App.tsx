import React, { useEffect, useState } from 'react';
import { NoticePanel } from './components/NoticePanel';
import { Portfolio } from './components/Portfolio';
import { LanguageProvider } from './hooks/useLanguage';
import { Toaster } from 'sonner'; // ✅ Thêm vào đây

export function App() {
  const [showNotice, setShowNotice] = useState(true);

  const handleCloseNotice = () => {
    setShowNotice(false);
  };

  const overrideClosePanel = () => {
    handleCloseNotice();
  };

  return (
    <LanguageProvider>
      <div className="w-full min-h-screen bg-[#0A0A14]">
        {showNotice ? (
          <div className="flex w-full min-h-screen justify-center items-center p-4">
            <NoticePanel closeOverride={overrideClosePanel} />
          </div>
        ) : (
          <Portfolio />
        )}
      </div>

      {/* ✅ Toaster hiển thị toast ở mọi nơi */}
      <Toaster position="bottom-center" richColors />
    </LanguageProvider>
  );
}
