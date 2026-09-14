'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [activePlan, setActivePlan] = useState<string>('Découverte');
  const [userName, setUserName] = useState<string>('Ingénieur');
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Carousel images simulating industrial machinery/equipment variations
  const industrialSlides = [
    {
      title: "Réseau de Tuyauterie Industrielle",
      desc: "Optimisation des écoulements multiphasiques et analyse des pertes de charge en raffinerie.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      tag: "Hydraulique Haute Pression"
    },
    {
      title: "Échangeur Thermique à Plaques",
      desc: "Suivi des coefficients globaux de transfert thermique et bilans énergétiques en temps réel.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      tag: "Thermique Avancée"
    },
    {
      title: "Unité de Procédé Chimique",
      desc: "Supervision des boucles de régulation et intégrité structurelle des équipements critiques.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
      tag: "Génie des Procédés"
    }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('quantal_current_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user.plan) setActivePlan(user.plan);
        if (user.name) setUserName(user.name);
        else if (user.email) setUserName(user.email.split('@')[0]);
      } catch (e) {
        console.error('Erreur lecture utilisateur', e);
      }
    }

    // Auto-advance carousel every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % industrialSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [industrialSlides.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex font-sans selection:bg-white selection:text-slate-950">
      
      {/* Barre latérale (Sidebar) en verre dépoli inspirée des maquettes sombres haut de gamme */}
      <aside className="w-64 backdrop-blur-2xl bg-slate-900/40 border-r border-white/10 hidden md:flex flex-col justify-between sticky top-0 h-screen shadow-2xl">
        <div className="p-6">
          <Link href="/" className="text-xl font-black text-white tracking-widest flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            QUANTAL
          </Link>
          <nav className="mt-8 space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-slate-950 bg-white rounded-xl shadow-lg transition transform hover:scale-[1.02]">
              <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span>Tableau de bord</span>
            </Link>
            
            <Link href="/dashboard/pressure-drop" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              <span>Pertes de charge</span>
            </Link>

            <Link href="/dashboard/heat-exchanger" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Échangeurs Thermiques</span>
            </Link>

            <Link href="/dashboard/pricing" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              <span>Pass / Abonnements</span>
            </Link>

            
          </nav>
        </div>  
        <div className="p-6 border-t border-white/10">
          <Link href="/login" className="flex items-center space-x-2 text-sm font-medium text-slate-400 hover:text-white transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Déconnexion</span>
          </Link>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* En-tête du tableau de bord */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Espace Ingénierie</div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Bonjour, {userName}</h1>
            <p className="text-sm text-slate-300 mt-1">Sélectionnez un outil pour lancer une simulation de procédé industriel.</p>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl shadow-inner backdrop-blur-md">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="text-sm text-slate-300">Plan actif : <strong className="text-white font-extrabold">{activePlan}</strong></span>
          </div>
        </header>

        {/* Carrousel d'engins industriels et procédés (Variation moderne inspirée des inspirations graphiques) */}
        <section className="mb-10 relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl group">
          <div className="absolute inset-0 z-0">
            <img 
              src={industrialSlides[currentSlide].image} 
              alt="Installation Industrielle" 
              className="w-full h-full object-cover opacity-40 transform scale-105 transition-all duration-1000 filter blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12 max-w-2xl flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                {industrialSlides[currentSlide].tag}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                {industrialSlides[currentSlide].title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {industrialSlides[currentSlide].desc}
              </p>
            </div>

            {/* Indicateurs de carrousel */}
            <div className="flex items-center space-x-2 mt-6">
              {industrialSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Aller à la diapositive ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Grille des modules de calcul professionnels */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Module 1 : Pertes de charge */}
          <div className="backdrop-blur-xl bg-slate-900/60 p-8 rounded-3xl border border-white/10 shadow-2xl hover:border-white/30 transition flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-white bg-white/10 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Hydraulique
                </span>
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white group-hover:bg-white group-hover:text-slate-950 transition shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-6 mb-3">Calcul des Pertes de Charge</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Estimez avec précision les chutes de pression dans vos réseaux de tuyauteries selon Darcy-Weisbach, le facteur de friction de Colebrook et intégrez les accessoires singuliers.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/dashboard/pressure-drop"
                className="w-full py-3.5 px-4 bg-white text-slate-950 text-sm font-bold rounded-xl hover:bg-slate-200 transition flex items-center justify-center space-x-2 shadow-xl"
              >
                <span>Lancer le calcul</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Module 2 : Échangeurs */}
          <div className="backdrop-blur-xl bg-slate-900/60 p-8 rounded-3xl border border-white/10 shadow-2xl hover:border-white/30 transition flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-white bg-white/10 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Thermique
                </span>
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white group-hover:bg-white group-hover:text-slate-950 transition shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-6 mb-3">Dimensionnement d'Échangeurs</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calculez rapidement la surface d'échange thermique nécessaire, les flux de chaleur impliqués et exploitez la méthode rigoureuse LMTD (Log Mean Temperature Difference).
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/dashboard/heat-exchanger"
                className="w-full py-3.5 px-4 bg-white text-slate-950 text-sm font-bold rounded-xl hover:bg-slate-200 transition flex items-center justify-center space-x-2 shadow-xl"
              >
                <span>Lancer le calcul</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}