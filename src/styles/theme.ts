const Theme = {
  name: 'dark',

  backgroundBase: '#030616',
  backgroundDark: '#15182d',
  backgroundCard: '#252942',
  backgroundIce: '#fbfbfb',
  backgroundWhite: '#ffffff',

  primaryText: '#ffffff',
  secondaryText: '#a3bbd3', // gray300

  gray100: '#eef2f7',
  gray200: '#D8DEED',
  gray300: '#A3B1D3',
  gray400: '#60648C',
  gray500: '#414566',
  gray600: '#343855',

  aqua: '#00baff',
  blue: '#046ae0',
  cypress: '#019494',
  green: '#45e8a7',
  lavender: '#b8bfff',
  lilac: '#bd66ff',
  mint: '#00ceb8',
  orange: '#ff5c00',
  pink: '#ff7db6',
  purple: '#6e7df5',
  red: '#ff2b6d',
  salmon: '#ff6086',
  yam: '#8e66ff',
  yellow: '#ffae58',
  white: '#ffffff',
  black: '#000000',
  dark: '#022047',

  gradients: {
    // The `LinearGradient` component explicitly expects an array of color string, so casting in advance.
    primary: ['#4ce2a7', '#00b7b3'] as string[],
    success: ['#4ce2b8', '#07c5ff'] as string[],
    cheer: ['#ffaa7f', '#ff3a6e'] as string[],
    alert: ['#ffae58', '#ff4542'] as string[],
    purple: ['#89a5fb', '#635ee4'] as string[],
    lilac: ['#db84ff', '#9139ff'] as string[],
    blue: ['#7cdaf9', '#5e73e4'] as string[],
    gray: ['#e6effa', '#a3bbd3'] as string[],
    darkgray: ['#a3bbd3', '#3a465b'] as string[],
    background: ['#55609f', '#101c5a'] as string[],
  },

  getColorForSport(sport: string) {
    if (sport === 'cbb') {
      return Theme.orange;
    }

    if (sport === 'nba') {
      return Theme.yellow;
    }

    if (sport === 'lcs' || sport === 'lol') {
      return Theme.aqua;
    }

    return Theme.mint;
  },
} as const;

export default Theme;
