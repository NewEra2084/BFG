import { type FC } from "react";
import { DatePicker } from "./components/DatePicker";

type Props = {};

export const Header: FC<Props> = () => {
  return (
    <header className="flex justify-between pt-5">
      <h1 className="text-4xl text-light flex flex-col md:leading-5 leading-7">
        <span className="text-light/80">React-Redux</span> <span className="text-end md:pl-[84%]">Overflow</span>
      </h1>
      <div className="flex">
        <input />
        <DatePicker/>
      </div>
    </header>
  );
};
