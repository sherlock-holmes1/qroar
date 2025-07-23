import '@src/Options.css';
import { withErrorBoundary, withSuspense, Analytics } from '@extension/shared';
import { QRCodeBox, ErrorDisplay, LoadingSpinner, getPathToLogo, FooterButtons } from '@extension/ui';
import type { QRCodeBoxProps } from '@extension/storage';
import { qrSettingsStorage } from '@extension/storage';
import { useState, useEffect } from 'react';
import { t } from '@extension/i18n';
import { ColorSettings } from './ColorSettings';
import { LogoSettings } from './LogoSettings';

const defaultQRCodeBoxProps: QRCodeBoxProps = {
  qrText: 'https://qroar.com',
  foregroundColor: '#0b5394',
  backgroundColor: '#cfe2f3',
  showGradient: true,
  gradientColor: '#cc0000',
  cornersSquareType: 'dot',
  cornersDotType: 'square',
  dotsType: 'dots',
  pathToLogo: 'detect',
};

const Options = () => {
  Analytics.firePageViewEvent('Options', 'Options');

  const [qrProps, setQrProps] = useState<QRCodeBoxProps>(defaultQRCodeBoxProps);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('color-settings-section');
  const [qrPreviewSize, setQrPreviewSize] = useState<number>(200);

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
          dotsType: settings.dotsType,
          cornersDotType: settings.cornersDotType,
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
    const maxFileSize = 2 * 1024 * 1024; // 1MB
    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (file.size > maxFileSize) {
      alert(t('fileSizeError'));
      return;
    }

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      alert(t('fileExtensionError'));
      return;
    }

    reader.onload = async ev => {
      const dataUrl = ev.target?.result as string;
      setUploadedLogo(dataUrl);
      setQrProps((prev: QRCodeBoxProps) => ({ ...prev, pathToLogo: dataUrl }));
      await qrSettingsStorage.setLogo(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const scrollToSection = (id: string) => {
    Analytics.fireEvent('options_sidebar_section_click', { section: id });
    setActiveSection(id);
    window.location.hash = id;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler for design selection
  const handleDesignSelect = (settings: QRCodeBoxProps) => {
    Analytics.fireEvent('options_design_select');
    setQrProps({
      ...qrProps,
      backgroundColor: settings.backgroundColor ?? '',
      foregroundColor: settings.foregroundColor ?? '',
      showGradient: settings.showGradient ?? false,
      gradientColor: settings.gradientColor ?? '',
      cornersSquareType: settings.cornersSquareType ?? 'extra-rounded',
      cornersDotType: settings.cornersDotType ?? 'dot',
      dotsType: settings.dotsType ?? 'dots',
    });
    qrSettingsStorage.setAll({
      backgroundColor: settings.backgroundColor ?? '',
      foregroundColor: settings.foregroundColor ?? '',
      gradientColor: settings.gradientColor ?? '',
      showGradient: settings.showGradient ?? false,
      cornersSquareType: settings.cornersSquareType ?? 'extra-rounded',
      cornersDotType: settings.cornersDotType ?? 'dot',
      dotsType: settings.dotsType ?? 'dots',
    });
  };

  useEffect(() => {
    const updateQrPreviewSize = () => {
      const height = window.innerHeight;
      setQrPreviewSize(height < 600 ? 150 : height < 1000 ? 200 : 300);
    };
    updateQrPreviewSize();
    window.addEventListener('resize', updateQrPreviewSize);
    return () => window.removeEventListener('resize', updateQrPreviewSize);
  }, []);

  return (
    <div className="flex min-h-screen font-sans bg-white min-w-[710px]">
      {/* Sidebar */}
      <aside
        className="min-w-[410px] w-1/3 max-w-full bg-gray-50 p-8 pt-4 pb-4 flex flex-col border-r border-gray-200 min-h-screen"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          alignSelf: 'flex-start',
          flexShrink: 0,
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}>
        <span className="font-bold text-[30px] tracking-wide mb-6 flex items-center gap-2 justify-center">
          <img
            src="lion.png"
            alt="QRoar Lion"
            className="w-16 h-16 inline-block align-middle"
            style={{ marginRight: '6px' }}
          />
          <span>
            <span className="text-green-600">QR</span>oar
          </span>
        </span>
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
        </nav>

        <div className="mt-auto flex flex-col items-end">
          <div className="text-base mb-4 text-gray-900 font-medium text-right">Preview</div>
          <div
            className="bg-white p-5 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden"
            style={{
              width: qrPreviewSize + 30,
              height: qrPreviewSize + 30,
              transition: 'width 0.2s, height 0.2s',
            }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: qrPreviewSize,
                height: qrPreviewSize,
                transition: 'width 0.2s, height 0.2s',
              }}>
              <QRCodeBox
                {...qrProps}
                pathToLogo={getPathToLogo(qrProps.pathToLogo, 'logo/question.svg')}
                size={qrPreviewSize}
              />
            </div>
          </div>
        </div>
        <FooterButtons />
      </aside>

      {/* Main Content */}
      <main
        className="bg-white overflow-y-auto"
        style={{ height: '100vh', width: '300px', flexGrow: 1, flexShrink: 0 }}>
        <div className="h-full p-[48px_56px] mt-10 w-full" style={{ maxWidth: 800 }}>
          {activeSection === 'color-settings-section' && (
            <div id="color-settings-section">
              <ColorSettings
                foreground={qrProps.foregroundColor ?? ''}
                background={qrProps.backgroundColor ?? ''}
                showGradient={qrProps.showGradient ?? false}
                gradient={qrProps.gradientColor ?? ''}
                onForegroundChange={color => {
                  Analytics.fireEvent('options_foreground_color_change', { color: color });
                  setQrProps((prev: QRCodeBoxProps) => ({ ...prev, foregroundColor: color }));
                  qrSettingsStorage.setForegroundColor(color);
                }}
                onBackgroundChange={color => {
                  Analytics.fireEvent('options_background_color_change', { color: color });
                  setQrProps((prev: QRCodeBoxProps) => ({ ...prev, backgroundColor: color }));
                  qrSettingsStorage.setBackgroundColor(color);
                }}
                onShowGradientChange={show => {
                  Analytics.fireEvent('options_show_gradient_toggle', { show: show });
                  setQrProps((prev: QRCodeBoxProps) => ({ ...prev, showGradient: show }));
                  qrSettingsStorage.setShowGradient(show);
                }}
                onGradientChange={color => {
                  Analytics.fireEvent('options_gradient_color_change', { color: color });
                  setQrProps((prev: QRCodeBoxProps) => ({ ...prev, gradientColor: color }));
                  qrSettingsStorage.setGradientColor(color);
                }}
                onDesignSelect={handleDesignSelect}
              />
            </div>
          )}
          {activeSection === 'logo-settings-section' && (
            <div id="logo-settings-section">
              <LogoSettings
                selectedLogo={qrProps.pathToLogo ?? null}
                uploadedLogo={uploadedLogo}
                onLogoSelect={newLogo => {
                  Analytics.fireEvent('options_logo_select', { logo: newLogo });
                  setQrProps((prev: QRCodeBoxProps) => ({ ...prev, pathToLogo: newLogo }));
                  setUploadedLogo(newLogo && newLogo.startsWith('data:') ? newLogo : null);
                  qrSettingsStorage.setLogo(newLogo);
                }}
                onLogoUpload={file => {
                  Analytics.fireEvent('options_logo_upload', { name: file.name });
                  handleLogoUpload(file);
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <LoadingSpinner />), <ErrorDisplay />);
