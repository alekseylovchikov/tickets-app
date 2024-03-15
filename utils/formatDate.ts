export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) => {
  return date.toLocaleDateString("ru-RU", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
    ...options,
  });
};
