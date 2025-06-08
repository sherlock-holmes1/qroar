import type React from 'react';
import type { QRCodeBoxProps } from '@extension/ui';

const qrDesigns: {
  bg: string;
  border: string;
  svg: React.ReactNode;
  settings: QRCodeBoxProps;
}[] = [
  {
    bg: 'bg-white',
    border: 'border-4 border-blue-900',
    svg: (
      // Placeholder SVG for dark blue QR
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <rect x="4" y="4" width="16" height="16" rx="3" fill="#1e293b" />
        <rect x="44" y="4" width="16" height="16" rx="3" fill="#1e293b" />
        <rect x="4" y="44" width="16" height="16" rx="3" fill="#1e293b" />
        <rect x="24" y="24" width="16" height="16" rx="3" fill="#1e293b" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      showGradient: false,
      // gradientColor?: string;
    },
  },
  {
    bg: 'bg-teal-300',
    border: '',
    svg: (
      // Placeholder SVG for teal QR
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <rect x="4" y="4" width="16" height="16" rx="5" fill="#134e4a" />
        <rect x="44" y="4" width="16" height="16" rx="5" fill="#134e4a" />
        <rect x="4" y="44" width="16" height="16" rx="5" fill="#134e4a" />
        <rect x="24" y="24" width="16" height="16" rx="5" fill="#134e4a" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#50EBD5',
      foregroundColor: '#0F4B47',
      showGradient: false,
    },
  },
  {
    bg: 'bg-orange-100',
    border: '',
    svg: (
      // Placeholder SVG for orange QR (dotted)
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <circle cx="12" cy="12" r="8" fill="#ea580c" />
        <circle cx="52" cy="12" r="8" fill="#ea580c" />
        <circle cx="12" cy="52" r="8" fill="#ea580c" />
        <circle cx="32" cy="32" r="6" fill="#ea580c" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#FFECD1',
      foregroundColor: '#E9540E',
      showGradient: false,
    },
  },
  {
    bg: 'bg-red-400',
    border: '',
    svg: (
      // Placeholder SVG for red QR
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="#fff" />
        <rect x="44" y="4" width="16" height="16" rx="4" fill="#fff" />
        <rect x="4" y="44" width="16" height="16" rx="4" fill="#fff" />
        <rect x="24" y="24" width="16" height="16" rx="4" fill="#fff" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#F96E6E',
      foregroundColor: '#FFFFFF',
      showGradient: false,
    },
  },
  {
    bg: 'bg-yellow-100',
    border: '',
    svg: (
      // Placeholder SVG for yellow QR
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <rect x="4" y="4" width="16" height="16" rx="6" fill="#b45309" />
        <rect x="44" y="4" width="16" height="16" rx="6" fill="#b45309" />
        <rect x="4" y="44" width="16" height="16" rx="6" fill="#b45309" />
        <rect x="24" y="24" width="16" height="16" rx="6" fill="#b45309" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#FFFBC4',
      foregroundColor: '#A94900',
      showGradient: false,
    },
  },
  {
    bg: 'bg-green-200',
    border: '',
    svg: (
      // Placeholder SVG for green QR (dotted)
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <circle cx="12" cy="12" r="8" fill="#166534" />
        <circle cx="52" cy="12" r="8" fill="#166534" />
        <circle cx="12" cy="52" r="8" fill="#166534" />
        <circle cx="32" cy="32" r="6" fill="#166534" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#C0FBD4',
      foregroundColor: '#145A2A',
      showGradient: false,
    },
  },
];

export const QRdesigns: React.FC<{ onDesignSelect?: (settings: QRCodeBoxProps) => void }> = ({ onDesignSelect }) => {
  return (
    <>
      <h1 className="text-4xl font-normal mb-10 text-gray-900 text-left">QR code designs</h1>
      <div className="flex flex-col items-center mt-10">
        <div
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-5xl px-4"
          style={{ scrollbarWidth: 'auto', maxWidth: '100%' }}>
          {qrDesigns.map((design, idx) => (
            <button
              key={idx}
              className={`mt-2 mb-2 rounded-2xl shadow-md p-4 flex items-center justify-center transition-transform hover:scale-105 focus:ring-2 focus:ring-blue-400 ${design.bg} ${design.border}`}
              aria-label={`QR design ${idx + 1}`}
              type="button"
              style={{ width: 96, height: 96 }}
              onClick={() => onDesignSelect?.(design.settings)}>
              {design.svg}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
