/**
 * Centralized DOM Selectors for Instagram Reels.
 * Built using stable attributes (aria-label, href, role, SVG titles) 
 * to remain resilient against hashed CSS class changes.
 */
const REELS_SELECTORS = {
  // Navigation items pointing to Reels
  navigationItems: [
    'a[href="/reels/"]',
    'a[href^="/reels/"]',
    'a[href*="/reels/"]'
  ],
  
  // SVGs specifically used for Reels icon
  reelsIcons: [
    'svg[aria-label="Reels"]',
    'svg[aria-label="reels"]',
    'svg[aria-label="Clips"]'
  ],

  // Profile page tabs (e.g., instagram.com/username/reels/)
  profileReelsTab: [
    'a[href$="/reels/"]',
    'a[href*="/reels/"][role="tab"]'
  ],

  // Home feed shelves / carousels containing Reels (specifically targeted)
  feedReelsShelves: [
    'div[data-testid="reels-shelf"]'
  ],

  // Video containers and video tags for Grayscale & Session tracking
  reelsVideo: 'video',
  reelsVideoContainer: [
    'div[role="dialog"] video',
    'main article video'
  ],

  // Thumbnails of Reels (e.g. in search, profile, feed)
  reelsThumbnails: [
    'a[href*="/reel/"]',
    'a[href*="/reels/"]'
  ],

  // Next / Previous Reel buttons in the full-screen player
  nextReelButtons: [
    'button:has(svg[aria-label="Next"])',
    'button:has(svg[aria-label="Down"])',
    'div[role="button"]:has(svg[aria-label="Next"])',
    'div[role="button"]:has(svg[aria-label="Down"])'
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = REELS_SELECTORS;
}
