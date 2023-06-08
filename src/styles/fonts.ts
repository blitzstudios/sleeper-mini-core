const SHARED = {
  INTER_EXTRALIGHT: 'Inter-ExtraLight',
  INTER_THIN: 'Inter-Thin',
  INTER_LIGHT: 'Inter-Light',
  INTER_REGULAR: 'Inter-Regular',
  INTER_MEDIUM: 'Inter-Medium',
  INTER_SEMIBOLD: 'Inter-SemiBold',
  INTER_BOLD: 'Inter-Bold',
  INTER_BLACK: 'Inter-Black',
  INTER_EXTRABOLD: 'Inter-ExtraBold',

  POPPINS_THIN: 'Poppins-Thin',
  POPPINS_LIGHT: 'Poppins-Light',
  POPPINS_REGULAR: 'Poppins-Regular',
  POPPINS_MEDIUM: 'Poppins-Medium',
  POPPINS_SEMIBOLD: 'Poppins-SemiBold',
  POPPINS_BOLD: 'Poppins-Bold',
  POPPINS_BLACK: 'Poppins-Black',
  POPPINS_EXTRABOLD: 'Poppins-ExtraBold',
} as const;

const Fonts = {
  THIN: 'Lato-Thin',
  LIGHT: 'Lato-Light',
  REGULAR: 'Lato-Regular',
  MEDIUM: 'Lato-Medium',
  BOLD: 'Lato-Bold',
  HEAVY: 'Lato-Heavy',
  BLACK: 'Lato-Black',

  MULI_THIN: 'Muli-ExtraLight',
  MULI_LIGHT: 'Muli-Light',
  MULI_REGULAR: 'Muli-Regular',
  MULI_MEDIUM: 'Muli-SemiBold',
  MULI_BOLD: 'Muli-Bold',
  MULI_BLACK: 'Muli-Black',
  MULI_EXTRABOLD: 'Muli-ExtraBold',

  OSWALD__EXTRA_LIGHT: 'Oswald-ExtraLight',
  OSWALD_LIGHT: 'Oswald-Light',
  OSWALD_REGULAR: 'Oswald-Regular',
  OSWALD_MEDIUM: 'Oswald-Medium',
  OSWALD_SEMIBOLD: 'Oswald-SemiBold',
  OSWALD_BOLD: 'Oswald-Bold',

  DRUK_SUPERITALIC: 'Druk-SuperItalic',
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
  },
} as const;

export default Fonts;
