# 🛑 Reels Limiter - Chrome Extension (Manifest V3)

> Take back control of your time and focus on Instagram. Block Reels, apply grayscale filters, limit sessions, or stop auto-swiping!

---

## 🌟 Key Features / Características Principales

### 🛑 1. Hide Reels Mode / Modo Ocultar Reels
- Completely removes Reels links from Instagram's sidebar navigation, home feed carousels, and profile tabs.
- If you attempt to open a direct Reels URL (`instagram.com/reels/`), it automatically redirects you back to your Home Feed.
- Keeps your Instagram Feed, Stories, Direct Messages, and Notifications 100% visible and functional.

### 🎨 2. Independent Black & White Mode / Modo Blanco y Negro
- Applies a 100% grayscale filter (`filter: grayscale(100%)`) to all Reel videos, thumbnails, posts, and canvases.
- Can be combined with **Hide Reels**, **No Swipe**, or **Off** modes.
- Powered by hardware-accelerated CSS for zero performance overhead.

### 🔒 3. No Swipe / Single Reel Mode / Modo Sin Swipe
- Allows you to watch a single Reel if opened directly, but disables vertical scrolling, mouse wheel navigation, arrow keys, and touch swipes to prevent endless auto-advancing.
- Displays an in-page modal when you try to swipe or when the Reel ends, giving you a one-click button to return to your Home Feed.

### ⏱️ 4. Numeric Session Limiter / Límite de Sesión
- Set a personal cap: **5, 10, or 15 Reels per session** (or Unlimited).
- Real-time video playback time tracking (counts a Reel after 1.5 seconds of viewing).
- Dynamic extension badge indicator showing watched count (e.g. `3 / 5`).
- Displays a customizable overlay when your session limit is reached with a **Reset Counter** button.

### 🌐 5. 5 Supported Languages (i18n) / 5 Idiomas Compatibles
- 🇬🇧 **English** (`en`)
- 🇪🇸 **Español** (`es`)
- 🇧🇷 **Português** (`pt`)
- 🇫🇷 **Français** (`fr`)
- 🇩🇪 **Deutsch** (`de`)
- Auto-detects browser language and includes a manual language switcher in the popup.

### ☀️/🌙 6. Day & Night Mode / Modo Día y Noche
- Toggle between dark glassmorphism theme and clean light theme in the extension popup.

---

## 🚀 Installation Guide / Guía de Instalación

### 🇪🇸 Instrucciones en Español
1. Descargá o cloná este repositorio en tu computadora:
   ```bash
   git clone https://github.com/rapabru/reels-limiter.git
   ```
2. Abrí el navegador **Google Chrome**.
3. En la barra de direcciones, ingresá: `chrome://extensions`
4. Activá el **Modo de desarrollador** (palanca en la esquina superior derecha).
5. Hacé clic en el botón **Cargar descomprimida** (esquina superior izquierda).
6. Seleccioná la carpeta del proyecto (`d:\reels killer` o donde hayas guardado la carpeta).
7. ¡Listo! Hacé clic en el ícono de extensiones en la barra de herramientas de Chrome y fijá **Reels Limiter**.

### 🇬🇧 English Instructions
1. Download or clone this repository to your computer:
   ```bash
   git clone https://github.com/rapabru/reels-limiter.git
   ```
2. Open **Google Chrome**.
3. In the URL address bar, navigate to: `chrome://extensions`
4. Enable **Developer mode** using the toggle switch in the top-right corner.
5. Click **Load unpacked** in the top-left corner.
6. Select the extension directory (`d:\reels killer` or your project folder).
7. Pin **Reels Limiter** to your Chrome toolbar for easy access!

---

## 📁 File Structure / Estructura del Proyecto

```
reels-limiter/
├── manifest.json       # Manifest V3 metadata & permissions
├── i18n.js             # 5-Language translation dictionary (en, es, pt, fr, de)
├── selectors.js        # Centralized Instagram DOM selector definitions
├── content-script.js   # Content script engine (DOM observer, mode logic, session tracker)
├── styles.css          # Injected styles (hide rules, grayscale filter, overlay UI)
├── background.js       # Manifest V3 service worker (badge updates, session sync)
├── popup.html          # Extension popup UI
├── popup.css           # Popup dark & light mode styling
├── popup.js            # Extension popup state & sync logic
├── generate_icons.js   # Pure Node.js PNG icon generator
├── icons/              # Extension icons (icon16.png, icon48.png, icon128.png)
└── README.md           # Documentation & guide
```

---

## 💖 Support & Contributions / Apoyar el Proyecto

If you find this extension helpful, consider starring the repository or supporting the project!

- **GitHub Profile**: [github.com/rapabru](https://github.com/rapabru)

Developed with 💖 by **rapabru**.
