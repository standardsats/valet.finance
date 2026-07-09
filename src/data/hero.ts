export const hero = {
  headline: {
    pre: 'A Lightning wallet that',
    em: 'serves only you.',
  },
  lede: 'Valet runs a real Lightning node in your pocket. No custodian, no vendor lock-in, no “Lightning-flavored” intermediary holding your keys behind a friendly UI. Your sats, your channels, your peers.',
  cta: {
    primary: { label: 'Download from GitHub', href: 'https://github.com/standardsats/valet/releases' },
    secondary: { label: 'Get on F-Droid', href: 'https://f-droid.org/packages/finance.valet' },
  },
  phones: [
    {
      position: 'left' as const,
      src: '/assets/screen-channels.png',
      alt: 'Lightning channels view',
    },
    {
      position: 'center' as const,
      src: '/assets/screen-home.png',
      alt: 'Valet home screen',
    },
    {
      position: 'right' as const,
      src: '/assets/screen-receive.png',
      alt: 'Receive Lightning invoice',
    },
  ],
};
