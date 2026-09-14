// lib/limits.ts

export function checkSimulationQuota(): { allowed: boolean; message?: string; remaining: number } {
  // Récupérer le plan utilisateur ('free' par défaut)
  const userPlan = localStorage.getItem('quantal_user_plan') === 'pro' ? 'pro' : 'free';
  
  // Si l'utilisateur est Pro, accès illimité
  if (userPlan === 'pro') {
    return { allowed: true, remaining: 999 };
  }

  // Gestion de la date du jour (format YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  const usageDataStr = localStorage.getItem('quantal_daily_usage');
  
  let usage = usageDataStr ? JSON.parse(usageDataStr) : { date: today, count: 0 };

  // Si on a changé de jour, on remet le compteur à zéro
  if (usage.date !== today) {
    usage = { date: today, count: 0 };
  }

  const MAX_FREE_SIMULATIONS = 3;
  const remaining = MAX_FREE_SIMULATIONS - usage.count;

  if (usage.count >= MAX_FREE_SIMULATIONS) {
    return {
      allowed: false,
      message: "Vous avez atteint votre limite de 3 simulations gratuites pour aujourd'hui. Passez au plan Pro pour un accès illimité.",
      remaining: 0
    };
  }

  return { allowed: true, remaining };
}

export function incrementSimulationCount() {
  const today = new Date().toISOString().split('T')[0];
  const usageDataStr = localStorage.getItem('quantal_daily_usage');
  let usage = usageDataStr ? JSON.parse(usageDataStr) : { date: today, count: 0 };

  if (usage.date !== today) {
    usage = { date: today, count: 0 };
  }

  usage.count += 1;
  localStorage.setItem('quantal_daily_usage', JSON.stringify(usage));
}