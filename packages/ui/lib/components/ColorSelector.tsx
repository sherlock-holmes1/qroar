import { useState, useRef, useEffect } from 'react';

interface ColorSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

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

  const colorOptions = [
    { name: 'Green 1', value: '#145A2A', color: '#145A2A' },
    { name: 'Green 2', value: '#22c55e', color: '#22c55e' },
    { name: 'Green 3', value: '#C0FBD4', color: '#C0FBD4' },
    { name: 'Teal', value: '#50EBD5', color: '#50EBD5' },
    { name: 'Deep Teal', value: '#0F4B47', color: '#0F4B47' },
    { name: 'Blue', value: '#3b82f6', color: '#3b82f6' },
    { name: 'Red 1', value: '#ef4444', color: '#ef4444' },
    { name: 'Red 2', value: '#F96E6E', color: '#F96E6E' },
    { name: 'Yellow 1', value: '#eab308', color: '#eab308' },
    { name: 'Yellow 2', value: '#FFFBC4', color: '#FFFBC4' },
    { name: 'Orange', value: '#FFECD1', color: '#FFECD1' },
    { name: 'Burnt Orange', value: '#A94900', color: '#A94900' },
    { name: 'Vermilion', value: '#E9540E', color: '#E9540E' },
    { name: 'Pink', value: '#ec4899', color: '#ec4899' },
    { name: 'Purple', value: '#8b5cf6', color: '#8b5cf6' },
    { name: 'Black', value: '#000000', color: '#000000' },
    { name: 'White', value: '#ffffff', color: '#ffffff' },
  ];

  const selectedColor = colorOptions.find(c => c.value === value);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '200px' }}>
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
          // color: selectedColor?.color || '#212529',
          cursor: 'pointer',
          outline: 'none',
        }}>
        <span>{selectedColor?.name}</span>
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: selectedColor?.color,
            border: '1px solid black',
            borderRadius: '4px',
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
                onChange(option.value);
                setIsOpen(false);
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
                // color: option.color,
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
                  border: '1px solid black',
                  borderRadius: '4px',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
