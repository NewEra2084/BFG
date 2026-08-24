import {
  clearSwap,
  fetchQuestions,
  openQuestion,
  setQuestions,
} from "@/store/slices/questionsStore"
import type { AppDispatch, RootState } from "@/store/store"
import { useEffect, useRef, type FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ListAlert } from "./components/ListAlert"
import ListItem from "./components/ListItem"
import { motion } from "motion/react"
import { Skeleton } from "@/components/ui/skeleton"
import { useDrop } from "react-dnd"

// Компонент, обернутый для анимации
const MotionListItem = motion(ListItem)

/**
 * Компонент списка вопросов.
 * Отображает список вопросов с поддержкой загрузки, ошибок, перетаскивания и кликов вне списка.
 */
export const List: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { questions, status, error } = useSelector(
    (state: RootState) => state.questions
  )
  const { chosenDate } = useSelector((state: RootState) => state.dates)
  const listRef = useRef<HTMLDivElement>(null)

  // Загрузка вопросов при изменении выбранной даты
  useEffect(() => {
    dispatch(fetchQuestions(chosenDate))
  }, [dispatch, chosenDate])

  // Закрытие вопроса и очистка swap-массива при клике вне списка
  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      if (
        (listRef.current && !listRef.current.contains(e.target as Node)) ||
        listRef.current == (e.target as Node)
      ) {
        dispatch(openQuestion(null))
        dispatch(clearSwap())
      }
    }

    window.addEventListener("click", handleMouseClick)
    return () => {
      window.removeEventListener("click", handleMouseClick)
    }
  }, [dispatch])

  /**
   * Перемещает вопрос в списке.
   * @param dragId - ID перетаскиваемого вопроса.
   * @param hoverId - ID вопроса, над которым произошёл сброс.
   */
  function moveQuestion(dragId: number, hoverId: number) {
    const dragIndex = questions.findIndex((q) => q.question_id === dragId)
    const hoverIndex = questions.findIndex((q) => q.question_id === hoverId)

    if (dragIndex === -1 || hoverIndex === -1) return

    const newQuestions = [...questions]
    const tmp = [...questions]
    newQuestions[dragIndex] = tmp[hoverIndex]
    newQuestions[hoverIndex] = tmp[dragIndex]

    dispatch(setQuestions(newQuestions))
  }

  // Хук для приёма перетаскиваемых элементов
  const [, drop] = useDrop(() => ({
    accept: "QUESTION",
    drop: (item: { id: number }, monitor) => {
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return

      const elements = document.elementsFromPoint(
        clientOffset.x,
        clientOffset.y
      )
      const targetElement = elements.find((el) =>
        el.classList.contains("list-items")
      )

      if (!targetElement) return

      const hoverId = targetElement.getAttribute("data-question-id")
      if (!hoverId) return

      if (Number(item.id) !== Number(hoverId)) {
        moveQuestion(Number(item.id), Number(hoverId))
      }
    },
  }))

  return (
    <div
      ref={listRef}
      className="no-select mt-10 scrollbar-hide flex flex-1 flex-col overflow-y-scroll rounded-3xl bg-secondary px-5 py-6 shadow-secondary transition-all duration-300 hover:shadow-2xl md:mt-20"
    >
      {status === "loading" &&
        [1, 2, 3, 4, 5].map((_, id) => (
          <Skeleton key={id} className="m-2 flex-1" />
        ))}
      {status === "failed" && (
        <ListAlert
          text={error || "Ошибка запроса"}
          BG="bg-red/80"
          forecolor="text-main"
        />
      )}
      {status === "succeeded" &&
        (questions.length > 0 ? (
          <div
            className="flex flex-1 flex-col"
            ref={drop as unknown as React.Ref<HTMLDivElement>}
          >
            {questions?.map((question) => (
              <MotionListItem
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0}}
                transition={{duration: 0.5, ease:"backOut"}}
                key={question.question_id}
                question={question}
              />
            ))}
          </div>
        ) : (
          <ListAlert
            text={"Вопросов, начиная с этой даты, нету"}
            BG="bg-light/80"
            forecolor="text-main"
          />
        ))}
    </div>
  )
}
