import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';

const colorOptions = [
  { name: 'Green', value: 'green', color: '#22c55e' },
  { name: 'Blue', value: 'blue', color: '#3b82f6' },
  { name: 'Red', value: 'red', color: '#ef4444' },
  { name: 'Yellow', value: 'yellow', color: '#eab308' },
  { name: 'Pink', value: 'pink', color: '#ec4899' },
  { name: 'Purple', value: 'purple', color: '#8b5cf6' },
  { name: 'Black', value: 'black', color: '#000000' },
];

const Options = () => {
  const [foreground, setForeground] = useState('green');
  const [foregroundDropdownOpen, setForegroundDropdownOpen] = useState(false);
  const [gradient, setGradient] = useState(true);

  const selectedForegroundColor = colorOptions.find(c => c.value === foreground);

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  color: '#ef4444',
                  fontSize: '16px',
                  fontWeight: '400',
                }}>
                Red
              </div>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#ef4444',
                  border: '1px solid #e9ecef',
                  borderRadius: '4px',
                }}
              />
            </div>
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
            <div style={{ position: 'relative', width: '200px' }}>
              <button
                onClick={() => setForegroundDropdownOpen(!foregroundDropdownOpen)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '16px',
                  color: selectedForegroundColor?.value === 'green' ? '#22c55e' : '#212529',
                  cursor: 'pointer',
                  outline: 'none',
                }}>
                <span>{selectedForegroundColor?.name}</span>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#6c757d',
                    transform: foregroundDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}>
                  ▼
                </span>
              </button>

              {foregroundDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    marginTop: '4px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}>
                  {colorOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setForeground(option.value);
                        setForegroundDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '16px',
                        color:
                          option.value === 'green'
                            ? '#22c55e'
                            : option.value === 'blue'
                              ? '#3b82f6'
                              : option.value === 'red'
                                ? '#ef4444'
                                : option.value === 'yellow'
                                  ? '#eab308'
                                  : option.value === 'pink'
                                    ? '#ec4899'
                                    : option.value === 'purple'
                                      ? '#8b5cf6'
                                      : '#000000',
                        cursor: 'pointer',
                        textAlign: 'left',
                        outline: 'none',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}>
                      <span>{option.name}</span>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: option.color,
                          border: '1px solid #e9ecef',
                          borderRadius: '4px',
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
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

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
