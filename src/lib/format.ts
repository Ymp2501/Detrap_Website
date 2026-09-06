export function formatNumber(value: number, lang: string): string {
  const locale = lang === "hi" ? "hi-IN" : "en-IN";
  return new Intl.NumberFormat(locale).format(value);
}

export function formatINR(value: number, lang: string): string {
  const locale = lang === "hi" ? "hi-IN" : "en-IN";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, lang: string, fractionDigits = 0): string {
  const locale = lang === "hi" ? "hi-IN" : "en-IN";
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100);
}

export function formatDate(date: Date, lang: string): string {
  const locale = lang === "hi" ? "hi-IN" : "en-IN";
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(date);
}
