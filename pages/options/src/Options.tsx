import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { QRCodeBox, ErrorDisplay, LoadingSpinner, getPathToLogo } from '@extension/ui';
import type { QRCodeBoxProps } from '@extension/storage';
import { qrSettingsStorage } from '@extension/storage';
import { useState, useEffect } from 'react';
import { ColorSettings } from './ColorSettings';
import { LogoSettings } from './LogoSettings';
import { QRdesigns } from './QRdesigns';

const defaultQRCodeBoxProps: QRCodeBoxProps = {
  qrText: 'https://qroar.com',
  foregroundColor: 'green',
  backgroundColor: 'white',
  showGradient: false,
  gradientColor: 'blue',
  cornersSquareType: 'extra-rounded',
  pathToLogo: undefined,
};

const Options = () => {
  const [qrProps, setQrProps] = useState<QRCodeBoxProps>(defaultQRCodeBoxProps);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('color-settings-section');

  // Set initial section from URL hash and listen for hash changes
  useEffect(() => {
    const setSectionFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'color-settings-section' || hash === 'logo-settings-section' || hash === 'qr-designs-section') {
        setActiveSection(hash);
      }
    };
    setSectionFromHash();
    window.addEventListener('hashchange', setSectionFromHash);
    return () => window.removeEventListener('hashchange', setSectionFromHash);
  }, []);

  // Load settings from storage on mount
  useEffect(() => {
    let ignore = false;
    qrSettingsStorage.get().then(settings => {
      if (!ignore && settings) {
        setQrProps((prev: QRCodeBoxProps) => ({
          ...prev,
          foregroundColor: settings.foregroundColor,
          backgroundColor: settings.backgroundColor,
          showGradient: settings.showGradient,
          gradientColor: settings.gradientColor,
          pathToLogo: settings.pathToLogo,
          cornersSquareType: settings.cornersSquareType ?? 'extra-rounded',
        }));
        if (settings.pathToLogo && settings.pathToLogo.startsWith('data:')) {
          setUploadedLogo(settings.pathToLogo);
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async ev => {
      const dataUrl = ev.target?.result as string;
      setUploadedLogo(dataUrl);
      setQrProps((prev: QRCodeBoxProps) => ({ ...prev, pathToLogo: dataUrl }));
      await qrSettingsStorage.setLogo(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    window.location.hash = id;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler for design selection
  const handleDesignSelect = (settings: QRCodeBoxProps) => {
    setQrProps({
      ...qrProps,
      backgroundColor: settings.backgroundColor ?? '',
      foregroundColor: settings.foregroundColor ?? '',
      showGradient: settings.showGradient ?? false,
      gradientColor: settings.gradientColor ?? '',
      pathToLogo: settings.pathToLogo ?? undefined,
      cornersSquareType: settings.cornersSquareType ?? 'extra-rounded',
      cornersDotType: settings.cornersDotType ?? 'dot',
    });
    qrSettingsStorage.setAll({
      backgroundColor: settings.backgroundColor ?? '',
      foregroundColor: settings.foregroundColor ?? '',
      gradientColor: settings.gradientColor ?? '',
      showGradient: settings.showGradient ?? false,
      pathToLogo: settings.pathToLogo ?? undefined,
      cornersSquareType: settings.cornersSquareType ?? 'extra-rounded',
      cornersDotType: settings.cornersDotType ?? 'dot',
    });
  };

  return (
    <div className="flex min-h-screen font-sans bg-white">
      {/* Sidebar */}
      <aside
        className="min-w-[410px] w-1/3 max-w-full bg-gray-50 p-8 flex flex-col border-r border-gray-200"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          alignSelf: 'flex-start',
          flexShrink: 0,
          overflow: 'visible',
        }}>
        <nav className="mb-16 flex flex-col gap-0 items-end">
          <button
            className={`text-base mb-6 flex items-center justify-end focus:outline-none hover:text-blue-700 ${
              activeSection === 'color-settings-section' ? 'font-bold text-gray-900' : 'font-normal text-gray-400'
            }`}
            onClick={() => scrollToSection('color-settings-section')}
            type="button">
            Color settings
          </button>
          <button
            className={`text-base mb-5 flex items-center justify-end focus:outline-none hover:text-blue-700 ${
              activeSection === 'logo-settings-section' ? 'font-bold text-gray-900' : 'font-normal text-gray-400'
            }`}
            onClick={() => scrollToSection('logo-settings-section')}
            type="button">
            Logo settings
          </button>
          <button
            className={`text-base mb-5 flex items-center justify-end focus:outline-none hover:text-blue-700 ${
              activeSection === 'qr-designs-section' ? 'font-bold text-gray-900' : 'font-normal text-gray-400'
            }`}
            onClick={() => scrollToSection('qr-designs-section')}
            type="button">
            QR code designs
          </button>
        </nav>

        <div className="mt-auto flex flex-col items-end">
          <div className="text-base mb-4 text-gray-900 font-medium text-right">Preview</div>
          <div className="bg-white p-5 rounded-lg border border-gray-200 flex justify-end mb-5" style={{ width: 340 }}>
            <div>
              <QRCodeBox {...qrProps} pathToLogo={getPathToLogo(qrProps.pathToLogo, 'logo/question.svg')} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-start bg-white overflow-y-auto" style={{ height: '100vh' }}>
        <div className="h-full p-[48px_56px] w-full" style={{ maxWidth: 800 }}>
          {activeSection === 'color-settings-section' && (
            <div id="color-settings-section">
              <ColorSettings
                foreground={qrProps.foregroundColor ?? ''}
                background={qrProps.backgroundColor ?? ''}
                showGradient={qrProps.showGradient ?? false}
                gradient={qrProps.gradientColor ?? ''}
                onForegroundChange={color => {
                  setQrProps((prev: QRCodeBoxProps) => ({ ...prev, foregroundColor: color }));
                  qrSettingsStorage.setForegroundColor(color);
                }}
                onBackgroundChange={color => {
                  setQrProps((prev: QRCodeBoxProps) => ({ ...prev, backgroundColor: color }));
                  qrSettingsStorage.setBackgroundColor(color);
                }}
                onShowGradientChange={show => {
                  setQrProps((prev: QRCodeBoxProps) => ({ ...prev, showGradient: show }));
                  qrSettingsStorage.setShowGradient(show);
                }}
                onGradientChange={color => {
                  setQrProps((prev: QRCodeBoxProps) => ({ ...prev, gradientColor: color }));
                  qrSettingsStorage.setGradientColor(color);
                }}
              />
            </div>
          )}
          {activeSection === 'logo-settings-section' && (
            <div id="logo-settings-section">
              <LogoSettings
                selectedLogo={qrProps.pathToLogo ?? null}
                uploadedLogo={uploadedLogo}
                onLogoSelect={newLogo => {
                  setQrProps((prev: QRCodeBoxProps) => ({ ...prev, pathToLogo: newLogo }));
                  setUploadedLogo(newLogo && newLogo.startsWith('data:') ? newLogo : null);
                  qrSettingsStorage.setLogo(newLogo);
                }}
                onLogoUpload={handleLogoUpload}
              />
            </div>
          )}
          {activeSection === 'qr-designs-section' && (
            <div id="qr-designs-section">
              <QRdesigns onDesignSelect={handleDesignSelect} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <LoadingSpinner />), <ErrorDisplay />);
