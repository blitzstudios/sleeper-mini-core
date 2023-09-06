const SHARED = {
  INTER_REGULAR: 'Inter-Regular',
  INTER_MEDIUM: 'Inter-Medium',
  INTER_SEMIBOLD: 'Inter-SemiBold',
  INTER_BOLD: 'Inter-Bold',
  INTER_BLACK: 'Inter-Black',

  POPPINS_REGULAR: 'Poppins-Regular',
  POPPINS_MEDIUM: 'Poppins-Medium',
  POPPINS_SEMIBOLD: 'Poppins-SemiBold',
  POPPINS_BOLD: 'Poppins-Bold',
  POPPINS_BLACK: 'Poppins-Black',
  POPPINS_EXTRABOLD: 'Poppins-ExtraBold',

  OSWALD_MEDIUM: 'Oswald-Medium',
  OSWALD_BOLD: 'Oswald-Bold',
} as const;

const Fonts = {
  DRUK_SUPERITALIC: 'Druk-SuperItalic',
  DRUK_REGULAR: 'Druk-Medium',
  CHANEY_EXTENDED: 'Chaney-Extended',

  ...SHARED,

  Styles: {
    H1: {
      fontFamily: SHARED.POPPINS_EXTRABOLD,
      fontSize: 32,
    },
    H2: {
      fontFamily: SHARED.POPPINS_EXTRABOLD,
      fontSize: 28,
    },
    H3: {
      fontFamily: SHARED.POPPINS_BOLD,
      fontSize: 24,
    },
    H4: {
      fontFamily: SHARED.POPPINS_BOLD,
      fontSize: 20,
    },
    Title: {
      fontFamily: SHARED.POPPINS_SEMIBOLD,
      fontSize: 18,
    },
    Subhead: {
      fontFamily: SHARED.POPPINS_SEMIBOLD,
      fontSize: 16,
    },
    Menu: {
      fontFamily: SHARED.POPPINS_SEMIBOLD,
      fontSize: 12,
      letterSpacing: 0.5,
    },
    ButtonLarge: {
      fontFamily: SHARED.POPPINS_SEMIBOLD,
      fontSize: 14,
      letterSpacing: 1,
    },
    ButtonXLarge: {
      fontFamily: SHARED.POPPINS_SEMIBOLD,
      fontSize: 16,
      letterSpacing: 1,
    },
    ButtonSmall: {
      fontFamily: SHARED.POPPINS_SEMIBOLD,
      fontSize: 12,
      letterSpacing: 1,
    },
    TextCtaLarge: {
      fontFamily: SHARED.POPPINS_SEMIBOLD,
      fontSize: 14,
      letterSpacing: 1,
    },
    TextCtaSmall: {
      fontFamily: SHARED.POPPINS_SEMIBOLD,
      fontSize: 12,
      letterSpacing: 1,
    },
    Body1: {
      fontFamily: SHARED.INTER_REGULAR,
      fontSize: 16,
      letterSpacing: -0.15,
    },
    Body1Bold: {
      fontFamily: SHARED.INTER_SEMIBOLD,
      fontSize: 16,
      letterSpacing: -0.15,
    },
    Body2: {
      fontFamily: SHARED.INTER_REGULAR,
      fontSize: 14,
      letterSpacing: -0.25,
    },
    Body2Bold: {
      fontFamily: SHARED.INTER_SEMIBOLD,
      fontSize: 14,
      letterSpacing: -0.25,
    },
    Body3: {
      fontFamily: SHARED.INTER_REGULAR,
      fontSize: 12,
      letterSpacing: -0.15,
    },
    Body3Bold: {
      fontFamily: SHARED.INTER_SEMIBOLD,
      fontSize: 12,
      letterSpacing: -0.25,
    },
    Caption1: {
      fontFamily: SHARED.INTER_REGULAR,
      fontSize: 10,
      letterSpacing: -0.25,
    },
    Caption1Bold: {
      fontFamily: SHARED.INTER_BOLD,
      fontSize: 10,
      letterSpacing: -0.15,
    },
    Overline: {
      fontFamily: SHARED.POPPINS_BOLD,
      fontSize: 10,
      letterSpacing: 0.25,
    },
    Footnote: {
      fontFamily: SHARED.INTER_REGULAR,
      fontSize: 9,
      letterSpacing: -0.25,
    },
    FootnoteBold: {
      fontFamily: SHARED.INTER_BOLD,
      fontSize: 9,
      letterSpacing: -0.25,
    },
  },
} as const;

export default Fonts;
