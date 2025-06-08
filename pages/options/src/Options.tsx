import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { QRCodeBox, ErrorDisplay, LoadingSpinner } from '@extension/ui';
import { colorSettingsStorage } from '@extension/storage';
import { useState, useEffect } from 'react';
import { ColorSettings } from './ColorSettings';
import { LogoSettings } from './LogoSettings';
import { QRdesigns } from './QRdesigns';

const Options = () => {
  const [foreground, setForeground] = useState('green');
  const [background, setBackground] = useState('white');
  const [showGradient, setShowGradient] = useState(false);
  const [gradient, setGradient] = useState('blue');
  const [logo, setLogo] = useState<string | null>(null);
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
    colorSettingsStorage.get().then(settings => {
      if (!ignore && settings) {
        setForeground(settings.foreground);
        setBackground(settings.background);
        setShowGradient(settings.showGradient);
        setGradient(settings.gradient);
        setLogo(settings.logo ?? null); // load logo
        if (settings.logo && settings.logo.startsWith('data:')) {
          setUploadedLogo(settings.logo);
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
      setLogo(dataUrl);
      await colorSettingsStorage.setLogo(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    window.location.hash = id; // Save section in URL
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
              <QRCodeBox
                url="https://qroar.com"
                image={
                  logo === 'detect'
                    ? 'logo/question.svg'
                    : uploadedLogo
                      ? uploadedLogo
                      : logo && logo !== 'none' && !logo.startsWith('data:')
                        ? 'logo/' + logo + '.svg'
                        : undefined
                }
                backgroundColor={background}
                foregroundColor={foreground}
                showGradient={showGradient}
                gradientColor={gradient}
              />
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
                foreground={foreground}
                background={background}
                showGradient={showGradient}
                gradient={gradient}
                onForegroundChange={color => {
                  setForeground(color);
                  colorSettingsStorage.setForeground(color);
                }}
                onBackgroundChange={color => {
                  setBackground(color);
                  colorSettingsStorage.setBackground(color);
                }}
                onShowGradientChange={show => {
                  setShowGradient(show);
                  colorSettingsStorage.setShowGradient(show);
                }}
                onGradientChange={color => {
                  setGradient(color);
                  colorSettingsStorage.setGradient(color);
                }}
              />
            </div>
          )}
          {activeSection === 'logo-settings-section' && (
            <div id="logo-settings-section">
              <LogoSettings
                selected={logo}
                uploadedLogo={uploadedLogo}
                onLogoSelect={newLogo => {
                  setLogo(newLogo);
                  setUploadedLogo(newLogo && newLogo.startsWith('data:') ? newLogo : null);
                  colorSettingsStorage.setLogo(newLogo);
                }}
                onLogoUpload={handleLogoUpload}
              />
            </div>
          )}
          {activeSection === 'qr-designs-section' && (
            <div id="qr-designs-section">
              <QRdesigns />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <LoadingSpinner />), <ErrorDisplay />);
