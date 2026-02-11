import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import styles from "./Card.module.css";

interface Props {
  card: {
    boardId: string;
    title: string;
    description?: string;
    column: "todo" | "inprogress" | "done";
  };
  onDelete: () => void;
  onEdit: () => void;
}

const Card = ({ card, onDelete, onEdit }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4>{card.title}</h4>
        <p className={styles.description}>
          {card.description?.trim() ? card.description : "Add description"}
        </p>
        <div className={styles.actions}>
          <PencilIcon className={styles.icon} onClick={onEdit} />
          <TrashIcon className={styles.icon} onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default Card;
