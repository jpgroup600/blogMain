export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace spaces & special chars with -
    .replace(/^-+|-+$/g, ""); // trim - from start & end
};
