import { useRef } from "react";

import css from "./LoadMoreBtn.module.scss";

function LoadMoreBtn({onClick}) {
  const btnRef = useRef();

  const hendleClick = () => {
    const offsetTop = btnRef.current.offsetTop;
    onClick(offsetTop);
  }

  return (
    <div ref={btnRef} className={css.button_cont}>
      <button onClick={hendleClick}>Load More</button>
    </div>
  );
}

export default LoadMoreBtn;
