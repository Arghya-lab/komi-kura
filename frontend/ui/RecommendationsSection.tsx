import type { IMangaInfo, ITitle } from "@consumet/extensions";
import convertTitleToString from "../../lib/convertTitleToString.js";
import MangaPoster from "./MangaPoster.js";

function RecommendationsSection({ mangaInfo }: { mangaInfo: IMangaInfo }) {
  const recommendations = mangaInfo.recommendations as
    | {
        id: string;
        malId: string;
        title: string | string[] | [lang: string][] | ITitle;
        status: string;
        chapters: number;
        image: string;
        cover: string;
        rating: number;
        type: string;
      }[]
    | undefined;

  if (!recommendations) return null;

  return (
    <>
      <link
        rel="stylesheet"
        href="/public/styles/recommendations-section.css"
      />
      <link rel="stylesheet" href="/public/styles/manga-poster.css" />
      <section class="recommendations">
        <h3 class="heading">recommendations</h3>

        <div class="recommendation-grid">
          {recommendations.map((recommendation) => (
            <MangaPoster
              id={recommendation.id}
              name={convertTitleToString(recommendation.title)}
              imgSrc={recommendation.image}
              chapterCount={recommendation.chapters}
              rating={recommendation.rating}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default RecommendationsSection;
