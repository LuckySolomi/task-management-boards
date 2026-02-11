import type { ReactNode, MouseEvent } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  children: ReactNode;
  onOverlayClick: () => void;
  onCloseClick: () => void;
}

function Modal({ title, children, onOverlayClick, onCloseClick }: ModalProps) {
  const handleContainerClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={onOverlayClick} className={styles.modalOverlay}>
      <div onClick={handleContainerClick} className={styles.modalContainer}>
        <h1>{title}</h1>
        <hr />

        <div>{children}</div>

        <button onClick={onCloseClick} className={styles.closeBtn}>
          <XMarkIcon className={styles.closeIcon} />
        </button>
      </div>
    </div>
  );
}

export default Modal;
