========================================================================
REELS LIMITER CHROME EXTENSION (MANIFEST V3) - LOAD AND TEST INSTRUCTIONS
========================================================================

ABOUT
Reels Limiter is a Chrome extension that allows you to take control of 
Instagram Reels through 4 customizable modes and an independent numeric 
session limiter.

------------------------------------------------------------------------
INSTALLATION INSTRUCTIONS (DEVELOPER MODE)
------------------------------------------------------------------------
1. Open Google Chrome.
2. In the address bar, navigate to: chrome://extensions
3. Enable "Developer mode" by toggling the switch in the top-right corner.
4. Click the "Load unpacked" button in the top-left corner.
5. Select the project directory:
   d:\reels killer
6. The extension "Reels Limiter" will now appear in your installed 
   extensions list.
7. Click the Extension puzzle icon in Chrome's toolbar and pin "Reels Limiter".

------------------------------------------------------------------------
TESTING THE FEATURES
------------------------------------------------------------------------

1. FEATURE 1: "HIDE REELS"
   - Open the Reels Limiter popup UI and select "Hide Reels".
   - Navigate to https://www.instagram.com/
   - Verify that the Reels link/icon in the navigation bar, feed carousels, 
     and profile page Reels tabs are hidden.
   - If you directly visit a Reels link (e.g. https://www.instagram.com/reels/), 
     an overlay will appear blocking playback with a button to return to feed.

2. FEATURE 2: "BLACK & WHITE"
   - Open the popup UI and select "B & W".
   - Go to Instagram Reels or Feed.
   - Verify that playing Reels videos and Reel thumbnails are displayed in 
     grayscale, while the rest of the site remains normal.

3. FEATURE 3: "NO SWIPE / SINGLE REEL MODE"
   - Open the popup UI and select "No Swipe".
   - Open a single Reel video on Instagram.
   - Try to scroll down using mouse wheel, down arrow key, or touch swipe.
   - Notice that navigation to the next Reel is blocked, showing a lightweight 
     "Swipe Disabled" prompt.

4. FEATURE 4: "NUMERIC SESSION LIMITER"
   - Open the popup UI and select a limit (e.g., 5 Reels).
   - Watch Reels videos on Instagram. A Reel is counted when it remains visible 
     in your viewport for at least 2 seconds.
   - Open the popup to see your progress (e.g., "3 / 5 Reels watched").
   - Once you watch 5 distinct Reels, a blocking overlay will appear telling you 
     that your session limit has been reached.
   - Click "Reset Session Counter" in the overlay or popup to reset the count.

------------------------------------------------------------------------
FILE STRUCTURE
------------------------------------------------------------------------
- manifest.json       : Extension Manifest V3 metadata
- selectors.js        : Centralized selector dictionary for Instagram DOM
- content-script.js   : Main engine (DOM observer, swipe blocker, view timer, overlays)
- styles.css          : Injected CSS (hide rules, grayscale filter, overlay UI)
- background.js       : Service worker (badge updates, session storage sync)
- popup.html/css/js   : Extension settings popup
- generate_icons.js   : Icon generator script
- icons/              : Icon assets (icon16.png, icon48.png, icon128.png)
- README.txt          : Installation & testing guide

========================================================================
