const pagination = document.querySelector(".pagination-container");

// if (pagination) {
pagination?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  // Use 'closest' to find the nearest ancestor with the 'non-current' class
  const nonCurrentElement = target.closest(".non-current");
  const isLinkElement = nonCurrentElement?.querySelector("a");

  if (nonCurrentElement && !isLinkElement) {
    const page = (nonCurrentElement as HTMLElement).dataset.pageNo;

    if (page && window.paginate) {
      window.paginate(Number(page));
      // currentPage = Number(clickedPage);
      // renderChapters();
      // renderPaginate();
    }
  }
});
// }
