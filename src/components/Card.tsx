import { License, Repository, User } from "../types/apiResponseData";

interface CardProps {
  label: string;
  value: string;
}

export function Card({ label, value }: CardProps) {
  return (
    <div
      className={`
        px-4 py-6 flex flex-col items-center justify-center
        gap-3 bg-gray-900 rounded-xl
        shadow-xl w-full
      `}
    >
      <h1
        className={`
          text-white font-bold text-center
          text-xl
        `}
      >
        {label}
      </h1>
      <hr
        className={`
          border-none h-px w-full bg-gray-400
        `}
      />
      <h2
        className={`
          text-blue-400 font-bold text-center
          text-3xl
        `}
      >
        {value}
      </h2>
    </div>
  );
}
