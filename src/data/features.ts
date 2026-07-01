export const featuresSection = {
  heading: 'Powered by IMMORTAN. Quietly serious about privacy.',
  lede: 'Valet is built on IMMORTAN, a Lightning library written for users who care what their wallet actually does. It brings privacy features Lightning users used to give up — and on-chain controls power users used to need a desktop wallet for.',
};

export interface ChannelRow {
  peer: string;
  fill: number; // percentage 0–100
  amount: string;
}

export interface Feature {
  num: string;
  title: string;
  body: string;
  viz?: 'utxo' | 'channels';
  channels?: ChannelRow[];
}

export const features: Feature[] = [
  {
    num: '01 / Coin control',
    title: 'Choose which coins to spend.',
    body: 'Pick the exact UTXOs that fund a transaction. Keep labelled stacks separate. The kind of control desktop wallets brag about — on a phone.',
    viz: 'utxo',
  },
  {
    num: '02 / Real channels',
    title: 'You see your channels. All of them.',
    body: 'Open and close on your terms, with peers you choose. Inbound liquidity, fees, channel state — surfaced, not hidden behind "balance."',
    viz: 'channels',
    channels: [
      { peer: '02cd 1b7b…', fill: 72, amount: '412k' },
      { peer: '03ef 9a2c…', fill: 38, amount: '180k' },
      { peer: '02ab 44d1…', fill: 55, amount: '260k' },
      { peer: '+ peer',      fill: 18, amount: '62k' },
    ],
  },
  {
    num: '03 / No reuse',
    title: 'Address reuse, avoided.',
    body: 'Every receive surfaces a fresh address. Old ones expire. Your on-chain history stops being a heatmap.',
  },
  {
    num: '04 / Routing privacy',
    title: 'Trampoline + private hops.',
    body: 'Pay without leaking your full path. Trampoline routing, ephemeral channels, no "LSP knows everything" tax.',
  },
  {
    num: '05 / Yours to back up',
    title: 'Backups that work offline.',
    body: '12-word seed plus encrypted channel-state files. Restore on a new phone in minutes, no servers consulted.',
  },
];
