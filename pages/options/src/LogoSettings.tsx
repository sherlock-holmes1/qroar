const logoOptions = [
  { id: 'scanme', label: 'Scan Me', url: 'logo/scanme.svg' },
  { id: 'facebook', label: 'Facebook', url: 'logo/facebook.svg' },
  { id: 'instagram', label: 'Instagram', url: 'logo/instagram.svg' },
  { id: 'linkedin', label: 'LinkedIn', url: 'logo/linkedin.svg' },
  { id: 'x', label: 'X', url: 'logo/x.svg' },
  { id: 'youtube', label: 'YouTube', url: 'logo/youtube.svg' },
  { id: 'tiktok', label: 'TikTok', url: 'logo/tiktok.svg' },
  { id: 'pinterest', label: 'Pinterest', url: 'logo/pinterest.svg' },
  { id: 'appstore', label: 'App Store', url: 'logo/appstore.svg' },
  { id: 'gmail', label: 'Gmail', url: 'logo/gmail.svg' },
  { id: 'wifi', label: 'Wi-Fi', url: 'logo/wifi.svg' },
];

export type LogoSettingsProps = {
  selectedLogo: string | null;
  uploadedLogo: string | null;
  onLogoSelect: (id: string) => void;
  onLogoUpload: (file: File) => void;
};

export const LogoSettings: React.FC<LogoSettingsProps> = ({
  selectedLogo,
  onLogoSelect,
  uploadedLogo,
  onLogoUpload,
}) => {
  const handleLogoClick = (id: string) => {
    onLogoSelect(id);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onLogoUpload(file);
    }
  };

  const handleDetectFromSite = () => {
    onLogoSelect('detect');
  };

  const handleNoLogo = () => {
    onLogoSelect('none');
  };

  return (
    <>
      <h1 className="text-4xl font-normal mb-10 text-gray-900 text-left">Logo settings</h1>
      {/* Auto detect */}
      <span className="flex items-center gap-3 mb-10 cursor-pointer select-none">
        <button
          className={`flex flex-col items-center justify-center border rounded-lg p-4 transition w-20 h-20
            ${selectedLogo === 'detect' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
            hover:border-blue-400`}
          onClick={handleDetectFromSite}
          aria-label="Detect from site"
          type="button">
          <span className="text-3xl mb-2">🔍</span>
          <span className="text-xs">Auto detect</span>
        </button>

        <button
          className={`flex flex-col items-center justify-center border rounded-lg p-4 transition w-20 h-20
          ${selectedLogo === 'none' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
          hover:border-blue-400`}
          onClick={handleNoLogo}
          aria-label="Detect from site"
          type="button">
          <span className="text-3xl mb-2">🚫</span>
          <span className="text-xs">No logo</span>
        </button>
      </span>

      {/* Choose a logo */}
      <span className="flex items-center gap-3 mb-4 cursor-pointer select-none">
        <span className="text-base">Choose a logo</span>
      </span>
      <div
        className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
        style={{ maxWidth: '100%' }}>
        {logoOptions.map(opt => (
          <button
            key={opt.id}
            className={`flex flex-col items-center justify-center border rounded-lg p-4 transition w-20 h-20
              ${selectedLogo === opt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
              hover:border-blue-400`}
            onClick={() => handleLogoClick(opt.id)}
            aria-label={opt.label}
            type="button">
            <img src={opt.url} alt={opt.label} width="40px" height="40px" className="mb-2" />
          </button>
        ))}
      </div>
      {/* Upload a logo */}
      <span className="flex items-center gap-3 mb-4 cursor-pointer select-none">
        <span className="text-base">Upload a logo</span>
      </span>
      <label
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-400 transition"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}>
        {uploadedLogo ? (
          <img src={uploadedLogo} alt="Uploaded logo" className="h-16 mb-2" />
        ) : (
          <>
            <span className="text-gray-500 mb-2">Drag & drop or click to upload a logo</span>
            <span className="text-xs text-gray-400 mb-2">Supported file formats: JPG, SVG, or PNG | 2MB max</span>
          </>
        )}
        <input
          type="file"
          accept="image/png, image/jpeg, image/svg+xml, image/webp"
          className="hidden"
          onChange={handleUpload}
        />
      </label>
    </>
  );
};
