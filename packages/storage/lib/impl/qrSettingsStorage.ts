import type { BaseStorage } from '../base/index.js';
import type { QRCodeBoxProps } from './QRCodeBoxProps.js';
import { createStorage, StorageEnum } from '../base/index.js';

// Type for stored settings derived from QRCodeBoxProps
export type StoredSettings = Pick<
  QRCodeBoxProps,
  | 'foregroundColor'
  | 'backgroundColor'
  | 'showGradient'
  | 'gradientColor'
  | 'pathToLogo'
  | 'cornersSquareType'
  | 'cornersDotType'
  | 'dotsType'
  | 'size'
>;

// Storage interface with strongly typed methods
export type QRSettingsStorage = BaseStorage<StoredSettings> & {
  setForegroundColor: (color: string) => Promise<void>;
  setBackgroundColor: (color: string) => Promise<void>;
  setShowGradient: (show: boolean) => Promise<void>;
  setGradientColor: (color: string) => Promise<void>;
  setLogo: (logo: string | undefined) => Promise<void>;
  setCornersSquareType: (type: QRCodeBoxProps['cornersSquareType']) => Promise<void>;
  setAll: (settings: Partial<StoredSettings>) => Promise<void>;
  reset: () => Promise<void>;
};

const defaultSettings: StoredSettings = {
  foregroundColor: 'green',
  backgroundColor: 'white',
  showGradient: false,
  gradientColor: 'blue',
  pathToLogo: undefined,
  cornersSquareType: 'extra-rounded',
  cornersDotType: 'dot',
};

const storage = createStorage<StoredSettings>('color-settings-storage-key', defaultSettings, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const qrSettingsStorage: QRSettingsStorage = {
  ...storage,
  setForegroundColor: async color => {
    await storage.set(settings => ({ ...settings, foregroundColor: color }));
  },
  setBackgroundColor: async color => {
    await storage.set(settings => ({ ...settings, backgroundColor: color }));
  },
  setShowGradient: async show => {
    await storage.set(settings => ({ ...settings, showGradient: show }));
  },
  setGradientColor: async color => {
    await storage.set(settings => ({ ...settings, gradientColor: color }));
  },
  setLogo: async logo => {
    await storage.set(settings => ({ ...settings, pathToLogo: logo }));
  },
  setCornersSquareType: async type => {
    await storage.set(settings => ({ ...settings, cornersSquareType: type }));
  },
  setAll: async settings => {
    await storage.set(current => ({ ...current, ...settings }));
  },
  reset: async () => {
    await storage.set(() => defaultSettings);
  },
};
