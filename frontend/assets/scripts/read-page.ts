import convertTitleToString from "../../../lib/convertTitleToString.js";
import formatTitleFromId from "../../../lib/formatTitleFromId.js";
import getNextPrevChapterPageLink from "../../../lib/getNextPrevChapterPageLink.js";
import getPrevNextChapter from "../../../lib/getPrevNextCurrChapter.js";
import isErrorInFetching from "../../../lib/isErrorInFetching.js";
import isTouchDevice from "../../../lib/isTouchDevice.js";
import type { MangaChapterPageType } from "./main.js";
import type { IMangaChapter, IMangaInfo } from "@consumet/extensions";

const mainContainer = document.querySelector(
  ".main-container"
)! as HTMLDivElement;
const pageContainer = document.getElementById("page-container")! as HTMLElement;
const menuOverlay = document.querySelector(".menu-overlay")! as HTMLDivElement;
const bottomBarTitleContainer = document.querySelector(
  ".title-bar"
)! as HTMLDivElement;
const chapterSelect = document.querySelector(
  ".chapter-select"
)! as HTMLSelectElement;
const pageViewSettingBtn = document.querySelector(
  ".page-view-setting"
)! as HTMLButtonElement;
const fullscreenBtn = document.querySelector(
  ".fullscreen-button"
)! as HTMLButtonElement;

const pages: MangaChapterPageType[] = window.pages || [];
const chapterId = window.chapterId;
const mangaId = window.mangaId;
let mangaInfo: IMangaInfo | null = null;
let isMangaInfoFetching = true;
let isErrorFetchingMangaInfo = false;
let loadedImages = new Set<number>();
const pageImgCache = new Map<string, HTMLImageElement>();
let isLoadingImage = false;
let loadingQueue: number[] = [];
let currentReadingPage: number | null = null;
let isSingleImageMode: boolean = false;
let isFullScreen: boolean = false;
let sendToPrevNextChapter: "prev" | "next" | null = null;
let chaptersReadTill: { [key: string]: number } = {}; // here key is mangaId + "_" + chapterId and value is lastReadPage

