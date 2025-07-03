import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('background called', message);
  if (message.action === 'getFavicon' && message.url) {
    fetch(message.url)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          sendResponse({ dataUrl: reader.result });
        };
        reader.readAsDataURL(blob);
      })
      .catch(() => sendResponse({ dataUrl: null }));
    // Required for async sendResponse
    return true;
  }
  return false;
});

console.log('Background loaded');
