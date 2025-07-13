import 'webextension-polyfill';
import { Analytics } from '@extension/shared';

addEventListener('unhandledrejection', async event => {
  Analytics.fireErrorEvent(event.reason);
});

chrome.runtime.onInstalled.addListener(() => {
  Analytics.fireEvent('install');
});

console.log('Background loaded');
