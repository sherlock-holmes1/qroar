import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { t } from '@extension/i18n';
// import { ToggleButton } from '@extension/ui';
import { useEffect, useRef, useState, useMemo } from 'react';
import type {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  // Options,
} from 'qr-code-styling';
import QRCodeStyling from 'qr-code-styling';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  // State for URL input
  const [url, setUrl] = useState('https://google.com');
  const settingsText = t('settingsText');
  // type Extension = 'svg' | 'png' | 'jpeg' | 'webp';
  const options = useMemo(
    () => ({
      width: 300,
      height: 300,
      type: 'svg' as DrawType,
      data: url,
      margin: 10,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: 'Byte' as Mode,
        errorCorrectionLevel: 'Q' as ErrorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        color: '#222222',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
        // },
        type: 'rounded' as DotType,
      },
      backgroundOptions: {
        color: '#5FD4F3',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
        // },
      },
      cornersSquareOptions: {
        color: '#222222',
        type: 'extra-rounded' as CornerSquareType,
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
      },
      cornersDotOptions: {
        color: '#222222',
        type: 'dot' as CornerDotType,
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
      },
    }),
    [url],
  );
  // const [fileExt, setFileExt] = useState<Extension>('svg');
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const qrRef = useRef<HTMLDivElement>(null);

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

  // Download button component
  const DownloadButton = ({ label }: { label: string }) => (
    <button className="bg-orange-500 text-white border-none rounded-full px-6 py-2.5 mx-2 font-semibold text-base cursor-pointer min-w-[80px]">
      {label}
    </button>
  );

  // Populate URL from the active tab on mount
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs[0]?.url) {
          setUrl(tabs[0].url);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, [qrCode, qrRef]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  return (
    <div
      className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}
      style={{ minWidth: 340, minHeight: 480, padding: 24 }}>
      {settingsButton}
      {/* QR code box with settings icon */}
      <div ref={qrRef} />

      {/* URL input */}
      <div className="mt-8 mb-6">
        <input
          type="text"
          placeholder="Enter URL here..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="w-full px-4 py-3.5 rounded-3xl border border-gray-200 text-lg outline-none"
        />
      </div>

      {/* Download buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <DownloadButton label="SVG" />
        <DownloadButton label="PNG" />
        <DownloadButton label="PDF" />
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
