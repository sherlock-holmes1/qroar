import type React from 'react';
import type { QRCodeBoxProps } from '@extension/storage';

const qrDesigns: {
  bg: string;
  border: string;
  svg: React.ReactNode;
  settings: QRCodeBoxProps;
}[] = [
  {
    bg: 'bg-white', // classic
    border: 'border-4 border-blue-900',
    svg: (
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <rect x="4" y="4" width="16" height="16" rx="3" fill="#000000" />
        <rect x="44" y="4" width="16" height="16" rx="3" fill="#000000" />
        <rect x="4" y="44" width="16" height="16" rx="3" fill="#000000" />
        <rect x="24" y="24" width="16" height="16" rx="3" fill="#000000" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#ffffff', // white
      foregroundColor: '#000000', // black
      showGradient: false,
      cornersSquareType: 'square',
      cornersDotType: 'square',
      dotsType: 'square',
    },
  },
  {
    bg: 'bg-[#cfe2f3]', // blue
    border: '',
    svg: (
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <rect x="4" y="4" width="16" height="16" rx="5" fill="#0b5394" />
        <rect x="44" y="4" width="16" height="16" rx="5" fill="#0b5394" />
        <rect x="4" y="44" width="16" height="16" rx="5" fill="#0b5394" />
        <rect x="24" y="24" width="16" height="16" rx="5" fill="#0b5394" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#cfe2f3',
      foregroundColor: '#0b5394',
      showGradient: false,
      cornersSquareType: 'dot',
      cornersDotType: 'square',
    },
  },
  {
    bg: 'bg-[#fce5cd]',
    border: '',
    svg: (
      // Placeholder SVG for orange QR (dotted)
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <circle cx="12" cy="12" r="8" fill="#b45f06" />
        <circle cx="52" cy="12" r="8" fill="#b45f06" />
        <circle cx="12" cy="52" r="8" fill="#b45f06" />
        <circle cx="32" cy="32" r="6" fill="#b45f06" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#fce5cd', // light orange 3
      foregroundColor: '#b45f06', // dark orange 1
      showGradient: false,
      cornersSquareType: 'dot',
      dotsType: 'classy',
    },
  },
  {
    bg: 'bg-[#9900ff]',
    border: '',
    svg: (
      // Placeholder SVG for red QR
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="#ffffff" />
        <rect x="44" y="4" width="16" height="16" rx="4" fill="#ffffff" />
        <rect x="4" y="44" width="16" height="16" rx="4" fill="#ffffff" />
        <rect x="24" y="24" width="16" height="16" rx="4" fill="#ffffff" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#9900ff', // purple
      foregroundColor: '#ffffff', // white
      showGradient: false,
      cornersSquareType: 'square',
      dotsType: 'classy-rounded',
    },
  },
  {
    bg: 'bg-yellow-100',
    border: '',
    svg: (
      // Placeholder SVG for yellow QR
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <rect x="4" y="4" width="16" height="16" rx="6" fill="#bf9000" />
        <rect x="44" y="4" width="16" height="16" rx="6" fill="#bf9000" />
        <rect x="4" y="44" width="16" height="16" rx="6" fill="#bf9000" />
        <rect x="24" y="24" width="16" height="16" rx="6" fill="#bf9000" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#fff2cc', // light yellow 3
      foregroundColor: '#bf9000', // dark yellow 1
      showGradient: false,
      cornersDotType: 'square',
      dotsType: 'extra-rounded',
    },
  },
  {
    bg: 'bg-green-200',
    border: '',
    svg: (
      // Placeholder SVG for green QR (dotted)
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <circle cx="12" cy="12" r="8" fill="#38761d" />
        <circle cx="52" cy="12" r="8" fill="#38761d" />
        <circle cx="12" cy="52" r="8" fill="#38761d" />
        <circle cx="32" cy="32" r="6" fill="#38761d" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#d9ead3', // light green 3
      foregroundColor: '#38761d', // dark green 2
      showGradient: false,
      cornersSquareType: 'dot',
      cornersDotType: 'square',
      dotsType: 'square',
    },
  },
  {
    bg: 'bg-[#ead1dc]',
    border: '',
    svg: (
      // Placeholder SVG for green QR (dotted)
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <circle cx="12" cy="12" r="8" fill="#741b47" />
        <circle cx="52" cy="12" r="8" fill="#741b47" />
        <circle cx="12" cy="52" r="8" fill="#741b47" />
        <circle cx="32" cy="32" r="6" fill="#741b47" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#ead1dc',
      foregroundColor: '#741b47',
      showGradient: false,
      cornersDotType: 'square',
    },
  },
  {
    bg: 'bg-[#e6b8af]',
    border: '',
    svg: (
      // Placeholder SVG for green QR (dotted)
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <circle cx="12" cy="12" r="8" fill="#85200c" />
        <circle cx="52" cy="12" r="8" fill="#85200c" />
        <circle cx="12" cy="52" r="8" fill="#85200c" />
        <circle cx="32" cy="32" r="6" fill="#85200c" />
        {/* ...dots... */}
      </svg>
    ),
    settings: {
      qrText: 'https://qroar.com',
      pathToLogo: undefined,
      backgroundColor: '#e6b8af',
      foregroundColor: '#85200c',
      showGradient: false,
      dotsType: 'rounded',
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
