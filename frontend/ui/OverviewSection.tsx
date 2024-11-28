import type { IMangaInfo } from "@consumet/extensions";
import convertTitleToString from "../../lib/convertTitleToString.js";

function OverviewSection({ mangaInfo }: { mangaInfo: IMangaInfo }) {
  const startDate = mangaInfo?.startDate as any;
  const formattedStartDate =
    startDate?.year && startDate?.month && startDate?.day
      ? `${startDate.year}-${startDate.month}-${startDate.day}`
      : null;

  const endDate = mangaInfo?.endDate as any;
  const formattedEndDate =
    endDate?.year && endDate?.month && endDate?.day
      ? `${endDate.year}-${endDate.month}-${endDate.day}`
      : null;

  return (
    <>
      <link rel="stylesheet" href="/public/styles/overview-section.css" />
      <section class="overview">
        <h3 class="heading">overview</h3>
        {mangaInfo.altTitles && (
          <div>
            <span class="info-title">alternative titles :</span>
            <span> {convertTitleToString(mangaInfo.altTitles)}</span>
          </div>
        )}
        {mangaInfo.popularity && (
          <div>
            <span class="info-title">popularity :</span>
            <span> {mangaInfo.popularity}</span>
          </div>
        )}
        {mangaInfo.rating && (
          <div>
            <span class="info-title">rating :</span>
            <span> {mangaInfo.rating}</span>
          </div>
        )}
        {mangaInfo.season && (
          <div>
            <span class="info-title">season :</span>
            <span> {mangaInfo.season}</span>
          </div>
        )}
        {formattedStartDate ? (
          <div>
            <span class="info-title">release date :</span>
            <span> {formattedStartDate}</span>
          </div>
        ) : mangaInfo.releaseDate ? (
          <div>
            <span class="info-title">release date :</span>
            <span> {mangaInfo.releaseDate}</span>
          </div>
        ) : null}
        {formattedEndDate ? (
          <div>
            <span class="info-title">end date :</span>
            <span> {formattedEndDate}</span>
          </div>
        ) : null}
        {mangaInfo.status && (
          <div>
            <span class="info-title">status :</span>
            <span> {mangaInfo.status}</span>
          </div>
        )}
        {mangaInfo.genres && mangaInfo.genres.length > 0 && (
          <div>
            <span class="info-title">genres :</span>
            <span> {mangaInfo.genres.map((genre) => genre).join(", ")}</span>
          </div>
        )}
        {mangaInfo.authors && mangaInfo.authors.length > 0 && (
          <div>
            <span class="info-title">authors :</span>
            <span> {mangaInfo.authors.map((author) => author).join(", ")}</span>
          </div>
        )}
        {(mangaInfo.studios as string[]).length > 0 && (
          <div>
            <span class="info-title">studios :</span>
            <span>
              {" "}
              {(mangaInfo.studios as string[])
                .map((author) => author)
                .join(", ")}
            </span>
          </div>
        )}
      </section>
    </>
  );
}

export default OverviewSection;
