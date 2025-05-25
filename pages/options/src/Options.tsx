import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';
import { ErrorDisplay, LoadingSpinner, ColorSelector, ToggleSwitch } from '@extension/ui';

const Options = () => {
  const [foreground, setForeground] = useState('green');
  const [background, setBackground] = useState('white');
  const [showGradient, setShowGradient] = useState(true);
  const [gradient, setGradient] = useState('blue');

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#ffffff',
      }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '280px',
          backgroundColor: '#f8f9fa',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #e9ecef',
        }}>
        <nav style={{ marginBottom: '60px' }}>
          <div
            style={{
              fontSize: '16px',
              marginBottom: '24px',
              fontWeight: '500',
              color: '#212529',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            Color settings
            <span style={{ fontSize: '18px', color: '#6c757d' }}>›</span>
          </div>
          <div style={{ fontSize: '16px', marginBottom: '20px', color: '#6c757d', fontWeight: '400' }}>
            Logo settings
          </div>
          <div style={{ fontSize: '16px', marginBottom: '20px', color: '#6c757d', fontWeight: '400' }}>
            Customize design
          </div>
          <div style={{ fontSize: '16px', color: '#6c757d', fontWeight: '400' }}>Themes</div>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontSize: '16px', marginBottom: '16px', color: '#212529', fontWeight: '500' }}>Preview</div>
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
            <div>QR code</div>
          </div>
          <div
            style={{
              color: '#6c757d',
              fontSize: '16px',
              fontWeight: '400',
            }}>
            Saved!
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: '48px 56px',
          backgroundColor: '#ffffff',
        }}>
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
