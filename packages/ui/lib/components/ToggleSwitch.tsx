import type React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, ariaLabel }) => (
  <label className="flex items-center cursor-pointer ml-4 text-right">
    <div
      className={`relative w-11 h-6 mr-3 transition-colors duration-200 rounded-full ${checked ? 'bg-blue-500' : 'bg-gray-200'}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="sr-only"
        aria-label={ariaLabel}
      />
      <div
        className={`absolute top-0.5 transition-all duration-200 w-5 h-5 bg-white rounded-full shadow ${checked ? 'left-5' : 'left-0.5'}`}
      />
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </label>
);
