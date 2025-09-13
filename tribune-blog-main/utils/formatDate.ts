export function formatIsoDate(isoString: string): string {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}
