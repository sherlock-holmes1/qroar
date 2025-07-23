import { ColorSelector, ToggleSwitch } from '@extension/ui';
import type { QRCodeBoxProps } from '@extension/storage';
import { qrDesigns } from './qrDesignsArray';

type ColorSettingsProps = {
  foreground: string;
  background: string;
  showGradient: boolean;
  gradient: string;
  onForegroundChange: (color: string) => void;
  onBackgroundChange: (color: string) => void;
  onShowGradientChange: (show: boolean) => void;
  onGradientChange: (color: string) => void;
  onDesignSelect?: (settings: QRCodeBoxProps, designId: string) => void;
  selectedDesign?: string;
};

export const ColorSettings = ({
  foreground,
  background,
  showGradient,
  gradient,
  onForegroundChange,
  onBackgroundChange,
  onShowGradientChange,
  onGradientChange,
  onDesignSelect,
  selectedDesign,
}: ColorSettingsProps) => {
  return (
    <>
      <h1 className="text-4xl font-normal mb-10 text-gray-900 text-left">Color settings</h1>

      <div className="max-w-[500px] mb-14">
        {/* Background */}
        <div className="mb-8">
          <div className="flex items-center gap-[150px]">
            <span className="text-base text-gray-900 font-normal w-[150px] text-left">Background</span>
            <ColorSelector value={background} onChange={onBackgroundChange} />
          </div>
        </div>

        {/* Foreground */}
        <div className="mb-8">
          <div className="flex items-center gap-[150px]">
            <span className="text-base text-gray-900 font-normal w-[150px] text-left">Foreground</span>
            <ColorSelector value={foreground} onChange={onForegroundChange} />
          </div>
        </div>

        {/* Foreground Gradient */}
        <div className="mb-8">
          <div className="flex items-center gap-[23px] h-[50px]">
            <span className="text-base text-gray-900 font-normal w-[300px] text-left flex items-center">
              Foreground gradient
              <ToggleSwitch
                checked={showGradient}
                onChange={onShowGradientChange}
                ariaLabel="Toggle foreground gradient"
              />
            </span>
            {/* Gradient Color Selector */}
            {showGradient && <ColorSelector value={gradient} onChange={onGradientChange} />}
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-normal mb-10 text-gray-900 text-left">Color presets</h1>
      <div className="flex flex-col items-start mt-10">
        <div
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-5xl self-start"
          style={{ scrollbarWidth: 'auto', maxWidth: '100%' }}>
          {qrDesigns.map((design, idx) => (
            <button
              key={idx}
              className={`mt-2 mb-2 rounded-2xl shadow-md p-1 flex items-center justify-center transition-transform hover:scale-105 focus:ring-2 focus:ring-blue-400 ${design.bg} ${design.border} ${
                selectedDesign === design.id ? 'ring-2 ring-blue-500' : ''
              }`}
              aria-label={`QR design ${idx + 1}`}
              type="button"
              style={{ width: 96, height: 96 }}
              onClick={() => onDesignSelect?.(design.settings, design.id)}>
              {design.svg ? design.svg : <img src={design.src} alt="" />}
            </button>
          ))}
          {selectedDesign === 'custom' && (
            <button
              className="mt-2 mb-2 rounded-2xl shadow-md p-1 flex items-center justify-center ring-2 ring-blue-500 bg-gray-100 border-gray-300"
              aria-label="Custom QR design"
              type="button"
              style={{ width: 96, height: 96 }}>
              <span className="text-gray-600 font-semibold">Custom</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
