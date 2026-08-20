import type { Question } from "@/components/types/question"
import { format } from "date-fns"
import {
  ArrowDownNarrowWide,
  Calendar,
  ChevronDown,
  ChevronUp,
  MoveUp,
  UserRound,
} from "lucide-react"
import type { FC } from "react"
import { InfoBlock } from "./InfoBlock"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Props = {
  question: Question
}

const ListItem: FC<Props> = ({ question }) => {
  return (
    <div
      className={`m-2 flex ${question.question_id === 79914612 ? "md:flex-2" : "md:flex-1"} ${question.is_answered && "ring-2 ring-green-800 outline-1"} flex-col rounded-xl`}
    >
      <div className="relative md:flex-1 rounded-2xl">
        <div
          key={question.question_id}
          className="flex rounded-xl h-full items-center bg-main px-4 pt-5 pb-8 md:py-0"
        >
          <p className="max-w-[70%] md:pl-7 text-sm md:text-base">
            {question.title}
          </p>
          <span className="mr-5 ml-auto text-lg font-bold text-red">
            {question.score}
          </span>
          <div className="flex flex-col items-center justify-between">
            <ChevronUp />
            <ChevronDown />
          </div>
        </div>
        <div className="absolute right-0 bottom-0 left-0 flex justify-center rounded-b-xl bg-red/30">
          <ArrowDownNarrowWide size={24} color="#d3d3d3ca" />
        </div>
        <div className="hidden absolute top-4 left-4 mb-2 md:flex gap-4 pl-5">
          {question.tags.map((tag, id) => (
            <div key={id} className="rounded-3xl bg-red/30 px-2 py-1 text-xs">
              {tag}
            </div>
          ))}
        </div>
      </div>

      {question.question_id === 79914612 && (
        <div className="bg-main px-10 rounded-b-xl pt-2 pb-4">
          <div className="flex gap-2 md:gap-5 flex-col md:flex-row">
            <InfoBlock
              icon={<MoveUp size={16} />}
              title="Спросил"
              text={question.owner.display_name}
              addiction={question.owner.reputation}
            ></InfoBlock>
            <InfoBlock
              icon={<Calendar size={16} />}
              title="Дата"
              text={format(new Date(question.creation_date * 1000), "PPP")}
            ></InfoBlock>
            <InfoBlock
              icon={<UserRound size={16} />}
              title="Ответов"
              text={question.answer_count.toString()}
            ></InfoBlock>
          </div>

          <AlertDialog>
            <AlertDialogTrigger
              render={
                <div>
                  <h6 className="text-xs text-light/70">Ссылка:</h6>
                  <a className="cursor-pointer border-b text-sm md:text-base">{question.link}</a>
                </div>
              }
            />
            <AlertDialogContent className="bg-main">
              <AlertDialogHeader>
                <AlertDialogTitle>Переход на сайт с вопросом</AlertDialogTitle>
                <AlertDialogDescription>
                  Вы направляетесь на сайт{" "}
                  <span className="text-red/90">StackOverflow.com</span>, сайт
                  не несет ответственности за его действия.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <a href={question.link}>
                  <AlertDialogAction>Перейти</AlertDialogAction>
                </a>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}

export default ListItem
