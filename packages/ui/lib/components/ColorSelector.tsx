import { useState, useRef, useEffect } from 'react';

interface ColorSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

// Full color palette as per your list
const colorOptions = [
  // Row 1
  { name: 'black', value: '#000000' },
  { name: 'dark gray 4', value: '#434343' },
  { name: 'dark gray 3', value: '#666666' },
  { name: 'dark gray 2', value: '#999999' },
  { name: 'dark gray 1', value: '#b7b7b7' },
  { name: 'gray', value: '#cccccc' },
  { name: 'light gray 1', value: '#d9d9d9' },
  { name: 'light gray 2', value: '#efefef' },
  { name: 'light gray 3', value: '#f3f3f3' },
  { name: 'white', value: '#ffffff' },
  // Row 2
  { name: 'red berry', value: '#980000' },
  { name: 'red', value: '#ff0000' },
  { name: 'orange', value: '#ff9900' },
  { name: 'yellow', value: '#ffff00' },
  { name: 'green', value: '#00ff00' },
  { name: 'cyan', value: '#00ffff' },
  { name: 'cornflower blue', value: '#4a86e8' },
  { name: 'blue', value: '#0000ff' },
  { name: 'purple', value: '#9900ff' },
  { name: 'magenta', value: '#ff00ff' },
  // Row 3
  { name: 'light red berry 3', value: '#e6b8af' },
  { name: 'light red 3', value: '#f4cccc' },
  { name: 'light orange 3', value: '#fce5cd' },
  { name: 'light yellow 3', value: '#fff2cc' },
  { name: 'light green 3', value: '#d9ead3' },
  { name: 'light cyan 3', value: '#d0e0e3' },
  { name: 'light cornflower blue 3', value: '#c9daf8' },
  { name: 'light blue 3', value: '#cfe2f3' },
  { name: 'light purple 3', value: '#d9d2e9' },
  { name: 'light magenta 3', value: '#ead1dc' },
  // Row 4
  { name: 'light red berry 2', value: '#dd7e6b' },
  { name: 'light red 2', value: '#ea9999' },
  { name: 'light orange 2', value: '#f9cb9c' },
  { name: 'light yellow 2', value: '#ffe599' },
  { name: 'light green 2', value: '#b6d7a8' },
  { name: 'light cyan 2', value: '#a2c4c9' },
  { name: 'light cornflower blue 2', value: '#a4c2f4' },
  { name: 'light blue 2', value: '#9fc5e8' },
  { name: 'light purple 2', value: '#b4a7d6' },
  { name: 'light magenta 2', value: '#d5a6bd' },
  // Row 5
  { name: 'light red berry 1', value: '#cc4125' },
  { name: 'light red 1', value: '#e06666' },
  { name: 'light orange 1', value: '#f6b26b' },
  { name: 'light yellow 1', value: '#ffd966' },
  { name: 'light green 1', value: '#93c47d' },
  { name: 'light cyan 1', value: '#76a5af' },
  { name: 'light cornflower blue 1', value: '#6d9eeb' },
  { name: 'light blue 1', value: '#6fa8dc' },
  { name: 'light purple 1', value: '#8e7cc3' },
  { name: 'light magenta 1', value: '#c27ba0' },
  // Row 6
  { name: 'dark red berry 1', value: '#a61c00' },
  { name: 'dark red 1', value: '#cc0000' },
  { name: 'dark orange 1', value: '#e69138' },
  { name: 'dark yellow 1', value: '#f1c232' },
  { name: 'dark green 1', value: '#6aa84f' },
  { name: 'dark cyan 1', value: '#45818e' },
  { name: 'dark cornflower blue 1', value: '#3c78d8' },
  { name: 'dark blue 1', value: '#3d85c6' },
  { name: 'dark purple 1', value: '#674ea7' },
  { name: 'dark magenta 1', value: '#a64d79' },
  // Row 7
  { name: 'dark red berry 2', value: '#85200c' },
  { name: 'dark red 2', value: '#990000' },
  { name: 'dark orange 2', value: '#b45f06' },
  { name: 'dark yellow 2', value: '#bf9000' },
  { name: 'dark green 2', value: '#38761d' },
  { name: 'dark cyan 2', value: '#134f5c' },
  { name: 'dark cornflower blue 2', value: '#1155cc' },
  { name: 'dark blue 2', value: '#0b5394' },
  { name: 'dark purple 2', value: '#351c75' },
  { name: 'dark magenta 2', value: '#741b47' },
  // Row 8
  { name: 'dark red berry 3', value: '#5b0f00' },
  { name: 'dark red 3', value: '#660000' },
  { name: 'dark orange 3', value: '#783f04' },
  { name: 'dark yellow 3', value: '#7f6000' },
  { name: 'dark green 3', value: '#274e13' },
  { name: 'dark cyan 3', value: '#0c343d' },
  { name: 'dark cornflower blue 3', value: '#1c4587' },
  { name: 'dark blue 3', value: '#073763' },
  { name: 'dark purple 3', value: '#20124d' },
  { name: 'dark magenta 3', value: '#4c1130' },
];

export const ColorSelector = ({ value, onChange }: ColorSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedColor = colorOptions.find(c => c.value.toLowerCase() === value.toLowerCase());

  // Create rows array after all hooks
  const rows = colorOptions.reduce(
    (acc, _, index) => {
      if (index % 10 === 0) {
        acc.push(colorOptions.slice(index, index + 10));
      }
      return acc;
    },
    [] as (typeof colorOptions)[],
  );

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '260px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '12px 16px',
          backgroundColor: '#ffffff',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
          fontSize: '16px',
          cursor: 'pointer',
          outline: 'none',
        }}>
        <span>{selectedColor ? selectedColor.name : 'Select color'}</span>
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: selectedColor?.value,
            border: '1.5px solid #888',
            borderRadius: '50%',
            marginLeft: 'auto',
            marginRight: '16px',
          }}
        />
        <span
          style={{
            fontSize: '12px',
            color: '#6c757d',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #e9ecef',
            borderRadius: '12px',
            marginTop: '4px',
            boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
            zIndex: 10,
            padding: '18px 12px 12px 12px',
            minWidth: 400,
          }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} style={{ display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                {row.map(option => (
                  <button
                    key={option.value}
                    title={option.name}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: option.value,
                      border:
                        value.toLowerCase() === option.value.toLowerCase() ? '2.5px solid #222' : '1.5px solid #bbb',
                      outline: 'none',
                      cursor: 'pointer',
                      boxShadow: value.toLowerCase() === option.value.toLowerCase() ? '0 0 0 2px #2196f3' : undefined,
                      transition: 'box-shadow 0.15s, border 0.15s',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
