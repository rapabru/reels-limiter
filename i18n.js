/**
 * Reels Limiter - Internationalization (i18n) Module
 * Supports 5 languages: English (en), Spanish (es), Portuguese (pt), French (fr), German (de).
 */

const I18N_DICTIONARY = {
  en: {
    primaryMode: "Primary Mode",
    hideReels: "Hide Reels",
    noSwipe: "No Swipe",
    off: "Off",
    visualFilters: "Visual Filters & Reminders",
    bwTitle: "Black & White Mode",
    bwDesc: "Grayscale reels & thumbnails",
    doomscrollToggleTitle: "Doomscroll Reminder",
    doomscrollToggleDesc: "Alert every 10 feed posts",
    sessionLimit: "Session Limit",
    sessionWatched: "Session Watched",
    watchedNoLimit: "watched (No Limit)",
    resetCounter: "Reset Session Counter",
    donateBtn: "Support project / Donate",
    
    // Overlays & Toasts
    overlayHideTitle: "Reels are Hidden",
    overlayHideDesc: "You have set Reels Limiter to hide short-form video content.",
    overlaySwipeTitle: "Swipe Disabled",
    overlaySwipeDesc: "Single Reel Mode is active. Auto-advancing is blocked.",
    overlayLimitTitle: "Session Limit Reached",
    overlayLimitDesc: "You have reached your limit of {limit} Reels for this session. Take a break!",
    overlayFeedBtn: "Return to Home Feed",
    overlayResetBtn: "Reset Counter for Today",
    sessionProgress: "Session Progress",
    doomscrollTitle: "Doomscroll Alert ⏳",
    doomscrollDesc: "You've scrolled past {count} posts in your feed. Are you doomscrolling?",
    doomscrollBtnDismiss: "Got it",
    doomscrollBtnTop: "Back to Top"
  },
  es: {
    primaryMode: "Modo Principal",
    hideReels: "Ocultar Reels",
    noSwipe: "Sin Swipe",
    off: "Desactivado",
    visualFilters: "Filtros Visuales y Avisos",
    bwTitle: "Modo Blanco y Negro",
    bwDesc: "Escala de grises en reels y miniaturas",
    doomscrollToggleTitle: "Aviso de Doomscroll",
    doomscrollToggleDesc: "Alerta cada 10 publicaciones del inicio",
    sessionLimit: "Límite de Sesión",
    sessionWatched: "Vistos en Sesión",
    watchedNoLimit: "vistos (Sin límite)",
    resetCounter: "Reiniciar Contador",
    donateBtn: "Apoyar proyecto / Donar",
    
    // Overlays & Toasts
    overlayHideTitle: "Reels Ocultos",
    overlayHideDesc: "Has configurado Reels Limiter para ocultar los videos cortos.",
    overlaySwipeTitle: "Swipe Desactivado",
    overlaySwipeDesc: "El modo Single Reel está activo. Avance automático bloqueado.",
    overlayLimitTitle: "Límite de Sesión Alcanzado",
    overlayLimitDesc: "Has alcanzado tu límite de {limit} Reels para esta sesión. ¡Tómate un descanso!",
    overlayFeedBtn: "Volver al Inicio",
    overlayResetBtn: "Reiniciar Contador",
    sessionProgress: "Progreso de Sesión",
    doomscrollTitle: "Aviso de Doomscroll ⏳",
    doomscrollDesc: "Llevas {count} publicaciones recorridas en tu inicio. ¿Estás en doomscroll?",
    doomscrollBtnDismiss: "Entendido",
    doomscrollBtnTop: "Ir arriba"
  },
  pt: {
    primaryMode: "Modo Principal",
    hideReels: "Ocultar Reels",
    noSwipe: "Sem Swipe",
    off: "Desativado",
    visualFilters: "Filtros Visuais e Avisos",
    bwTitle: "Modo Preto e Branco",
    bwDesc: "Escala de cinza em reels e miniaturas",
    doomscrollToggleTitle: "Aviso de Doomscroll",
    doomscrollToggleDesc: "Alerta a cada 10 publicações no feed",
    sessionLimit: "Limite de Sessão",
    sessionWatched: "Assistidos na Sessão",
    watchedNoLimit: "assistidos (Sem limite)",
    resetCounter: "Redefinir Contador",
    donateBtn: "Apoiar projeto / Doar",
    
    // Overlays & Toasts
    overlayHideTitle: "Reels Ocultos",
    overlayHideDesc: "Você configurou o Reels Limiter para ocultar vídeos curtos.",
    overlaySwipeTitle: "Swipe Desativado",
    overlaySwipeDesc: "Modo Single Reel ativo. Avanço automático bloqueado.",
    overlayLimitTitle: "Limite de Sessão Atingido",
    overlayLimitDesc: "Você atingiu seu limite de {limit} Reels para esta sessão. Faça uma pausa!",
    overlayFeedBtn: "Voltar ao Início",
    overlayResetBtn: "Redefinir Contador",
    sessionProgress: "Progresso da Sessão",
    doomscrollTitle: "Alerta de Doomscroll ⏳",
    doomscrollDesc: "Você já rolou por {count} publicações no feed. Que tal uma pausa?",
    doomscrollBtnDismiss: "Entendi",
    doomscrollBtnTop: "Voltar ao topo"
  },
  fr: {
    primaryMode: "Mode Principal",
    hideReels: "Masquer Reels",
    noSwipe: "Sans Swipe",
    off: "Désactivé",
    visualFilters: "Filtres Visuels & Rappels",
    bwTitle: "Mode Noir & Blanc",
    bwDesc: "Niveaux de gris sur les reels et vignettes",
    doomscrollToggleTitle: "Rappel Doomscroll",
    doomscrollToggleDesc: "Alerte toutes les 10 publications",
    sessionLimit: "Limite de Session",
    sessionWatched: "Visionnés en Session",
    watchedNoLimit: "visionnés (Sans limite)",
    resetCounter: "Réinitialiser le Compteur",
    donateBtn: "Soutenir le projet / Faire un don",
    
    // Overlays & Toasts
    overlayHideTitle: "Les Reels sont masqués",
    overlayHideDesc: "Vous avez configuré Reels Limiter pour masquer les vidéos courtes.",
    overlaySwipeTitle: "Swipe Désactivé",
    overlaySwipeDesc: "Le mode Single Reel est actif. Défilement automatique bloqué.",
    overlayLimitTitle: "Limite de Session Atteinte",
    overlayLimitDesc: "Vous avez atteint votre limite de {limit} Reels pour cette session. Faites une pause!",
    overlayFeedBtn: "Retour à l'Accueil",
    overlayResetBtn: "Réinitialiser le Compteur",
    sessionProgress: "Progression de la Session",
    doomscrollTitle: "Alerte Doomscroll ⏳",
    doomscrollDesc: "Vous avez défilé {count} publications dans votre fil. Faites-vous du doomscroll ?",
    doomscrollBtnDismiss: "Compris",
    doomscrollBtnTop: "Retour en haut"
  },
  de: {
    primaryMode: "Hauptmodus",
    hideReels: "Reels ausblenden",
    noSwipe: "Kein Wischen",
    off: "Aus",
    visualFilters: "Visuelle Filter & Erinnerungen",
    bwTitle: "Schwarz-Weiß-Modus",
    bwDesc: "Graustufen für Reels & Miniaturansichten",
    doomscrollToggleTitle: "Doomscroll-Erinnerung",
    doomscrollToggleDesc: "Warnung alle 10 Beiträge im Feed",
    sessionLimit: "Sitzungslimit",
    sessionWatched: "In Sitzung gesehen",
    watchedNoLimit: "gesehen (Kein Limit)",
    resetCounter: "Zähler zurücksetzen",
    donateBtn: "Projekt unterstützen / Spenden",
    
    // Overlays & Toasts
    overlayHideTitle: "Reels sind ausgeblendet",
    overlayHideDesc: "Sie haben Reels Limiter so eingestellt, dass Kurzvideos ausgeblendet werden.",
    overlaySwipeTitle: "Wischen deaktiviert",
    overlaySwipeDesc: "Einzel-Reel-Modus aktiv. Automatisches Weiterschalten blockiert.",
    overlayLimitTitle: "Sitzungslimit erreicht",
    overlayLimitDesc: "Sie haben Ihr Limit von {limit} Reels für diese Sitzung erreicht. Machen Sie eine Pause!",
    overlayFeedBtn: "Zurück zum Feed",
    overlayResetBtn: "Zähler zurücksetzen",
    sessionProgress: "Sitzungsfortschritt",
    doomscrollTitle: "Doomscroll-Warnung ⏳",
    doomscrollDesc: "Du hast {count} Beiträge durchgescrollt. Machst du Doomscrolling?",
    doomscrollBtnDismiss: "Verstanden",
    doomscrollBtnTop: "Nach oben"
  }
};

function getTranslation(lang, key, params = {}) {
  const currentLang = I18N_DICTIONARY[lang] ? lang : 'en';
  let text = I18N_DICTIONARY[currentLang][key] || I18N_DICTIONARY['en'][key] || key;
  
  Object.keys(params).forEach(paramKey => {
    text = text.replace(`{${paramKey}}`, params[paramKey]);
  });
  
  return text;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { I18N_DICTIONARY, getTranslation };
}
