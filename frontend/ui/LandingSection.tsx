import classNames from "classnames";

function LandingSection({
  children,
  landingTitle,
  showViewAll = false,
}: {
  children: any;
  landingTitle: string;
  showViewAll?: boolean;
}) {
  return (
    <>
      <link rel="stylesheet" href="/public/styles/landing-section.css" />
      <div class="landing-section">
        <div class="landing-heading">
          <h3 class={classNames("title", { "bg-font": showViewAll })}>
            {landingTitle}
          </h3>
          {showViewAll && (
            <a href={`/${landingTitle}`} class="link">
              <span>View All</span>
              <span>
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 6l6 6l-6 6" />
                </svg>
              </span>
            </a>
          )}
        </div>
        {children}
      </div>
    </>
  );
}

export default LandingSection;
