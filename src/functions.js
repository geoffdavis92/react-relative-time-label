const units = [
  "millisecond",
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "year",
  "quarter"
];

function timeDiff(current, prev) {
  const millisecond = current - prev;
  const second = millisecond / 1000;
  const minute = second / 60;
  const hour = minute / 60;
  const day = hour / 24;
  const week = day / 7;
  const month = week / 4.3;
  const year = month / 12;
  const quarter = year / 4;
  const unitValues = {
    millisecond,
    second,
    minute,
    hour,
    day,
    week,
    month,
    year,
    quarter
  };
  return function diffValueByUnit(unitKey) {
    return unitValues[unitKey];
  };
}

export { timeDiff, units };
