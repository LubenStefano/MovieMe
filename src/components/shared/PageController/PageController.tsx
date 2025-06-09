import React from "react";
import styles from "./PageController.module.css";

interface PageControllerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageController: React.FC<PageControllerProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Calculate page numbers to show: previous 2, current, next 2
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);
  // Always show 5 buttons if possible
  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(totalPages, start + 4);
    } else if (end === totalPages) {
      start = Math.max(1, end - 4);
    }
  }
  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles["controllerContainer"]}>
      <div>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={styles["controllerButton"]}
        >
          Prev
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={
              page === currentPage
                ? `${styles["pageButton"]} ${styles["activePageButton"]}`
                : styles["pageButton"]
            }
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={styles["controllerButton"]}
        >
          Next
        </button>
      </div>
      <div className={styles["totalPages"]}>Total pages: {totalPages}</div>
    </div>
  );
};

export default PageController;
