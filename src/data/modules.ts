export type InteractiveKind = "none" | "interestCalculator" | "lenderDiagram" | "debtMeter";

export interface ConceptLink {
  text: string;
  href: string;
}

export interface Concept {
  term: string;
  body: string;
  links?: ConceptLink[];
}

export interface CourseModule {
  id: string;
  order: number;
  i18nKey: "m1" | "m2" | "m3" | "m4" | "m5" | "m6";
  intro: string;
  concepts: Concept[];
  interactive: InteractiveKind;
  accent: "gold" | "teal" | "coral";
}

export const modules: CourseModule[] = [
  {
    id: "credit",
    order: 1,
    i18nKey: "m1",
    intro:
      "You have almost certainly borrowed money already — a “pay in 3 parts” checkout, ₹200 off a friend, food ordered now and settled later. This module gives you the three words that describe all of it. Everything else on this site is built on them.",
    concepts: [
      {
        term: "Credit",
        body: "Someone lets you use money now that you do not have yet. Not a gift, not income — a promise with a date attached.",
      },
      {
        term: "Debt",
        body: "The total you owe because you took that credit: what you borrowed, plus everything charged on top. Debt is not evil. Debt you never worked out is.",
      },
      {
        term: "Interest",
        body: "Rent on someone else's money. Charged as a percentage over time — which is why the same loan costs more the longer you hold it.",
      },
    ],
    interactive: "none",
    accent: "gold",
  },
  {
    id: "interest",
    order: 2,
    i18nKey: "m2",
    intro:
      "Two loans can advertise the identical rate and cost you thousands apart. The difference is how that rate is applied — to what you first borrowed, or to what you still owe. Every trap further down this site is built on that difference.",
    concepts: [
      {
        term: "Simple interest",
        body: "Charged only on what you first borrowed. ₹1,000 at 10% for two years costs ₹200. Predictable, straight-line, and increasingly rare.",
      },
      {
        term: "Compound interest",
        body: "Charged on everything you owe, including interest already added. Interest earns its own interest. Over ten years at 24%, ₹10,000 costs ₹34,000 simple — and ₹85,944 compound.",
      },
      {
        term: "Flat vs reducing balance",
        body: "“12% flat” charges you on the full amount for the whole term, even as you repay it. “12% reducing” charges only on what is left. Same headline. Different price. Always.",
      },
    ],
    interactive: "interestCalculator",
    accent: "teal",
  },
  {
    id: "structure",
    order: 3,
    i18nKey: "m3",
    intro:
      "The single most important fact about the app on your phone: it usually is not the lender. Indian regulation splits digital lending into three roles, and knowing which one you are talking to decides whether a complaint lands or gets bounced between two companies forever.",
    concepts: [
      {
        term: "The real lender",
        body: "A bank or NBFC licensed by the RBI — a Regulated Entity. It owns the loan, carries the risk, and is finally answerable for everything done in its name.",
      },
      {
        term: "The app's operator",
        body: "The company that builds the app, markets it, signs you up and often makes the recovery calls. A service provider, not your lender — and it cannot hide behind that.",
      },
      {
        term: "The app itself",
        body: "Just the interface. Every one must be reported to the RBI, so an app you cannot trace back to a licensed lender is a red flag, not a bargain.",
      },
    ],
    interactive: "lenderDiagram",
    accent: "gold",
  },
  {
    id: "manipulation",
    order: 4,
    i18nKey: "m4",
    intro:
      "Most of these products are legal and many are run by licensed lenders. The danger is not that they are criminal — it is that they are engineered, and you are the one who has not read the design. Three patterns do most of the work. Social proof, gamification and shame do the rest.",
    concepts: [
      {
        term: "No friction",
        body: "No forms, no wait, no one asking what it is for. Friction is what makes a person pause. Remove it and you remove the pause.",
      },
      {
        term: "Framing",
        body: "“₹299 a month” instead of “₹3,588 a year plus fees.” Both describe the same product. The first number you see becomes the one you judge everything else against.",
      },
      {
        term: "Present bias",
        body: "The reward is today; the cost is a rumour called “later.” People reliably choose the smaller thing now over the bigger thing later. Instant credit is built on that gap.",
      },
    ],
    interactive: "none",
    accent: "coral",
  },
  {
    id: "redflags",
    order: 5,
    i18nKey: "m5",
    intro:
      "Two skills catch almost everything: turn any fee into a yearly percentage, and check any repayment against what you can actually afford. This module gives you both — and the checklist that tells you when to stop reading and walk away.",
    concepts: [
      {
        term: "The calculation that never fails",
        body: "Borrow ₹2,000 for 15 days, fee ₹100. That is 5% — for 15 days. There are about 24 such periods in a year. 5% × 24 ≈ 122% a year.",
      },
      {
        term: "Red flags",
        body: "No Key Fact Statement. No lender name anywhere. Money into a wallet instead of your bank. Requests for contacts or photos. Automatic limit increases. One deserves caution. Three means walk.",
      },
      {
        term: "The Personal Debt Ceiling",
        body: "Stable monthly income × a conservative safety factor, minus what you already owe each month. One rupee figure. Every new instalment gets checked against it before you agree, not after.",
      },
    ],
    interactive: "debtMeter",
    accent: "coral",
  },
  {
    id: "recovery",
    order: 6,
    i18nKey: "m6",
    intro:
      "Borrowing to repay is the trap closing. If that has already happened, this is the module that matters: what to stop doing today, what your rights actually are, and exactly who to contact. None of it costs anything.",
    concepts: [
      {
        term: "Stop the stacking",
        body: "App B to pay App A, then App C to pay App B — each one pricier, because each is lending to someone visibly in trouble. The moment you borrow to repay, stop.",
      },
      {
        term: "What they may never do",
        body: "Call before 8 a.m. or after 7 p.m. Contact your family, friends or classmates about your debt. Threaten, shame or send fake legal notices. All of it is already illegal.",
      },
      {
        term: "Where to go",
        body: "Screenshot everything. Tell one adult today. Complain to the lender's Grievance Officer. Escalate at cms.rbi.org.in. For threats or blackmail: cybercrime.gov.in, or call 1930.",
        links: [
          { text: "cms.rbi.org.in", href: "https://cms.rbi.org.in" },
          { text: "cybercrime.gov.in", href: "https://cybercrime.gov.in" },
          { text: "1930", href: "tel:1930" },
        ],
      },
    ],
    interactive: "none",
    accent: "teal",
  },
];

export const debtMeterStatements: { text: string; points: number }[] = [
  { text: "I owe money to someone right now, an app, a shop, a friend, that I have not fully repaid.", points: 2 },
  { text: "I do not know the exact total I owe today, to the rupee.", points: 2 },
  { text: "I have been late on a repayment at least once.", points: 2 },
  { text: "I do not know the % per year cost of anything I have borrowed.", points: 2 },
  { text: "If a ₹2,000 emergency hit tomorrow, I would have to borrow to cover it.", points: 2 },
  { text: "I have hidden a debt or a purchase from my family.", points: 3 },
  { text: "Someone has contacted me more than once about money I owe.", points: 3 },
  { text: "I have borrowed from one place to pay another.", points: 4 },
];
