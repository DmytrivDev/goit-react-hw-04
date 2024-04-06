import css from "./ImageCard.module.scss";

function ImageCard({ item }) {
  const {urls, description} = item;
  return (
    <div className={css.image_item}>
      <img src={urls.small} alt={description} />
    </div>
  );
}

export default ImageCard;
