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
  render: ReactElement
  buttons: ReactElement
  title: string
  description: ReactNode
}

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
