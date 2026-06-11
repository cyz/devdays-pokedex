export const TYPE_COLORS: Record<string, string> = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  normal: '#A8A878',
};

export const BATCH = 40;

export const GENERATION_RANGES = [
  { gen: 1, label: 'Gen I',   start: 1,   end: 151,  color: '#ef4444', total: 151 },
  { gen: 2, label: 'Gen II',  start: 152,  end: 251,  color: '#f97316', total: 100 },
  { gen: 3, label: 'Gen III', start: 252,  end: 386,  color: '#22c55e', total: 135 },
  { gen: 4, label: 'Gen IV',  start: 387,  end: 493,  color: '#06b6d4', total: 107 },
  { gen: 5, label: 'Gen V',   start: 494,  end: 649,  color: '#8b5cf6', total: 156 },
  { gen: 6, label: 'Gen VI',  start: 650,  end: 721,  color: '#ec4899', total: 72  },
  { gen: 7, label: 'Gen VII', start: 722,  end: 809,  color: '#f59e0b', total: 88  },
  { gen: 8, label: 'Gen VIII',start: 810,  end: 905,  color: '#10b981', total: 96  },
  { gen: 9, label: 'Gen IX',  start: 906,  end: 1025, color: '#3b82f6', total: 120 },
] as const;

export const REPOS = [
  { name: 'vscode',       color: '#007acc' },
  { name: 'copilot',      color: '#6e40c9' },
  { name: 'copilot-chat', color: '#2ea043' },
  { name: 'livepreview',  color: '#0ea5e9' },
  { name: 'distro',       color: '#f97316' },
  { name: 'docs',         color: '#64748b' },
];

export const CAUGHT_THRESHOLD = 645;
export const TOTAL_POKEMON = 1025;

export const TYPE_LABELS: Record<string, string> = {
  normal:   'Normal',  fire:     'Fire',    water:    'Water',
  grass:    'Grass',   electric: 'Elec',    ice:      'Ice',
  fighting: 'Fight',   poison:   'Poison',  ground:   'Ground',
  flying:   'Flying',  psychic:  'Psychic', bug:      'Bug',
  rock:     'Rock',    ghost:    'Ghost',   dragon:   'Dragon',
  dark:     'Dark',    steel:    'Steel',   fairy:    'Fairy',
};

export const ALL_TYPES = [
  'normal','fire','water','grass','electric','ice',
  'fighting','poison','ground','flying','psychic','bug',
  'rock','ghost','dragon','dark','steel','fairy',
];

// TYPE_CHART[attacker index][defender index] = damage multiplier
// Index order matches ALL_TYPES above
// 0=normal, 1=fire, 2=water, 3=grass, 4=electric, 5=ice,
// 6=fighting, 7=poison, 8=ground, 9=flying, 10=psychic, 11=bug,
// 12=rock, 13=ghost, 14=dragon, 15=dark, 16=steel, 17=fairy
export const TYPE_CHART: number[][] = [
  // normal
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1],
  // fire
  [1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
  // water
  [1, 2, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
  // grass
  [1, 0.5, 2, 0.5, 1, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
  // electric
  [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
  // ice
  [1, 0.5, 0.5, 2, 1, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
  // fighting
  [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
  // poison
  [1, 1, 1, 2, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
  // ground
  [1, 2, 1, 0.5, 2, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
  // flying
  [1, 1, 1, 2, 0.5, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
  // psychic
  [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
  // bug
  [1, 0.5, 1, 2, 1, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
  // rock
  [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
  // ghost
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1],
  // dragon
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
  // dark
  [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5, 0.5],
  // steel
  [1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
  // fairy
  [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1],
];
