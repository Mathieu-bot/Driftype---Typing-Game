// Badge configuration
export const badgeConfig = {
  specialBadges: [
    {
      id: 'special_perfectionist',
      name: { en: 'The Perfectionist', fr: 'Le Perfectionniste' },
      description: { en: '100% accuracy at 70+ WPM', fr: '100% de précision à 70+ MPM' },
      icon: 'fa-solid fa-gem',
      color: 'rainbow',
      animated: true,
      check: (stats) => stats.accuracy === 100 && stats.wpm >= 70
    },
    {
      id: 'special_machine',
      name: { en: 'Human Typewriter', fr: 'Machine Humaine' },
      description: { en: '90+ WPM with 95% consistency', fr: '90+ MPM avec 95% de constance' },
      icon: 'fa-solid fa-microchip',
      color: 'rainbow',
      animated: true,
      check: (stats) => stats.wpm >= 90 && stats.consistency >= 95
    },
    {
      id: 'special_legend',
      name: { en: 'Living Legend', fr: 'Légende Vivante' },
      description: { en: '120+ WPM with 98% accuracy', fr: '120+ MPM avec 98% de précision' },
      icon: 'fa-solid fa-dragon',
      color: 'rainbow',
      animated: true,
      check: (stats) => stats.wpm >= 120 && stats.accuracy >= 98
    },
    {
      id: 'special_number_legend',
      name: { en: 'Number Legend', fr: 'Légende des Nombres' },
      description: { en: '130+ WPM with 100% accuracy in Numbers Mode', fr: '130+ MPM avec 100% de précision en mode Nombres' },
      icon: 'fa-solid fa-hashtag',
      color: 'rainbow',
      animated: true,
      check: (stats) => stats.type === 'numbers' && stats.wpm >= 130 && stats.accuracy === 100
    }
  ],
  categories: {
    speed: {
      icon: 'fa-solid fa-gauge-high',
      name: { en: 'Speed', fr: 'Vitesse' },
      color: '#f59e0b',
      levels: [
        {
          id: 'speed_beginner',
          name: { en: 'Quick Beginner', fr: 'Débutant Rapide' },
          description: { en: 'Reach 30 WPM', fr: 'Atteindre 30 MPM' },
          icon: 'fa-brands fa-wpbeginner',
          threshold: 30,
          color: 'bronze',
          check: (stats) => stats.wpm >= 30
        },
        {
          id: 'speed_intermediate',
          name: { en: 'Intermediate Typist', fr: 'Dactylographe Intermédiaire' },
          description: { en: 'Reach 50 WPM', fr: 'Atteindre 50 MPM' },
          icon: 'fa-brands fa-medium',
          threshold: 50,
          color: 'silver',
          check: (stats) => stats.wpm >= 50
        },
        {
          id: 'speed_advanced',
          name: { en: 'Advanced Typist', fr: 'Dactylographe Avancé' },
          description: { en: 'Reach 70 WPM', fr: 'Atteindre 70 MPM' },
          icon: 'fa-solid fa-horse',
          threshold: 70,
          color: 'gold',
          check: (stats) => stats.wpm >= 70
        },
        {
          id: 'speed_expert',
          name: { en: 'Speed Expert', fr: 'Expert de la Vitesse' },
          description: { en: 'Reach 90 WPM', fr: 'Atteindre 90 MPM' },
          icon: 'fa-solid fa-bolt',
          threshold: 90,
          color: 'diamond',
          check: (stats) => stats.wpm >= 90
        }
      ]
    },
    mastery: {
      icon: 'fa-solid fa-crown',
      name: { en: 'Mastery', fr: 'Maîtrise' },
      color: '#8b5cf6',
      levels: [
        {
          id: 'mastery_beginner',
          name: { en: 'Rising Star', fr: 'Étoile Montante' },
          description: { en: '50+ WPM with 90% accuracy', fr: '50+ MPM avec 90% de précision' },
          icon: 'fa-solid fa-star',
          threshold: 50,
          color: 'bronze',
          check: (stats) => stats.wpm >= 50 && stats.accuracy >= 90
        },
        {
          id: 'mastery_intermediate',
          name: { en: 'Typing Virtuoso', fr: 'Virtuose du Clavier' },
          description: { en: '80+ WPM with 95% accuracy', fr: '80+ MPM avec 95% de précision' },
          icon: 'fa-solid fa-fire',
          threshold: 80,
          color: 'gold',
          check: (stats) => stats.wpm >= 80 && stats.accuracy >= 95
        },
        {
          id: 'mastery_expert',
          name: { en: 'Keyboard Legend', fr: 'Légende du Clavier' },
          description: { en: '100+ WPM with 98% accuracy', fr: '100+ MPM avec 98% de précision' },
          icon: 'fa-solid fa-crown',
          threshold: 100,
          color: 'rainbow',
          animated: true,
          check: (stats) => stats.wpm >= 100 && stats.accuracy >= 98
        },
        {
          id: 'mastery_ultimate',
          name: { en: 'Ultimate Master', fr: 'Maître Ultime' },
          description: { en: '150+ WPM with 100% accuracy', fr: '150+ MPM avec 100% de précision' },
          icon: 'fa-solid fa-medal',
          threshold: 150,
          color: 'rainbow',
          animated: true,
          check: (stats) => stats.wpm >= 150 && stats.accuracy === 100
        }
      ]
    },
    accuracy: {
      icon: 'fa-solid fa-bullseye',
      name: { en: 'Accuracy', fr: 'Précision' },
      color: '#10b981',
      levels: [
        {
          id: 'accuracy_precise',
          name: { en: 'Perfect Accuracy', fr: 'Précision Parfaite' },
          description: { en: 'Achieve 100% accuracy', fr: 'Obtenir 100% de précision' },
          icon: 'fa-solid fa-bullseye',
          threshold: 100,
          color: 'diamond',
          check: (stats) => stats.accuracy === 100
        },
        {
          id: 'accuracy_expert',
          name: { en: 'Accuracy Expert', fr: 'Expert en Précision' },
          description: { en: 'Achieve over 98% accuracy', fr: 'Obtenir plus de 98% de précision' },
          icon: 'fa-solid fa-crosshairs',
          threshold: 98,
          color: 'gold',
          check: (stats) => stats.accuracy >= 98
        }
      ]
    },
    consistency: {
      icon: 'fa-solid fa-equals',
      name: { en: 'Consistency', fr: 'Constance' },
      color: '#3b82f6',
      levels: [
        {
          id: 'consistency_master',
          name: { en: 'Consistency Master', fr: 'Maître de la Constance' },
          description: { en: 'Achieve consistency above 90%', fr: 'Obtenir une constance supérieure à 90%' },
          icon: 'fa-solid fa-equals',
          threshold: 90,
          color: 'gold',
          check: (stats) => stats.consistency >= 90
        },
        {
          id: 'consistency_perfect',
          name: { en: 'Perfect Consistency', fr: 'Constance Parfaite' },
          description: { en: 'Achieve 100% consistency', fr: 'Obtenir 100% de constance' },
          icon: 'fa-solid fa-equals',
          threshold: 100,
          color: 'diamond',
          check: (stats) => stats.consistency === 100
        }
      ]
    },
    endurance: {
      icon: 'fa-solid fa-dumbbell',
      name: { en: 'Endurance', fr: 'Endurance' },
      color: '#ec4899',
      levels: [
        {
          id: 'endurance_beginner',
          name: { en: 'Persistent', fr: 'Persistant' },
          description: { en: 'Complete a 3-minute test', fr: 'Compléter un test de 3 minutes' },
          icon: 'fa-solid fa-hourglass-start',
          threshold: 180,
          color: 'bronze',
          check: (stats) => stats.time_taken >= 180
        },
        {
          id: 'endurance_intermediate',
          name: { en: 'Marathon Runner', fr: 'Marathonien' },
          description: { en: 'Complete a 5-minute test at 60+ WPM', fr: 'Compléter un test de 5 minutes à 60+ MPM' },
          icon: 'fa-solid fa-person-running',
          threshold: 300,
          color: 'gold',
          check: (stats) => stats.time_taken >= 300 && stats.wpm >= 60
        },
        {
          id: 'endurance_master',
          name: { en: 'Ultra Marathon', fr: 'Ultra Marathon' },
          description: { en: 'Complete a 10-minute test at 70+ WPM', fr: 'Compléter un test de 10 minutes à 70+ MPM' },
          icon: 'fa-solid fa-medal',
          threshold: 600,
          color: 'rainbow',
          animated: true,
          check: (stats) => stats.time_taken >= 600 && stats.wpm >= 70
        }
      ]
    }
  },
};

