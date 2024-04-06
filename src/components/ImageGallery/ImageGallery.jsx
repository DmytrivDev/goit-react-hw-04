import ImageCard from "./ImageCard/ImageCard";

import css from "./ImageGallery.module.scss";

function ImageGallery({ imagesArray, onClick }) {
  return (
    <div className={css.image_gallery}>
      {imagesArray.map((item) => {
        return (
          <li
            key={item.id}
            onClick={() => {
              onClick(item.urls.full);
              document.body.style.overflow = 'hidden';
            }}
          >
            <ImageCard item={item} />
          </li>
        );
      })}
    </div>
  );
}

export default ImageGallery;
