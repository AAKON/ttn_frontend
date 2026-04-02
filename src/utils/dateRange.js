const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const parseDateValue = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const rawValue = String(value).trim();
  if (!rawValue) return null;

  const dateOnlyMatch = rawValue.match(DATE_ONLY_PATTERN);
  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    const localDate = new Date(Number(year), Number(month) - 1, Number(day));
    return Number.isNaN(localDate.getTime()) ? null : localDate;
  }

  const date = new Date(rawValue);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const getDateTimestamp = (value) => {
  const date = parseDateValue(value);
  return date ? date.getTime() : null;
};

export const formatDateRange = (startDate, endDate) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formatSingleDate = (value) => {
    if (!value) return null;

    const rawValue = String(value).trim();
    if (!rawValue) return null;

    const date = parseDateValue(rawValue);
    return date ? formatter.format(date) : rawValue;
  };

  const formattedStart = formatSingleDate(startDate);
  const formattedEnd = formatSingleDate(endDate);

  if (formattedStart && formattedEnd) {
    return `${formattedStart} - ${formattedEnd}`;
  }

  return formattedStart || formattedEnd || "Date not available";
};
