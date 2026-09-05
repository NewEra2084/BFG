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
import type { FC, ReactElement, ReactNode } from "react"

type Props = {
  /** Элемент-триггер для открытия диалога */
  render: ReactElement
  /** Кнопки управления диалогом */
  buttons: ReactElement
  /** Заголовок диалога */
  title: string
  /** Описание/содержимое диалога */
  description: ReactNode
}

/**
 * Кастомный компонент AlertDialog.
 * Позволяет передать произвольный триггер, кнопки и содержимое.
 *
 * @param render - Элемент-триггер для открытия диалога.
 * @param buttons - Кнопки управления диалогом.
 * @param title - Заголовок диалога.
 * @param description - Описание/содержимое диалога.
 */
export const AlertDialogCustom: FC<Props> = ({
  render,
  buttons,
  title,
  description,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger nativeButton={false} render={render} />
      <AlertDialogContent className="bg-main">
        <AlertDialogHeader>
          <AlertDialogTitle className={"text-light"}>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="text-light">{buttons}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function AlertSite({
  link,
  site = "StackOverflow.com",
}: {
  link: string
  site?: string
}) {
  return (
    <AlertDialogCustom
      render={
        <div onClick={(e) => e.stopPropagation()}>
          <h6 className="text-xs text-light/70">Ссылка:</h6>
          <a className="cursor-pointer border-b text-sm md:text-base">{link}</a>
        </div>
      }
      buttons={
        <>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <a href={link}>
            <AlertDialogAction className="w-full">Перейти</AlertDialogAction>
          </a>
        </>
      }
      title="Переход на сайт с вопросом"
      description={
        <p>
          Вы направляетесь на сайт {" "}
          <span className="text-red/90">{site}</span>, сайт не несет
          ответственности за его действия.
        </p>
      }
    />
  )
}