const fetchMangaInfo = async (mangaId: string) => {
  try {
    const response = await fetch(`/api/info/${mangaId}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = (await response.json()) as
      | IMangaInfo
      | {
          error: string;
        };
    if (isErrorInFetching(data)) {
      isErrorFetchingMangaInfo = true;
    } else {
      mangaInfo = data;
      isMangaInfoFetching = false;
      localStorage.setItem("mangaInfo", JSON.stringify(data));

      appendNextPrevChapterLinks();
      loadChaptersForSelect();
      refreshBottomBarTitle();
    }
  } catch (error) {
    console.error("Error fetching manga info:", error);
  }
};

async function loadPrevNextImagesSequentially(currentPage: number) {
  for (const pageNo of [
    currentPage + 1,
    currentPage - 1,
    currentPage + 1,
  ].filter((pageNo) => pageNo > 0 && pageNo <= pages.length)) {
    await new Promise<void>((resolve) => {
      const imgSrc = pages[pageNo - 1].img;

      if (!pageImgCache.has(imgSrc)) {
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
          pageImgCache.set(imgSrc, img);
          resolve();
        };
      }
      resolve();
    });
  }
}

const navigateImage = (pageNo: number) => {
  if (sendToPrevNextChapter === "prev") {
    currentReadingPage = pageNo - 1;
    sendToPrevNextChapter = null;
  } else if (sendToPrevNextChapter === "next") {
    currentReadingPage = pageNo + 1;
    sendToPrevNextChapter = null;
  } else {
    currentReadingPage = pageNo;
  }

  createWrapper(currentReadingPage);
  loadAndInsertImage(pages[currentReadingPage - 1].img, currentReadingPage);
  loadPrevNextImagesSequentially(currentReadingPage);
  refreshBottomBarTitle();

  saveChaptersReadTill();
};

const createWrapper = (pageNo: number, isScrollingMode = false) => {
  const wrapper = document.createElement("div");
  wrapper.className = "page-wrapper loading";
  wrapper.setAttribute("data-page-no", pageNo.toString());

  const number = document.createElement("div");
  number.className = "page-number";
  number.textContent = `#${pageNo}`;
  wrapper.appendChild(number);

  if (isScrollingMode) {
    pageContainer.appendChild(wrapper);
  } else {
    const pageContainerAspectRatio =
      pageContainer.offsetWidth / pageContainer.offsetHeight;
    pageContainerAspectRatio > 2 / 3
      ? (wrapper.style.height = "100%")
      : (wrapper.style.width = "100%");
    pageContainer.innerHTML = wrapper.outerHTML;
  }
};

const loadAndInsertImage = async (
  url: string,
  pageNo: number
): Promise<void> => {
  return new Promise((resolve) => {
    const wrapper = document.querySelector(
      `.page-wrapper[data-page-no="${pageNo}"]`
    ) as HTMLDivElement | null;
    if (!wrapper) return;

    // Check if an image already exists
    if (wrapper.querySelector("img")) {
      resolve(); // If an image exists, skip loading
      return;
    }

    if (pageImgCache.has(url)) {
      const cachedImg = pageImgCache.get(url)!;

      wrapper.classList.remove("loading");
      cachedImg.style.display = "block";

      // Ensure no duplicate images are appended
      if (!wrapper.querySelector("img")) {
        wrapper.appendChild(cachedImg);
      }
      resolve();
    }

    const img = new Image();
    img.src = url;

    img.onload = () => {
      wrapper.classList.remove("loading");
      img.style.display = "block";
      pageImgCache.set(url, img);

      // Ensure no duplicate images are appended
      if (!wrapper.querySelector("img")) {
        wrapper.appendChild(img);
      }
      resolve();
    };

    img.onerror = () => {
      wrapper.classList.remove("loading");
      wrapper.classList.add("loading-failed");
      if (!wrapper.textContent?.includes("Failed to load")) {
        const failedText = document.createElement("p");
        failedText.innerText = "Failed to load";
        !wrapper.appendChild(failedText);
      }
      resolve();
    };
  });
};

const loadNextImage = (urls: string[]) => {
  if (loadingQueue.length === 0) return;
  if (isLoadingImage) return;

  isLoadingImage = true;
  const nextPage = loadingQueue.shift()!;

  if (!nextPage || nextPage < 1 || nextPage > pages.length) {
    isLoadingImage = false;
    return;
  }

  loadAndInsertImage(urls[nextPage - 1], nextPage).then(() => {
    isLoadingImage = false;
    loadNextImage(urls);
  });
};

const observeImages = (pages: MangaChapterPageType[]) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const pageNo = parseInt(entry.target.getAttribute("data-page-no")!, 10);

        if (entry.isIntersecting) {
          // If in viewport and not loaded, add to the loading queue
          if (!loadedImages.has(pageNo) && !loadingQueue.includes(pageNo)) {
            loadingQueue = [pageNo];
            currentReadingPage = pageNo;
            saveChaptersReadTill();
            refreshBottomBarTitle();

            const prevPage = loadingQueue[0] - 1;
            if (
              loadingQueue.length > 0 &&
              loadingQueue[0] > 1 &&
              !loadingQueue.includes(prevPage)
            ) {
              loadingQueue.unshift(prevPage); // Add previous page at the beginning
            }

            if (loadingQueue.length <= 2) {
              const lastLoadable = loadingQueue[loadingQueue.length - 1];
              loadingQueue.push(lastLoadable + 1, lastLoadable + 2);
            }
            loadingQueue = loadingQueue.filter(
              (pageNo) => !loadedImages.has(pageNo)
            );
          }
        } else {
          // If out of viewport and not loaded, remove from the queue
          loadingQueue = loadingQueue.filter((i) => i !== pageNo);
        }
      });

      // Load the next image if not already loading
      if (loadingQueue.length > 0) {
        loadNextImage(pages.map((page) => page.img));
      }
    },
    { root: null, threshold: 0.1 }
  );

  // Observe all image wrappers
  document
    .querySelectorAll(".page-wrapper")
    .forEach((wrapper) => observer.observe(wrapper));
};

