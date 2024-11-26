interface IMangaChapterPage {
  page: number;
  img: string;
}

declare global {
  interface Window {
    pages?: IMangaChapterPage[];
  }
}

const pages: IMangaChapterPage[] = window.pages || [];
const imageContainer = document.getElementById("page-container")!;
let loadedImages = new Set<number>();
let isLoading = false; // Track the loading state
let loadingQueue: number[] = []; // Queue to track images to load

const loadImage = async (url: string, pageNo: number): Promise<void> => {
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

    const img = new Image();
    img.src = url;

    img.onload = () => {
      wrapper.classList.remove("loading");
      img.style.display = "block";

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

const createWrapper = (pageNo: number) => {
  const wrapper = document.createElement("div");
  wrapper.className = "page-wrapper loading";
  wrapper.setAttribute("data-page-no", pageNo.toString());

  const number = document.createElement("div");
  number.className = "page-number";
  number.textContent = `#${pageNo}`;
  wrapper.appendChild(number);

  imageContainer.appendChild(wrapper);
};

const observeImages = (pages: IMangaChapterPage[]) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const pageNo = parseInt(entry.target.getAttribute("data-page-no")!, 10);

        if (entry.isIntersecting) {
          // If in viewport and not loaded, add to the loading queue
          if (!loadedImages.has(pageNo) && !loadingQueue.includes(pageNo)) {
            // loadingQueue.push(pageNo);
            loadingQueue = [pageNo];

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

const loadNextImage = (urls: string[]) => {
  if (loadingQueue.length === 0) return;
  if (isLoading) return;

  isLoading = true;
  const nextPage = loadingQueue.shift()!;

  if (!nextPage || nextPage < 1 || nextPage > pages.length) {
    isLoading = false;
    return;
  }

  loadImage(urls[nextPage - 1], nextPage).then(() => {
    isLoading = false;
    loadNextImage(urls);
  });
};

const init = () => {
  pages.forEach((page) => createWrapper(page.page));
  observeImages(pages);
};

init();
