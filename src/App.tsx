import { Header } from "./modules/header"
import { List } from "./modules/list"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"

export function App() {
  const isMobile = "ontouchstart" in window

  return (
    <>
      <Header />
      <DndProvider
        backend={!isMobile ? HTML5Backend : TouchBackend}
        options={{
          enableMouseEvents: true,
          delayTouchStart: 200,
        }}
      >
        <List />
      </DndProvider>
    </>
  )
}

export default App
