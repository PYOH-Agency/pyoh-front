<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Header avec baseline -->
    <section class="pt-32 pb-20">
      <div class="container mx-auto px-8">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Baseline/Slogan -->
          <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
            VOTRE VISION,
            <span class="text-pyoh-yellow">NOTRE CRÉATIVITÉ</span>
          </h1>

          <!-- Intro -->
          <div class="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
            <p class="mb-6">
              Pyoh est une <span class="highlight-word">agence de communication visuelle</span> full services. Quel que soit votre projet, nous travaillons main dans la main pour créer des solutions personnalisées qui répondent à vos besoins.
            </p>
            <p class="mb-6">
              <span class="highlight-word">C'est votre vision qui guide notre créativité, pas l'inverse !</span>
            </p>
            <p class="mb-6">
              Grâce à notre expertise et notre approche sur mesure, nous vous aidons à vous démarquer et à atteindre vos objectifs.
            </p>
            <p class="text-2xl font-medium">
              Ni plus ni moins !
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos compétences -->
    <section class="py-20 border-t border-white/10">
      <div class="container mx-auto px-8">
        <h2 class="text-4xl md:text-5xl font-bold mb-20">Nos compétences</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <!-- Identité Visuelle -->
          <div class="group">
            <div class="bg-white/5 border border-white/10 rounded-lg p-8 h-full hover:bg-white/10 transition-all duration-500 hover:border-pyoh-yellow/50">
              <div class="w-16 h-16 bg-pyoh-yellow/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pyoh-yellow/30 transition-all duration-300">
                <svg class="w-8 h-8 text-pyoh-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-pyoh-yellow">Identité Visuelle</h3>
              <p class="text-white/70 leading-relaxed">
                Nous concevons pour vous des logos et des <span class="highlight-word">identités de marque</span> uniques. Vous recevez des chartes graphiques complètes et cohérentes.
              </p>
            </div>
          </div>

          <!-- Supports de Communication -->
          <div class="group">
            <div class="bg-white/5 border border-white/10 rounded-lg p-8 h-full hover:bg-white/10 transition-all duration-500 hover:border-pyoh-yellow/50">
              <div class="w-16 h-16 bg-pyoh-yellow/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pyoh-yellow/30 transition-all duration-300">
                <svg class="w-8 h-8 text-pyoh-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-pyoh-yellow">Supports de Communication</h3>
              <p class="text-white/70 leading-relaxed">
                Nous désignons pour vous des brochures, affiches et autres <span class="highlight-word">supports imprimés</span>. Vous obtenez des présentations et documents marketing attrayants.
              </p>
            </div>
          </div>

          <!-- Stratégie de Contenus -->
          <div class="group">
            <div class="bg-white/5 border border-white/10 rounded-lg p-8 h-full hover:bg-white/10 transition-all duration-500 hover:border-pyoh-yellow/50">
              <div class="w-16 h-16 bg-pyoh-yellow/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pyoh-yellow/30 transition-all duration-300">
                <svg class="w-8 h-8 text-pyoh-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-pyoh-yellow">Stratégie de Contenus</h3>
              <p class="text-white/70 leading-relaxed">
                Nous élaborons pour vous des <span class="highlight-word">stratégies de contenu</span> alignées sur vos objectifs. Vous profitez de nos services de rédaction de scripts et de gestion de contenu.
              </p>
            </div>
          </div>

          <!-- Production & Prise de vue -->
          <div class="group">
            <div class="bg-white/5 border border-white/10 rounded-lg p-8 h-full hover:bg-white/10 transition-all duration-500 hover:border-pyoh-yellow/50">
              <div class="w-16 h-16 bg-pyoh-yellow/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pyoh-yellow/30 transition-all duration-300">
                <svg class="w-8 h-8 text-pyoh-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-pyoh-yellow">Production & Prise de vue</h3>
              <p class="text-white/70 leading-relaxed">
                De la conception au montage, nous réalisons des <span class="highlight-word">films promotionnels</span>, événementiels ou institutionnels en phase avec vos besoins.
              </p>
            </div>
          </div>

          <!-- Storytelling & Développement -->
          <div class="group">
            <div class="bg-white/5 border border-white/10 rounded-lg p-8 h-full hover:bg-white/10 transition-all duration-500 hover:border-pyoh-yellow/50">
              <div class="w-16 h-16 bg-pyoh-yellow/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pyoh-yellow/30 transition-all duration-300">
                <svg class="w-8 h-8 text-pyoh-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-pyoh-yellow">Storytelling & Développement</h3>
              <p class="text-white/70 leading-relaxed">
                Nous créons des récits captivants pour renforcer votre présence en ligne à travers la conception de <span class="highlight-word">sites web interactifs</span>.
              </p>
            </div>
          </div>

          <!-- Accompagnement & Conseils -->
          <div class="group">
            <div class="bg-white/5 border border-white/10 rounded-lg p-8 h-full hover:bg-white/10 transition-all duration-500 hover:border-pyoh-yellow/50">
              <div class="w-16 h-16 bg-pyoh-yellow/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pyoh-yellow/30 transition-all duration-300">
                <svg class="w-8 h-8 text-pyoh-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-pyoh-yellow">Accompagnement & Conseils</h3>
              <p class="text-white/70 leading-relaxed">
                Vous bénéficiez d'un <span class="highlight-word">accompagnement personnalisé</span> pour développer des stratégies de communication efficaces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Équipe -->
    <section class="py-20 border-t border-white/10">
      <div class="container mx-auto px-8">
        <h2 class="text-4xl md:text-5xl font-bold mb-20">Équipe</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Aurélien -->
          <div class="text-center group">
            <div class="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-pyoh-yellow/20 to-pyoh-yellow/40 flex items-center justify-center group-hover:scale-105 transition-all duration-500">
              <span class="text-6xl font-bold text-pyoh-yellow">A</span>
            </div>
            <h3 class="text-2xl font-bold mb-2 text-pyoh-yellow">Aurélien</h3>
            <p class="text-lg text-white/60 mb-4">Directeur de création</p>
            <p class="text-white/70 leading-relaxed text-sm">
              Au cœur de chaque projet, Aurélien imagine et conçoit des <span class="highlight-word">identités visuelles fortes</span>. De la direction artistique au storyboard, il accompagne les clients avec une vision créative et stratégique. Graphismes, conception et communication : il est le lien entre vos idées et leur concrétisation.
            </p>
          </div>

          <!-- Paul -->
          <div class="text-center group">
            <div class="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-pyoh-yellow/20 to-pyoh-yellow/40 flex items-center justify-center group-hover:scale-105 transition-all duration-500">
              <span class="text-6xl font-bold text-pyoh-yellow">P</span>
            </div>
            <h3 class="text-2xl font-bold mb-2 text-pyoh-yellow">Paul</h3>
            <p class="text-lg text-white/60 mb-4">CTO & Expert Web (Code & No-Code)</p>
            <p class="text-white/70 leading-relaxed text-sm">
              Développeur depuis 9 ans, Paul transforme les concepts en <span class="highlight-word">sites web performants</span> et intuitifs. Expert en solutions code et no-code, il crée des expériences digitales sur-mesure, alliant design interactif et efficacité technique.
            </p>
          </div>

          <!-- Valentin -->
          <div class="text-center group">
            <div class="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-pyoh-yellow/20 to-pyoh-yellow/40 flex items-center justify-center group-hover:scale-105 transition-all duration-500">
              <span class="text-6xl font-bold text-pyoh-yellow">V</span>
            </div>
            <h3 class="text-2xl font-bold mb-2 text-pyoh-yellow">Valentin</h3>
            <p class="text-lg text-white/60 mb-4">Réalisateur & Photographe</p>
            <p class="text-white/70 leading-relaxed text-sm">
              Avec son regard singulier, Valentin capture l'essence de chaque projet. Films promotionnels, institutionnels ou artistiques : il apporte une <span class="highlight-word">direction artistique unique</span> et des images qui marquent les esprits. Son objectif : raconter vos histoires en images avec authenticité et impact.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ils parlent de nous -->
    <section class="py-20 border-t border-white/10">
      <div class="container mx-auto px-8">
        <h2 class="text-4xl md:text-5xl font-bold mb-20">Ils parlent de nous</h2>
        
        <TestimonialCarousel 
          :testimonials="testimonials" 
          :auto-play-interval="6000"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useTestimonials } from '~/composables/useTestimonials'

