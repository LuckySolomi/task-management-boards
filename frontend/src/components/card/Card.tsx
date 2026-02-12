import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import styles from "./Card.module.css";

interface Props {
  card: {
    cardId: string;
    title: string;
    description?: string;
    column: "todo" | "inprogress" | "done";
  };
  onDelete: () => void;
  onEdit: () => void;
}

const Card = ({ card, onDelete, onEdit }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.cardId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.card}>
      <div {...listeners} {...attributes}>
        <div className={styles.header}>
          <h4>{card.title}</h4>

          <p className={styles.description}>
            {card.description?.trim() ? card.description : "Add description"}
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <PencilIcon
          className={styles.icon}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onEdit();
          }}
        />
        <TrashIcon
          className={styles.icon}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
    </div>
  );
};

export default Card;
