import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  addCardThunk,
  updateCardThunk,
  deleteCardThunk,
} from "../../store/cardsThunks";
import { useAppDispatch } from "../../store/hooks";
import Card from "../card/Card";
import styles from "./Column.module.css";
import type { Card as CardType } from "../../store/boardSlice";

interface ColumnProps {
  column: {
    id: "todo" | "inprogress" | "done";
    title: string;
    cards: CardType[];
  };
}

const Column = ({ column }: ColumnProps) => {
  const dispatch = useAppDispatch();
  const boardId = useSelector((state: RootState) => state.board.boardId);

  const handleAddCard = () => {
    if (!boardId) return;

    dispatch(
      addCardThunk({
        boardId,
        column: column.id,
      }),
    );
  };

  const handleEdit = (card: CardType) => {
    const newTitle = prompt("New title", card.title);
    if (!newTitle) return;

    dispatch(
      updateCardThunk({
        boardId: card.id, // ← це і є ID карточки на бекенді
        title: newTitle,
        description: card.description,
      }),
    );
  };

  const handleDelete = (card: CardType) => {
    dispatch(deleteCardThunk(card.id)); // ← id = boardId на сервері
  };

  return (
    <div className={styles.column}>
      <h2>{column.title}</h2>

      <div className={styles.cards}>
        {column.cards.length === 0 && (
          <p className={styles.empty}>No cards yet</p>
        )}

        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={{
              boardId: card.id,
              title: card.title,
              description: card.description,
              column: card.column,
            }}
            onDelete={() => handleDelete(card)}
            onEdit={() => handleEdit(card)}
          />
        ))}
      </div>

      <button className={styles.addButton} onClick={handleAddCard}>
        ＋ Add card
      </button>
    </div>
  );
};

export default Column;
