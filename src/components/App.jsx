import { useEffect, useState } from "react";

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

  useEffect(() => {
    const searchImages = async () => {
      if(searchWord) {
        try {
          setIsStart(false)
          setIsLoading(true);
          setIsSearching(true);
          const response = await FetchImages(searchWord);
          setImagesArray(response.data.results);
          setCurrentPage(1);
          setTotalPages(response.data.total_pages);
          setIsError(false);
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

  const nextPage = async (offsetTop) => {
    try {
      setIsLoading(true);
      const newPage = currentPage + 1;
      const response = await FetchImages(searchWord, newPage);
      setImagesArray((prevArray) => {
        return [...prevArray, ...response.data.results];
      });
      setCurrentPage(newPage);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  useEffect(() => {
    if(modalImage) {
      setIsOpen(true);
    }
  }, [modalImage])

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
      {totalPages > currentPage && !isSearching && (
        <LoadMoreBtn onClick={nextPage} />
      )}
      <ImageModal isOpen={modalIsOpen} toogleModal={setIsOpen} modalImage={modalImage}  />
    </>
  );
}

export default App;
