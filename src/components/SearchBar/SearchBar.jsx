import { IoSearch } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

import css from "./SearchBar.module.scss";

function SearchBar({ onSubmit }) {
  const hendleSubmit = (evt) => {
    evt.preventDefault();
    const serchedWord = evt.target.elements.searchInput.value;

    if (serchedWord) {
      onSubmit(serchedWord);
      evt.target.reset();
    } else {
      toast.error("Search field is empty", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <header className={css.searchbar_section}>
        <form onSubmit={hendleSubmit}>
          <input
            name="searchInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">
            <IoSearch />
          </button>
        </form>
      </header>
      <Toaster />
    </>
  );
}

export default SearchBar;
