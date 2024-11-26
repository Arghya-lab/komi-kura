const searchForm = document.querySelector(
  ".search-form"
) as HTMLFormElement | null;
const searchInput = document.querySelector(
  ".search-input"
) as HTMLInputElement | null;
const clearButton = document.querySelector(
  ".clear-button"
) as HTMLButtonElement | null;

let input = "";

const handleInput = () => {
  input = searchInput?.value.trim() || "";

  if (input !== "") {
    clearButton?.classList.add("visible");
  } else {
    clearButton?.classList.remove("visible");
  }
};

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();

  const inputValue = searchInput?.value.trim();
  if (inputValue) {
    window.location.href = `/search/${encodeURIComponent(inputValue)}`;
  }
};

const handleClearInput = () => {
  if (searchInput instanceof HTMLInputElement) {
    searchInput.value = "";
    handleInput();
    searchInput?.focus();
  }
};

searchInput?.addEventListener("input", handleInput);
searchForm?.addEventListener("submit", handleSubmit);
clearButton?.addEventListener("click", handleClearInput);
