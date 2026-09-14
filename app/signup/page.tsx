'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const savedUsers = JSON.parse(localStorage.getItem('quantal_users') || '[]');
    const userExists = savedUsers.find((u: any) => u.email === email);

    if (userExists) {
      setError('Un compte est déjà associé à cet email. Veuillez vous connecter.');
    } else {
      const newUser = { name, email, password };
      savedUsers.push(newUser);
      localStorage.setItem('quantal_users', JSON.stringify(savedUsers));
      localStorage.setItem('quantal_current_user', JSON.stringify(newUser));
      router.push('/dashboard/pricing');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 font-sans">
      
      {/* Arrière-plan technologique et industriel avec un flou artistique */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 filter blur-[2px]"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80')` }}
      ></div>

      {/* Dégradé de superposition sombre et rougeoyant */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-slate-950/80 to-red-950/40"></div>

      {/* Barre de navigation supérieure transparente */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-black tracking-widest text-white">
          QUANTAL
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/" className="hover:text-white transition">About</Link>
          <Link href="/" className="hover:text-white transition">Blog</Link>
          <Link href="/" className="hover:text-white transition">Pages</Link>
          <Link href="/" className="hover:text-white transition">Contact</Link>
        </nav>
        <div className="flex items-center space-x-6">
          <span className="text-xs text-slate-300 cursor-pointer hover:text-white">Français ▾</span>
          <Link href="/login" className="text-xs font-semibold text-white px-4 py-2">
            Se connecter
          </Link>
          <Link href="/signup" className="bg-white text-slate-950 px-5 py-2 rounded-full text-xs font-bold hover:bg-slate-200 transition shadow-lg">
            S'inscrire
          </Link>
        </div>
      </header>

      {/* Contenu principal centré avec la carte d'inscription */}
      <div className="relative z-10 w-full max-w-md mx-4 sm:mx-auto mt-16">
        <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl text-white">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Créer un compte<br />
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 text-red-200 text-xs rounded-xl font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3.5 text-white placeholder-slate-400 focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-sm transition"
                  placeholder="Nom complet"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3.5 text-white placeholder-slate-400 focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-sm transition"
                  placeholder="Email professionnel"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3.5 text-white placeholder-slate-400 focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-sm transition"
                  placeholder="Mot de passe"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 focus:outline-none transition"
              >
                S'inscrire
              </button>
            </div>
          </form>

          

          

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              Déjà un compte ?{' '}
              <Link href="/login" className="font-semibold text-white hover:underline">
                Se connecter
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}