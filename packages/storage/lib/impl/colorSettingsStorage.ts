import type { BaseStorage } from '../base/index.js';
import { createStorage, StorageEnum } from '../base/index.js';

export type ColorSettings = {
  foreground: string;
  background: string;
  showGradient: boolean;
  gradient: string;
  logo?: string | null; // add logo property
};

export type ColorSettingsStorage = BaseStorage<ColorSettings> & {
  setForeground: (color: string) => Promise<void>;
  setBackground: (color: string) => Promise<void>;
  setShowGradient: (show: boolean) => Promise<void>;
  setGradient: (color: string) => Promise<void>;
  setLogo: (logo: string | null) => Promise<void>; // add setLogo
  reset: () => Promise<void>;
};

const defaultSettings: ColorSettings = {
  foreground: 'green',
  background: 'white',
  showGradient: false,
  gradient: 'blue',
  logo: null, // default logo is null
};

const storage = createStorage<ColorSettings>('color-settings-storage-key', defaultSettings, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const colorSettingsStorage: ColorSettingsStorage = {
  ...storage,
  setForeground: async color => {
    await storage.set(settings => ({ ...settings, foreground: color }));
  },
  setBackground: async color => {
    await storage.set(settings => ({ ...settings, background: color }));
  },
  setShowGradient: async show => {
    await storage.set(settings => ({ ...settings, showGradient: show }));
  },
  setGradient: async color => {
    await storage.set(settings => ({ ...settings, gradient: color }));
  },
  setLogo: async logo => {
    await storage.set(settings => ({ ...settings, logo }));
  },
  reset: async () => {
    await storage.set(() => defaultSettings);
  },
};
