import { Header } from "./modules/header"
import { List } from "./modules/list"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export function App() {
  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <List />
      </DndProvider>
    </>
  )
}

export default App
