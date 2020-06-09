export default (value) => {
  const date = new Date(value);
  return date.toLocaleString(["en-US"], {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hours: "2-digit",
    minute: "2-digit",
  });
};
