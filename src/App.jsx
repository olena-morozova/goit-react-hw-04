import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { fetchImages } from "./cards-api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (newQuery) => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setImages([]);
    setError(false);
    setLoading(true);
    try {
      const response = await fetchImages(newQuery, 1);
      //console.log("Response from fetchImages:", response); // тимчасово — дивимось, що приходить
      setImages(response.images);
    } catch (error) {
      console.error("Помилка запиту:", error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery cards={images} />}
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
