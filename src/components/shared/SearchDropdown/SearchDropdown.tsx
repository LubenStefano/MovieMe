import styles from "./SearchDropdown.module.css";
import React, { useRef, useEffect } from "react";

interface SearchDropdownProps {
  results: Array<{ id: number; src: string; title: string }>;

  onSelect: (id: number) => void;
  visible: boolean;
  onBlur?: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ results, onSelect, visible, onBlur }) => {
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!visible) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onBlur && onBlur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible, onBlur]);

  if (!visible || results.length === 0) return null;
  return (
    <ul className={styles.dropdown} ref={dropdownRef} tabIndex={-1}>
      {results.map((item, idx) => (
        <li
          key={item.id}
          className={styles.item}
          style={{ animationDelay: `${idx * 0.04}s` }}
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent input blur before click
            onSelect(item.id);
          }}
        >
          <img src={item.src} alt={item.title} className={styles.thumbnail} />
          <span className={styles.title}>{item.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchDropdown;
