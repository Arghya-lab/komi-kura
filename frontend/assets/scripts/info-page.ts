import type { MangaChapterType } from "../../../@types/manga.js";

interface MangaInfo {
  overview: string;
  characters: string;
  recommendations: string;
  chapters: string;
  mangaChaptersData?: MangaChapterType[];
}

declare global {
  interface Window {
    mangaInfo?: MangaInfo;
  }
}

type NavItemType = "overview" | "characters" | "recommendations" | "chapters";

const infoContainer = document.querySelector(".info-container");
const nav = document.querySelector(".nav");

if (window.mangaInfo && nav) {
  let activeNavItem: NavItemType = "overview";
  const { overview, characters, recommendations, chapters, mangaChaptersData } =
    window.mangaInfo;

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
    const paginationContainer = document.querySelector(".pagination-container");
    const chapterContainer = document.querySelector(".chapter-container");

    if (mangaChaptersData && paginationContainer && chapterContainer) {
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
              `<a class="chapter" href=${`/read/${chapter.id}`}>
            <p class="title">${chapter.title}</p>
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
        const paginationHtml = `
    <ul class="pagination-list">
      ${
        currentIndex > 1
          ? `<li class="previous non-current" data-index=${currentIndex - 1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left h-4 w-4"><path d="m15 18-6-6 6-6"></path></svg>
              <span>previous</span>
            </li>`
          : ""
      }
      ${
        currentIndex > 2
          ? `<li class="last-index non-current" data-index=1>
              <span>1</span>
            </li>`
          : ""
      }
      ${
        currentIndex > 1 + 2
          ? `<li>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis h-4 w-4"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </li>`
          : ""
      }

      ${[
        { index: currentIndex - 1, current: false },
        { index: currentIndex, current: true },
        { index: currentIndex + 1, current: false },
      ]
        .filter((item) => item.index >= 1 && item.index <= maxIndex)
        .map(
          (item) => `
          <li class=${item.current ? "current" : "non-current"} data-index=${
            item.index
          }>              
            <span>${item.index}</span>
          </li> 
      `
        )
        .join("")}
        
      ${
        currentIndex + 2 < maxIndex
          ? `<li>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis h-4 w-4"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </li>`
          : ""
      }
      ${
        currentIndex + 1 < maxIndex
          ? `<li class="last-index non-current" data-index=${maxIndex}>
              <span>${maxIndex}</span>
            </li>`
          : ""
      }
      ${
        currentIndex < maxIndex
          ? `<li class="next non-current" data-index=${currentIndex + 1}>
              <span>next</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right h-4 w-4"><path d="m9 18 6-6-6-6"></path></svg>
            </li>`
          : ""
      }
    </ul>
  `;

        paginationContainer.innerHTML = paginationHtml;
      };

      /*  on initial page load  */
      renderChapters();
      renderPaginate();

      paginationContainer.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        const nonCurrentElement = target.closest(".non-current"); // Use 'closest' to find the nearest ancestor with the 'non-current' class

        if (
          nonCurrentElement &&
          paginationContainer.contains(nonCurrentElement)
        ) {
          const clickedIndex = (nonCurrentElement as HTMLElement).dataset.index;

          if (clickedIndex) {
            currentIndex = Number(clickedIndex);
            renderChapters();
            renderPaginate();
          }
        }
      });
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
