import { useRef } from 'react';
import { useKey } from '../hooks/useKey';

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  useKey(() => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery('');
  }, 'Enter');

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default Search;