const showLoading = () => {
  bottomBarTitleContainer.innerHTML = `<div class="loading-title"></div><div class="loading-page-no"></div>`;
  pageViewSettingBtn.innerHTML = `<div class="loading"></div>`;
  fullscreenBtn.innerHTML = `<div class="loading"></div>`;
  // if (!isSingleImageMode) {
  //   const chapterNavContainer = document.createElement("div");
  //   chapterNavContainer.className = "chapter-nav-container loading";
  //   pageContainer.innerHTML = "<p></p>";
  //   pageContainer.prepend(chapterNavContainer.cloneNode(true)); // Clone the container for separate placement
  //   pageContainer.append(chapterNavContainer);
  // }

  //add more
};

const refreshBottomBarTitle = () => {
  bottomBarTitleContainer.innerHTML = `  
  <p class="title">${convertTitleToString(mangaInfo?.title || "")}</p>
  <p class="page-no">${currentReadingPage ? currentReadingPage + " / " : ""}${
    pages.length
  }</p>`;
};

const loadChaptersForSelect = () => {
  chapterSelect.innerHTML =
    mangaInfo?.chapters
      ?.map(
        (chapter) => `
    <option value="${chapter.id}" ${
          chapter.id === chapterId ? "selected" : ""
        } >${chapter.title || formatTitleFromId(chapter.id)}</option>
    `
      )
      .join("") || "";

  chapterSelect.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    const selectedValue = target.value;
    location.href = `/read/${mangaId + "/" + selectedValue}`;
  });
};

const appendPageNaveBtns = () => {
  const btnContainer = document.createElement("div");
  btnContainer.className = "btn-container";

  btnContainer.innerHTML = `
  <button class="left-btn"></button>
  ${isTouchDevice() ? '<button class="center-btn"></button>' : ""}
  <button class="right-btn"></button>
  `;
  mainContainer.appendChild(btnContainer);
};

const createPageChapterWrapper = (previousOrNext: "previous" | "next") => {
  if (!mangaInfo?.chapters || !chapterId || !currentReadingPage) return;

  const PrevNextChapter = getPrevNextChapter(mangaInfo.chapters, chapterId);
  if (!PrevNextChapter) return;

  const { prevChapter, nextChapter, currChapter } = PrevNextChapter;
  if (!currChapter) return;

  const targetChapter =
    previousOrNext === "previous" ? prevChapter : nextChapter;
  if (!targetChapter) return;

  const createChapterHTML = (
    status: string,
    chapter: IMangaChapter
  ): string => `
    <div>
      <p class="chapter-status">${status}</p>
      <div class="chapter-name">
        <p>${formatTitleFromId(chapter.id)}</p>
        <p>${chapter.title}</p>
      </div>
    </div>`;

  const wrapper = document.createElement("div");
  wrapper.className = "page-wrapper chapter-page-wrapper";
  wrapper.innerHTML = `
    <div class="${previousOrNext}">
      ${createChapterHTML(previousOrNext, targetChapter)}
      ${createChapterHTML("current", currChapter)}
    </div>
  `;

  const pageContainerAspectRatio =
    pageContainer.offsetWidth / pageContainer.offsetHeight;
  if (pageContainerAspectRatio > 2 / 3) {
    wrapper.style.height = "100%";
  } else {
    wrapper.style.width = "100%";
  }

  sendToPrevNextChapter = previousOrNext === "previous" ? "prev" : "next";

  pageContainer.innerHTML = wrapper.outerHTML;
};

