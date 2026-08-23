import {
  AlertDialog,
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
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>{buttons}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
