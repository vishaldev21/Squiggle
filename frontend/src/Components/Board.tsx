import { useEffect, useState } from "react";
import { getSnapshot, Tldraw, Editor, loadSnapshot } from "tldraw";
import "tldraw/tldraw.css";
import { useGameContext } from "../Context/GameContext";
import { useUserContext } from "../Context/UserContext";
import { useSocketContext } from "../Context/SocketContext";
import { ACTIONS } from "../utils/Actions";
import { useParams } from "react-router-dom";

function Board() {
  const [editor, setEditor] = useState<Editor | null>(null);
  const { accessUser, setInitialBoardState, initialBoardState } =
    useGameContext();
  const { username } = useUserContext();
  const { socket } = useSocketContext();
  const { roomId } = useParams();

  useEffect(() => {
    if (accessUser?.username !== username && editor) {
      editor.updateInstanceState({ isReadonly: true });
    } else {
      editor?.updateInstanceState({ isReadonly: false });
    }

    if (editor) {
      editor.store.listen(() => {
        if (accessUser?.username === username) {
          socket?.emit(ACTIONS.BOARD_CHANGE, {
            roomId,
            boardData: getSnapshot(editor.store),
          });
        }
      });
    }

    socket?.on(ACTIONS.BOARD_CHANGE, ({ boardData }) => {
      if (editor) {
        loadSnapshot(editor?.store, boardData);
      }
    });

    socket?.on(ACTIONS.REFRESH_BOARD, () => {
      console.log("called");
      if (editor && initialBoardState) {
        loadSnapshot(editor.store, initialBoardState);
      }
    });

    return () => {
      socket?.off(ACTIONS.BOARD_CHANGE);
      socket?.off(ACTIONS.REFRESH_BOARD);
    };
  }, [
    accessUser?.username,
    editor,
    initialBoardState,
    roomId,
    socket,
    username,
  ]);
  return (
    <div
      style={{ width: "100%", height: "50vh", position: "relative" }}
      className="h-[50%]"
    >
      <Tldraw
        inferDarkMode
        forceMobile
        onMount={(editor) => {
          setEditor(editor);
          setInitialBoardState(getSnapshot(editor.store));
        }}
      />
    </div>
  );
}

export default Board;
