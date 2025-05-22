import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
// import { exampleThemeStorage } from '@extension/storage';
// import { ToggleButton } from '@extension/ui';
// import { t } from '@extension/i18n';
import { useState } from 'react';

const colorOptions = [
  { name: 'Green', value: 'green', color: '#206a2c' },
  { name: 'Blue', value: 'blue', color: '#2552c4' },
  { name: 'Red', value: 'red', color: '#e74c3c' },
  { name: 'Yellow', value: 'yellow', color: '#ffe600' },
  { name: 'Pink', value: 'pink', color: '#e97cfb' },
  { name: 'Purple', value: 'purple', color: '#4b2676' },
  { name: 'Black', value: 'black', color: '#111' },
];

const Options = () => {
  // const theme = useStorage(exampleThemeStorage);
  const [background, setBackground] = useState('red');
  const [foreground, setForeground] = useState('green');
  const [gradient, setGradient] = useState(true);
  const [gradientColor, setGradientColor] = useState('pink');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Quicksand, sans-serif' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: '#f7f8fa',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderRight: '1px solid #eee',
        }}>
        <nav style={{ width: '100%' }}>
          <div style={{ fontSize: 18, marginBottom: 24, fontWeight: 500 }}>
            Color settings <span style={{ float: 'right' }}>{'>'}</span>
          </div>
          <div style={{ marginBottom: 18, color: '#444' }}>Logo settings</div>
          <div style={{ marginBottom: 18, color: '#444' }}>Customize design</div>
          <div style={{ color: '#444' }}>Themes</div>
        </nav>
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <div style={{ fontSize: 16, marginBottom: 8 }}>Preview</div>
          <div
            style={{
              background: '#fff',
              padding: 8,
              borderRadius: 8,
              border: '1px solid #eee',
              display: 'flex',
              justifyContent: 'center',
            }}>
            {/* Placeholder QR code */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=example"
              alt="QR Preview"
              style={{ width: 120, height: 120 }}
            />
          </div>
          <div style={{ marginTop: 16, color: '#7c7c7c', fontSize: 16 }}>Saved!</div>
        </div>
      </aside>
      {/* Main Content */}
      <main style={{ flex: 1, padding: '48px 40px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 400, marginBottom: 40 }}>Color settings</h1>
        <div style={{ maxWidth: 400 }}>
          {/* Background */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ marginBottom: 8 }}>Background</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <select
                value={background}
                onChange={e => setBackground(e.target.value)}
                style={{
                  fontSize: 18,
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid #eee',
                  marginRight: 12,
                  minWidth: 120,
                }}>
                {colorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <span
                style={{
                  display: 'inline-block',
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: colorOptions.find(c => c.value === background)?.color,
                  border: '1px solid #ddd',
                }}
              />
            </div>
          </div>
          {/* Foreground */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ marginBottom: 8 }}>Foreground</div>
            <div style={{ position: 'relative', width: 180 }}>
              <select
                value={foreground}
                onChange={e => setForeground(e.target.value)}
                style={{
                  fontSize: 18,
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid #eee',
                  width: '100%',
                }}>
                {colorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <span
                style={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: colorOptions.find(c => c.value === foreground)?.color,
                  border: '1px solid #ddd',
                }}
              />
            </div>
          </div>
          {/* Foreground Gradient */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}>Foreground Gradient</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                type="checkbox"
                checked={gradient}
                onChange={e => setGradient(e.target.checked)}
                style={{ width: 32, height: 18, accentColor: '#7c7cfa' }}
              />
              <span style={{ fontSize: 18 }}>{gradient ? '' : ''}</span>
            </label>
          </div>
          {gradient && (
            <div style={{ marginBottom: 32 }}>
              <select
                value={gradientColor}
                onChange={e => setGradientColor(e.target.value)}
                style={{
                  fontSize: 18,
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid #eee',
                  minWidth: 120,
                }}>
                {colorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <span
                style={{
                  display: 'inline-block',
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: colorOptions.find(c => c.value === gradientColor)?.color,
                  border: '1px solid #ddd',
                  marginLeft: 12,
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
