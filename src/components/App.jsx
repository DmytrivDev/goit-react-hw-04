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
  const [searchWord, setSearchWord] = useState({ word: "", page: 0 });
  const [isSearching, setIsSearching] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);
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
      if (searchWord.word) {
        try {
          setIsStart(false);
          setIsLoading(true);
          if (searchWord.page === 1) {
            setIsSearching(true);
          }
          const response = await FetchImages(searchWord.word, searchWord.page);
          setTotalPages(response.data.total_pages);
          if (searchWord.page === 1) {
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
        } finally {
          setIsLoading(false);
          setIsSearching(false);
        }
      }
    };

    searchImages();
  }, [searchWord]);

  const nextPage = () => {
    if (searchWord.page < totalPages) {
      const offsetTop = btnRef.current.offsetTop;
      const newPage = searchWord.page + 1;
      setSearchWord((prevSearchWord) => {
        return {
          ...prevSearchWord,
          page: newPage,
        };
      });
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
      <SearchBar onSubmit={setSearchWord} />
      {imagesArray.length > 0 && !isSearching && (
        <ImageGallery imagesArray={imagesArray} onClick={setModalImage} />
      )}
      {imagesArray.length === 0 && !isStart && !isLoading && !isError && (
        <div className="nothingfound">Nothing Found</div>
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {totalPages > searchWord.page && !isSearching && (
        <div ref={btnRef} className="button_cont">
          <LoadMoreBtn onClick={nextPage} />
        </div>
      )}
      {modalIsOpen && modalImage && (
        <ImageModal
          isOpen={modalIsOpen}
          toogleModal={setIsOpen}
          clearModal={setModalImage}
          modalImage={modalImage}
        />
      )}
    </>
  );
}

export default App;
