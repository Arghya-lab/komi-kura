import formatTitleFromId from "../../../lib/formatTitleFromId.js";
import Pagination from "../../ui/Pagination.js";

type NavItemType = "overview" | "characters" | "recommendations" | "chapters";

const infoContainer = document.querySelector(".info-container");
const nav = document.querySelector(".nav");

if (window.mangaInfoJson) {
  localStorage.setItem("mangaInfo", JSON.stringify(window.mangaInfoJson));
}
if (window.mangaInfo && nav) {
  let activeNavItem: NavItemType = "overview";
  const {
    overview,
    characters,
    recommendations,
    chapters,
    mangaChaptersData,
    mangaId,
  } = window.mangaInfo;

  function renderInfo() {
    if (infoContainer) {
      infoContainer.innerHTML =
        activeNavItem === "overview"
          ? overview
          : activeNavItem === "characters"
          ? characters
          : activeNavItem === "recommendations"
          ? recommendations
          : activeNavItem === "chapters"
          ? chapters
          : "";
    }
  }

  function loadChapters() {
    const chapterContainer = document.querySelector(".chapter-container");
    const chapterSection = document.querySelector(".chapters");

    if (mangaChaptersData && chapterContainer && chapterSection) {
      const perIndexChapterCount = 24;
      let currentIndex = 1; //starting index is 1.
      const maxIndex = Math.ceil(
        mangaChaptersData.length / perIndexChapterCount
      );

      const renderChapters = () => {
        if (!mangaChaptersData) return;

        const initialChaptersHtml = mangaChaptersData
          .slice(
            (currentIndex - 1) * perIndexChapterCount,
            currentIndex * perIndexChapterCount
          )
          .map(
            (chapter) =>
              `<a class="chapter" href=${`/read/${mangaId}/${chapter.id}`}>
            <p class="title">${
              chapter.title || formatTitleFromId(chapter.id)
            }</p>
            ${chapter.pages ? `<p>pages : ${chapter.pages}</p>` : ""}
            ${
              chapter.releaseDate
                ? `<p>release date : ${chapter.releaseDate}</p>`
                : ""
            }
            ${chapter.volume ? `<p>volume : ${chapter.volume}</p>` : ""}
          </a>`
          )
          .join("");
        chapterContainer.innerHTML = initialChaptersHtml;
      };

      const renderPaginate = () => {
        const chapterSection = document.querySelector(".chapters");
        let paginationContainer = chapterSection?.querySelector(
          ".pagination-container"
        );

        if (!chapterSection) return;

        // Create the new pagination content
        const refreshedPagination = Pagination({
          currentPage: currentIndex,
          totalPage: maxIndex,
        }).toString();

        // If the pagination container exists, update its content
        if (paginationContainer) {
          paginationContainer.innerHTML = refreshedPagination;
        } else {
          // If no pagination container exists, create and append the new one
          paginationContainer = document.createElement("div");
          paginationContainer.classList.add("pagination-container");
          paginationContainer.innerHTML = `
            <link rel="stylesheet" href="/public/styles/pagination.css">
            ${refreshedPagination}
          `;
          chapterSection.appendChild(paginationContainer);
        }

        // Dynamically create and append the script tag for pagination only once
        if (
          !document.querySelector("script[src='/public/scripts/pagination.js']")
        ) {
          const paginationScript = document.createElement("script");
          paginationScript.type = "module";
          paginationScript.src = "/public/scripts/pagination.js";
          chapterSection.appendChild(paginationScript);
        }
      };

      /*  on initial page load  */
      renderChapters();
      renderPaginate();

      window.paginate = (index) => {
        currentIndex = Number(index);
        renderChapters();
        renderPaginate();
      };
    }
  }

  renderInfo();

  nav.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const navBtn = target.closest(".nav-btn"); // Use 'closest' to find the nearest ancestor with the 'non-current' class

    if (navBtn) {
      const clickedBtnType = (navBtn as HTMLElement).dataset.btnType as
        | NavItemType
        | undefined;

      if (clickedBtnType && clickedBtnType !== activeNavItem) {
        activeNavItem = clickedBtnType;
        renderInfo();
        if (clickedBtnType === "chapters") {
          loadChapters();
        }
      }
    }
  });
}
