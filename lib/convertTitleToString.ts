import type { ITitle } from "@consumet/extensions";

type TitleType = string | string[] | [lang: string][] | ITitle;

export default function convertTitleToString(title: TitleType): string {
  if (!title) {
    return "";
  }

  if (typeof title === "string") {
    return title;
  }

  if (Array.isArray(title)) {
    return title.map(([lang]) => lang).join(", ");
  }

  if (typeof title === "object") {
    return (
      title.english || title.userPreferred || title.romaji || title.native || ""
    );
  }

  return ""; // Fallback for unexpected types
}
