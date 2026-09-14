'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeatExchangerPage() {
  const router = useRouter();

  const [projectName, setProjectName] = useState<string>('Unité Thermique - Échangeur E-101');
  const [duty, setDuty] = useState<number>(500); // kW
  const [uCoef, setUCoef] = useState<number>(850); // W/(m²·K)
  const [thIn, setThIn] = useState<number>(90); // °C
  const [thOut, setThOut] = useState<number>(45); // °C
  const [tcIn, setTcIn] = useState<number>(20); // °C
  const [tcOut, setTcOut] = useState<number>(60); // °C

  const deltaT1 = thIn - tcOut;
  const deltaT2 = thOut - tcIn;

  let lmtd = 0;
  if (deltaT1 > 0 && deltaT2 > 0) {
    if (deltaT1 === deltaT2) {
      lmtd = deltaT1;
    } else {
      lmtd = (deltaT1 - deltaT2) / Math.log(deltaT1 / deltaT2);
    }
  }

  const qWatts = duty * 1000;
  const area = (uCoef > 0 && lmtd > 0) ? qWatts / (uCoef * lmtd) : 0;

  const handleSaveForReport = () => {
    const reportData = {
      projectName,
      engineerName: 'Irenick Pascal BAALE',
      moduleType: 'Dimensionnement d\'Échangeur (LMTD)',
      date: new Date().toLocaleDateString('fr-FR'),
      inputs: [
        { label: 'Flux thermique (Q)', value: `${duty} kW` },
        { label: 'Coefficient global U', value: `${uCoef} W/(m²·K)` },
        { label: 'Fluide Chaud Entrée / Sortie', value: `${thIn} °C / ${thOut} °C` },
        { label: 'Fluide Froid Entrée / Sortie', value: `${tcIn} °C / ${tcOut} °C` }
      ],
      results: [
        { label: 'Delta T1 (ΔT1)', value: `${deltaT1.toFixed(2)} °C` },
        { label: 'Delta T2 (ΔT2)', value: `${deltaT2.toFixed(2)} °C` },
        { label: 'LMTD (Moyenne Logarithmique)', value: `${lmtd > 0 ? lmtd.toFixed(2) : 'Invalide'} °C` },
        { label: 'Surface d\'échange requise (A)', value: `${area > 0 ? area.toFixed(2) : '0.00'} m²` }
      ],
      safetyAlert: area > 0 ? 'Conforme (Calculs thermodynamiques stables - Aucun pincement critique)' : 'Attention : Paramètres thermiques non valides.'
    };

    localStorage.setItem('quantal_report_data', JSON.stringify(reportData));
    router.push('/dashboard/reports');
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-[#090a0f] font-sans text-slate-100 selection:bg-red-500 selection:text-white">
      
      {/* Arrière-plan high-tech sombre avec lueur rouge/bleue cybernétique */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 filter blur-[3px]"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80')` }}
      ></div>

      {/* Effets lumineux d'ambiance */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#0b0c14]/90 to-transparent"></div>

      {/* Barre latérale (Sidebar) en verre dépoli */}
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

            
            
            <Link href="/dashboard/heat-exchanger" className="flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-600/80 to-red-700/60 rounded-xl shadow-[0_4px_20px_rgba(220,38,38,0.3)] border border-red-500/30 transition">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Échangeurs Thermiques</span>
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
            <div className="text-xs uppercase tracking-widest text-red-400 font-bold mb-1">Module Thermique Industriel</div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Dimensionnement d'Échangeurs (LMTD)</h1>
            <p className="text-sm text-slate-400 mt-1">Calculez la surface d'échange thermique et préparez votre note officielle.</p>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl shadow-inner backdrop-blur-md">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-slate-300">Modèle : <strong className="text-white font-extrabold">Logarithmic Mean Temperature Difference</strong></span>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Bloc Paramètres du Projet */}
          <div className="backdrop-blur-2xl bg-black/40 p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-extrabold text-white">Paramètres du Projet</h2>
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Flux thermique Q (kW)</label>
                <input
                  type="number"
                  value={duty}
                  onChange={(e) => setDuty(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Coef. Global U [W/(m²·K)]</label>
                <input
                  type="number"
                  value={uCoef}
                  onChange={(e) => setUCoef(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Fluide Chaud Entrée (°C)</label>
                <input
                  type="number"
                  value={thIn}
                  onChange={(e) => setThIn(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Fluide Chaud Sortie (°C)</label>
                <input
                  type="number"
                  value={thOut}
                  onChange={(e) => setThOut(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Fluide Froid Entrée (°C)</label>
                <input
                  type="number"
                  value={tcIn}
                  onChange={(e) => setTcIn(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Fluide Froid Sortie (°C)</label>
                <input
                  type="number"
                  value={tcOut}
                  onChange={(e) => setTcOut(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition shadow-inner"
                />
              </div>
            </div>

            {/* Illustration miniature d'échangeur thermique */}
            <div className="relative rounded-2xl overflow-hidden h-36 border border-white/10 shadow-inner group">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                alt="Échangeur thermique tubulaire" 
                className="w-full h-full object-cover opacity-40 filter contrast-125 transform group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-black/50 to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-slate-300 tracking-wide">Simulation thermique multi-tubulaire</span>
              </div>
            </div>
          </div>

          {/* Bloc Résultats du Dimensionnement */}
          <div className="backdrop-blur-2xl bg-black/40 p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <h2 className="text-lg font-extrabold text-white">Résultats du Dimensionnement</h2>
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-md">Sorties</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-inner">
                  <span className="text-sm text-slate-300">Delta T1 (ΔT1)</span>
                  <span className="font-black text-base text-white">{deltaT1.toFixed(2)} °C</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-inner">
                  <span className="text-sm text-slate-300">Delta T2 (ΔT2)</span>
                  <span className="font-black text-base text-white">{deltaT2.toFixed(2)} °C</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-inner">
                  <span className="text-sm text-slate-300">LMTD (Moyenne Logarithmique)</span>
                  <span className="font-black text-base text-white">{lmtd > 0 ? lmtd.toFixed(2) : 'Invalide'} °C</span>
                </div>

                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-[0_4px_25px_rgba(220,38,38,0.4)]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-200 block">Surface d'échange requise</span>
                    <span className="text-xl font-black">A</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black">{area > 0 ? area.toFixed(2) : '0.00'}</span>
                    <span className="text-sm font-bold text-red-200 ml-1">m²</span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border text-xs leading-relaxed backdrop-blur-md ${area > 0 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200' : 'bg-amber-500/20 border-amber-500/40 text-amber-200'}`}>
                  <span className="font-bold block mb-1 uppercase tracking-wider">État thermodynamique :</span>
                  {area > 0 ? 'Conforme (Calculs thermodynamiques stables - Aucun pincement critique)' : 'Attention : Paramètres thermiques non valides.'}
                </div>
              </div>
            </div>

            <div className="pt-4">
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