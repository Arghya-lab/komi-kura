function PaginationItemWrapper({
  children,
  href,
  isCurrent,
}: {
  children: any;
  href?: string;
  isCurrent?: boolean;
}) {
  if (isCurrent) return children;

  if (href) {
    return <a href={href}>{children}</a>;
  }

  return <button>{children}</button>;
}

function Pagination({
  currentPage,
  totalPage,
  isNextPagePresent,
  generatePageHref,
}: {
  currentPage: number;
  totalPage?: number;
  isNextPagePresent?: boolean;
  generatePageHref?: (pageNo: number) => string;
}) {
  return (
    <>
      <link rel="stylesheet" href="/public/styles/pagination.css" />
      <div class="pagination-container">
        <ul class="pagination-list">
          {currentPage > 1 ? (
            <li class="previous non-current" data-page-no={currentPage - 1}>
              <PaginationItemWrapper
                href={generatePageHref && generatePageHref(currentPage - 1)}
              >
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-left h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  <span>previous</span>
                </>
              </PaginationItemWrapper>
            </li>
          ) : null}
          {currentPage > 2 ? (
            <li class="last-index non-current" data-page-no="1">
              <PaginationItemWrapper
                href={generatePageHref && generatePageHref(1)}
              >
                <span>1</span>
              </PaginationItemWrapper>
            </li>
          ) : null}
          {currentPage > 1 + 2 ? (
            <li class="dots">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-ellipsis h-4 w-4"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </li>
          ) : null}
          {currentPage > 2 && !isNextPagePresent ? (
            <li class="non-current" data-page-no={currentPage - 1}>
              <PaginationItemWrapper
                href={generatePageHref && generatePageHref(currentPage - 1)}
              >
                <span>{currentPage - 1}</span>
              </PaginationItemWrapper>
            </li>
          ) : null}
          {totalPage || isNextPagePresent
            ? [
                { pageNo: currentPage - 1, current: false },
                { pageNo: currentPage, current: true },
                { pageNo: currentPage + 1, current: false },
              ]
                .filter(
                  ({ pageNo }) =>
                    pageNo >= 1 &&
                    ((totalPage && pageNo <= totalPage) ||
                      (isNextPagePresent && pageNo !== currentPage + 1))
                )
                .map(({ pageNo, current }) => (
                  <li
                    class={current ? "current" : "non-current"}
                    data-page-no={pageNo}
                  >
                    <PaginationItemWrapper
                      isCurrent={current}
                      href={
                        generatePageHref && !current
                          ? generatePageHref(pageNo)
                          : undefined
                      }
                    >
                      <span>{pageNo}</span>
                    </PaginationItemWrapper>
                  </li>
                ))
            : null}
          {currentPage >= 1 && !isNextPagePresent ? (
            <li class="current" data-page-no={currentPage}>
              <span>{currentPage}</span>
            </li>
          ) : null}
          {totalPage && currentPage + 2 < totalPage ? (
            <li class="dots">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-ellipsis h-4 w-4"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </li>
          ) : null}

          {totalPage && currentPage + 1 < totalPage ? (
            <li class="last-index non-current" data-page-no={totalPage}>
              <PaginationItemWrapper
                href={generatePageHref && generatePageHref(totalPage)}
              >
                <span>{totalPage}</span>
              </PaginationItemWrapper>
            </li>
          ) : null}

          {(totalPage && currentPage < totalPage) || isNextPagePresent ? (
            <li class="next non-current" data-page-no={currentPage + 1}>
              <PaginationItemWrapper
                href={generatePageHref && generatePageHref(currentPage + 1)}
              >
                <>
                  <span>next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-right h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </>
              </PaginationItemWrapper>
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
}

export default Pagination;
