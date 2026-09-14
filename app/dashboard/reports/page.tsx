'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReportsPage() {
  const [reportData, setReportData] = useState({
    projectName: 'Unité de Synthèse Chimique - Procédé Principal',
    engineerName: 'Irenick Pascal BAALE',
    moduleType: 'Calculs Thermodynamiques & Pertes de Charge',
    date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
    inputs: [
      { label: 'Débit massique (m)', value: '12.5 kg/s' },
      { label: 'Température d\'entrée (T1)', value: '350.0 K' },
      { label: 'Pression amont (P1)', value: '1.80 MPa' },
      { label: 'Viscosité dynamique (μ)', value: '0.00028 Pa·s' },
      { label: 'Rugosité relative (ε/D)', value: '0.00015' }
    ],
    results: [
      { label: 'Vitesse d\'écoulement (v)', value: '4.82 m/s' },
      { label: 'Nombre de Reynolds (Re)', value: '142 500 (Turbulent)' },
      { label: 'Coefficient de frottement (f)', value: '0.0178' },
      { label: 'Perte de charge totale (ΔP)', value: '45.8 kPa' },
      { label: 'Indice de Sécurité Thermodynamique', value: '98.4% (Conforme)' }
    ],
    safetyAlert: 'Système validé selon les critères de résistance des matériaux et de stabilité des fluides compressibles. Aucune cavitation ni point de rosée prématuré détecté.'
  });

  useEffect(() => {
    const saved = localStorage.getItem('quantal_report_data');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setReportData(prev => ({
          ...prev,
          ...parsedData,
          date: parsedData.date || new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
        }));
      } catch (e) {
        console.error('Erreur lors du chargement des données du rapport', e);
      }
    }

    const currentUserStr = localStorage.getItem('quantal_current_user');
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr);
        if (currentUser.firstName && currentUser.lastName) {
          setReportData(prev => ({
            ...prev,
            engineerName: `${currentUser.firstName} ${currentUser.lastName}`
          }));
        }
      } catch (e) {
        console.error('Erreur utilisateur actif', e);
      }
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-[#05060a] font-sans text-slate-100 selection:bg-red-600 selection:text-white print:bg-white print:text-black">
      
      {/* Arrière-plan cinématique avec motif industriel/technologique */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 filter blur-[2px] print:hidden pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1508873696983-2df5c92091c7?auto=format&fit=crop&w=1920&q=80')` }}
      ></div>

      {/* Halo lumineux d'ambiance high-tech */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none print:hidden"></div>
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none print:hidden"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060a]/80 via-[#090a10]/95 to-[#05060a] print:hidden"></div>

      {/* Barre latérale (Sidebar) en verre haut de gamme */}
      <aside className="relative z-20 w-72 backdrop-blur-2xl bg-black/50 border-r border-white/10 hidden lg:flex flex-col justify-between shadow-[4px_0_30px_rgba(0,0,0,0.5)] print:hidden">
        <div className="p-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)] group-hover:scale-105 transition duration-300">
              <span className="w-3 h-3 bg-white rounded-full"></span>
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white">QUANTAL</span>
              <span className="block text-[10px] text-red-400 font-bold uppercase tracking-widest"></span>
            </div>
          </Link>

          <nav className="mt-10 space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition duration-300">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span>Tableau de bord</span>
            </Link>

            

            
            <Link href="/dashboard/reports" className="flex items-center space-x-3 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-600/90 to-red-700/70 rounded-xl shadow-[0_4px_25px_rgba(220,38,38,0.4)] border border-red-500/40 transition">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Notes de Calcul (PDF)</span>
            </Link>
          </nav>
        </div>

        <div className="p-8 border-t border-white/10">
          <Link href="/login" className="flex items-center space-x-3 text-sm font-medium text-slate-400 hover:text-red-400 transition duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Déconnexion</span>
          </Link>
        </div>
      </aside>

      {/* Contenu principal de la note de calcul */}
      <main className="relative z-10 flex-1 p-6 md:p-12 overflow-y-auto print:p-0 print:m-0 print:overflow-visible">
        <div className="max-w-4xl mx-auto backdrop-blur-3xl bg-black/60 p-8 md:p-14 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] print:bg-white print:text-black print:border-none print:shadow-none print:p-0 print:w-full">
          
          {/* En-tête de la note de calcul */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 print:border-black/30 pb-8 mb-10 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.6)] print:hidden">
                <span className="text-white font-black text-xl">Q</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white print:text-black tracking-wider flex items-center gap-3">
                  QUANTAL <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 print:hidden">AUDIT CERTIFIÉ</span>
                </h1>
                <p className="text-xs text-slate-400 print:text-slate-600 mt-1 uppercase tracking-widest font-semibold">Logiciel de Simulation & Modélisation pour Ingénieur Procédés</p>
              </div>
            </div>
            <div className="text-left md:text-right bg-white/5 print:bg-slate-50 p-4 rounded-2xl border border-white/10 print:border-slate-300 w-full md:w-auto">
              <div className="text-xs font-black text-red-400 print:text-black uppercase tracking-wider">NOTE DE CALCUL OFFICIELLE</div>
              <div className="text-xs text-slate-300 print:text-slate-700 mt-1 font-mono">Réf: QNT-2026-ENG-984</div>
              <div className="text-xs text-slate-400 print:text-slate-600 mt-0.5">Date: {reportData.date}</div>
            </div>
          </div>

          {/* Cartouche d'informations projet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] print:bg-slate-50 p-6 md:p-8 rounded-3xl border border-white/10 print:border-slate-300 backdrop-blur-xl shadow-inner">
            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 print:text-slate-500">Projet / Unité Industrielle</span>
              <p className="text-base font-extrabold text-white print:text-slate-900">{reportData.projectName}</p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 print:text-slate-500">Ingénieur Responsable</span>
              <p className="text-base font-extrabold text-white print:text-slate-900">{reportData.engineerName}</p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 print:text-slate-500">Module Analytique Appliqué</span>
              <p className="text-sm font-bold text-red-400 print:text-slate-900">{reportData.moduleType}</p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 print:text-slate-500">Statut de Conformité</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse print:hidden"></span>
                <span className="text-sm font-black text-emerald-400 print:text-emerald-700 uppercase tracking-wide">VALIDÉ & CERTIFIÉ</span>
              </div>
            </div>
          </div>

          {/* Section 1 : Paramètres d'entrée */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-black text-xs border border-red-500/30 print:hidden">01</div>
              <h2 className="text-sm font-black text-white print:text-black uppercase tracking-wider">Hypothèses et Paramètres d'Entrée du Procédé</h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 print:border-slate-300 bg-white/[0.02] print:bg-white">
              <table className="w-full text-left text-sm text-slate-300 print:text-slate-700">
                <thead>
                  <tr className="bg-white/5 print:bg-slate-100 border-b border-white/10 print:border-slate-300 text-xs font-black uppercase tracking-wider text-slate-400 print:text-slate-600">
                    <th className="py-3.5 px-6">Paramètre Physique</th>
                    <th className="py-3.5 px-6 text-right">Valeur Retenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-slate-200">
                  {reportData.inputs.length > 0 ? (
                    reportData.inputs.map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-white/[0.03] transition">
                        <td className="py-3.5 px-6 font-medium">{item.label}</td>
                        <td className="py-3.5 px-6 font-mono font-bold text-white print:text-slate-900 text-right">{item.value}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-6 px-6 text-center text-slate-500 font-medium">Aucun paramètre d'entrée enregistré. Veuillez effectuer une simulation.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2 : Résultats Analytiques */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-black text-xs border border-red-500/30 print:hidden">02</div>
              <h2 className="text-sm font-black text-white print:text-black uppercase tracking-wider">Résultats Analytiques & Évaluation des Performances</h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 print:border-slate-300 bg-white/[0.02] print:bg-white">
              <table className="w-full text-left text-sm text-slate-300 print:text-slate-700">
                <thead>
                  <tr className="bg-white/5 print:bg-slate-100 border-b border-white/10 print:border-slate-300 text-xs font-black uppercase tracking-wider text-slate-400 print:text-slate-600">
                    <th className="py-3.5 px-6">Grandeur Calculée</th>
                    <th className="py-3.5 px-6 text-right">Résultat Numérique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-slate-200">
                  {reportData.results.length > 0 ? (
                    reportData.results.map((item: any, idx: number) => {
                      const isLast = idx === reportData.results.length - 1;
                      return (
                        <tr key={idx} className={`${isLast ? 'bg-red-500/10 print:bg-slate-100 font-black text-white print:text-black' : 'hover:bg-white/[0.03]'} transition`}>
                          <td className="py-3.5 px-6 font-medium">{item.label}</td>
                          <td className="py-3.5 px-6 font-mono font-bold text-right">{item.value}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-6 px-6 text-center text-slate-500 font-medium">Aucun résultat disponible.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Boîte d'Avis d'Expertise & Recommandations Sécurité */}
          <div className="mb-12 p-6 md:p-8 border border-red-500/30 print:border-black rounded-3xl bg-gradient-to-r from-red-950/20 via-black/40 to-black/60 print:bg-slate-50 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none print:hidden"></div>
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-red-400 print:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <h3 className="text-xs font-black uppercase tracking-wider text-red-400 print:text-black">Avis d'Expertise & Recommandations d'Ingénierie</h3>
            </div>
            <p className="text-sm text-slate-300 print:text-slate-800 leading-relaxed font-medium">
              {reportData.safetyAlert}
            </p>
          </div>

          {/* Actions d'exportation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10 print:border-slate-300">
            <div className="text-xs text-slate-400 print:text-slate-500 italic">
              * Document généré automatiquement par la plateforme QUANTAL - Conforme aux standards internationaux de génie des procédés.
            </div>
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto py-4 px-8 bg-gradient-to-r from-white to-slate-200 text-black text-sm font-black rounded-2xl hover:from-slate-200 hover:to-white transition duration-300 flex items-center justify-center space-x-3 shadow-[0_4px_30px_rgba(255,255,255,0.25)] transform active:scale-95 print:hidden"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
              </svg>
              <span>Télécharger / Imprimer la Note de Calcul (PDF)</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}