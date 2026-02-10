const API_URL = "http://localhost:5000";

export const getBoard = async (boardId: string) => {
  const res = await fetch(`${API_URL}/boards/${boardId}`);
  if (!res.ok) throw new Error("Failed to load board");
  return res.json();
};
