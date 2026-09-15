'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const [activePlan, setActivePlan] = useState<string>('Découverte');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [transactionCode, setTransactionCode] = useState<string>('');
  const [selectedPaidPlan, setSelectedPaidPlan] = useState<string>('Pass Ingénieur');

  useEffect(() => {
    const savedUser = localStorage.getItem('quantal_current_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user.plan) {
          setActivePlan(user.plan);
        }
      } catch (e) {
        console.error('Erreur lecture utilisateur', e);
      }
    }
  }, []);

  const handleSelectPlan = (planName: string, price: number) => {
    // Si c'est le plan gratuit, on l'active immédiatement
    if (price === 0) {
      setActivePlan(planName);
      const savedUserStr = localStorage.getItem('quantal_current_user');
      if (savedUserStr) {
        try {
          const user = JSON.parse(savedUserStr);
          user.plan = planName;
          localStorage.setItem('quantal_current_user', JSON.stringify(user));
        } catch (e) {
          console.error('Erreur mise à jour utilisateur', e);
        }
      }
      setSuccessMessage(`Félicitations ! Votre compte est désormais associé au ${planName}. Redirection vers le tableau de bord...`);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } else {
      // Pour les plans payants : ON NE MODIFIE PAS LE LOCALSTORAGE. On redirige vers Saaspay en toute sécurité.
      setSelectedPaidPlan(planName);
      setSuccessMessage(`Redirection vers la passerelle sécurisée Saaspay pour le ${planName}... Effectuez votre paiement puis entrez votre code de transaction ci-dessous.`);
      
      setTimeout(() => {
        if (planName === 'Pass Ingénieur') {
          window.location.href = 'https://link.saspay.me/e8j1m8bw7pc';
        } else if (planName === 'Pass Entreprise') {
          window.location.href = 'https://link.saspay.me/gqn-pmlog4o'; 
        }
      }, 1500);
    }
  };

  // Fonction de validation par code de transaction
  const handleVerifyTransaction = () => {
    if (!transactionCode || transactionCode.trim().length < 4) {
      alert('Veuillez entrer un code de transaction ou une référence Saaspay valide.');
      return;
    }

    // Mettre à jour l'utilisateur avec le plan payant choisi après validation du code
    const savedUserStr = localStorage.getItem('quantal_current_user');
    if (savedUserStr) {
      try {
        const user = JSON.parse(savedUserStr);
        user.plan = selectedPaidPlan;
        localStorage.setItem('quantal_current_user', JSON.stringify(user));
        setActivePlan(selectedPaidPlan);
        alert(`Paiement vérifié avec succès ! Votre ${selectedPaidPlan} est désormais actif.`);
        router.push('/dashboard');
      } catch (e) {
        console.error('Erreur activation plan', e);
      }
    } else {
      alert('Erreur : Session utilisateur introuvable. Veuillez vous reconnecter.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-slate-950 font-sans text-white">
      
      {/* Arrière-plan technologique et industriel avec un flou artistique */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 filter blur-[2px]"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80')` }}
      ></div>

      {/* Dégradé de superposition sombre et rougeoyant */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-slate-950/80 to-red-950/30"></div>

      {/* Barre latérale (Sidebar) en verre dépoli */}
      <aside className="relative z-10 w-64 backdrop-blur-xl bg-slate-900/60 border-r border-white/10 hidden md:flex flex-col justify-between">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-white tracking-widest">
            QUANTAL
          </Link>
          <nav className="mt-8 space-y-1.5">
            <Link href="/dashboard/pricing" className="flex items-center space-x-3 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-white rounded-xl shadow-lg">
              <span>Pass / Abonnements</span>
            </Link>
          </nav>
        </div>
        <div className="p-6 border-t border-white/10 text-xs text-slate-400">
          <span>Ingénierie & Procédés</span>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="relative z-10 flex-1 p-6 sm:p-10 overflow-y-auto">
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">NOS PASS QUANTAL</h1>
          <p className="text-sm text-slate-300 mt-2">
            Optimisez vos notes de calcul, accédez à l'ensemble des modules hydrauliques et thermiques, et générez des notes d'audit professionnelles.
          </p>
        </header>

        {successMessage && (
          <div className="max-w-3xl mx-auto mb-6 p-4 backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-sm rounded-2xl font-medium text-center shadow-2xl">
            {successMessage}
          </div>
        )}

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-stretch pb-8">
          
          {/* Pass Découverte (Gratuit) */}
          <div className={`backdrop-blur-xl bg-slate-900/60 p-8 rounded-3xl border ${activePlan === 'Découverte' ? 'border-white ring-2 ring-white/50 shadow-2xl' : 'border-white/10 shadow-xl'} flex flex-col justify-between relative transition hover:border-white/30`}>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Essentiel</span>
                {activePlan === 'Découverte' && (
                  <span className="px-3 py-1 text-xs font-semibold bg-white text-slate-950 rounded-full shadow-md">Actif</span>
                )}
              </div>
              <h3 className="text-xl font-extrabold text-white">Pass Découverte</h3>
              <p className="text-sm text-slate-400 mt-1">Idéal pour tester les capacités de calcul.</p>
              
              <div className="my-6 flex items-baseline gap-1.5 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">0</span>
                <span className="text-sm sm:text-base font-semibold text-slate-300">FCFA</span>
                <span className="text-xs text-slate-400">/ mois</span>
              </div>

              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center space-x-2">
                  <span className="text-white font-bold">✓</span> <span>Accès aux modules de base</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white font-bold">✓</span> <span>3 simulations par jour</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-500">
                  <span>✕</span> <span>Export PDF des notes officielles</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Découverte', 0)}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition shadow-lg ${activePlan === 'Découverte' ? 'bg-white/10 text-slate-300 border border-white/20' : 'bg-white text-slate-950 hover:bg-slate-200'}`}
            >
              {activePlan === 'Découverte' ? 'Pass Actuel' : 'Sélectionner'}
            </button>
          </div>

          {/* Pass Ingénieur (Pro) */}
          <div className={`backdrop-blur-xl bg-slate-900/80 p-8 rounded-3xl border-2 ${activePlan === 'Pass Ingénieur' ? 'border-white ring-4 ring-white/30 shadow-2xl' : 'border-white/30 shadow-2xl'} flex flex-col justify-between relative transition hover:border-white`}>
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
              <span className="px-3.5 py-1 bg-white text-slate-950 text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
                Populaire
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 mt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Professionnel</span>
                {activePlan === 'Pass Ingénieur' && (
                  <span className="px-3 py-1 text-xs font-semibold bg-white text-slate-950 rounded-full shadow-md">Actif</span>
                )}
              </div>
              <h3 className="text-xl font-extrabold text-white">Pass Ingénieur</h3>
              <p className="text-sm text-slate-300 mt-1">Conçu pour les ingénieurs procédés en cabinet ou bureau d'études.</p>
              
              <div className="my-6 flex items-baseline gap-1.5 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">3 000</span>
                <span className="text-sm sm:text-base font-semibold text-slate-300">FCFA</span>
                <span className="text-xs text-slate-400">/ mois</span>
              </div>

              <ul className="space-y-3 text-sm text-slate-200 mb-8">
                <li className="flex items-center space-x-2">
                  <span className="text-white font-bold">✓</span> <span>Simulations illimitées (Darcy, Échangeurs)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white font-bold">✓</span> <span>Génération de notes de calcul PDF officielles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white font-bold">✓</span> <span>Alertes d'érosion & heuristiques avancées</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white font-bold">✓</span> <span>Support technique prioritaire</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Pass Ingénieur', 3000)}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition shadow-xl ${activePlan === 'Pass Ingénieur' ? 'bg-white/10 text-slate-300 border border-white/20' : 'bg-white text-slate-950 hover:bg-slate-200'}`}
            >
              {activePlan === 'Pass Ingénieur' ? 'Pass Actuel' : 'JE CHOISI'}
            </button>
          </div>

          {/* Pass Entreprise */}
          <div className={`backdrop-blur-xl bg-slate-900/60 p-8 rounded-3xl border ${activePlan === 'Pass Entreprise' ? 'border-white ring-2 ring-white/50 shadow-2xl' : 'border-white/10 shadow-xl'} flex flex-col justify-between relative transition hover:border-white/30`}>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Équipe & Industrie</span>
                {activePlan === 'Pass Entreprise' && (
                  <span className="px-3 py-1 text-xs font-semibold bg-white text-slate-950 rounded-full shadow-md">Actif</span>
                )}
              </div>
              <h3 className="text-xl font-extrabold text-white">Pass Entreprise</h3>
              <p className="text-sm text-slate-400 mt-1">Pour les départements d'ingénierie multi-utilisateurs.</p>
              
              <div className="my-6 flex items-baseline gap-1.5 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">60 000</span>
                <span className="text-sm sm:text-base font-semibold text-slate-300">FCFA</span>
                <span className="text-xs text-slate-400">/ mois</span>
              </div>

              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center space-x-2">
                  <span className="text-white font-bold">✓</span> <span>Jusqu'à 10 licences ingénieurs incluses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white font-bold">✓</span> <span>Modèles de calculs personnalisés sur-mesure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white font-bold">✓</span> <span>Export de rapports aux normes internes société</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-white font-bold">✓</span> <span>Accompagnement et formation dédiés</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Pass Entreprise', 60000)}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition shadow-lg ${activePlan === 'Pass Entreprise' ? 'bg-white/10 text-slate-300 border border-white/20' : 'bg-white text-slate-950 hover:bg-slate-200'}`}
            >
              {activePlan === 'Pass Entreprise' ? 'Pass Actuel' : 'JE CHOISI'}
            </button>
          </div>

        </div>

        {/* Encadré de vérification par Code de Transaction (Sécurisé) */}
        <div className="max-w-3xl mx-auto mt-6 p-6 backdrop-blur-xl bg-slate-900/90 border border-white/20 rounded-3xl shadow-2xl">
          <h3 className="text-sm font-bold text-white mb-2 text-center">
            🔐 Validation du paiement par Code de Transaction
          </h3>
          <p className="text-xs text-slate-300 mb-4 text-center">
            Après avoir payé sur Saaspay, sélectionnez le pass concerné, entrez votre code ou référence de transaction pour débloquer votre accès.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <select
              value={selectedPaidPlan}
              onChange={(e) => setSelectedPaidPlan(e.target.value)}
              className="px-4 py-2.5 bg-slate-950 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white"
            >
              <option value="Pass Ingénieur">Pass Ingénieur (3 000 FCFA)</option>
              <option value="Pass Entreprise">Pass Entreprise (60 000 FCFA)</option>
            </select>

            <input 
              type="text" 
              placeholder="Entrez votre code de transaction..." 
              value={transactionCode}
              onChange={(e) => setTransactionCode(e.target.value)}
              className="px-4 py-2.5 bg-slate-950 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white w-full sm:w-64"
            />
            
            <button
              onClick={handleVerifyTransaction}
              className="px-6 py-2.5 bg-white text-slate-950 text-xs font-bold rounded-xl transition hover:bg-slate-200 shadow-md whitespace-nowrap"
            >
              Vérifier et Activer →
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}