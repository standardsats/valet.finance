export const sovereigntySection = {
  heading: 'Most "Lightning" wallets aren\'t Lightning at all.',
  lede: 'A new generation of wallets has quietly outsourced the hard parts — channels, peers, liquidity — to a single backend you didn\'t choose and can\'t see. The interface looks like Lightning. The trust model is a bank.',
};

export interface SovCell {
  tag: string;
  tagType: 'good' | 'bad';
  title: string;
  body: string;
}

export const sovereigntyCells: SovCell[] = [
  {
    tag: 'Custodial & vendor-locked',
    tagType: 'bad',
    title: 'Their server, their rules.',
    body: 'Funds sit in a pooled account run by the wallet company. Withdrawals can be paused. Accounts can be frozen. The app is a thin client over someone else\'s ledger.',
  },
  {
    tag: 'Obfuscated custody (Spark-style)',
    tagType: 'bad',
    title: '"Self-custodial" with an asterisk.',
    body: 'Newer architectures share signing with an operator. If that operator vanishes, cooperates with a court order, or just rate-limits you, your "non-custodial" balance becomes complicated.',
  },
  {
    tag: 'Valet',
    tagType: 'good',
    title: 'An actual Lightning node.',
    body: 'Your phone opens channels, gossips on the network, and signs every payment locally. No intermediary, no shared signers, no "our backend." If we shut down tomorrow, your sats keep working.',
  },
  {
    tag: 'Valet',
    tagType: 'good',
    title: 'Keys never leave the device.',
    body: '12 words. Encrypted at rest. Optional biometric unlock. Channel state is yours to back up — locally, to your own cloud, or both.',
  },
];
