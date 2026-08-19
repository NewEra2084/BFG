import type { RootState } from "@/store/store"
import { useEffect, useState, type FC } from "react"
import { useDispatch, useSelector } from "react-redux"

export const List: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch()
  const { questions } = useSelector((state: RootState) => state.questions)

  useEffect(() => {

  }, [])

  return (
    <div className="mt-10 min-h-[70vh] w-full rounded-3xl bg-secondary px-5 py-8 shadow-secondary transition-all duration-300 hover:shadow-2xl md:mt-20">
      {questions.map((question) => (
        <div>question</div>
      ))}
    </div>
  )
}
