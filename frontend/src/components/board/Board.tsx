import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Column from "../column/Column";
import styles from "./board.module.css";

const Board = () => {
  const columns = useSelector((state: RootState) => state.board.columns);

  return (
    <div className={styles.board}>
      {columns.map((col) => (
        <Column key={col.id} column={col} />
      ))}
    </div>
  );
};

export default Board;
