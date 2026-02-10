import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoard } from "./features/board/boardSlice";
import { getBoard } from "./api/boardAPI";
import type { RootState } from "./app/store";

const BOARD_ID = "ueb0o3"; // встав свій boardId з бекенду

function App() {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.board);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const data = await getBoard(BOARD_ID);
        dispatch(setBoard({ boardId: data.boardId, name: data.name }));
      } catch (err) {
        console.error(err);
      }
    };
    loadBoard();
  }, [dispatch]);

  return (
    <div>
      <h1>{board.name || "Loading..."}</h1>
      {/* Тут потім будемо рендерити Board, Column, Card */}
    </div>
  );
}

export default App;
