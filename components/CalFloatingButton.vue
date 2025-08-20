<template>
  <div class="cal-floating-button">
    <!-- Le bouton flottant Cal.com sera injecté ici par le script -->
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  // Code Cal.com fourni par l'utilisateur
  (function (C, A, L) { 
    let p = function (a, ar) { a.q.push(ar); }; 
    let d = C.document; 
    C.Cal = C.Cal || function () { 
      let cal = C.Cal; 
      let ar = arguments; 
      if (!cal.loaded) { 
        cal.ns = {}; 
        cal.q = cal.q || []; 
        d.head.appendChild(d.createElement("script")).src = A; 
        cal.loaded = true; 
      } 
      if (ar[0] === L) { 
        const api = function () { p(api, arguments); }; 
        const namespace = ar[1]; 
        api.q = api.q || []; 
        if(typeof namespace === "string"){
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar); 
        return;
      } 
      p(cal, ar); 
    }; 
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", "kick-off-de-votre-projet", {origin:"https://app.cal.com"});

  Cal.ns["kick-off-de-votre-projet"]("floatingButton", {
    "calLink":"paul-bugeon-el1oht/kick-off-de-votre-projet",
    "config":{"layout":"month_view","theme":"dark"},
    "buttonTextColor":"#fddb00",
    "buttonText":"Rendez-vous"
  }); 
  
  Cal.ns["kick-off-de-votre-projet"]("ui", {
    "theme":"dark",
    "cssVarsPerTheme":{
      "light":{"cal-brand":"#fddb00"},
      "dark":{"cal-brand":"#fddb00"}
    },
    "hideEventTypeDetails":false,
    "layout":"month_view"
  });

  // Tracking Vercel Analytics pour Cal.com
  // Attendre que Cal.com soit chargé
  setTimeout(() => {
    if (window.Cal) {
      // Utiliser le composable Vercel Analytics
      const { trackEvent, trackInteraction, trackConversion } = useVercelAnalytics();

      // Tracker l'ouverture du calendrier
      const trackCalOpen = () => {
        trackInteraction('click', 'cal_floating_button', { 
          page: window.location.pathname 
        });
        trackEvent('calendar_open', {
          source: 'floating_button',
          page: window.location.pathname
        });
      };

      // Tracker la réservation d'un rendez-vous
      const trackMeetingBooked = () => {
        trackConversion('meeting_booked');
        trackEvent('meeting_booked', {
          source: 'floating_button',
          page: window.location.pathname,
          timestamp: new Date().toISOString()
        });
      };

      // Écouter les événements Cal.com
      const handleCalClick = (e) => {
        // Détecter le clic sur le bouton Cal.com
        if (e.target.closest('.cal-floating-button') || 
            e.target.closest('[data-cal-link]') ||
            e.target.closest('.cal-button')) {
          trackCalOpen();
        }
      };

      document.addEventListener('click', handleCalClick);

      // Détecter les changements d'URL (indiquant une réservation)
      let currentUrl = window.location.href;
      const urlObserver = setInterval(() => {
        if (window.location.href !== currentUrl) {
          if (window.location.href.includes('cal.com') || 
              window.location.href.includes('paul-bugeon-el1oht')) {
            trackMeetingBooked();
          }
          currentUrl = window.location.href;
        }
      }, 1000);

      // Nettoyer les listeners
      onUnmounted(() => {
        clearInterval(urlObserver);
        document.removeEventListener('click', handleCalClick);
      });
    }
  }, 2000);
})
</script>

<style scoped>
.cal-floating-button {
  /* Le bouton sera stylé par Cal.com */
}
</style>
