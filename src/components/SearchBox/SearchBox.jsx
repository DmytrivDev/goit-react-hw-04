import { useId } from "react";

import css from "./SearchBox.module.scss";

function SearchBox({ search, onSearch }) {
  const searchID = useId();

  const handleChange = (evt) => {
    onSearch(evt.target.value);
  };

  return (
    <div className={css.searchBoxContainer}>
      <label htmlFor={searchID}>Find contacts by name</label>
      <input type="search" value={search} onChange={handleChange} />
    </div>
  );
}

export default SearchBox;
