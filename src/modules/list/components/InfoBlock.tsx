import type { FC, ReactNode } from "react"

type Props = {
  icon: ReactNode
  addiction?: string | number
  text: string
  title: string
}

export const InfoBlock: FC<Props> = ({ icon, addiction, text, title }) => {
  return (
    <div>
      <h6 className="text-xs text-light/70">{title}:</h6>
      <p className="flex items-center">
        <span className="mr-3 flex items-center gap-0 text-sm md:text-lg font-bold text-red/90">
          {icon}
          {addiction || ""}
        </span>
        <span className="text-sm md:text-base">{text}</span>
      </p>
    </div>
  )
}
