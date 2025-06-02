import type React from 'react';

const logoOptions = [
  { id: 'none', label: 'None', icon: '🚫' },
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
  selected: string | null;
  uploadedLogo: string | null;
  onLogoSelect: (id: string) => void;
  onLogoUpload: (file: File) => void;
};

export const LogoSettings: React.FC<LogoSettingsProps> = ({ selected, onLogoSelect, uploadedLogo, onLogoUpload }) => {
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

  return (
    <>
      <h1 className="text-4xl font-normal mb-14 mt-20 text-gray-900 text-left">Logo settings</h1>
      <div className="grid grid-cols-7 gap-4 mb-8">
        <button
          className={`flex flex-col items-center justify-center border rounded-lg p-4 transition w-20 h-20
            ${selected === 'detect' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
            hover:border-blue-400`}
          onClick={handleDetectFromSite}
          aria-label="Detect from site"
          type="button">
          <span className="text-3xl mb-2">🔍</span>
          <span className="text-xs">Auto detect</span>
        </button>
        {logoOptions.map(opt => (
          <button
            key={opt.id}
            className={`flex flex-col items-center justify-center border rounded-lg p-4 transition w-20 h-20
              ${selected === opt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
              hover:border-blue-400`}
            onClick={() => handleLogoClick(opt.id)}
            aria-label={opt.label}
            type="button">
            {opt.icon ? (
              <span className="text-3xl mb-2">{opt.icon}</span>
            ) : (
              <img src={opt.url} alt={opt.label} width="56px" height="56px" />
            )}
          </button>
        ))}
      </div>
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
        <input type="file" accept="image/png, image/jpeg, image/svg" className="hidden" onChange={handleUpload} />
      </label>
    </>
  );
};
