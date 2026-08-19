import type { Question } from "@/components/types/question"
import { ArrowDownNarrowWide } from "lucide-react"
import type { FC } from "react"

type Props = {
  question: Question
}

const ListItem: FC<Props> = ({ question }) => {
  return (
    <div className="m-2 flex-1 overflow-hidden rounded-xl flex flex-col">
      <div key={question.question_id} className="bg-main flex-1 p-4">
        <p className="max-w-[70%] truncate">{question.title}</p>
      </div>
      <div className="flex justify-center rounded-b-xl bg-main/50">
        <ArrowDownNarrowWide size={36} color="#d3d3d3ca" />
      </div>
    </div>
  )
}

export default ListItem
