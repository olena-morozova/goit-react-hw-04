import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");
  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      toast.error("Please enter a search term!");
      return;
    }
    onSubmit(trimmedQuery); //передаємо в Арр
    setQuery(""); //очищаємо інпут
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
}
