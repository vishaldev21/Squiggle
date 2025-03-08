import { getSnapshot, Tldraw, loadSnapshot, Editor } from "tldraw";
import "tldraw/tldraw.css";

function Board() {
  //   const [editor, setEditor] = useState<Editor>();
  //   const save = useCallback(() => {
  //     const { document, session } = getSnapshot(editor?.store!);
  //     localStorage.setItem("snapshot", JSON.stringify({ document, session }));
  //   }, [editor]);

  //   const load = useCallback(() => {
  //     const snapshot = localStorage.getItem("snapshot");
  //     if (!snapshot) return;

  //     // [4]
  //     loadSnapshot(editor?.store!, JSON.parse(snapshot));
  //   }, [editor]);
  return (
    <div style={{ position: "fixed", inset: 0 }} className="h-[50%]">
      <Tldraw
        inferDarkMode
        forceMobile
        onMount={(editor) => {
          //   setEditor(editor);

          // Listen for store updates
          editor.store.listen(() => console.log(getSnapshot(editor.store)));
        }}
      />
    </div>
  );
}

export default Board;
