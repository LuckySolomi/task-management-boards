import { useState } from "react";
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
import EditCardModal from "../editCardModal/EditCardModal";
import Notification from "../uiToolkit/notification/Notification";

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

  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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
    setEditingCard(card);
  };

  const handleSave = (title: string, description: string) => {
    if (!editingCard) return;

    dispatch(
      updateCardThunk({
        cardId: editingCard.id,
        title,
        description,
      }),
    );

    setEditingCard(null);
    setNotification("Card updated");
  };

  const handleDelete = (card: CardType) => {
    dispatch(deleteCardThunk(card.id));
    setNotification("Card deleted");
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
              boardId: boardId!,
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

      {editingCard && (
        <EditCardModal
          initialTitle={editingCard.title}
          initialDescription={editingCard.description}
          onClose={() => setEditingCard(null)}
          onSave={handleSave}
        />
      )}

      {notification && (
        <Notification onCloseClick={() => setNotification(null)}>
          {notification}
        </Notification>
      )}
    </div>
  );
};

export default Column;
