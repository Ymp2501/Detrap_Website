export interface GuideItem {
  id: string;
  key: "workbook" | "legal" | "complete";
  pages: number | null;
  fileHref: string;
  fileIsPlaceholder: boolean;
  accent: "gold" | "teal" | "coral";
}

export const guides: GuideItem[] = [
  {
    id: "workbook",
    key: "workbook",
    pages: 12,
    fileHref: "/pdfs/the-debt-trap-workbook.pdf",
    fileIsPlaceholder: false,
    accent: "gold",
  },
  {
    id: "legal",
    key: "legal",
    pages: 9,
    fileHref: "/pdfs/government-schemes-legal-reference.pdf",
    fileIsPlaceholder: false,
    accent: "teal",
  },
  {
    id: "complete",
    key: "complete",
    pages: 27,
    fileHref: "/pdfs/the-debt-trap-complete-guide.pdf",
    fileIsPlaceholder: false,
    accent: "coral",
  },
];