// Configuration de la page
useHead({
  title: 'À propos - PYOH',
  meta: [
    { name: 'description', content: 'Découvrez l\'équipe PYOH et nos compétences en communication visuelle, identité de marque, et développement web' }
  ]
})

// Récupération des témoignages
const { testimonials, loading: testimonialsLoading, error: testimonialsError, fetchFeaturedTestimonials } = useTestimonials()

// Lifecycle
onMounted(async () => {
  await fetchFeaturedTestimonials()
})
</script>

<style scoped>
/* Animations d'entrée */
.group {
  animation: fadeInUp 0.8s ease-out;
}

.group:nth-child(1) { animation-delay: 0.1s; }
.group:nth-child(2) { animation-delay: 0.2s; }
.group:nth-child(3) { animation-delay: 0.3s; }
.group:nth-child(4) { animation-delay: 0.4s; }
.group:nth-child(5) { animation-delay: 0.5s; }
.group:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
.group:hover .bg-pyoh-yellow\/20 {
  background-color: rgb(253 219 0 / 0.3);
}

.group:hover .border-pyoh-yellow\/50 {
  border-color: rgb(253 219 0 / 0.5);
}

/* Effet d'apparition des mots-clés */
.highlight-word {
  color: #fddb00 !important;
  font-weight: 600;
  opacity: 0;
  animation: highlightAppear 0.8s ease-out forwards;
  animation-delay: 1s;
  display: inline-block;
}

.highlight-word:nth-child(2) { animation-delay: 1.3s; }
.highlight-word:nth-child(3) { animation-delay: 1.6s; }
.highlight-word:nth-child(4) { animation-delay: 1.9s; }
.highlight-word:nth-child(5) { animation-delay: 2.2s; }
.highlight-word:nth-child(6) { animation-delay: 2.5s; }
.highlight-word:nth-child(7) { animation-delay: 2.8s; }
.highlight-word:nth-child(8) { animation-delay: 3.1s; }
.highlight-word:nth-child(9) { animation-delay: 3.4s; }
.highlight-word:nth-child(10) { animation-delay: 3.7s; }

@keyframes highlightAppear {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    color: rgba(253, 219, 0, 0.3);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    color: #fddb00;
  }
}
</style>
