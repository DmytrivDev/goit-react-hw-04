import css from "./LoadMoreBtn.module.scss";

function LoadMoreBtn({onClick}) {
  const hendleClick = () => {
    onClick();
  }

  return (
    <button onClick={hendleClick} className={css.button}>Load More</button>
  );
}

export default LoadMoreBtn;
