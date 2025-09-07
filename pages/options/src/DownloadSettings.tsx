type DownloadSettingsProps = {
  format: 'svg' | 'png';
  size: 'small' | 'medium' | 'large';
  onFormatChange: (format: 'svg' | 'png') => void;
  onSizeChange: (size: 'small' | 'medium' | 'large') => void;
  isLoading?: boolean;
  showSavedFeedback?: boolean;
};

const sizeOptions = [
  { id: 'small', label: 'Small', dimensions: '300x300' },
  { id: 'medium', label: 'Medium', dimensions: '1000x1000' },
  { id: 'large', label: 'Large', dimensions: '5000x5000' },
] as const;

export const DownloadSettings = ({
  format,
  size,
  onFormatChange,
  onSizeChange,
  isLoading = false,
  showSavedFeedback = false,
}: DownloadSettingsProps) => {
  const isSvgFormat = format === 'svg';

  return (
    <>
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-4xl font-normal text-gray-900 text-left">Download settings</h1>
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Loading...
          </div>
        )}
        {showSavedFeedback && (
          <div className="flex items-center gap-2 text-sm text-green-600 animate-fade-in">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Settings saved
          </div>
        )}
      </div>

      <div className="max-w-[500px] mb-14 ml-1">
        {/* Format Selection */}
        <div className="mb-8">
          <div className="flex items-start gap-[65px]">
            <div className="w-[150px] flex items-center justify-start">
              <span className="text-base text-gray-900 font-normal">File format</span>
              <div className="group relative inline-block ml-2">
                <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  PNG: Raster format, good for sharing. SVG: Vector format, scalable for print.
                  <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="format"
                  value="png"
                  checked={format === 'png'}
                  onChange={() => onFormatChange('png')}
                  disabled={isLoading}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 focus:ring-transparent disabled:opacity-50"
                />
                <span className="text-base text-gray-900 group-hover:text-blue-600 transition-colors">PNG</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="format"
                  value="svg"
                  checked={format === 'svg'}
                  onChange={() => onFormatChange('svg')}
                  disabled={isLoading}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 focus:ring-transparent disabled:opacity-50"
                />
                <span className="text-base text-gray-900 group-hover:text-blue-600 transition-colors">SVG</span>
              </label>
            </div>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-8">
          <div className="flex items-start gap-[150px]">
            <div className="w-[150px] flex items-center justify-start">
              <span className="text-base text-gray-900 font-normal">Size</span>
              <div className="group relative inline-block ml-2">
                <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Small: Quick sharing. Medium: General use. Large: High-quality print.
                  <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col gap-3">
                {sizeOptions.map(option => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-2 ${
                      isSvgFormat
                        ? 'opacity-40 cursor-not-allowed grayscale'
                        : 'cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2 -my-1'
                    }`}>
                    <input
                      type="radio"
                      name="size"
                      value={option.id}
                      checked={size === option.id}
                      onChange={() => onSizeChange(option.id)}
                      disabled={isSvgFormat || isLoading}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 focus:ring-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className={`text-base ${isSvgFormat ? 'text-gray-400' : 'text-gray-900'}`}>
                      {option.label} ({option.dimensions}px)
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-2 h-24 w-full">
                <div className={`transition-opacity duration-200 ${isSvgFormat ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-blue-800">SVG Format Selected</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Size options are disabled because SVG is a vector format that scales infinitely without
                          quality loss.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
