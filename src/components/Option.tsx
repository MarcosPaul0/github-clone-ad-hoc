import { ReactElement, ReactNode, useState } from "react";
import { IconType } from "react-icons";

import { GoTriangleRight } from "react-icons/go";

interface OptionProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

export function Option({ icon, label, children }: OptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenOption() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={`
        w-full flex flex-col gap-6 items-center bg-gray-700 rounded-xl
        font-bold px-4 py-2 justify-between cursor-pointer duration-500
        transition-height ease-in-out
        ${!isOpen && "h-14 hover:bg-gray-60"}
      `}
    >
      <span
        className={`
          flex self-start w-full justify-between gap-2 items-center
        `}
        onClick={handleOpenOption}
      >
        <span
          className={`
          flex gap-2 items-center
        `}
        >
          {icon}
          {label}
        </span>
        <GoTriangleRight
          size={20}
          className={`duration-200 ${!isOpen ? "rotate-0" : "rotate-90"}`}
        />
      </span>
      {isOpen && <div className={`w-full flex flex-col gap-3`}>{children}</div>}
    </div>
  );
}
