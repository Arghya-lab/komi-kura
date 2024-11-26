import "@consumet/extensions";
import type { ITitle } from "@consumet/extensions";

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
  name: string | [lang: string][] | ITitle;
  imgSrc?: string;
  chapterCount?: number;
  rating?: number;
}

export type ILandingMangaCategory = "trending" | "popular" | "top-100";

// declare module "@consumet/extensions" {
interface IMangaInfo {
  id: string;
  title: string[];
  malId?: number | string;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  image: string;
  popularity: number;
  color: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  rating: number;
  genres?: string[];
  season: string;
  studios: string[];
  type: string;
  recommendations?: {
    id: string;
    malId: string;
    title: string[];
    status: string;
    chapters: number;
    image: string;
    cover: string;
    rating: number;
    type: string;
  }[];
  characters?: {
    id: string;
    role: string;
    name: string[];
    image: string;
  }[];
  relations: {
    id: number;
    relationType: string;
    malId: number;
    title: string[];
    status: string;
    chapters: number;
    image: string;
    color: string;
    type: string;
    cover: string;
    rating: number;
  }[];
  chapters: {
    id: string;
    title: string;
    chapter: string;
  }[];
  // }
}

export interface MangaChapterType {
  id: string;
  title: string;
  chapter?: string;
  volume?: number;
  pages?: number;
  releaseDate?: string;
}
