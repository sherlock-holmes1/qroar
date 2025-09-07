import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense, Analytics } from '@extension/shared';
import { qrSettingsStorage, downloadSettingsStorage } from '@extension/storage';
import { t } from '@extension/i18n';
import { useEffect, useState, useRef } from 'react';
import type { QRCodeBoxHandle } from '@extension/ui';
import { QRCodeBox, getPathToLogo, FooterButtons } from '@extension/ui';
import { IS_DEV } from '@extension/env';

const Popup = () => {
  // Get color settings from storage
  const colorSettings = useStorage(qrSettingsStorage);
  // Get download settings from storage
  const downloadSettings = useStorage(downloadSettingsStorage);
  const {
    foregroundColor,
    backgroundColor,
    showGradient,
    gradientColor,
    pathToLogo,
    cornersSquareType,
    cornersDotType,
    dotsType,
  } = colorSettings || {};

  // State for URL input
  const [url, setUrl] = useState('https://qroar.com');
  const [favicon, setFavicon] = useState<string | null>(null);
  const settingsText = t('settingsText');
  const extension = 'png';
  const qrCodeRef = useRef<QRCodeBoxHandle>(null);
  Analytics.firePageViewEvent(document.title, url);

  const settingsButton = (
    <div className="relative group">
      <button
        aria-label={settingsText}
        className="cursor-pointer border-none p-0 bg-transparent hover:text-blue-500 focus:text-blue-500 transition-colors"
        onClick={() => {
          Analytics.fireEvent('popup_settings_click');
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
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          className="transition-colors">
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
      {/* Tooltip */}
      <div className="absolute right-0 mt-2 z-10 hidden group-hover:block group-focus-within:block">
        <div className="relative">
          <div className="bg-white text-black text-base rounded-lg shadow-lg px-4 py-2 whitespace-nowrap">
            {settingsText}
          </div>
          <div className="absolute top-0 right-3 -mt-2 w-3 h-3 overflow-visible">
            <svg width="16" height="8" viewBox="0 0 16 8" className="block mx-auto">
              <polygon points="8,0 16,8 0,8" fill="white" />
              <polygon points="8,1 15,8 1,8" fill="#e5e7eb" /> {/* border color */}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper function to get high-quality favicon via background script
  const getHighQualityFavicon = async (url: string): Promise<string | null> => {
    if (IS_DEV) console.log('Popup: Requesting favicon for:', url);

    try {
      if (IS_DEV) console.log('Popup: Sending message to background script');
      const response = await chrome.runtime.sendMessage({
        action: 'getFavicon',
        url: url,
      });
      if (IS_DEV) console.log('Popup: Received response from background:', response);

      const favicon = response?.favicon || null;
      if (IS_DEV) console.log('Popup: Final favicon result:', favicon ? 'SUCCESS' : 'FAILED');

      return favicon;
    } catch (e) {
      if (IS_DEV) console.error('Popup: Background favicon request failed:', e);
      return null;
    }
  };

  // Populate URL from the active tab on mount
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
        if (tabs[0]?.url) {
          setUrl(tabs[0].url);
        }
        if (tabs[0]?.favIconUrl && pathToLogo == 'detect') {
          if (tabs[0]?.url) {
            // Try Google's high-quality favicon API first
            const highQualityFavicon = await getHighQualityFavicon(tabs[0].url);

            if (highQualityFavicon) {
              setFavicon(highQualityFavicon);
              if (IS_DEV) console.log('Got high-quality favicon from Google API');
            } else {
              // Fallback to Chrome's built-in favicon API
              try {
                const url1 = `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(tabs[0].url)}&size=256`;
                const resp = await fetch(url1);
                const blob = await resp.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFavicon(reader.result as string);
                  if (IS_DEV) console.log('Got fallback favicon from Chrome API');
                };
                reader.readAsDataURL(blob);
              } catch (e) {
                if (IS_DEV) console.log('Failed to get favicon:', e);
              }
            }
          }
        }
      });
    }
  }, [pathToLogo]);

  return (
    <div className="bg-slate-50 p-3">
      <div className="flex items-center justify-between w-full border border-gray-200 rounded-xl px-4 py-2">
        <span className="font-bold text-[22px] tracking-wide">
          <span className="text-green-600">QR</span>oar
        </span>
        {settingsButton}
      </div>

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
        cornersDotType={cornersDotType}
        dotsType={dotsType}
      />

      <div className="mb-2">
        <textarea
          placeholder="Enter URL here..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          rows={1}
          maxLength={1000}
          className="w-full px-4 py-3.5 rounded-3xl overflow-y-auto border border-gray-200 text-lg outline-none resize-none"
        />
      </div>
      <div className="flex justify-center gap-3">
        <button
          className="bg-orange-500 text-white border-none rounded-full px-6 py-2.5 mx-2 font-semibold text-base cursor-pointer min-w-[80px]"
          onClick={() => {
            Analytics.fireEvent('popup_share_qr_click');
            // Use configured download settings
            qrCodeRef.current?.download({
              format: downloadSettings?.format || 'png',
              size: downloadSettings?.size || 'medium',
            });
          }}>
          Download QR code
        </button>
      </div>
      <FooterButtons showPrivacyPolicy={false} />
      {/* Hidden element to safelist Tailwind hover classes for popup build */}
      <div className="hidden group-hover:fill-yellow-400 hover:bg-blue-100 text-blue-700 mt-4 rounded-md text-sm font-medium transition-colors duration-200" />
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
