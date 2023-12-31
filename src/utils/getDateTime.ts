export const getDateTime = (time: number) => {
  const options = {
    year: "numeric" as const,
    month: "numeric" as const,
    day: "numeric" as const,
    hour: "numeric" as const,
    minute: "numeric" as const,
    second: "numeric" as const,
    hour12: false,
    timeZone: "America/Los_Angeles" as const,
  };

  return new Intl.DateTimeFormat(undefined, options).format(time * 1000);
};
