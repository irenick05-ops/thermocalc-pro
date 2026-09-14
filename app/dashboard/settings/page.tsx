'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [environment, setEnvironment] = useState('sandbox');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const savedConfig = localStorage.getItem('quantal_saaspay_config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setPublicKey(config.publicKey || '');
        setSecretKey(config.secretKey || '');
        setEnvironment(config.environment || 'sandbox');
      } catch (e) {
        console.error('Erreur lecture config Saaspay', e);
      }
    }
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const config = { publicKey, secretKey, environment };
    localStorage.setItem('quantal_saaspay_config', JSON.stringify(config));
    setSuccessMsg('Clés API Saaspay enregistrées avec succès !');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Barre latérale */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-black tracking-wider">
            QUANTAL
          </Link>
          <nav className="mt-8 space-y-1.5">
            <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-black rounded-lg transition">
              <span>Tableau de bord</span>
            </Link>
            <Link href="/dashboard/pricing" className="flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-black rounded-lg transition">
              <span>Pass & Abonnements</span>
            </Link>
            <Link href="/dashboard/settings" className="flex items-center space-x-3 px-4 py-2.5 text-sm font-semibold text-white bg-black rounded-lg shadow-sm">
              <span>Paramètres API Saaspay</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <header className="mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900">Intégration Saaspay.me</h1>
            <p className="text-sm text-slate-600 mt-1">
              Configure tes clés API pour encaisser les paiements de tes abonnements et rediriger automatiquement tes utilisateurs vers leur tableau de bord.
            </p>
          </header>

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl font-medium">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSaveConfig} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Clé Publique (Public Key)</label>
              <input
                type="text"
                required
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="pk_live_xxxxxxxxxxxxxxxx"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Clé Secrète (Secret Key)</label>
              <input
                type="password"
                required
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="sk_live_xxxxxxxxxxxxxxxx"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Environnement</label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm bg-white"
              >
                <option value="sandbox">Sandbox (Test)</option>
                <option value="production">Production (Live)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-black text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition shadow-sm"
            >
              Enregistrer la configuration Saaspay
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}