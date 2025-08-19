<template>
  <div class="cal-floating-button">
    <!-- Le bouton flottant Cal.com sera injecté ici par le script -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

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
    "buttonText":"",
    "buttonOpacity": 0.4
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
})
</script>

<style scoped>
.cal-floating-button {
  /* Le bouton sera stylé par Cal.com */
}
</style>
