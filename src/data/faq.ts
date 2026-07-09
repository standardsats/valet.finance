export const faqSection = {
  heading: 'Things people moving from custodial wallets ask.',
};

export interface FaqItem {
  question: string;
  // HTML string — use set:html in component
  answerHtml: string;
  open?: boolean;
}

export const faqItems: FaqItem[] = [
  {
    question: 'I\'m used to a custodial wallet that "just works." Will Valet feel different?',
    answerHtml:
      'Mostly no. For day-to-day tasks such as receiving, paying invoices, scanning QRs it feels familiar. The difference is in what\'s under the surface. The first time you open the app, Valet helps you open at least one channel so you can receive. After that, it gets out of the way.',
    open: true,
  },
  {
    question: 'What does "non-custodial" actually mean here?',
    answerHtml:
      'Your private keys are generated and stored on your device. Valet has no server that can hold, freeze, or move your funds. There is no shared signer or co-signer. If our domain disappeared tomorrow, you\'d still control everything via your <code>12-word seed</code> and channel backup.',
  },
  {
    question: 'How is this different from Spark-based wallets?',
    answerHtml:
      'Spark-style architectures look non-custodial but rely on a shared operator that co-signs transactions. If that operator is offline, censoring, or compelled, your access changes. Valet runs a real Lightning node locally. There is no operator sitting between you and the network.',
  },
  {
    question: 'What is IMMORTAN?',
    answerHtml:
      'IMMORTAN is the Lightning library Valet is built on. It\'s a fork of Eclair focused on mobile, with extra emphasis on user privacy — trampoline routing, hosted channels, and private routing hints — plus the kind of channel-state handling that lets a phone safely run as a real node.',
  },
  {
    question: 'What happens if I lose my phone?',
    answerHtml:
      'Restore your seed and channel state backup on a new phone. On-chain funds come back from the seed alone. Lightning channels need the latest channel state file (Valet exports these automatically and you can also save them to your own cloud).',
  },
  {
    question: 'Are there fees to Valet?',
    answerHtml:
      'No. Valet is free, open source, and has no vendor lock. You pay Lightning routing fees depending on the routing node you choose and on-chain miner fees.',
  },
  {
    question: 'Can I run my own node and use Valet?',
    answerHtml:
      'Valet <em>is</em> a node. If you already run a public LN node and want a phone client for it, projects like Zeus may be a better fit. If you want sovereignty without running a server, Valet is for you.',
  },
];
