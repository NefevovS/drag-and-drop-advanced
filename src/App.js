import "./App.css";
import { useState } from "react";

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Сделать",
      items: [
        { id: 1, title: "Сходить в магазин" },
        { id: 2, title: "Выкинуть мусор" },
        { id: 3, title: "Lorem" },
        { id: 4, title: "Ipsum" },
        { id: 5, title: "Что-то сделать" },
        { id: 6, title: "оывлофтаф" },
        { id: 7, title: "Сфывфывфыа" },
        { id: 8, title: "ываываываыва" },
        { id: 9, title: "ываываываывацуацуа" },
      ],
    },
    { id: 2, title: "Проверить", items: [] },
    { id: 3, title: "Сделано", items: [] },
  ]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragOverHandler(event) {
    event.preventDefault();
    if (event.target.className === "item")
      event.target.style.boxShadow = "0 2px 3px gray";
  }

  function dragLeaveHandler(event) {
    if (event.target.className === "item")
      event.target.style.boxShadow = "none";
  }

  function dragStartHandler(event, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHanler(event) {
    if (event.target.className === "item")
      event.target.style.boxShadow = "none";
  }

  function onDropHandler(event, board, item) {
    event.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) return board;
        if (b.id === currentBoard.id) return currentBoard;
        return b;
      })
    );
  }

  function dropCardHandler(event, board) {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) return board;
        if (b.id === currentBoard.id) return currentBoard;
        return b;
      })
    );
    event.target.style.boxShadow = "none";
  }

  return (
    <div className="app">
      {boards.map((board) => {
        return (
          <div
            className="board"
            onDragOver={(event) => dragOverHandler(event)}
            onDrop={(event) => dropCardHandler(event, board)}
          >
            <div className="board__title">{board.title}</div>
            {board.items.map((item) => (
              <div
                className="item"
                draggable={true}
                onDragOver={(event) => dragOverHandler(event)}
                onDragLeave={(event) => dragLeaveHandler(event)}
                onDragStart={(event) => dragStartHandler(event, board, item)}
                onDragEnd={(event) => dragEndHanler(event)}
                onDrop={(event) => onDropHandler(event, board, item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default App;
