/**
 * Reels Limiter - Extension Popup Script
 * Handles primary mode, independent Black & White filter toggle, Day/Night theme, 5-language selector (i18n), and GitHub donate link.
 */

document.addEventListener('DOMContentLoaded', () => {
  const modeCards = document.querySelectorAll('.mode-card');
  const limitBtns = document.querySelectorAll('.limit-btn');
  const bwToggle = document.getElementById('bw-toggle');
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  const langSelect = document.getElementById('lang-select');
  const countDisplay = document.getElementById('count-display');
  const progressFill = document.getElementById('progress-fill');
  const resetBtn = document.getElementById('reset-btn');

  let currentMode = 'off'; // 'hide' | 'noswipe' | 'off'
  let grayscaleEnabled = false;
  let currentTheme = 'dark';
  let currentLang = 'en';
  let sessionLimit = 0;
  let sessionCount = 0;

  // Detect default browser language if supported
  const browserLang = (navigator.language || 'en').slice(0, 2);
  const supportedLangs = ['en', 'es', 'pt', 'fr', 'de'];
  const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

  // 1. Initial Load of Saved Settings
  chrome.storage.sync.get(['mode', 'grayscaleEnabled', 'sessionLimit', 'popupTheme', 'language'], (syncData) => {
    currentMode = syncData.mode || 'off';
    if (currentMode === 'grayscale') {
      currentMode = 'off';
      grayscaleEnabled = true;
      chrome.storage.sync.set({ mode: 'off', grayscaleEnabled: true });
    } else {
      grayscaleEnabled = !!syncData.grayscaleEnabled;
    }

    sessionLimit = syncData.sessionLimit || 0;
    currentTheme = syncData.popupTheme || 'dark';
    currentLang = syncData.language || defaultLang;

    if (!syncData.language) {
      chrome.storage.sync.set({ language: currentLang });
    }

    langSelect.value = currentLang;

    updateLanguageUI(currentLang);
    updateModeUI(currentMode);
    updateBwUI(grayscaleEnabled);
    updateThemeUI(currentTheme);
    updateLimitUI(sessionLimit);

    fetchSessionCount();
  });

  function fetchSessionCount() {
    chrome.storage.local.get(['sessionReelsCount'], (localData) => {
      if (localData && localData.sessionReelsCount !== undefined) {
        sessionCount = localData.sessionReelsCount;
        updateProgressUI();
      } else {
        chrome.storage.sync.get(['sessionReelsCount'], (syncData) => {
          sessionCount = (syncData && syncData.sessionReelsCount !== undefined) ? syncData.sessionReelsCount : 0;
          updateProgressUI();
        });
      }
    });
  }

  // 2. Language Selector Listener
  langSelect.addEventListener('change', () => {
    currentLang = langSelect.value;
    updateLanguageUI(currentLang);
    updateProgressUI();
    chrome.storage.sync.set({ language: currentLang });
  });

  // 3. Primary Mode Selection Listeners ('hide' | 'noswipe' | 'off')
  modeCards.forEach(card => {
    card.addEventListener('click', () => {
      currentMode = card.dataset.mode;
      updateModeUI(currentMode);
      chrome.storage.sync.set({ mode: currentMode });
    });
  });

  // 4. Independent Black & White Toggle Listener
  bwToggle.addEventListener('change', () => {
    grayscaleEnabled = bwToggle.checked;
    chrome.storage.sync.set({ grayscaleEnabled: grayscaleEnabled });
  });

  // 5. Day / Night Theme Toggle Listener
  themeBtn.addEventListener('click', () => {
    currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
    updateThemeUI(currentTheme);
    chrome.storage.sync.set({ popupTheme: currentTheme });
  });

  // 6. Session Limit Buttons Listener
  limitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const limit = parseInt(btn.dataset.limit, 10);
      sessionLimit = limit;
      updateLimitUI(sessionLimit);
      updateProgressUI();
      chrome.storage.sync.set({ sessionLimit: sessionLimit });
    });
  });

  // 7. Reset Counter Button Listener
  resetBtn.addEventListener('click', () => {
    sessionCount = 0;
    const updateObj = { sessionReelsCount: 0 };
    try { if (chrome.storage.session) chrome.storage.session.set(updateObj); } catch (e) {}
    chrome.storage.local.set(updateObj);
    chrome.storage.sync.set(updateObj);
    chrome.runtime.sendMessage({ type: 'COUNT_UPDATED', count: 0, limit: sessionLimit });
    updateProgressUI();
  });

  // 8. GitHub Link Listener
  const githubLink = document.getElementById('github-link');
  if (githubLink) {
    githubLink.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: 'https://github.com/rapabru' });
    });
  }

  // UI Translation Helper
  function updateLanguageUI(lang) {
    if (typeof getTranslation === 'undefined') return;

    const setTxt = (id, key) => {
      const el = document.getElementById(id);
      if (el) el.textContent = getTranslation(lang, key);
    };

    setTxt('lbl-primary-mode', 'primaryMode');
    setTxt('txt-mode-hide', 'hideReels');
    setTxt('txt-mode-video', 'reelToVideo');
    setTxt('txt-mode-noswipe', 'noSwipe');
    setTxt('txt-mode-off', 'off');
    setTxt('lbl-visual-filters', 'visualFilters');
    setTxt('txt-bw-title', 'bwTitle');
    setTxt('txt-bw-desc', 'bwDesc');
    setTxt('lbl-session-limit', 'sessionLimit');
    setTxt('btn-limit-off', 'off');
    setTxt('lbl-session-watched', 'sessionWatched');
    setTxt('txt-reset-btn', 'resetCounter');
    setTxt('txt-donate-btn', 'donateBtn');
  }

  // UI Render Helpers
  function updateModeUI(selectedMode) {
    modeCards.forEach(card => {
      if (card.dataset.mode === selectedMode) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  function updateBwUI(isEnabled) {
    bwToggle.checked = isEnabled;
  }

  function updateThemeUI(theme) {
    if (theme === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      themeIcon.textContent = '☀️';
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      themeIcon.textContent = '🌙';
    }
  }

  function updateLimitUI(selectedLimit) {
    limitBtns.forEach(btn => {
      const limitVal = parseInt(btn.dataset.limit, 10);
      if (limitVal === selectedLimit) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function updateProgressUI() {
    if (sessionLimit > 0) {
      countDisplay.textContent = `${sessionCount} / ${sessionLimit}`;
      const pct = Math.min(100, Math.round((sessionCount / sessionLimit) * 100));
      progressFill.style.width = `${pct}%`;
    } else {
      const noLimitTxt = (typeof getTranslation !== 'undefined') ? getTranslation(currentLang, 'watchedNoLimit') : 'watched (No Limit)';
      countDisplay.textContent = `${sessionCount} ${noLimitTxt}`;
      progressFill.style.width = '0%';
    }
  }

  // Listen for storage changes while popup is open
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.sessionReelsCount) {
      sessionCount = changes.sessionReelsCount.newValue || 0;
      updateProgressUI();
    }
  });
});
