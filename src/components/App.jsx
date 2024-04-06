import { useEffect, useState, useRef } from "react";

import FetchImages from "../API/FetchImages";

import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";

import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";

import "./App.scss";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [scrollPos, setScrollPos] = useState(0);

  const btnRef = useRef();

  useEffect(() => {
    const searchImages = async () => {
      if (searchWord) {
        try {
          setIsStart(false);
          setIsLoading(true);
          if (currentPage === 1) {
            setIsSearching(true);
          }
          const response = await FetchImages(searchWord, currentPage);
          console.log(response.data)
          setTotalPages(response.data.total_pages);
          if (currentPage === 1) {
            setImagesArray(response.data.results);
          } else {
            setImagesArray((oldArray) => {
              return [...oldArray, ...response.data.results];
            });
            setTimeout(() => {
              window.scrollTo({
                top: scrollPos,
                behavior: "smooth",
              });
            }, 100);
            setIsError(false);
          }
        } catch (error) {
          setIsError(true);
          console.log(error);
        } finally {
          setIsLoading(false);
          setIsSearching(false);
        }
      }
    };

    searchImages();
  }, [searchWord, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      const offsetTop = btnRef.current.offsetTop;
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setScrollPos(offsetTop);
    }
  };

  useEffect(() => {
    if (modalImage) {
      setIsOpen(true);
    }
  }, [modalImage]);

  return (
    <>
      <SearchBar
        onSubmit={setSearchWord}
        onSunmitCurrentPage={setCurrentPage}
      />
      {imagesArray.length > 0 && !isSearching && (
        <ImageGallery imagesArray={imagesArray} onClick={setModalImage} />
      )}
      {imagesArray.length === 0 && !isStart && !isLoading && !isError && (
        <div className="nothingfound">Nothing Found</div>
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {totalPages > currentPage && !isSearching && (
        <div ref={btnRef} className="button_cont">
          <LoadMoreBtn onClick={nextPage} />
        </div>
      )}
      {modalIsOpen && modalImage && (
        <ImageModal
          isOpen={modalIsOpen}
          toogleModal={setIsOpen}
          modalImage={modalImage}
        />
      )}
    </>
  );
}

export default App;
