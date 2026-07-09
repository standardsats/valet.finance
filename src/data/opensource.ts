export const ossSection = {
  heading: 'Open source, reproducible, audit-friendly.',
  body: 'Every line that handles your keys is on GitHub. Builds are reproducible — you can verify the APK we ship matches the source you read. Issues are public. Releases are signed.',
  stats: [
    { value: 'Apache License 2.0', label: 'License' },
    { value: 'v5.0.1', label: 'Latest release' },
    { value: 'Testnets', label: 'Testnet3, Testnet4, Regtest' },
  ],
  cta: {
    primary: { label: 'GitHub', href: 'https://github.com/standardsats/valet' },
    secondary: { label: 'Join on Telegram', href: 'https://t.me/StandardSatsCommunity' },
  },
  repoBlock: {
    lines: [
      { type: 'cmd' as const, prefix: '$', text: 'git clone github.com/valet-wallet/valet' },
      { type: 'cmt' as const, text: "# cloning into 'valet'…" },
      { type: 'cmd' as const, prefix: '$', text: './gradlew assembleRelease' },
      { type: 'cmt' as const, text: '# BUILD SUCCESSFUL in 47s' },
      { type: 'cmd' as const, prefix: '$', text: 'sha256sum app-release.apk' },
      { type: 'hash' as const, hash: 'a3f9c7…', ok: '✓ matches release' },
      { type: 'blank' as const },
      { type: 'meta' as const, label: '# Built on:', value: 'IMMORTAN' },
      { type: 'meta' as const, label: '# Network:', value: 'bitcoin · mainnet' },
    ],
  },
};
