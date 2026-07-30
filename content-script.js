/**
 * Reels Limiter - Content Script (Manifest V3)
 * Handles DOM observation, mode enforcement, swipe prevention, session count tracking, and overlay injection.
 */

(function () {
  'use strict';

  // State Variables
  let currentMode = 'off'; // 'hide' | 'noswipe' | 'off'
  let grayscaleEnabled = false;
  let currentLang = 'en';
  let sessionLimit = 0;   // 0 (disabled), 5, 10, 15
  let sessionReelsCount = 0;
  const seenReelsSet = new Set();
  
  // Track currently active video for view timer
  let activeVideoObservation = {
    video: null,
    reelId: null,
    timer: null
  };

  // Overlay container ref
  let activeOverlay = null;

  // Initialize Extension State
  function init() {
    loadSettings();
    setupStorageListener();
    setupDomObserver();
    setupUrlListener();
    setupSwipeBlocker();
    setupViewTracker();
    
    // Initial run
    applyActiveMode();
  }

  function getDefaultLanguage() {
    try {
      const navLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
      const supported = ['en', 'es', 'pt', 'fr', 'de'];
      return supported.includes(navLang) ? navLang : 'en';
    } catch (e) {
      return 'en';
    }
  }

  // 1. Load Settings from Storage
  function loadSettings() {
    try {
      chrome.storage.sync.get(['mode', 'grayscaleEnabled', 'sessionLimit', 'language'], (syncData) => {
        currentMode = syncData.mode || 'off';
        // Handle migration from old mode === 'grayscale'
        if (currentMode === 'grayscale') {
          currentMode = 'off';
          grayscaleEnabled = true;
        } else {
          grayscaleEnabled = !!syncData.grayscaleEnabled;
        }

        currentLang = syncData.language || getDefaultLanguage();
        sessionLimit = syncData.sessionLimit || 0;

        // Load current session count
        chrome.storage.session ? 
          chrome.storage.session.get(['sessionReelsCount'], (sessionData) => {
            sessionReelsCount = sessionData.sessionReelsCount || 0;
            applyActiveMode();
          }) :
          chrome.storage.local.get(['sessionReelsCount'], (localData) => {
            sessionReelsCount = localData.sessionReelsCount || 0;
            applyActiveMode();
          });
      });
    } catch (e) {
      console.warn('[Reels Limiter] Storage load error:', e);
    }
  }

  // 2. Storage Sync Listener
  function setupStorageListener() {
    try {
      chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === 'sync') {
          if (changes.mode) currentMode = changes.mode.newValue || 'off';
          if (changes.grayscaleEnabled !== undefined) grayscaleEnabled = !!changes.grayscaleEnabled.newValue;
          if (changes.language) currentLang = changes.language.newValue || getDefaultLanguage();
          if (changes.sessionLimit) sessionLimit = changes.sessionLimit.newValue || 0;
          applyActiveMode();
        }
        if (areaName === 'session' || areaName === 'local') {
          if (changes.sessionReelsCount) {
            sessionReelsCount = changes.sessionReelsCount.newValue || 0;
            checkSessionLimitExceeded();
          }
        }
      });
    } catch (e) {
      console.warn('[Reels Limiter] Storage listener error:', e);
    }
  }

  // 3. Apply Current Mode Logic
  function applyActiveMode() {
    try {
      const root = document.documentElement || document.body;

      // 1. Independent Grayscale filter application
      if (grayscaleEnabled) {
        root.classList.add('reels-limiter-bw-active');
      } else {
        root.classList.remove('reels-limiter-bw-active');
      }

      // 2. Check current page URL
      const isReelUrl = isReelsPage();

      // 3. Primary Mode: Hide Reels
      if (currentMode === 'hide') {
        root.classList.add('reels-limiter-hide-active');
        enforceHideMode();

        // If user is sitting on a Reels URL (/reels/ or /reel/), redirect to home feed!
        if (isReelUrl) {
          window.location.replace('https://www.instagram.com/');
          return;
        } else {
          removeOverlayIfType('hide');
        }
      } else {
        root.classList.remove('reels-limiter-hide-active');
        unhideElements();
        removeOverlayIfType('hide');
      }

      // 4. Check session limit regardless of mode
      checkSessionLimitExceeded();

    } catch (e) {
      console.warn('[Reels Limiter] Error applying mode:', e);
    }
  }

  function tr(key, params = {}) {
    if (typeof getTranslation !== 'undefined') {
      return getTranslation(currentLang, key, params);
    }
    return key;
  }

  // Helper: Check if URL is Reels
  function isReelsPage() {
    return window.location.pathname.includes('/reels/') || window.location.pathname.includes('/reel/');
  }

  // 4. Feature 1: Hide Mode Implementation
  function enforceHideMode() {
    try {
      if (typeof REELS_SELECTORS === 'undefined') return;

      // 1. Hide Navigation Links (Sidebar & Bottom Bar)
      REELS_SELECTORS.navigationItems.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.classList.add('reels-limiter-hidden');
        });
      });

      // 2. Hide Reels SVGs in navigation bar if link selector was obfuscated
      REELS_SELECTORS.reelsIcons.forEach(selector => {
        document.querySelectorAll(selector).forEach(svg => {
          const anchor = svg.closest('a');
          if (anchor) {
            anchor.classList.add('reels-limiter-hidden');
          }
        });
      });

      // 3. Hide Profile Reels Tab
      REELS_SELECTORS.profileReelsTab.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.classList.add('reels-limiter-hidden');
        });
      });

    } catch (e) {
      console.warn('[Reels Limiter] Error hiding Reels elements:', e);
    }
  }

  function unhideElements() {
    try {
      document.querySelectorAll('.reels-limiter-hidden').forEach(el => el.classList.remove('reels-limiter-hidden'));
    } catch (e) {
      console.warn('[Reels Limiter] Error unhiding elements:', e);
    }
  }

  // 5. Feature 2: Black & White Mode Implementation
  function enforceGrayscaleMode() {
    try {
      // Apply grayscale class directly to video, canvas, and images inside reels/posts
      document.querySelectorAll('video, canvas, img').forEach(media => {
        if (media.closest('article') || media.closest('a[href*="/reel/"]') || media.closest('a[href*="/reels/"]') || isReelsPage()) {
          media.classList.add('reels-limiter-bw');
        }
      });
    } catch (e) {
      console.warn('[Reels Limiter] Error applying grayscale:', e);
    }
  }

  // 6. Feature 3: No Swipe / Single Reel Mode Implementation
  function setupSwipeBlocker() {
    const blockGesture = (e) => {
      if (currentMode !== 'noswipe' || !isReelsPage()) return;

      // Keys used for vertical scrolling / reel switching
      const forbiddenKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'];

      if (e.type === 'keydown' && forbiddenKeys.includes(e.code)) {
        e.preventDefault();
        e.stopPropagation();
        showOverlay(
          'noswipe',
          tr('overlaySwipeTitle'),
          tr('overlaySwipeDesc'),
          false
        );
        return false;
      }

      if (e.type === 'wheel') {
        // Significant vertical scroll
        if (Math.abs(e.deltaY) > 10) {
          e.preventDefault();
          e.stopPropagation();
          showOverlay(
            'noswipe',
            tr('overlaySwipeTitle'),
            tr('overlaySwipeDesc'),
            false
          );
          return false;
        }
      }
    };

    // Attach passive: false event capture to intercept before Instagram's listeners
    window.addEventListener('wheel', blockGesture, { capture: true, passive: false });
    window.addEventListener('keydown', blockGesture, { capture: true, passive: false });

    // Touch swipe blocking for mobile viewport emulation / touch screens
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      if (currentMode === 'noswipe' && isReelsPage() && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    }, { capture: true, passive: true });

    window.addEventListener('touchmove', (e) => {
      if (currentMode === 'noswipe' && isReelsPage() && e.touches.length > 0) {
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
        if (deltaY > 30) {
          e.preventDefault();
          e.stopPropagation();
          showOverlay(
            'noswipe',
            tr('overlaySwipeTitle'),
            tr('overlaySwipeDesc'),
            false
          );
        }
      }
    }, { capture: true, passive: false });
  }

  // 7. Feature 4: Viewport & Session Tracker
  // 7. Feature 4: Viewport & Session Tracker (Playback Time-Based)
  function setupViewTracker() {
    setInterval(() => {
      document.querySelectorAll('video').forEach(video => {
        if (!video.dataset.reelsLimiterTrackerBound) {
          video.dataset.reelsLimiterTrackerBound = 'true';

          let playStartTime = null;

          const checkPlayback = () => {
            if (!video.paused && video.currentTime > 0.3) {
              if (!playStartTime) playStartTime = Date.now();

              // Register as viewed after 1.5 seconds of active playback
              if (Date.now() - playStartTime >= 1500) {
                const reelId = getReelIdentifier(video);
                if (reelId && !seenReelsSet.has(reelId)) {
                  registerReelViewed(reelId);
                }
              }
            } else {
              playStartTime = null;
            }
          };

          video.addEventListener('timeupdate', checkPlayback);
          video.addEventListener('playing', checkPlayback);
          video.addEventListener('pause', () => { playStartTime = null; });
          video.addEventListener('ended', () => {
            playStartTime = null;
            if (currentMode === 'noswipe' && isReelsPage()) {
              showOverlay(
                'noswipe',
                tr('overlaySwipeTitle'),
                tr('overlaySwipeDesc'),
                false
              );
            }
          });
        }
      });
    }, 500);
  }

  function getReelIdentifier(videoEl) {
    const path = window.location.pathname;
    if (path.length > 3 && (path.includes('/reels/') || path.includes('/reel/') || path.includes('/p/'))) {
      return path;
    }
    return videoEl.src || videoEl.currentSrc || videoEl.poster || null;
  }

  function registerReelViewed(reelId) {
    if (seenReelsSet.has(reelId)) return;
    seenReelsSet.add(reelId);
    sessionReelsCount += 1;

    // Save updated count to storage across areas
    const dataObj = { sessionReelsCount: sessionReelsCount };
    try {
      if (chrome.storage.session) {
        try { chrome.storage.session.set(dataObj); } catch (e) {}
      }
      chrome.storage.local.set(dataObj);
      chrome.storage.sync.set(dataObj);
      
      // Notify background service worker to update action badge
      chrome.runtime.sendMessage({
        type: 'COUNT_UPDATED',
        count: sessionReelsCount,
        limit: sessionLimit
      });
    } catch (e) {
      console.warn('[Reels Limiter] Error saving count:', e);
    }

    checkSessionLimitExceeded();
  }

  function checkSessionLimitExceeded() {
    if (sessionLimit > 0 && sessionReelsCount >= sessionLimit) {
      showOverlay(
        'limit',
        tr('overlayLimitTitle'),
        tr('overlayLimitDesc', { limit: sessionLimit }),
        true
      );
    } else if (activeOverlay && activeOverlay.dataset.overlayType === 'limit' && sessionReelsCount < sessionLimit) {
      removeOverlayIfType('limit');
    }
  }

  // 8. Overlay Manager
  function showOverlay(type, title, subtitle, showResetBtn) {
    // Pause videos on page
    document.querySelectorAll('video').forEach(v => {
      try { v.pause(); } catch (e) {}
    });

    if (activeOverlay) {
      if (activeOverlay.dataset.overlayType === type) return; // Already showing this type
      activeOverlay.remove();
    }

    const overlay = document.createElement('div');
    overlay.className = 'reels-limiter-overlay-backdrop';
    overlay.dataset.overlayType = type;

    overlay.innerHTML = `
      <div class="reels-limiter-card">
        <div class="reels-limiter-icon-badge">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"/>
            <line x1="10" y1="15" x2="10" y2="9"/>
            <line x1="14" y1="15" x2="14" y2="9"/>
          </svg>
        </div>
        <h2 class="reels-limiter-title">${title}</h2>
        <p class="reels-limiter-subtitle">${subtitle}</p>
        
        ${sessionLimit > 0 ? `
          <div class="reels-limiter-stats-box">
            <span class="reels-limiter-stats-label">${tr('sessionProgress')}</span>
            <span class="reels-limiter-stats-value">${sessionReelsCount} / ${sessionLimit} Reels</span>
          </div>
        ` : ''}

        <div class="reels-limiter-btn-group">
          <button class="reels-limiter-btn-primary" id="rl-btn-feed">${tr('overlayFeedBtn')}</button>
          ${showResetBtn ? `<button class="reels-limiter-btn-secondary" id="rl-btn-reset">${tr('overlayResetBtn')}</button>` : ''}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    activeOverlay = overlay;

    // Bind Button Actions
    const feedBtn = overlay.querySelector('#rl-btn-feed');
    if (feedBtn) {
      feedBtn.addEventListener('click', () => {
        window.location.href = 'https://www.instagram.com/';
      });
    }

    const resetBtn = overlay.querySelector('#rl-btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetSessionCounter();
      });
    }
  }

  function removeOverlayIfType(type) {
    if (activeOverlay && activeOverlay.dataset.overlayType === type) {
      activeOverlay.remove();
      activeOverlay = null;
    }
  }

  function resetSessionCounter() {
    sessionReelsCount = 0;
    seenReelsSet.clear();
    const updateObj = { sessionReelsCount: 0 };
    if (chrome.storage.session) {
      chrome.storage.session.set(updateObj);
    } else {
      chrome.storage.local.set(updateObj);
    }
    chrome.runtime.sendMessage({
      type: 'COUNT_UPDATED',
      count: 0,
      limit: sessionLimit
    });
    if (activeOverlay) {
      activeOverlay.remove();
      activeOverlay = null;
    }
  }

  // 9. DOM Mutation Observer & URL Change Watcher
  let debounceTimeout = null;
  function setupDomObserver() {
    const observer = new MutationObserver(() => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        applyActiveMode();
      }, 150);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  let lastUrl = location.href;
  function setupUrlListener() {
    setInterval(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        applyActiveMode();
      }
    }, 300);
  }

  // Run initial setup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
