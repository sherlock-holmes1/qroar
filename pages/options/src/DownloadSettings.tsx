type DownloadSettingsProps = {
  format: 'svg' | 'png';
  size: 'small' | 'medium' | 'large';
  onFormatChange: (format: 'svg' | 'png') => void;
  onSizeChange: (size: 'small' | 'medium' | 'large') => void;
};

const sizeOptions = [
  { id: 'small', label: 'Small', dimensions: '300x300' },
  { id: 'medium', label: 'Medium', dimensions: '1000x1000' },
  { id: 'large', label: 'Large', dimensions: '5000x5000' },
] as const;

export const DownloadSettings = ({ format, size, onFormatChange, onSizeChange }: DownloadSettingsProps) => {
  const isSvgFormat = format === 'svg';

  return (
    <>
      <h1 className="text-4xl font-normal mb-10 text-gray-900 text-left">Download settings</h1>

      <div className="max-w-[500px] mb-14">
        {/* Format Selection */}
        <div className="mb-8">
          <div className="flex items-center gap-[150px]">
            <span className="text-base text-gray-900 font-normal w-[150px] text-left">File format</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="png"
                  checked={format === 'png'}
                  onChange={() => onFormatChange('png')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-base text-gray-900">PNG</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="svg"
                  checked={format === 'svg'}
                  onChange={() => onFormatChange('svg')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-base text-gray-900">SVG</span>
              </label>
            </div>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-8">
          <div className="flex items-start gap-[150px]">
            <span className="text-base text-gray-900 font-normal w-[150px] text-left">Size</span>
            <div className="flex flex-col gap-3">
              {sizeOptions.map(option => (
                <label
                  key={option.id}
                  className={`flex items-center gap-2 cursor-pointer ${
                    isSvgFormat ? 'opacity-50 cursor-not-allowed' : ''
                  }`}>
                  <input
                    type="radio"
                    name="size"
                    value={option.id}
                    checked={size === option.id}
                    onChange={() => onSizeChange(option.id)}
                    disabled={isSvgFormat}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <span className="text-base text-gray-900">
                    {option.label} ({option.dimensions}px)
                  </span>
                </label>
              ))}
              {isSvgFormat && (
                <p className="text-sm text-gray-500 mt-2">
                  Size options are not applicable for SVG format (vector-based)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
