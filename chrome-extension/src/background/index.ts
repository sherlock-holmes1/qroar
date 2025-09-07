import 'webextension-polyfill';
import { Analytics } from '@extension/shared';
import { IS_DEV } from '@extension/env';

addEventListener('unhandledrejection', async event => {
  Analytics.fireErrorEvent(event.reason);
});

chrome.runtime.onInstalled.addListener(() => {
  Analytics.fireEvent('install');
});

// Helper function to extract top-level domain
const getTopLevelDomain = (hostname: string): string => {
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    return parts.slice(-2).join('.');
  }
  return hostname;
};

// Helper function to try fetching favicon from Google API
const tryFetchFavicon = async (domain: string): Promise<string | null> => {
  try {
    const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
    if (IS_DEV) console.log('Background: Fetching from Google API:', googleFaviconUrl);

    const response = await fetch(googleFaviconUrl);
    if (IS_DEV) console.log('Background: Google API response status:', response.status, response.statusText);

    if (response.ok) {
      const blob = await response.blob();
      if (IS_DEV) console.log('Background: Blob size:', blob.size, 'bytes');

      if (blob.size > 1024) {
        // Only use if larger than 1KB (likely higher quality)
        const reader = new FileReader();
        return new Promise(resolve => {
          reader.onloadend = () => {
            if (IS_DEV) console.log('Background: Successfully converted blob to data URL');
            resolve(reader.result as string);
          };
          reader.readAsDataURL(blob);
        });
      } else {
        if (IS_DEV) console.log('Background: Blob too small, likely default favicon');
      }
    } else if (response.status === 404) {
      if (IS_DEV) console.log('Background: 404 - favicon not found for domain:', domain);
      return null; // Explicit 404 handling
    } else {
      if (IS_DEV) console.log('Background: Google API request failed with status:', response.status);
    }
  } catch (e) {
    if (IS_DEV) console.error('Background: Google favicon API failed for domain:', domain, e);
  }

  return null;
};

// Helper function to get high-quality favicon using Google's API
const getHighQualityFavicon = async (url: string): Promise<string | null> => {
  if (IS_DEV) console.log('Background: Starting favicon fetch for:', url);

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    if (IS_DEV) console.log('Background: Extracted domain:', domain);

    // Try the full domain first
    const favicon = await tryFetchFavicon(domain);
    if (favicon) {
      if (IS_DEV) console.log('Background: Got favicon from full domain:', domain);
      return favicon;
    }

    // If no favicon or 404, try top-level domain
    const topLevelDomain = getTopLevelDomain(domain);
    if (topLevelDomain !== domain) {
      if (IS_DEV) console.log('Background: Trying top-level domain:', topLevelDomain);
      const topLevelFavicon = await tryFetchFavicon(topLevelDomain);
      if (topLevelFavicon) {
        if (IS_DEV) console.log('Background: Got favicon from top-level domain:', topLevelDomain);
        return topLevelFavicon;
      }
    }
  } catch (e) {
    if (IS_DEV) console.error('Background: URL parsing failed:', e);
  }

  if (IS_DEV) console.log('Background: Returning null - no high quality favicon found');
  return null;
};

// Handle favicon requests from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (IS_DEV) console.log('Background: Received message:', request);

  if (request.action === 'getFavicon') {
    if (IS_DEV) console.log('Background: Processing favicon request for URL:', request.url);

    getHighQualityFavicon(request.url)
      .then(favicon => {
        if (IS_DEV) console.log('Background: Favicon result:', favicon ? 'SUCCESS' : 'FAILED');
        sendResponse({ favicon });
      })
      .catch(error => {
        if (IS_DEV) console.error('Background: Favicon fetch error:', error);
        sendResponse({ favicon: null });
      });

    // Return true to indicate we will send a response asynchronously
    return true;
  }

  if (IS_DEV) console.log('Background: Unknown message action:', request.action);
});

console.log('Background loaded');
