import type { Question } from "@/components/types/question"
import { format } from "date-fns"
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Calendar,
  ChevronDown,
  ChevronUp,
  MoveUp,
  UserRound,
} from "lucide-react"
import { useEffect, type FC } from "react"
import { InfoBlock } from "./InfoBlock"
import { AlertDialogCustom } from "./AlertDialog"
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { openQuestion, swapQuestions } from "@/store/slices/questionsStore"

type Props = {
  question: Question
}

const ListItem: FC<Props> = ({ question }) => {
  const dispatch = useDispatch()
  const { selectedQuestionId, swapArray } = useSelector(
    (state: RootState) => state.questions
  )

  const {
    question_id,
    title,
    answer_count,
    is_answered,
    link,
    owner,
    score,
    tags,
    creation_date,
  } = question

  const handleOpen = (id) => {
    console.log(swapArray)

    if (swapArray.includes(id)) return
    dispatch(openQuestion(id))
  }
  const handleChoose = (id) => {
    dispatch(swapQuestions(id))
  }

  return (
    <div
      className={`m-2 flex ${question_id === selectedQuestionId ? "md:flex-2" : "md:flex-1"} ${is_answered && "ring-2 ring-green-800 outline-1"} flex-col rounded-xl`}
      onClick={(e) => {
        if (e.detail == 1) {
          handleOpen(question_id)
        } else if (e.detail == 2) {
          dispatch(openQuestion(null))
          handleChoose(question)
        }
      }}
      onDoubleClick={() => handleChoose}
    >
      <div className="relative rounded-2xl md:flex-1">
        <div
          key={question_id}
          className={`flex h-full items-center ${question_id === selectedQuestionId ? "rounded-t-xl" : "rounded-xl"} ${swapArray.includes(question) ? "bg-green-300" : "bg-main"} px-4 pt-5 pb-8 md:py-0`}
        >
          <p className="max-w-[70%] text-sm md:pl-7 md:text-base">{title}</p>
          <span className="mr-5 ml-auto text-lg font-bold text-red">
            {score}
          </span>
          <div className="flex flex-col items-center justify-between">
            <ChevronUp />
            <ChevronDown />
          </div>
        </div>
        <div
          className={`absolute right-0 bottom-0 left-0 flex justify-center ${question_id === selectedQuestionId ? "" : "rounded-b-xl"} bg-red/30`}
        >
          {question_id === selectedQuestionId ? (
            <ArrowUpNarrowWide size={24} color="#d3d3d3ca" />
          ) : (
            <ArrowDownNarrowWide size={24} color="#d3d3d3ca" />
          )}
        </div>
        <div className="absolute top-4 left-4 mb-2 hidden gap-4 pl-5 md:flex">
          {tags.map((tag, id) => (
            <div key={id} className="rounded-3xl bg-red/30 px-2 py-1 text-xs">
              {tag}
            </div>
          ))}
        </div>
      </div>

      {question_id === selectedQuestionId && (
        <div
          className="rounded-b-xl bg-main px-10 pt-2 pb-4"
        >
          <div className="flex flex-col gap-2 md:flex-row md:gap-5">
            <InfoBlock
              icon={<MoveUp size={16} />}
              title="Спросил"
              text={owner.display_name}
              addiction={owner.reputation}
            ></InfoBlock>
            <InfoBlock
              icon={<Calendar size={16} />}
              title="Дата"
              text={format(new Date(creation_date * 1000), "PPP")}
            ></InfoBlock>
            <InfoBlock
              icon={<UserRound size={16} />}
              title="Ответов"
              text={answer_count.toString()}
            ></InfoBlock>
          </div>

          <AlertDialogCustom
            render={
              <div>
                <h6 className="text-xs text-light/70">Ссылка:</h6>
                <a className="cursor-pointer border-b text-sm md:text-base">
                  {link}
                </a>
              </div>
            }
            buttons={
              <>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <a href={question.link}>
                  <AlertDialogAction>Перейти</AlertDialogAction>
                </a>
              </>
            }
            title="Переход на сайт с вопросом"
            description={
              <p>
                Вы направляетесь на сайт
                <span className="text-red/90"> StackOverflow.com</span>, сайт не
                несет ответственности за его действия.
              </p>
            }
          />
        </div>
      )}
    </div>
  )
}

export default ListItem
