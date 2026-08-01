/**
 * Reels Limiter - Service Worker (Manifest V3 Background Script)
 * Manages extension badge updates, default storage initialization, and session resets.
 */

// Allow content scripts to access session storage if supported
try {
  if (chrome.storage.session && chrome.storage.session.setAccessLevel) {
    chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
  }
} catch (e) {}

// Initialize defaults on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['mode', 'grayscaleEnabled', 'sessionLimit', 'popupTheme', 'language'], (data) => {
    const userLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
    const supportedLangs = ['en', 'es', 'pt', 'fr', 'de'];
    const defaultLang = supportedLangs.includes(userLang) ? userLang : 'en';

    if (data.mode === undefined) {
      chrome.storage.sync.set({ mode: 'off' });
    }
    if (data.grayscaleEnabled === undefined) {
      chrome.storage.sync.set({ grayscaleEnabled: false });
    }
    if (data.sessionLimit === undefined) {
      chrome.storage.sync.set({ sessionLimit: 0 });
    }
    if (data.popupTheme === undefined) {
      chrome.storage.sync.set({ popupTheme: 'dark' });
    }
    if (data.language === undefined) {
      chrome.storage.sync.set({ language: defaultLang });
    }
    if (data.doomscrollEnabled === undefined) {
      chrome.storage.sync.set({ doomscrollEnabled: true });
    }
  });

  resetSessionCount();
});

// Reset session counter on browser startup
chrome.runtime.onStartup.addListener(() => {
  resetSessionCount();
});

// Listen for message updates from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'COUNT_UPDATED') {
    updateBadge(message.count, message.limit);
    sendResponse({ status: 'ok' });
  } else if (message.type === 'RESET_COUNTER') {
    resetSessionCount();
    sendResponse({ status: 'ok' });
  }
  return true;
});

function resetSessionCount() {
  const data = { sessionReelsCount: 0 };
  if (chrome.storage.session) {
    try { chrome.storage.session.set(data); } catch (e) {}
  }
  chrome.storage.local.set(data);
  chrome.storage.sync.set(data);
  updateBadge(0, 0);
}

function updateBadge(count, limit) {
  try {
    if (!count || count === 0) {
      chrome.action.setBadgeText({ text: '' });
      return;
    }

    const badgeText = `${count}`;
    chrome.action.setBadgeText({ text: badgeText });

    if (limit > 0 && count >= limit) {
      // Red warning badge when limit reached
      chrome.action.setBadgeBackgroundColor({ color: '#FF0055' });
    } else {
      // Dark slate/orange badge for ongoing count
      chrome.action.setBadgeBackgroundColor({ color: '#4A5568' });
    }
  } catch (e) {
    console.warn('[Reels Limiter] Service worker badge error:', e);
  }
}
