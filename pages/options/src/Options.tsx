import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { QRCodeBox, ErrorDisplay, LoadingSpinner } from '@extension/ui';
import { colorSettingsStorage } from '@extension/storage';
import { useState, useEffect } from 'react';
import { ColorSettings } from './ColorSettings';
import { LogoSettings } from './LogoSettings';

const Options = () => {
  const [foreground, setForeground] = useState('green');
  const [background, setBackground] = useState('white');
  const [showGradient, setShowGradient] = useState(false);
  const [gradient, setGradient] = useState('blue');
  const [logo, setLogo] = useState<string | null>(null);

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
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen font-sans bg-white">
      {/* Sidebar */}
      <aside className="w-[280px] bg-gray-50 p-8 flex flex-col border-r border-gray-200">
        <nav className="mb-16">
          <div className="text-base mb-6 font-medium text-gray-900 flex items-center justify-between">
            Color settings
            <span className="text-lg text-gray-400">›</span>
          </div>
          <div className="text-base mb-5 text-gray-400 font-normal text-left">Logo settings</div>
          <div className="text-base mb-5 text-gray-400 font-normal text-left">Customize design</div>
          <div className="text-base text-gray-400 font-normal text-left">Themes</div>
        </nav>

        <div className="mt-auto">
          <div className="text-base mb-4 text-gray-900 font-medium">Preview</div>
          <div className="bg-white p-5 rounded-lg border border-gray-200 flex justify-center mb-5">
            <div>
              <QRCodeBox
                url="https://qroar.com"
                image={logo != 'none' ? 'logo/' + logo + '.svg' : undefined}
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
      <main className="flex-1 p-[48px_56px] bg-white">
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
        <LogoSettings
          selected={logo}
          onLogoSelect={newLogo => {
            setLogo(newLogo);
            colorSettingsStorage.setLogo(newLogo);
          }}
        />
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <LoadingSpinner />), <ErrorDisplay />);