const listenForPageNavigate = () => {
  const btnContainer = document.querySelector(
    ".btn-container"
  ) as HTMLDivElement;

  const handleBtnContainerClick = (event: MouseEvent) => {
    if (
      (event.target as HTMLElement).tagName === "BUTTON" &&
      currentReadingPage
    ) {
      if ((event.target as HTMLElement).classList.contains("left-btn")) {
        if (sendToPrevNextChapter === "next") {
          const nextChapterLink = getNextPrevChapterPageLink(
            mangaInfo?.chapters,
            chapterId,
            mangaId
          ).nextChapterPageLink;
          if (nextChapterLink) window.location.href = nextChapterLink;
        }

        if (currentReadingPage < pages.length) {
          navigateImage(currentReadingPage + 1);
        } else if (currentReadingPage === pages.length) {
          createPageChapterWrapper("next");
        }
      }

      if ((event.target as HTMLElement).classList.contains("right-btn")) {
        if (sendToPrevNextChapter === "prev") {
          const prevChapterLink = getNextPrevChapterPageLink(
            mangaInfo?.chapters,
            chapterId,
            mangaId
          ).prevChapterPageLink;

          if (prevChapterLink) window.location.href = prevChapterLink;
        }

        if (currentReadingPage > 1) {
          navigateImage(currentReadingPage - 1);
        } else if (currentReadingPage === 1) {
          createPageChapterWrapper("previous");
        }
      }
    }

    if ((event.target as HTMLElement).classList.contains("center-btn")) {
      menuOverlay.classList.toggle("visible");
    }
  };

  btnContainer.addEventListener("click", handleBtnContainerClick);
};

function addFlicker(
  button: HTMLButtonElement,
  flickerClass: string,
  text: string
): void {
  button.classList.add(flickerClass);

  const span = document.createElement("span");
  span.classList.add("flicker-text");
  span.textContent = text;
  button.appendChild(span);

  const animationEndHandler = () => {
    button.classList.remove(flickerClass);
    span.remove();
    button.removeEventListener("animationend", animationEndHandler);
  };

  button.addEventListener("animationend", animationEndHandler);
}

const generateFlickerOnBtn = () => {
  const btnContainer = document.querySelector(".btn-container");

  if (btnContainer) {
    const buttons = btnContainer.querySelectorAll<HTMLButtonElement>("button");

    buttons.forEach((button) => {
      if (button.classList.contains("left-btn")) {
        addFlicker(button, "flicker-green", "next Page");
      } else if (button.classList.contains("center-btn")) {
        addFlicker(button, "flicker-red", "menu");
      } else if (button.classList.contains("right-btn")) {
        addFlicker(button, "flicker-yellow", "prev page");
      }
    });
  }
};

const appendNextPrevChapterLinks = () => {
  if (!mangaInfo || !mangaInfo.chapters || !chapterId || !mangaId) return;

  const { prevChapterPageLink, nextChapterPageLink } =
    getNextPrevChapterPageLink(mangaInfo.chapters, chapterId, mangaId);

  const chapterNavContainer = document.createElement("div");
  chapterNavContainer.className = "chapter-nav-container";

  if (prevChapterPageLink) {
    chapterNavContainer.innerHTML += `<a class="chapter-nav-link" href="${prevChapterPageLink}"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg><span>previous chapter</span></a>`;
  }
  if (nextChapterPageLink) {
    chapterNavContainer.innerHTML += `<a class="chapter-nav-link" href="${nextChapterPageLink}"><span>next chapter</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg></a>`;
  }

  if (chapterNavContainer.innerHTML) {
    pageContainer.prepend(chapterNavContainer.cloneNode(true)); // Clone the container for separate placement
    pageContainer.append(chapterNavContainer);
  }
};

