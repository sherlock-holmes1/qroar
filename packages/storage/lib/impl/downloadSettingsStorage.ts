import type { BaseStorage } from '../base/index.js';
import { createStorage, StorageEnum } from '../base/index.js';

// Type for download settings
export type DownloadSettings = {
  format: 'svg' | 'png';
  size: 'small' | 'medium' | 'large';
};

// Storage interface with strongly typed methods
export type DownloadSettingsStorage = BaseStorage<DownloadSettings> & {
  setFormat: (format: 'svg' | 'png') => Promise<void>;
  setSize: (size: 'small' | 'medium' | 'large') => Promise<void>;
  setAll: (settings: Partial<DownloadSettings>) => Promise<void>;
  reset: () => Promise<void>;
};

const defaultDownloadSettings: DownloadSettings = {
  format: 'png',
  size: 'medium',
};

const storage = createStorage<DownloadSettings>('download-settings-storage-key', defaultDownloadSettings, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const downloadSettingsStorage: DownloadSettingsStorage = {
  ...storage,
  setFormat: async format => {
    await storage.set(settings => ({ ...settings, format }));
  },
  setSize: async size => {
    await storage.set(settings => ({ ...settings, size }));
  },
  setAll: async settings => {
    await storage.set(current => ({ ...current, ...settings }));
  },
  reset: async () => {
    await storage.set(() => defaultDownloadSettings);
  },
};
