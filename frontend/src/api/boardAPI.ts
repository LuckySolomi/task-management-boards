const API_URL = "http://localhost:5000";

export const getBoard = async (boardId: string) => {
  const res = await fetch(`${API_URL}/boards/${boardId}`);
  if (!res.ok) throw new Error("Failed to load board");
  return res.json();
};

export const getCards = async (boardId: string) => {
  const res = await fetch(`${API_URL}/cards/${boardId}`);
  if (!res.ok) throw new Error("Failed to load cards");
  return res.json();
};

export const createCard = async (data: {
  boardId: string;
  column: "todo" | "inprogress" | "done";
  title: string;
  description?: string;
}) => {
  const res = await fetch(`${API_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create card");
  return res.json();
};

export const updateCard = async (
  cardId: string,
  data: { title?: string; description?: string },
) => {
  const res = await fetch(`http://localhost:5000/cards/${cardId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};
