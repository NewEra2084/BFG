import type { FC } from "react"

type Props = {}

export const List: FC<Props> = () => {
  return (
    <div className="mt-10 md:mt-20 min-h-[50vh] w-full rounded-3xl bg-secondary px-5 py-8 shadow-secondary transition-all duration-300 hover:shadow-2xl">
      List
    </div>
  )
}
