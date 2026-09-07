import type { Owner, Question } from "@/components/types/question"
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
import ReactMarkdown from "react-markdown"
import { forwardRef, useRef, useState, type ForwardedRef } from "react"
import { motion } from "motion/react"
import { InfoBlock } from "./InfoBlock"
import { AlertSite } from "./AlertDialog"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import {
  downvote,
  openQuestion,
  setQuestions,
  swapQuestions,
  upvote,
  type Upvote,
} from "@/store/slices/questionsStore"
import { useDrag, useDrop } from "react-dnd"

type Props = {
  /** Объект вопроса */
  question: Question
}

const ItemType = {
  question: "QUESTION",
}

/**
 * Компонент элемента списка вопросов.
 * Отображает карточку вопроса с возможностью открытия, голосования и перетаскивания.
 *
 * @param question - Объект вопроса.
 */
const ListItem = forwardRef<HTMLDivElement, Props>(
  ({ question }, ref: ForwardedRef<HTMLDivElement>) => {
    const dispatch = useDispatch()
    const { selectedQuestionId, swapArray, upVotes, questions } = useSelector(
      (state: RootState) => state.questions
    )
    const [isHover, setIsHover] = useState(false)
    const isDoubleClick = useRef(false)

    // Drag and Drop
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemType.question,
      item: question,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }))

    const [{}, drop] = useDrop(
      () => ({
        accept: ItemType.question,
        drop: (item: Question) => {
          if (question.question_id !== item.question_id) {
            const first = questions.find(
              (i) => i.question_id === item.question_id
            )
            const second = questions.find(
              (i) => i.question_id === question.question_id
            )
            if (!first || !second) return

            const firstIndex = questions.indexOf(first)
            const secondIndex = questions.indexOf(second)

            const newItems = [...questions]
            newItems[firstIndex] = second
            newItems[secondIndex] = first

            dispatch(setQuestions(newItems))
          }
        },
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }),
      [questions]
    )

    const { question_id, title, is_answered, owner, score, tags } = question

    /**
     * Открывает или закрывает карточку вопроса.
     * При повторном клике по выбранному вопросу закрывает его.
     */
    const handleOpen = (id: number | null) => {
      if (selectedQuestionId === question_id) {
        dispatch(openQuestion(null))
        return
      }
      dispatch(openQuestion(id))
    }

    /**
     * Добавляет вопрос в массив для обмена.
     */
    const handleChoose = (question: Question) => {
      dispatch(swapQuestions(question))
    }

    return (
      <div
        ref={ref}
        className={`${question_id === selectedQuestionId ? "md:flex-2" : "md:flex-1"} m-2`}
      >
        <div
          ref={drop as unknown as React.Ref<HTMLDivElement>}
          className="h-full"
        >
          <div
            ref={drag as unknown as React.Ref<HTMLDivElement>}
            className={`flex h-full md:max-h-56 ${is_answered && "ring-2 ring-green-800 outline-1"} flex-col rounded-xl`}
            onClick={() => {
              setTimeout(() => {
                if (!isDoubleClick.current) {
                  handleOpen(question_id)
                }
              }, 180)
            }}
            onDoubleClick={() => {
              isDoubleClick.current = true
              handleChoose(question)
              selectedQuestionId && handleOpen(null)
              setTimeout(() => {
                isDoubleClick.current = false
              }, 300)
              return
            }}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          >
            <div className="relative rounded-2xl md:flex-1">
              <div
                key={question_id}
                className={`flex h-full items-center ${question_id === selectedQuestionId ? "rounded-t-xl" : "rounded-xl"} ${isDragging ? "bg-green-800" : "bg-main"} px-4 pt-5 pb-8 md:py-0`}
              >
                <code className="max-w-[60%] text-justify text-sm md:pl-7 md:text-start md:text-base">
                  <ReactMarkdown>
                    {question_id === selectedQuestionId
                      ? title
                      : title.trim().slice(0, 60) + "..."}
                  </ReactMarkdown>
                </code>

                <RatingBlock
                  upVotes={upVotes}
                  questionData={{ score, question_id }}
                />
              </div>
              <div
                className={`absolute right-0 bottom-0 left-0 ${isHover || swapArray.includes(question) || question_id === selectedQuestionId ? "flex" : "hidden"} justify-center ${question_id === selectedQuestionId ? "" : "rounded-b-xl"} bg-red/30`}
              >
                {swapArray.includes(question) ? (
                  <CheckCheck size={24} color="#d3d3d3ca" />
                ) : question_id === selectedQuestionId ? (
                  <ArrowUpNarrowWide size={16} color="#d3d3d3ca" />
                ) : (
                  <ArrowDownNarrowWide size={24} color="#d3d3d3ca" />
                )}
              </div>
              {selectedQuestionId !== question_id && (
                <div className="absolute top-3 left-4 mb-2 hidden gap-4 pl-5 md:flex">
                  {tags.map((tag, id) => (
                    <div
                      key={id}
                      className="rounded-3xl bg-red/30 px-2 py-1 text-xs"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {question_id === selectedQuestionId && (
              <QuestionDetails owner={owner} question={question} />
            )}
          </div>
        </div>
      </div>
    )
  }
)

function QuestionDetails({
  owner,
  question,
}: {
  owner: Owner
  question: Question
}) {
  return (
    <div className="rounded-b-xl bg-main px-10 pt-2 pb-4">
      <div className="flex flex-col gap-2 md:flex-row md:gap-5">
        <InfoBlock
          icon={<MoveUp size={16} />}
          title="Спросил"
          text={owner.display_name}
          addiction={owner.reputation}
        />
        <InfoBlock
          icon={<Calendar size={16} />}
          title="Дата"
          text={format(new Date(question.creation_date * 1000), "PPP")}
        />
        <InfoBlock
          icon={<UserRound size={16} />}
          title="Ответов"
          text={question.answer_count.toString()}
        />
        <InfoBlock icon={<Tag size={16} />} title="Тэги" text={""}>
          <div className="flex gap-1 items-center flex-wrap my-2">
            {question.tags.map((tag, id) => (
              <div key={id} className="rounded-lg bg-red/30 px-1 py-1 text-xs h-fit">
                {tag}
              </div>
            ))}
          </div>
        </InfoBlock>
      </div>
      <AlertSite link={question.link} />
    </div>
  )
}

function RatingBlock({
  upVotes,
  questionData,
}: {
  upVotes: Upvote[]
  questionData: Pick<Question, "question_id" | "score">
}) {
  const dispatch = useDispatch()
  const { question_id, score } = questionData
  const index = upVotes.findIndex((item) => item.id === question_id)
  const isIn = index !== -1

  return (
    <>
      <span className="mr-5 ml-auto text-lg font-bold text-red">
        <motion.span
          key={
            score +
            (isIn
              ? upVotes[index]?.state === "up"
                ? 1
                : upVotes[index]?.state === "down"
                  ? -1
                  : 0
              : 0)
          }
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {!isIn && score}
          {isIn && upVotes[index]?.state === "down" && score - 1}
          {isIn && upVotes[index]?.state === "up" && score + 1}
          {isIn && !upVotes[index] && score}
        </motion.span>
      </span>
      <div className="flex flex-col items-center justify-between gap-2 overflow-hidden rounded-lg">
        <motion.div
          whileTap={{ rotate: 30 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ChevronUp
            className={`bg-black/80 ${isIn && upVotes[index].state === "up" && "bg-green-800"}`}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(upvote(question_id))
            }}
          />
        </motion.div>

        <motion.div
          whileTap={{ rotate: -30 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ChevronDown
            className={`bg-black/40 ${isIn && upVotes[index].state === "down" && "bg-red"}`}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(downvote(question_id))
            }}
          />
        </motion.div>
      </div>
    </>
  )
}

ListItem.displayName = "ListItem"

export default ListItem