// Badge management
export const badgeManager = {
  getUserBadges: (userId) => {
    const stored = localStorage.getItem(`badges_${userId}`);
    return stored ? JSON.parse(stored) : { badges: [], lastUpdate: Date.now() };
  },

  saveBadges: (userId, badges) => {
    localStorage.setItem(`badges_${userId}`, JSON.stringify({
      badges,
      lastUpdate: Date.now()
    }));
  },

  unlockBadge: (userId, badgeId) => {
    const userData = badgeManager.getUserBadges(userId);
    if (!userData.badges.includes(badgeId)) {
      userData.badges.push(badgeId);
      badgeManager.saveBadges(userId, userData.badges);
      const badge = getBadgeById(badgeId);
      if (badge) {
        badgeNotifier.notify(badge);
      }
    }
  }
};

// Badge notification system
export const badgeNotifier = {
  notify: (badge, language = 'en') => {
    Toastify({
      text: `🏆 ${language === 'en' ? 'New badge unlocked' : 'Nouveau badge débloqué'}: ${badge.name[language]}!`,
      duration: 5000,
      gravity: 'top',
      position: 'right',
      style: {
        borderRadius: '20px',
        background: 'linear-gradient(to right, #f59e0b, #d97706)',
      }
    }).showToast();
  }
};

// Helper function to get badge by ID
export const getBadgeById = (badgeId) => {
  for (const category of Object.values(badgeConfig.categories)) {
    const badge = category.levels.find(level => level.id === badgeId);
    if (badge) return badge;
  }
  return null;
};

// Check for new badges based on stats
export const checkBadges = (userId, stats) => {
  const unlockedBadges = [];
  
  Object.values(badgeConfig.categories).forEach(category => {
    category.levels.forEach(badge => {
      if (badge.check && badge.check(stats)) {
        badgeManager.unlockBadge(userId, badge.id);
        unlockedBadges.push(badge.id);
      }
    });
  });
  
  return unlockedBadges;
};
