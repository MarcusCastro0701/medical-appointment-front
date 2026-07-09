const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(isoDate: string): string {
  return formatter.format(new Date(isoDate));
}

const appointmentFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/** Full weekday + date + time, used where the year matters (e.g. an appointments list). */
export function formatAppointmentDate(isoDate: string): string {
  return appointmentFormatter.format(new Date(isoDate));
}
