import { useDispatch } from "react-redux";
import { setBoard, setCards } from "./store/boardSlice";
import { getBoard, getCards } from "./api/boardAPI";
import Board from "./components/board/Board";
import BoardLoader from "./components/boardLoader/BoardLoader";
import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();

  //const BOARD_ID = "fxbewg";

  const handleLoadBoard = async (boardId: string) => {
    try {
      const boardData = await getBoard(boardId);

      dispatch(
        setBoard({
          boardId: boardData.boardId,
          name: boardData.name,
        }),
      );

      const cards = await getCards(boardData.boardId);
      dispatch(setCards(cards));
    } catch (err) {
      console.error("Failed to load board:", err);
    }
  };

  return (
    <div className={styles.appContainer}>
      <BoardLoader onLoad={handleLoadBoard} />
      <h2>Test board ID: fxbewg</h2>
      <Board />
    </div>
  );
}

export default App;
