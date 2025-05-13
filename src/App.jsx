import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { fetchImages } from "./cards-api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import Modal from "react-modal";
Modal.setAppElement("#root");

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedImage, setSelectImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isEndOfCollection = images.length >= total;

  const handleSearch = async (newQuery) => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(false);
    setLoading(true);

    try {
      const response = await fetchImages(newQuery, 1);
      setImages(response.images);
      setTotal(response.total);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const response = await fetchImages(query, nextPage);
      setImages((prev) => [...prev, ...response.images]);
      setPage(nextPage);
      setTotal(response.total);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;

    const cardHeight = document
      .querySelector("ul > li")
      ?.getBoundingClientRect().height;

    if (cardHeight) {
      window.scrollBy({
        top: cardHeight * 3,
        behavior: "smooth",
      });
    }
  }, [images, page]);

  useEffect(() => {
    if (selectedImage) {
      setIsModalOpen(true);
    }
  }, [selectedImage]);

  const openModal = (card) => {
    if (selectedImage?.id === card.id) return;
    setSelectImage(card);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
      {error ? (
        <ErrorMessage />
      ) : (
        <>
          {images.length > 0 && (
            <ImageGallery cards={images} onImageClick={openModal} />
          )}
          {loading && <Loader />}
        </>
      )}
      {images.length > 0 && !loading && !isEndOfCollection && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}
