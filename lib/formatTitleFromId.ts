export default function formatTitleFromId(id: string) {
  return id
    .replace(/[-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
