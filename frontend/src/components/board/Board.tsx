import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Column from "../column/Column";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useAppDispatch } from "../../store/hooks";
import { moveCardThunk } from "../../store/cardsThunks";
import styles from "./board.module.css";

const Board = () => {
  const columns = useSelector((state: RootState) => state.board.columns);
  const dispatch = useAppDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const cardId = active.id as string;
    const newColumn = over.id as "todo" | "inprogress" | "done";

    dispatch(
      moveCardThunk({
        cardId,
        column: newColumn,
        order: 0,
      }),
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.board}>
        {columns.map((col) => (
          <Column key={col.id} column={col} />
        ))}
      </div>
    </DndContext>
  );
};
export default Board;
