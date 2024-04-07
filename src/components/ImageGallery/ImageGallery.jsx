import ImageCard from "./ImageCard/ImageCard";

import css from "./ImageGallery.module.scss";

function ImageGallery({ imagesArray, onClick }) {
  return (
    <ul className={css.image_gallery}>
      {imagesArray.map((item) => {
        return (
          <li key={item.id}>
            <ImageCard item={item} onClick={onClick} />
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery;
