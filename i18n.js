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
    visualFilters: "Visual Filters",
    bwTitle: "Black & White Mode",
    bwDesc: "Grayscale reels & thumbnails",
    sessionLimit: "Session Limit",
    sessionWatched: "Session Watched",
    watchedNoLimit: "watched (No Limit)",
    resetCounter: "Reset Session Counter",
    donateBtn: "Support project / Donate",
    
    // Overlays
    overlayHideTitle: "Reels are Hidden",
    overlayHideDesc: "You have set Reels Limiter to hide short-form video content.",
    overlaySwipeTitle: "Swipe Disabled",
    overlaySwipeDesc: "Single Reel Mode is active. Auto-advancing is blocked.",
    overlayLimitTitle: "Session Limit Reached",
    overlayLimitDesc: "You have reached your limit of {limit} Reels for this session. Take a break!",
    overlayFeedBtn: "Return to Home Feed",
    overlayResetBtn: "Reset Counter for Today",
    sessionProgress: "Session Progress"
  },
  es: {
    primaryMode: "Modo Principal",
    hideReels: "Ocultar Reels",
    noSwipe: "Sin Swipe",
    off: "Desactivado",
    visualFilters: "Filtros Visuales",
    bwTitle: "Modo Blanco y Negro",
    bwDesc: "Escala de grises en reels y miniaturas",
    sessionLimit: "Límite de Sesión",
    sessionWatched: "Vistos en Sesión",
    watchedNoLimit: "vistos (Sin límite)",
    resetCounter: "Reiniciar Contador",
    donateBtn: "Apoyar proyecto / Donar",
    
    // Overlays
    overlayHideTitle: "Reels Ocultos",
    overlayHideDesc: "Has configurado Reels Limiter para ocultar los videos cortos.",
    overlaySwipeTitle: "Swipe Desactivado",
    overlaySwipeDesc: "El modo Single Reel está activo. Avance automático bloqueado.",
    overlayLimitTitle: "Límite de Sesión Alcanzado",
    overlayLimitDesc: "Has alcanzado tu límite de {limit} Reels para esta sesión. ¡Tómate un descanso!",
    overlayFeedBtn: "Volver al Inicio",
    overlayResetBtn: "Reiniciar Contador",
    sessionProgress: "Progreso de Sesión"
  },
  pt: {
    primaryMode: "Modo Principal",
    hideReels: "Ocultar Reels",
    noSwipe: "Sem Swipe",
    off: "Desativado",
    visualFilters: "Filtros Visuais",
    bwTitle: "Modo Preto e Branco",
    bwDesc: "Escala de cinza em reels e miniaturas",
    sessionLimit: "Limite de Sessão",
    sessionWatched: "Assistidos na Sessão",
    watchedNoLimit: "assistidos (Sem limite)",
    resetCounter: "Redefinir Contador",
    donateBtn: "Apoiar projeto / Doar",
    
    // Overlays
    overlayHideTitle: "Reels Ocultos",
    overlayHideDesc: "Você configurou o Reels Limiter para ocultar vídeos curtos.",
    overlaySwipeTitle: "Swipe Desativado",
    overlaySwipeDesc: "Modo Single Reel ativo. Avanço automático bloqueado.",
    overlayLimitTitle: "Limite de Sessão Atingido",
    overlayLimitDesc: "Você atingiu seu limite de {limit} Reels para esta sessão. Faça uma pausa!",
    overlayFeedBtn: "Voltar ao Início",
    overlayResetBtn: "Redefinir Contador",
    sessionProgress: "Progresso da Sessão"
  },
  fr: {
    primaryMode: "Mode Principal",
    hideReels: "Masquer Reels",
    noSwipe: "Sans Swipe",
    off: "Désactivé",
    visualFilters: "Filtres Visuels",
    bwTitle: "Mode Noir & Blanc",
    bwDesc: "Niveaux de gris sur les reels et vignettes",
    sessionLimit: "Limite de Session",
    sessionWatched: "Visionnés en Session",
    watchedNoLimit: "visionnés (Sans limite)",
    resetCounter: "Réinitialiser le Compteur",
    donateBtn: "Soutenir le projet / Faire un don",
    
    // Overlays
    overlayHideTitle: "Les Reels sont masqués",
    overlayHideDesc: "Vous avez configuré Reels Limiter pour masquer les vidéos courtes.",
    overlaySwipeTitle: "Swipe Désactivé",
    overlaySwipeDesc: "Le mode Single Reel est actif. Défilement automatique bloqué.",
    overlayLimitTitle: "Limite de Session Atteinte",
    overlayLimitDesc: "Vous avez atteint votre limite de {limit} Reels pour cette session. Faites une pause!",
    overlayFeedBtn: "Retour à l'Accueil",
    overlayResetBtn: "Réinitialiser le Compteur",
    sessionProgress: "Progression de la Session"
  },
  de: {
    primaryMode: "Hauptmodus",
    hideReels: "Reels ausblenden",
    noSwipe: "Kein Wischen",
    off: "Aus",
    visualFilters: "Visuelle Filter",
    bwTitle: "Schwarz-Weiß-Modus",
    bwDesc: "Graustufen für Reels & Miniaturansichten",
    sessionLimit: "Sitzungslimit",
    sessionWatched: "In Sitzung gesehen",
    watchedNoLimit: "gesehen (Kein Limit)",
    resetCounter: "Zähler zurücksetzen",
    donateBtn: "Projekt unterstützen / Spenden",
    
    // Overlays
    overlayHideTitle: "Reels sind ausgeblendet",
    overlayHideDesc: "Sie haben Reels Limiter so eingestellt, dass Kurzvideos ausgeblendet werden.",
    overlaySwipeTitle: "Wischen deaktiviert",
    overlaySwipeDesc: "Einzel-Reel-Modus aktiv. Automatisches Weiterschalten blockiert.",
    overlayLimitTitle: "Sitzungslimit erreicht",
    overlayLimitDesc: "Sie haben Ihr Limit von {limit} Reels für diese Sitzung erreicht. Machen Sie eine Pause!",
    overlayFeedBtn: "Zurück zum Feed",
    overlayResetBtn: "Zähler zurücksetzen",
    sessionProgress: "Sitzungsfortschritt"
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
