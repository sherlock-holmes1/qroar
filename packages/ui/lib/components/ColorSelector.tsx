import { useState } from 'react';

interface ColorSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorSelector = ({ value, onChange }: ColorSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorOptions = [
    { name: 'Green', value: 'green', color: '#22c55e' },
    { name: 'Blue', value: 'blue', color: '#3b82f6' },
    { name: 'Red', value: 'red', color: '#ef4444' },
    { name: 'Yellow', value: 'yellow', color: '#eab308' },
    { name: 'Pink', value: 'pink', color: '#ec4899' },
    { name: 'Purple', value: 'purple', color: '#8b5cf6' },
    { name: 'Black', value: 'black', color: '#000000' },
  ];

  const selectedColor = colorOptions.find(c => c.value === value);

  return (
    <div style={{ position: 'relative', width: '200px' }}>
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
          fontSize: '16px',
          color: selectedColor?.color || '#212529',
          cursor: 'pointer',
          outline: 'none',
        }}>
        <span>{selectedColor?.name}</span>
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
                color: option.color,
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
  );
};
