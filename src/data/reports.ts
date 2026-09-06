export interface PlatformReport {
  id: string;
  name: string;
  category: string;
  status: "active" | "shutdown" | "restricted";
  statusLabel: string;
  summary: string;
  lender: string;
  feeStructure: string[];
  rollover: string[];
  dataPractice: string[];
  regulatoryStatus: string;
  source: string;
  placeholder?: boolean;
}

export const reports: PlatformReport[] = [
  {
    id: "amazon-pay-later",
    name: "Amazon Pay Later",
    category: "BNPL",
    status: "active",
    statusLabel: "Active, RBI-linked lending partners",
    summary:
      "Amazon acts only as a Loan Service Provider (LSP). The actual credit comes from two RBI-regulated lenders, and Amazon's 2025 acquisition of one of them narrows the gap between platform and lender.",
    lender:
      "Axio (formerly CapFloat), co-lending with Karur Vysya Bank, and IDFC FIRST Bank. Users are assigned to one lender via Amazon's internal allocation after PAN + Aadhaar KYC. In 2025 Amazon acquired Axio, its first ownership stake in an NBFC.",
    feeStructure: [
      "Credit limit up to ₹60,000 for shopping and bills",
      "Zero interest if the monthly bill is paid in full and on time",
      "Optional EMI conversion (3–12 months) carries nominal interest, set by the lending partner",
    ],
    rollover: [
      "Missed or late payment triggers a late fee plus interest, charged by Axio/KVB or IDFC FIRST, not Amazon",
      "Missed payments are reported to credit bureaus (CIBIL/Experian), affecting the user's wider credit score",
      "Recovery and collections are handled by the lending partner, not Amazon support",
    ],
    dataPractice: [
      "KYC data (PAN, Aadhaar) is shared with the assigned lending partner on consent",
      "Under RBI Digital Lending Guidelines, the lender's identity and the all-in-cost APR must be disclosed before EMI conversion",
    ],
    regulatoryStatus:
      "Governed by RBI's Digital Lending Guidelines through its bank/NBFC partners, not Amazon directly. Amazon's acquisition of Axio in 2025 is a structural shift worth watching: it reduces the separation between the shopping platform and the entity legally responsible for the loan.",
    source: "De-Trap platform workflow analysis, 2026",
  },
  {
    id: "simpl",
    name: "Simpl",
    category: "BNPL",
    status: "shutdown",
    statusLabel: "Core checkout halted by RBI order, 25 Sept 2025",
    summary:
      "One of India's earliest BNPL apps, built on a frictionless one-tap checkout and a running \"khata\" ledger. Unlike its peers, Simpl never operated through a licensed bank or NBFC, and that gap is exactly what shut it down.",
    lender:
      "None. Simpl settled directly with merchants itself instead of routing credit through an RBI-regulated bank or NBFC, the structural feature that separated it from peers like Amazon Pay Later or LazyPay.",
    feeStructure: [
      "Instant spending limit from Simpl's own in-house underwriting, no card, password or OTP entry at checkout",
      "Purchases across 26,000+ merchants (Zomato, Swiggy, Zepto, BigBasket, MakeMyTrip) pooled into one running balance",
      "15-day repayment window at zero interest if paid on time",
    ],
    rollover: [
      "Late fees of roughly ₹50 to ₹100 if the 15-day window is missed",
      "Accounts suspended, and merchants notified, until the outstanding balance clears",
    ],
    dataPractice: [
      "Signup required minimal details; spending limits were set by Simpl's proprietary risk model rather than a regulated underwriting process",
    ],
    regulatoryStatus:
      "RBI found Simpl was operating a payment system (payment, clearing, settlement) without the Certificate of Authorisation required under the Payment and Settlement Systems Act, 2007. On 25 September 2025, RBI ordered it to halt those operations immediately. Its one-tap checkout was suspended, about 100 of roughly 220 staff were laid off within a week, and the core product was discontinued. This is the clearest evidence yet of RBI's 2022–2025 effort to close the \"quasi-payment system\" loophole that let BNPL apps lend without a licensed partner.",
    source: "RBI order via The Paypers and AngelOne (Sept 2025); GrabOn and Fintech Singapore India BNPL market reviews (2026); Inventiva BNPL overview (2026)",
  },
  {
    id: "lazypay",
    name: "LazyPay",
    category: "BNPL",
    status: "active",
    statusLabel: "[PLACEHOLDER: verify current status]",
    summary:
      "[PLACEHOLDER: LazyPay is suggested as a worthwhile next platform because, like Amazon Pay Later, it runs on a licensed NBFC (PayU Finance) rather than lending directly, offering a useful contrast case to Simpl's unlicensed model.]",
    lender: "[PLACEHOLDER: confirm current lending partner and NBFC licence details]",
    feeStructure: ["[PLACEHOLDER: source fee structure, interest rate range and processing fees from LazyPay's terms]"],
    rollover: ["[PLACEHOLDER: source late fee and penal interest figures]"],
    dataPractice: ["[PLACEHOLDER: source data collection and sharing practices]"],
    regulatoryStatus: "[PLACEHOLDER: confirm RBI Digital Lending Guidelines compliance status and any enforcement history]",
    source: "[PLACEHOLDER: add sources]",
    placeholder: true,
  },
  {
    id: "kreditbee",
    name: "KreditBee",
    category: "Instant loan app",
    status: "active",
    statusLabel: "[PLACEHOLDER: verify current status]",
    summary:
      "[PLACEHOLDER: KreditBee is suggested because it represents the pure instant-loan-app category (rather than BNPL), useful for contrasting rollover and loan-stacking mechanics against the BNPL cards on this page.]",
    lender: "[PLACEHOLDER: confirm current NBFC lending partners]",
    feeStructure: ["[PLACEHOLDER: source processing fee %, interest rate range and loan tenure]"],
    rollover: ["[PLACEHOLDER: source late fee, penal interest and rollover/extension terms]"],
    dataPractice: ["[PLACEHOLDER: source contact/SMS/photo access permissions and any RBI findings]"],
    regulatoryStatus: "[PLACEHOLDER: confirm compliance status and any consumer complaints on record]",
    source: "[PLACEHOLDER: add sources]",
    placeholder: true,
  },
  {
    id: "slice",
    name: "Slice",
    category: "BNPL / prepaid instrument",
    status: "restricted",
    statusLabel: "[PLACEHOLDER: verify current status]",
    summary:
      "[PLACEHOLDER: Slice is suggested because RBI's June 2022 circular on prepaid payment instruments and credit lines directly reshaped its product, giving a concrete example of a regulator forcing a BNPL model to change rather than shut down entirely.]",
    lender: "[PLACEHOLDER: confirm current bank/NBFC partner post the 2022 PPI circular]",
    feeStructure: ["[PLACEHOLDER: source current fee and interest structure after the product redesign]"],
    rollover: ["[PLACEHOLDER: source late fee and credit reporting terms]"],
    dataPractice: ["[PLACEHOLDER: source data practice details]"],
    regulatoryStatus: "[PLACEHOLDER: confirm how the 2022 RBI PPI/credit-line circular changed Slice's model, and current standing]",
    source: "[PLACEHOLDER: add sources]",
    placeholder: true,
  },
];
