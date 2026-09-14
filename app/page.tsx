'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Images d'industries lourdes pour le carrousel d'arrière-plan
const industrialImages = [
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80', // Usine / ingénieur
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1920&q=80', // Raffinerie / pétrochimie
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80'  // Tuyauteries industrielles
];

export default function LandingPage() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotation automatique du carrousel d'arrière-plan toutes les 6 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % industrialImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-black selection:text-white">
      {/* Barre de navigation supérieure */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link href="/" className="text-xl font-black tracking-wider text-black">
              QUANTAL
            </Link>
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <Link href="#features" className="hover:text-black transition">Modules</Link>
              <Link href="#bento" className="hover:text-black transition">Fonctionnalités</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-sm"
            >
              Connexion
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section avec Carrousel d'industries en arrière-plan */}
      <section className="relative pt-24 pb-32 overflow-hidden text-white">
        {/* Carrousel d'images d'arrière-plan avec transparence et fondu */}
        {industrialImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        {/* Superbe dégradé sombre par-dessus pour assurer une lisibilité parfaite */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/85 to-slate-900"></div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest bg-white/10 text-sky-300 rounded-full border border-white/10 backdrop-blur-md">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Plateforme pour cabinets d'études & ingénieurs procédés
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            L'excellence du dimensionnement <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">hydraulique et thermique</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Automatisez vos notes de calcul rigoureuses, simulez vos réseaux de tuyauterie et échangeurs, et éditez des rapports d'ingénierie irréprochables.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>Commencer</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-400">Paiement sécurisé • Tarifs transparents en FCFA</p>
        </div>

        {/* Aperçu visuel / Mockup stylisé flottant */}
        <div className="mt-16 max-w-6xl mx-auto px-6 relative z-10" id="features">
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-3xl p-4 shadow-2xl backdrop-blur-xl">
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-left grid md:grid-cols-3 gap-6">
              
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                  </div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Module 01</span>
                  <h3 className="text-lg font-bold text-white mt-1">Pertes de charge (Darcy)</h3>
                  <p className="text-xs text-slate-400 mt-2">Calculs rigoureux des régimes d'écoulement, facteurs de friction et vitesses d'érosion critiques.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Colebrook-White</span>
                  <span className="text-slate-500 font-mono">ISO-5167</span>
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Module 02</span>
                  <h3 className="text-lg font-bold text-white mt-1">Échangeurs Thermiques</h3>
                  <p className="text-xs text-slate-400 mt-2">Dimensionnement multi-fluides, bilans énergétiques précis et calculs de la moyenne logarithmique des températures.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Logique LMTD</span>
                  <span className="text-slate-500 font-mono">TEMA</span>
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  </div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Module 03</span>
                  <h3 className="text-lg font-bold text-white mt-1">Notes de Calcul PDF</h3>
                  <p className="text-xs text-slate-400 mt-2">Édition automatique de documents techniques structurés, signés et prêts pour la validation client.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Export Pro</span>
                  <span className="text-slate-500 font-mono">PDF Vectoriel</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section Bento Grid */}
      <section id="bento" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900">Conçu par des ingénieurs, pour des ingénieurs</h2>
          <p className="text-slate-600 mt-3 text-sm">Une plateforme moderne qui associe la rigueur des équations de procédés à l'ergonomie web.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Carte 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">Performance</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-4">Gain de temps exponentiel</h3>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">Affranchissez-vous des feuilles de calcul hétérogènes et éliminez les risques d'erreurs de transcription manuelle.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Automatisation intégrale</span>
              <span className="text-slate-900 font-bold">100% Fiable</span>
            </div>
          </div>

          {/* Carte 2 (Mise en avant couleur) */}
          <div className="bg-black text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-black bg-white px-3 py-1 rounded-full">Sécurité</span>
              <h3 className="text-2xl font-bold mt-4">Conformité Internationale</h3>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">Intégration native des corrélations normalisées (Moody, Darcy-Weisbach, Kern) indispensables pour vos audits industriels.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Standards rigoureux</span>
              <span className="text-white font-bold">Certifié</span>
            </div>
          </div>

          {/* Carte 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Paiement Local</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-4">Souscription en ligne</h3>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">Activez vos abonnements professionnels en toute simplicité avec des règlements adaptés et sécurisés.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Mobile Money & Cartes</span>
              <span className="text-slate-900 font-bold">Instantané</span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500">
          <p>© {new Date().getFullYear()} QUANTAL. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/login" className="hover:text-slate-900 transition font-semibold text-black">Connexion</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}