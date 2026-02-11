import { useState } from "react";
import styles from "./BoardLoader.module.css";
import Button from "../button/Button";

type Props = {
  onLoad: (boardId: string) => void;
};

function BoardLoader({ onLoad }: Props) {
  const [boardId, setBoardId] = useState("");

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder="Enter board ID..."
        value={boardId}
        onChange={(e) => setBoardId(e.target.value)}
      />

      <Button
        variant="primary"
        onClick={() => onLoad(boardId)}
        disabled={!boardId}
      >
        Load board
      </Button>
    </div>
  );
}

export default BoardLoader;
