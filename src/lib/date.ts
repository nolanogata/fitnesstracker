export const nowIso = () => new Date().toISOString();

const toLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const todayAppDate = (boundaryHour = 3, date = new Date()) => {
  const shifted = new Date(date);
  shifted.setHours(shifted.getHours() - boundaryHour);
  return toLocalDateString(shifted);
};

export const addDays = (dateString: string, days: number) => {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  return toLocalDateString(date);
};

export const dateRange = (start: string, end: string) => {
  const dates: string[] = [];
  for (let day = start; day <= end; day = addDays(day, 1)) {
    dates.push(day);
  }
  return dates;
};

export const formatJapaneseDate = (dateString: string) =>
  new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).format(new Date(`${dateString}T12:00:00`));
