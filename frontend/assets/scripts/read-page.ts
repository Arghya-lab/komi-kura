import type { IMangaChapterPage } from "@consumet/extensions";

declare global {
  interface Window {
    pages?: IMangaChapterPage[];
  }
}

const pageContainer = document.querySelector(".page-container");

function loadImagesSequentially() {
  if (!window.pages || !pageContainer) return;

  let currentIndex = 0;
  let isImageLoading = false;

  const observerOptions: IntersectionObserverInit = {
    root: null, // Use viewport as the root
    rootMargin: "0px 0px 300px 0px", // Preload 300px before viewport
    threshold: 0, // Trigger as soon as element enters viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isImageLoading) {
        // Explicitly cast entry.target to HTMLDivElement
        const target = entry.target as HTMLDivElement;

        if (currentIndex === parseInt(target.dataset.index || "0")) {
          loadNextImage(target);
          observer.unobserve(entry.target); // Stop observing after processing
        }
      }
    });
  }, observerOptions);

  function loadNextImage(target: HTMLDivElement) {
    const img = target.querySelector("img") as HTMLImageElement;
    const dataSrc = img.dataset.src;

    if (!dataSrc) return;

    isImageLoading = true; // Mark loading in progress

    img.onload = () => {
      console.log(`Image ${currentIndex + 1} loaded`);
      isImageLoading = false; // Mark loading complete
      currentIndex++; // Increment to the next image
    };

    img.onerror = () => {
      console.error(`Failed to load image: ${dataSrc}`);
      isImageLoading = false; // Allow next image loading even if an error occurs
      currentIndex++;
    };

    img.src = dataSrc; // Trigger image load
  }

  // Add all page elements and start observing
  window.pages.forEach((pageData, index) => {
    const page = document.createElement("div");
    page.className = "page";
    page.dataset.index = index.toString(); // Add index for sequential control

    const img = document.createElement("img");
    img.dataset.src = pageData.img; // Lazy load the src
    img.alt = `Page ${pageData.page}`;
    img.className = "page-image";

    page.appendChild(img);
    pageContainer.appendChild(page);

    observer.observe(page); // Start observing this page
  });
}

loadImagesSequentially();
