import { ColorSelector, ToggleSwitch } from '@extension/ui';

type ColorSettingsProps = {
  foreground: string;
  background: string;
  showGradient: boolean;
  gradient: string;
  onForegroundChange: (color: string) => void;
  onBackgroundChange: (color: string) => void;
  onShowGradientChange: (show: boolean) => void;
  onGradientChange: (color: string) => void;
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
}: ColorSettingsProps) => {
  return (
    <>
      <h1 className="text-4xl font-normal mb-14 text-gray-900 text-left">Color settings</h1>

      <div className="max-w-[500px]">
        {/* Background */}
        <div className="mb-10">
          <div className="flex items-center gap-[150px]">
            <span className="text-base text-gray-900 font-normal w-[150px] text-left">Background</span>
            <ColorSelector value={background} onChange={onBackgroundChange} />
          </div>
        </div>

        {/* Foreground */}
        <div className="mb-10">
          <div className="flex items-center gap-[150px]">
            <span className="text-base text-gray-900 font-normal w-[150px] text-left">Foreground</span>
            <ColorSelector value={foreground} onChange={onForegroundChange} />
          </div>
        </div>

        {/* Foreground Gradient */}
        <div className="mb-10">
          <div className="flex items-center gap-[10px] h-[50px]">
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
    </>
  );
};
