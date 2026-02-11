import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoard, setCards } from "./features/board/boardSlice";
import { getBoard, getCards } from "./api/boardAPI";
import type { RootState } from "./store/store";
import Board from "./components/board/Board";

const BOARD_ID = "fxbewg";

function App() {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.board);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const boardData = await getBoard(BOARD_ID);

        dispatch(
          setBoard({
            boardId: boardData.boardId,
            name: boardData.name,
          }),
        );

        const cards = await getCards(boardData.boardId);
        dispatch(setCards(cards));
      } catch (err) {
        console.error(err);
      }
    };

    loadBoard();
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ padding: "16px" }}>{board.name}</h1>
      <Board />
    </div>
  );
}

export default App;
