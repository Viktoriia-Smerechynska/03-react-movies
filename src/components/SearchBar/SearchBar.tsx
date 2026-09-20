import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

// Інтерфейс для пропсів відповідно до вимог
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  // Використовуємо сучасний підхід React 19 — Form Actions
  const handleSearchAction = (formData: FormData): void => {
    const query = formData.get("query") as string;
    const trimmedQuery = query ? query.trim() : "";

    // Валідація порожнього поля в момент відправки
    if (!trimmedQuery) {
      toast.error("Please enter your search query.");
      return;
    }

    // Передаємо валідне значення в App
    onSubmit(trimmedQuery);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        {/* Підключаємо обробник через атрибут action */}
        <form action={handleSearchAction} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
