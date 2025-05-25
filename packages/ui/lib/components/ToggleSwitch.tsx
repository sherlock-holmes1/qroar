import type React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, ariaLabel }) => (
  <label className="flex items-center cursor-pointer ml-4 text-right">
    <div
      className={`relative w-11 h-6 mr-3 transition-colors duration-200 rounded-full ${
        checked ? 'bg-green-500' : 'bg-red-500'
      }`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="sr-only"
        aria-label={ariaLabel}
      />
      <div
        className={`absolute top-0.5 transition-all duration-200 w-5 h-5 rounded-full shadow flex items-center justify-center text-white text-lg ${
          checked ? 'left-5 bg-green-700' : 'left-0.5 bg-gray-700'
        }`}>
        {checked ? '✓' : '✗'}
      </div>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </label>
);