const updateViewMode = () => {
  if (isSingleImageMode) {
    pageContainer.classList.add("single-image-mode");
    pageContainer.innerHTML = "";
    currentReadingPage = currentReadingPage || 1;

    createWrapper(currentReadingPage);
    loadAndInsertImage(pages[currentReadingPage - 1].img, currentReadingPage);

    appendPageNaveBtns();
    listenForPageNavigate();
    generateFlickerOnBtn();
  } else {
    const btnContainer = document.querySelector(
      ".btn-container"
    ) as HTMLDivElement | null;
    btnContainer?.remove();
    pageContainer.classList.remove("single-image-mode");
    pageContainer.innerHTML = "";

    pages.forEach((page) => createWrapper(page.page, true));
    observeImages(pages);
    appendNextPrevChapterLinks();

    // scroll to currently reading page
    document
      .querySelector(`[data-page-no="${currentReadingPage}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const revaluatePageViewLogo = () => {
  if (isSingleImageMode) {
    pageViewSettingBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gallery-horizontal"><path d="M2 3v18" /><rect width="12" height="18" x="6" y="3" rx="2" /><path d="M22 3v18" /></svg><span class="text-info">scroll</span>`;
  } else {
    pageViewSettingBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rectangle-vertical"><rect width="12" height="20" x="6" y="2" rx="2" /></svg>
    <span class="text-info">1 page</span>`;
  }
};

const revaluateFullScreenLogo = () => {
  if (isFullScreen) {
    fullscreenBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none"     stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shrink"><path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8"/><path d="M9 19.8V15m0 0H4.2M9 15l-6 6"/><path d="M15 4.2V9m0 0h4.8M15 9l6-6"/><path d="M9 4.2V9m0 0H4.2M9 9 3 3"/></svg>
      <span class="text-info">exit FS</span>`;
  } else {
    fullscreenBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-expand"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" /><path d="M3 16.2V21m0 0h4.8M3 21l6-6" /><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" /><path d="M3 7.8V3m0 0h4.8M3 3l6 6" /></svg>
    <span class="text-info">FS</span>`;
  }
};

const loadBottomBar = () => {
  refreshBottomBarTitle();
  loadChaptersForSelect();
  revaluatePageViewLogo();
  revaluateFullScreenLogo();
};

const saveChaptersReadTill = () => {
  if (mangaId && chapterId && currentReadingPage) {
    const key = `${mangaId}_${chapterId}`;

    const chaptersReadTill: { [key: string]: number } = JSON.parse(
      localStorage.getItem("chaptersReadTill") || "{}"
    );
    chaptersReadTill[key] = currentReadingPage;

    localStorage.setItem("chaptersReadTill", JSON.stringify(chaptersReadTill));
  }
};

const setLastReadTill = () => {
  const prevChaptersReadTill: { [key: string]: number } = JSON.parse(
    localStorage.getItem("chaptersReadTill") || "{}"
  );

  const key = `${mangaId}_${chapterId}`;
  currentReadingPage = prevChaptersReadTill[key] || 1;
};

const init = () => {
  mangaInfo = JSON.parse(
    localStorage.getItem("mangaInfo") || "null"
  ) as IMangaInfo | null;
  isSingleImageMode = localStorage.getItem("isSingleImageMode") === "true";

  const currentChIndex = mangaInfo?.chapters?.findIndex(
    (mc) => chapterId && mc.id === chapterId
  );

  if ((!mangaInfo || (currentChIndex && currentChIndex < 0)) && mangaId) {
    showLoading();
    fetchMangaInfo(mangaId).then(() => loadBottomBar());
  } else {
    isMangaInfoFetching = false;
    loadBottomBar();
  }

  setLastReadTill();
  updateViewMode();
};

init();

mainContainer.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  menuOverlay.classList.toggle("visible");
});

pageViewSettingBtn.addEventListener("click", () => {
  isSingleImageMode = !isSingleImageMode;
  localStorage.setItem("isSingleImageMode", `${isSingleImageMode}`);

  revaluatePageViewLogo();
  updateViewMode();
});

fullscreenBtn.addEventListener("click", () => {
  if (isFullScreen) {
    document?.exitFullscreen();
    (document as any)?.webkitExitFullscreen(); // Safari
    (document as any)?.msExitFullscreen(); // IE/Edge
  } else {
    mainContainer?.requestFullscreen();
    (mainContainer as any)?.webkitRequestFullscreen(); // Safari
    (mainContainer as any)?.msRequestFullscreen(); // IE/Edge
  }
});

document.addEventListener("fullscreenchange", () => {
  if (
    document.fullscreenElement &&
    document.fullscreenElement === mainContainer
  ) {
    isFullScreen = true;
    pageContainer.classList.add("fullscreen");
  } else {
    isFullScreen = false;
    pageContainer.classList.remove("fullscreen");
  }

  revaluateFullScreenLogo();
});
