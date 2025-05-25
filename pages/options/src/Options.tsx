import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';
import { QRCodeBox, ErrorDisplay, LoadingSpinner, ColorSelector, ToggleSwitch } from '@extension/ui';

const Options = () => {
  const [foreground, setForeground] = useState('green');
  const [background, setBackground] = useState('white');
  const [showGradient, setShowGradient] = useState(true);
  const [gradient, setGradient] = useState('blue');

  return (
    <div className="flex min-h-screen font-sans bg-white">
      {/* Sidebar */}
      <aside className="w-[280px] bg-gray-50 p-8 flex flex-col border-r border-gray-200">
        <nav className="mb-16">
          <div className="text-base mb-6 font-medium text-gray-900 flex items-center justify-between">
            Color settings
            <span className="text-lg text-gray-400">›</span>
          </div>
          <div className="text-base mb-5 text-gray-400 font-normal">Logo settings</div>
          <div className="text-base mb-5 text-gray-400 font-normal">Customize design</div>
          <div className="text-base text-gray-400 font-normal">Themes</div>
        </nav>

        <div className="mt-auto">
          <div className="text-base mb-4 text-gray-900 font-medium">Preview</div>
          <div className="bg-white p-5 rounded-lg border border-gray-200 flex justify-center mb-5">
            <div>QR code</div>
          </div>
          <div className="text-gray-400 text-base font-normal">Saved!</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-[48px_56px] bg-white">
        <h1 className="text-4xl font-normal mb-14 text-gray-900">Color settings</h1>

        <div className="max-w-[500px]">
          {/* Background */}
          <div className="mb-10">
            <div className="flex items-center gap-[150px]">
              <span className="text-base text-gray-900 font-normal w-[150px] text-left">Background</span>
              <ColorSelector value={background} onChange={setBackground} />
            </div>
          </div>

          {/* Foreground */}
          <div className="mb-10">
            <div className="flex items-center gap-[150px]">
              <span className="text-base text-gray-900 font-normal w-[150px] text-left">Foreground</span>
              <ColorSelector value={foreground} onChange={setForeground} />
            </div>
          </div>

          {/* Foreground Gradient */}
          <div className="mb-10">
            <div className="flex items-center gap-[10px] h-[50px]">
              <span className="text-base text-gray-900 font-normal w-[300px] text-left flex items-center">
                Foreground gradient
                <ToggleSwitch
                  checked={showGradient}
                  onChange={setShowGradient}
                  ariaLabel="Toggle foreground gradient"
                />
              </span>
              {/* Gradient Color Selector */}
              {showGradient && <ColorSelector value={gradient} onChange={setGradient} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <LoadingSpinner />), <ErrorDisplay />);
