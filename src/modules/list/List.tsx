import { fetchQuestions, openQuestion } from "@/store/slices/questionsStore"
import type { AppDispatch, RootState } from "@/store/store"
import { useEffect, useRef, type FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ListAlert } from "./components/ListAlert"
import ListItem from "./components/ListItem"
import { Skeleton } from "@/components/ui/skeleton"

export const List: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { questions, status, error } = useSelector(
    (state: RootState) => state.questions
  )
  const { chosenDate } = useSelector((state: RootState) => state.dates)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(fetchQuestions(chosenDate))
  }, [chosenDate])

  useEffect(() => {
    const handleOverClick = (e: MouseEvent) => {
      if (
        (listRef.current && !listRef.current.contains(e.target as Node)) ||
        listRef.current == (e.target as Node)
      ) {
        dispatch(openQuestion(null))
      }
    }
    const handleRightClick = (e: MouseEvent) => {
      if (
        (listRef.current && listRef.current.contains(e.target as Node)) ||
        listRef.current !== (e.target as Node)
      ) {
        dispatch(openQuestion(null))
      }
    }

    window.addEventListener("click", handleOverClick)
    window.addEventListener("contextmenu", handleRightClick)
    
    return () => {
      window.removeEventListener("click", handleOverClick)
      window.removeEventListener("contextmenu", handleRightClick)
    }
  }, [])

  return (
    <div
      ref={listRef}
      className="mt-10 flex flex-1 flex-col overflow-y-scroll rounded-3xl bg-secondary px-5 py-6 shadow-secondary transition-all duration-300 hover:shadow-2xl md:mt-20"
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
          questions?.map((question) => (
            <ListItem key={question.question_id} question={question} />
          ))
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
