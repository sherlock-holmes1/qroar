import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';
import { ErrorDisplay, LoadingSpinner, ColorSelector } from '@extension/ui';

const Options = () => {
  const [foreground, setForeground] = useState('green');
  const [background, setBackground] = useState('white');
  const [gradient, setGradient] = useState(true);

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
        <h1
          style={{
            fontSize: '36px',
            fontWeight: '400',
            marginBottom: '56px',
            color: '#212529',
            margin: '0 0 56px 0',
          }}>
          Color settings
        </h1>

        <div style={{ maxWidth: '500px' }}>
          {/* Background */}
          <div style={{ marginBottom: '40px' }}>
            <div
              style={{
                marginBottom: '16px',
                fontSize: '16px',
                color: '#212529',
                fontWeight: '400',
              }}>
              Background
            </div>
            <ColorSelector value={background} onChange={setBackground} />
          </div>

          {/* Foreground */}
          <div style={{ marginBottom: '40px' }}>
            <div
              style={{
                marginBottom: '16px',
                fontSize: '16px',
                color: '#212529',
                fontWeight: '400',
              }}>
              Foreground
            </div>
            <ColorSelector value={foreground} onChange={setForeground} />
          </div>

          {/* Foreground Gradient */}
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                marginBottom: '16px',
                fontSize: '16px',
                color: '#212529',
                fontWeight: '400',
              }}>
              Foreground Gradient
            </div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}>
              <div
                style={{
                  width: '44px',
                  height: '24px',
                  backgroundColor: gradient ? '#3b82f6' : '#e9ecef',
                  borderRadius: '12px',
                  position: 'relative',
                  transition: 'background-color 0.2s ease',
                  marginRight: '12px',
                }}>
                <input
                  type="checkbox"
                  checked={gradient}
                  onChange={e => setGradient(e.target.checked)}
                  style={{ display: 'none' }}
                />
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: gradient ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
              <span className="sr-only">Toggle foreground gradient</span>
            </label>
          </div>

          {/* Gradient Color Selector */}
          {gradient && (
            <div style={{ width: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    color: '#ec4899',
                    fontSize: '16px',
                    fontWeight: '400',
                  }}>
                  Pink
                </div>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#ec4899',
                    border: '1px solid #e9ecef',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <LoadingSpinner />), <ErrorDisplay />);
