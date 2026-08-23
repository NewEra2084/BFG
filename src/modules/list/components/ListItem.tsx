import type { Question } from "@/components/types/question"
import { format } from "date-fns"
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Calendar,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  MoveUp,
  Tag,
  UserRound,
} from "lucide-react"
import { useState, type FC } from "react"
import { InfoBlock } from "./InfoBlock"
import { AlertDialogCustom } from "./AlertDialog"
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import {
  downvote,
  openQuestion,
  swapQuestions,
  upvote,
} from "@/store/slices/questionsStore"
import { useDrag } from "react-dnd"

type Props = {
  question: Question
}

const ItemType = "QUESTION"

const ListItem: FC<Props> = ({ question }) => {
  const dispatch = useDispatch()
  const { selectedQuestionId, swapArray, upVotes } = useSelector(
    (state: RootState) => state.questions
  )
  const [isHover, setIsHover] = useState(false)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: question.question_id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

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

  const handleOpen = (id: number) => {
    if (selectedQuestionId === question_id) {
      dispatch(openQuestion(null))
      return
    }
    dispatch(openQuestion(id))
  }
  const handleChoose = (question: Question) => {
    dispatch(swapQuestions(question))
  }

  const index = upVotes.findIndex((item) => item.id === question_id)
  const isIn = index !== -1

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      data-question-id={question_id}
      className={`list-items m-2 flex ${question_id === selectedQuestionId ? "md:flex-2" : "md:flex-1"} ${is_answered && "ring-2 ring-green-800 outline-1"} flex-col rounded-xl`}
      onClick={(e) => {
        if (e.detail == 1) {
          handleOpen(question_id)
        } else if (e.detail == 2) {
          handleChoose(question)
        }
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <div className="relative rounded-2xl md:flex-1">
        <div
          key={question_id}
          className={`flex h-full items-center ${question_id === selectedQuestionId ? "rounded-t-xl" : "rounded-xl"} ${isDragging ? "bg-green-800" : "bg-main"} px-4 pt-5 pb-8 md:py-0`}
        >
          <p className="max-w-[60%] text-justify text-sm md:pl-7 md:text-start md:text-base">
            {question_id === selectedQuestionId
              ? title
              : title.trim().slice(0, 60) + "..."}
          </p>
          <span className="mr-5 ml-auto text-lg font-bold text-red">
            {!isIn && score}
            {isIn && upVotes[index].state === "down" && score - 1}
            {isIn && upVotes[index].state === "up" && score + 1}
          </span>
          <div className="flex flex-col items-center justify-between gap-2 overflow-hidden rounded-lg">
            <ChevronUp
              className={`bg-black/80 ${isIn && upVotes[index].state === "up" && "bg-green-800"}`}
              onClick={(e) => {
                e.stopPropagation()
                dispatch(upvote(question_id))
              }}
            />
            <ChevronDown
              className={`bg-black/40 ${isIn && upVotes[index].state === "down" && "bg-red"}`}
              onClick={(e) => {
                e.stopPropagation()
                dispatch(downvote(question_id))
              }}
            />
          </div>
        </div>
        <div
          className={`absolute right-0 bottom-0 left-0 ${isHover || swapArray.includes(question) || question_id === selectedQuestionId ? "flex" : "hidden"} justify-center ${question_id === selectedQuestionId ? "" : "rounded-b-xl"} bg-red/30`}
        >
          {swapArray.includes(question) ? (
            <CheckCheck size={24} color="#d3d3d3ca" />
          ) : question_id === selectedQuestionId ? (
            <ArrowUpNarrowWide size={24} color="#d3d3d3ca" />
          ) : (
            <ArrowDownNarrowWide size={24} color="#d3d3d3ca" />
          )}
        </div>
        {selectedQuestionId !== question_id && (
          <div className="absolute top-3 left-4 mb-2 hidden gap-4 pl-5 md:flex">
            {tags.map((tag, id) => (
              <div key={id} className="rounded-3xl bg-red/30 px-2 py-1 text-xs">
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      {question_id === selectedQuestionId && (
        <div className="rounded-b-xl bg-main px-10 pt-2 pb-4">
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
            <InfoBlock icon={<Tag size={16} />} title="Тэги" text={""}>
              <div className="flex gap-1">
                {tags.map((tag, id) => (
                  <div
                    key={id}
                    className="rounded-lg bg-red/30 px-1 py-1 text-xs"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </InfoBlock>
          </div>

          <AlertDialogCustom
            render={
              <div onClick={(e) => e.stopPropagation()}>
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
                  <AlertDialogAction className="w-full">
                    Перейти
                  </AlertDialogAction>
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
