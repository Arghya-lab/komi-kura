export type IMangaProviderType =
  | "mangadex"
  | " mangahere"
  | " mangakakalot"
  | " mangapark"
  | " mangapill"
  | " mangareader"
  | " mangasee123";

export interface IMiniMangaItem {
  id: string;
  title: string;
  coverImage: string;
}

export type ILandingMangaCategory = "trending" | "popular" | "top-100";
