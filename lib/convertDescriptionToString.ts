type DescriptionType =
  | string
  | [lang: string][]
  | { [lang: string]: string }
  | undefined;

export default function convertDescriptionToString(
  description: DescriptionType
): string {
  if (!description) {
    return "";
  }

  if (typeof description === "string") {
    return description;
  }

  if (Array.isArray(description)) {
    return description.map(([lang]) => lang).join("\n");
  }

  if (typeof description === "object") {
    return Object.values(description).join("\n");
  }

  return "";
}
