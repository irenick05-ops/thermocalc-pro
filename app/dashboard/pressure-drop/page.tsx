'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// 1. Importation des fonctions de gestion des limites et des quotas
import { checkSimulationQuota, incrementSimulationCount } from '@/lib/limits';

export default function PressureDropPage() {
  const router = useRouter();

  const [projectName, setProjectName] = useState<string>('Unité de Synthèse - Ligne Hydrocarbures');
  const [flowRate, setFlowRate] = useState<number>(50); // m³/h
  const [diameter, setDiameter] = useState<number>(0.1); // m
  const [length, setLength] = useState<number>(100); // m
  const [density, setDensity] = useState<number>(1000); // kg/m³ (ex: eau)
  const [viscosity, setViscosity] = useState<number>(0.001); // Pa·s
  
  // État pour stocker le message d'erreur si la limite de simulations est atteinte
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Calculs hydrauliques
  const area = Math.PI * Math.pow(diameter / 2, 2);
  const qM3s = flowRate / 3600;
  const velocity = area > 0 ? qM3s / area : 0;
  const reynolds = viscosity > 0 ? (density * velocity * diameter) / viscosity : 0;

  // Estimation facteur de friction (Approximation Haaland / Colebrook simplifiée)
  let frictionFactor = 0.02;
  if (reynolds > 4000) {
    frictionFactor = 0.316 / Math.pow(reynolds, 0.25); // Formule de Blasius
  } else if (reynolds > 0) {
    frictionFactor = 64 / reynolds; // Laminaire
  }

  // Perte de charge en Pascals puis convertie en bars
  const deltaPPa = frictionFactor * (length / diameter) * (density * Math.pow(velocity, 2) / 2);
  const deltaPBar = deltaPPa / 100000;

  const regime = reynolds > 4000 ? 'Turbulent' : reynolds > 2300 ? 'Transitionnel' : 'Laminaires';
  const isErosionRisk = velocity > 3;
  const safetyAlert = isErosionRisk 
    ? 'Attention : Vitesse supérieure à 3 m/s - Risque élevé d\'érosion-corrosion sur acier carbone.'
    : 'Conforme : Vitesse < 3 m/s - Pas de risque d\'érosion-corrosion majeur.';

  const handleSaveForReport = () => {
    // 2. VÉRIFICATION DU QUOTA AVANT D'ENREGISTRER / GÉNÉRER
    const quota = checkSimulationQuota();
    
    if (!quota.allowed) {
      setErrorMessage(quota.message || "Vous avez atteint votre limite de 3 simulations gratuites pour aujourd'hui.");
      return;
    }

    setErrorMessage(null);

    const reportData = {
      projectName,
      engineerName: 'Irenick Pascal BAALE',
      moduleType: 'Pertes de Charge (Darcy-Weisbach)',
      date: new Date().toLocaleDateString('fr-FR'),
      inputs: [
        { label: 'Débit Volumique (Q)', value: `${flowRate} m³/h` },
        { label: 'Diamètre Intérieur Conduite (D)', value: `${diameter} m` },
        { label: 'Longueur du Réseau (L)', value: `${length} m` },
        { label: 'Masse Volumique du Fluide', value: `${density} kg/m³` }
      ],
      results: [
        { label: 'Vitesse d\'écoulement', value: `${velocity.toFixed(2)} m/s` },
        { label: 'Nombre de Reynolds (Re) & Régime', value: `${reynolds.toFixed(0)} (${regime})` },
        { label: 'Perte de Charge Totale (ΔP)', value: `${deltaPBar.toFixed(4)} bar` }
      ],
      safetyAlert
    };

    localStorage.setItem('quantal_report_data', JSON.stringify(reportData));
    
    // 3. INCRÉMENTATION DU COMPTEUR DE SIMULATION JOURNALIER
    incrementSimulationCount();

    router.push('/dashboard/reports');
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-[#090a0f] font-sans text-slate-100 selection:bg-red-500 selection:text-white">
      
      {/* Arrière-plan high-tech sombre avec lueur rouge/bleue cybernétique inspirée des maquettes */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 filter blur-[3px]"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80')` }}
      ></div>

      {/* Effets lumineux d'ambiance (Lueur rouge cyber & bleue nuit) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0b0c14]/90 to-transparent"></div>

      {/* Barre latérale (Sidebar) en verre dépoli (Glassmorphism minimaliste) */}
      <aside className="relative z-10 w-64 backdrop-blur-2xl bg-black/40 border-r border-white/10 hidden md:flex flex-col justify-between shadow-2xl">
        <div className="p-6">
          <Link href="/" className="text-xl font-black text-white tracking-widest flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.8)]"></span>
            QUANTAL
          </Link>
          <nav className="mt-8 space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition duration-300">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span>Tableau de bord</span>
            </Link>
            
            <Link href="/dashboard/pressure-drop" className="flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-600/80 to-red-700/60 rounded-xl shadow-[0_4px_20px_rgba(220,38,38,0.3)] border border-red-500/30 transition">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              <span>Pertes de charge</span>
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
      <main className="relative z-10 flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8 backdrop-blur-2xl bg-white/[0.03] p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-red-400 font-bold mb-1">Module Hydraulique Industriel</div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Calcul des Pertes de Charge</h1>
            <p className="text-sm text-slate-400 mt-1">Estimez les chutes de pression par la méthode rigoureuse de Darcy-Weisbach.</p>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl shadow-inner backdrop-blur-md">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-slate-300">Modèle : <strong className="text-white font-extrabold">Colebrook-Blasius</strong></span>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Bloc Paramètres Hydrauliques (Glassmorphism dark & clean) */}
          <div className="backdrop-blur-2xl bg-black/40 p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-extrabold text-white">Paramètres Hydrauliques</h2>
              <span className="px-3 py-1 bg-white/10 border border-white/20 text-xs font-bold text-white rounded-full uppercase tracking-wider">Entrées</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nom du Projet / Unité</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Débit Volumique (m³/h)</label>
                <input
                  type="number"
                  value={flowRate}
                  onChange={(e) => setFlowRate(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Diamètre Intérieur (m)</label>
                <input
                  type="number"
                  step="0.01"
                  value={diameter}
                  onChange={(e) => setDiameter(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Longueur Conduite (m)</label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Masse Volumique (kg/m³)</label>
                <input
                  type="number"
                  value={density}
                  onChange={(e) => setDensity(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
                />
              </div>
            </div>

            {/* Illustration miniature de réseau hydraulique aux accents cyber/red */}
            <div className="relative rounded-2xl overflow-hidden h-36 border border-white/10 shadow-inner group">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                alt="Réseau de tuyauterie industrielle" 
                className="w-full h-full object-cover opacity-40 filter contrast-125 transform group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-black/50 to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-slate-300 tracking-wide">Schéma de simulation des flux en charge</span>
              </div>
            </div>
          </div>

          {/* Bloc Résultats Analytiques */}
          <div className="backdrop-blur-2xl bg-black/40 p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <h2 className="text-lg font-extrabold text-white">Résultats Analytiques</h2>
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-md">Sorties</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-inner">
                  <span className="text-sm text-slate-300">Vitesse d'écoulement</span>
                  <span className={`font-black text-base ${isErosionRisk ? 'text-amber-400' : 'text-white'}`}>{velocity.toFixed(2)} m/s</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-inner">
                  <span className="text-sm text-slate-300">Nombre de Reynolds (Re)</span>
                  <span className="font-black text-base text-white">{reynolds.toFixed(0)} <span className="text-xs text-slate-400 font-normal">({regime})</span></span>
                </div>

                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-[0_4px_25px_rgba(220,38,38,0.4)]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-200 block">Perte de Charge Totale</span>
                    <span className="text-xl font-black">ΔP</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black">{deltaPBar.toFixed(4)}</span>
                    <span className="text-sm font-bold text-red-200 ml-1">bar</span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border text-xs leading-relaxed backdrop-blur-md ${isErosionRisk ? 'bg-amber-500/20 border-amber-500/40 text-amber-200' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'}`}>
                  <span className="font-bold block mb-1 uppercase tracking-wider">Heuristique de sécurité :</span>
                  {safetyAlert}
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              {/* Affichage de l'alerte si le quota gratuit journalier est dépassé */}
              {errorMessage && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-2xl backdrop-blur-md">
                  <p className="font-bold text-xs uppercase tracking-wider">Alerte d'accès :</p>
                  <p className="text-sm mt-1">{errorMessage}</p>
                  <Link href="/pricing" className="inline-block mt-3 text-xs font-bold bg-white text-black px-4 py-2 rounded-xl hover:bg-slate-200 transition">
                    Passer au plan Pro (Illimité)
                  </Link>
                </div>
              )}

              <button
                onClick={handleSaveForReport}
                className="w-full py-4 px-4 bg-white text-black text-sm font-bold rounded-xl hover:bg-slate-200 transition flex items-center justify-center space-x-2 shadow-[0_4px_25px_rgba(255,255,255,0.2)] transform active:scale-95"
              >
                <span>Enregistrer & Générer la note officielle</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}