import { type FC } from "react"

type Props = {
  text: string
  BG?: `bg-${string}`
  forecolor?: `text-${string}`
}

export const ListAlert: FC<Props> = ({ text, BG, forecolor }) => {
  return (
    <h2 className="flex flex-1 items-center justify-center md:text-2xl">
      <span className={`rounded-xl ${BG} p-3 text-center ${forecolor}`}>
        {text}
      </span>
    </h2>
  )
}
