import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage, qrSettingsStorage } from '@extension/storage';
import { t } from '@extension/i18n';
import { useEffect, useState, useRef } from 'react';
import { QRCodeBox, getPathToLogo } from '@extension/ui';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  // Get color settings from storage
  const colorSettings = useStorage(qrSettingsStorage);
  const { foregroundColor, backgroundColor, showGradient, gradientColor, pathToLogo, cornersSquareType } =
    colorSettings || {};

  // State for URL input
  const [url, setUrl] = useState('https://qroar.com');
  const [favicon, setFavicon] = useState<string | null>(null);
  const settingsText = t('settingsText');
  const extension = 'svg';
  const qrCodeRef = useRef<{ download: () => void }>(null);

  const settingsButton = (
    <button
      title={settingsText}
      aria-label={settingsText}
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
      }}
      onClick={() => {
        chrome.runtime.openOptionsPage();
      }}
      tabIndex={0}
      type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 44 41"
        fill="none"
        stroke="gray"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false">
        <line x1="4" y1="12" x2="22" y2="12" />
        <line x1="30" y1="12" x2="40" y2="12" />
        <circle cx="26" cy="12" r="4" />

        <line x1="4" y1="23" x2="12" y2="23" />
        <line x1="20" y1="23" x2="40" y2="23" />
        <circle cx="16" cy="23" r="4" />

        <line x1="4" y1="34" x2="24" y2="34" />
        <line x1="32" y1="34" x2="40" y2="34" />
        <circle cx="28" cy="34" r="4" />
      </svg>
    </button>
  );

  // Populate URL from the active tab on mount
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs[0]?.url) {
          setUrl(tabs[0].url);
        }
        // Try to get favicon from tab
        if (tabs[0]?.favIconUrl) {
          setFavicon(tabs[0].favIconUrl);
        }
      });
    }
  }, []);
  return (
    <div
      className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}
      style={{
        minWidth: 400,
        minHeight: 500,
        padding: 24,
      }}>
      {settingsButton}
      {/* QR code box with settings icon */}
      <QRCodeBox
        ref={qrCodeRef}
        qrText={url}
        pathToLogo={getPathToLogo(pathToLogo, favicon)}
        extension={extension}
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
        showGradient={showGradient}
        gradientColor={gradientColor}
        cornersSquareType={cornersSquareType}
      />
      {/* URL input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter URL here..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="w-full px-4 py-3.5 rounded-3xl border border-gray-200 text-lg outline-none"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button
          className="bg-orange-500 text-white border-none rounded-full px-6 py-2.5 mx-2 font-semibold text-base cursor-pointer min-w-[80px]"
          onClick={() => qrCodeRef.current?.download()}>
          Download {extension.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
