import { DndProvider } from "react-dnd";
import Example from "./example";
import Backend from "react-dnd-html5-backend";
import "./styles.css";

function App() {
  return (
    <DndProvider backend={Backend}>
      <Example />
    </DndProvider>
  );
}

export default App;
