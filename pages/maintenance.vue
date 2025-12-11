<template>
  <div class="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6 py-16">
    <!-- Dégradés d'arrière-plan -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -left-24 -top-24 w-80 h-80 bg-pyoh-yellow/20 blur-3xl rounded-full"></div>
      <div class="absolute -right-24 -bottom-24 w-80 h-80 bg-white/10 blur-3xl rounded-full"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c0c] to-black opacity-90"></div>
    </div>

    <main class="relative z-10 w-full max-w-5xl space-y-12 text-center">
      <div class="flex justify-center">
        <img
          src="/images/Logos Pyoh-07.png"
          alt="PYOH"
          class="h-20 md:h-28 w-auto drop-shadow-lg"
        />
      </div>

      <section class="space-y-6">
        <p class="text-sm uppercase tracking-[0.3em] text-white/60">Pyoh se refait une beauté</p>
        <h1 class="text-4xl md:text-6xl font-bold leading-tight">
          Une nouvelle expérience arrive bientôt
          <span class="block text-pyoh-yellow">restez connectés</span>
        </h1>
        <p class="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
          On polit chaque pixel de notre nouveau site. En attendant, on reste disponibles pour vos projets branding, web et vidéo.
        </p>
      </section>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4 text-left bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
          <h2 class="text-2xl font-semibold text-pyoh-yellow">On reste joignables</h2>
          <ul class="space-y-3 text-white/80">
            <li class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-pyoh-yellow"></span>
              <span>Écrivez-nous : <a class="text-pyoh-yellow hover:underline" href="mailto:contact@pyoh.fr">contact@pyoh.fr</a></span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-pyoh-yellow"></span>
              <span>Appelez-nous : <a class="text-pyoh-yellow hover:underline" href="tel:+33686596088">+33 6 86 59 60 88</a></span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-pyoh-yellow"></span>
              <span>Basés à Bordeaux, projets partout en France.</span>
            </li>
          </ul>

          <div class="flex flex-wrap gap-3 pt-4">
            <a
              href="mailto:contact@pyoh.fr"
              class="btn-primary bg-pyoh-yellow text-black hover:bg-[#f4d400] shadow-lg shadow-pyoh-yellow/30"
            >
              Écrire à Pyoh
            </a>
            <a
              href="tel:+33686596088"
              class="btn-secondary border border-white/30 hover:bg-white/10"
            >
              Appeler
            </a>
          </div>
        </div>

        <div class="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDlraXphM2NsN3BhZmdxNzBjd2FxZjZmN2l6dTRxN2J5N3UzazRpOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pvFHR6Mju0ONQ/giphy.gif"
            alt="Animation en cours de création"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur">
        <div class="text-left">
          <p class="text-sm uppercase tracking-[0.2em] text-white/50">newsletter</p>
          <p class="text-lg text-white/80">Recevez le lancement en avant-première.</p>
        </div>
        <a
          href="mailto:contact@pyoh.fr?subject=Je%20veux%20être%20prévenu%20du%20lancement%20PYOH"
          class="btn-primary bg-white text-black hover:bg-white/90"
        >
          Me tenir informé·e
        </a>
      </div>
    </main>
  </div>
</template>

<script setup>
useHead({
  title: 'PYOH se refait une beauté',
  meta: [
    { name: 'description', content: 'PYOH prépare une nouvelle expérience. Contactez-nous pendant la refonte pour vos projets.' }
  ]
})
</script>

