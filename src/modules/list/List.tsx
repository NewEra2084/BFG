import { fetchQuestions } from "@/store/slices/questionsStore"
import type { AppDispatch, RootState } from "@/store/store"
import { useEffect, type FC } from "react"
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

  useEffect(() => {
    dispatch(fetchQuestions(chosenDate))
  }, [chosenDate])

  return (
    <div className="mt-10 flex flex-1 flex-col rounded-3xl bg-secondary px-5 py-8 shadow-secondary transition-all duration-300 hover:shadow-2xl md:mt-20">
      {status === "loading" && [1,2,3,4,5].map(skeleton=><Skeleton className="flex-1 m-2"/>)}
      {status === "failed" && (
        <ListAlert
          text={error || "Ошибка запроса"}
          BG="bg-red/80"
          forecolor="text-main"
        />
      )}
      {status === "succeeded" &&
        (questions.length > 0 ? (
          questions?.map((question) => <ListItem question={question} />)
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
