export const toWordCase = (str?: string) => {
  if (!str) return "";

  const words = str.split(/[\s-]+/);

  const capitalizedWords = words.map((word) => {
    if (word.length === 0) return "";

    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
};
