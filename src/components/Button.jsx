import { useState } from "react";
import styles from "./Button.module.css";

function Button({ title, onClick, disabled, id }) {
  const [page, setPage] =useState(1)
  return (
    <button id={id} onClick={onClick} disabled={disabled}data-testid="button-component" className={styles.button}>
      {title}
    </button>
  );
}

export default Button;
