export function formatTimeRange(start: string, end: string): string {
  return `${start}\u2009--\u2009${end}`;
}

export function minutesBetween(start: string, end: string): number {
  const [sh = "0", sm = "0"] = start.split(":");
  const [eh = "0", em = "0"] = end.split(":");
  return (parseInt(eh, 10) - parseInt(sh, 10)) * 60 + (parseInt(em, 10) - parseInt(sm, 10));
}
