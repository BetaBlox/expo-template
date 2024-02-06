/**
 *
 * @see https://stackoverflow.com/questions/64489395/converting-snake-case-string-to-title-case
 */
export const titleCase = (text: string | null | undefined) => {
  if (!text) {
    return "";
  }

  return text
    .toLowerCase()
    .replaceAll("_", " ")
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};
