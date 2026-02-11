import type { TDateISO } from "@/types/definitions";

export const formatLocalDate = (iso: TDateISO) =>
  new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
