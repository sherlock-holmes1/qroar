import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
// import { t } from '@extension/i18n';
// import { ToggleButton } from '@extension/ui';
import { useState } from 'react';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  // State for URL input
  const [url, setUrl] = useState('');
  const settings = (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        cursor: 'pointer',
      }}>
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15 8.6c.22 0 .43.03.64.08" />
      </svg>
    </div>
  );
  // Placeholder QR code generator (replace with real QR code component as needed)
  const QRCodeBox = (
    <div
      style={{
        position: 'relative',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 8px #0001',
        padding: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 260,
        height: 260,
        margin: '0 auto',
      }}>
      {/* Placeholder QR code image */}
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://example.com"
        alt="QR code"
        style={{ width: 220, height: 220, background: '#fff' }}
      />
    </div>
  );

  // Download button component
  const DownloadButton = ({ label }: { label: string }) => (
    <button
      style={{
        background: '#F97316',
        color: '#fff',
        border: 'none',
        borderRadius: 24,
        padding: '10px 24px',
        margin: '0 8px',
        fontWeight: 600,
        fontSize: 16,
        cursor: 'pointer',
        minWidth: 80,
      }}>
      {label}
    </button>
  );

  return (
    <div
      className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}
      style={{ minWidth: 340, minHeight: 480, padding: 24 }}>
      {settings}
      {/* QR code box with settings icon */}
      {QRCodeBox}

      {/* URL input */}
      <div style={{ marginTop: 32, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Enter URL here..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 18px',
            borderRadius: 24,
            border: '1px solid #e5e7eb',
            fontSize: 18,
            outline: 'none',
          }}
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
