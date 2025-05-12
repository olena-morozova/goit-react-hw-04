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
      console.log("Response from fetchImages:", response); // тимчасово — дивимось, що приходить
      setImages(response.images);
      setTotal(response.total);
    } catch (error) {
      console.error("Помилка запиту:", error.message);
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
    } catch (error) {
      console.log("Помилка при завантаженні ще зображень:", error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return; // не скролимо після першого запиту

    const cardHeight = document
      .querySelector("ul > li")
      ?.getBoundingClientRect().height;

    if (cardHeight) {
      window.scrollBy({
        top: cardHeight * 3, // приблизно висота одного рядка з 3 картками
        behavior: "smooth",
      });
    }
  }, [images, page]);

  useEffect(() => {
    if (selectedImage) {
      setIsModalOpen(true);
    }
  }, [selectedImage]);

  //console.log(selectedImage);
  const openModal = (largeUrl) => {
    if (selectedImage === largeUrl) return;
    console.log("Клік по картці Url:", largeUrl);
    setSelectImage(largeUrl);
    //setIsModalOpen(true);
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
        <>
          {console.log("Модалка має відкриватися")}
          <ImageModal
            isOpen={isModalOpen}
            onClose={closeModal}
            image={selectedImage}
          />
        </>
      )}
    </div>
  );
}

/*


       {error ? (
        <ErrorMessage />
      ) : (
        <>
          {images.length > 0 && <ImageGallery cards={images} />}
          {loading && <Loader />}
        </>
      )}

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

<ImageGallery cards={images} />

fetch("https://api.unsplash.com/search/photos?query=cat&client_id=zRaCiU2tTRtoQWRD8gVnR0BZl4aKEhF9RQ7L9-gsK8E")
  .then(res => res.json())
  .then(data => console.log(data));

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/
