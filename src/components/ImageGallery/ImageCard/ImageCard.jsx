import css from "./ImageCard.module.scss";

function ImageCard({ item, onClick }) {
  const { urls, description } = item;
  return (
    <div className={css.image_item}>
      <img
        src={urls.small}
        alt={description}
        onClick={() => {
          onClick(urls.full);
        }}
      />
    </div>
  );
}

export default ImageCard;
