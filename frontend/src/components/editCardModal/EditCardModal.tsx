import { useState } from "react";
import Modal from "../uiToolkit/modal/Modal";
import Button from "../uiToolkit/button/Button";
import styles from "./EditCardModal.module.css";

interface Props {
  initialTitle: string;
  initialDescription?: string;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

const EditCardModal = ({
  initialTitle,
  initialDescription,
  onClose,
  onSave,
}: Props) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription || "");

  return (
    <Modal title="Edit card" onOverlayClick={onClose} onCloseClick={onClose}>
      <div className={styles.form}>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <Button variant="primary" onClick={() => onSave(title, description)}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default EditCardModal;
