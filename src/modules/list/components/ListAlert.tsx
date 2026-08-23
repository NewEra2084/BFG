import { type FC } from "react"

type Props = {
  /** Текст сообщения */
  text: string
  /** Цвет фона (Tailwind-класс) */
  BG?: `bg-${string}`
  /** Цвет текста (Tailwind-класс) */
  forecolor?: `text-${string}`
}

/**
 * Компонент для отображения уведомлений в списке.
 * Используется для показа статусов загрузки, ошибок и пустых состояний.
 *
 * @param text - Текст сообщения.
 * @param BG - Цвет фона (Tailwind-класс).
 * @param forecolor - Цвет текста (Tailwind-класс).
 */
export const ListAlert: FC<Props> = ({ text, BG, forecolor }) => {
  return (
    <h2 className="flex flex-1 items-center justify-center md:text-2xl">
      <span className={`rounded-xl ${BG} p-3 text-center ${forecolor}`}>
        {text}
      </span>
    </h2>
  )
}
