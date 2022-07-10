import { AiFillGithub } from "react-icons/ai";

export function Logo() {
  return (
    <span
      className={`text-lg font-bold flex items-center justify-center gap-2`}
    >
      <AiFillGithub size={45} />
      Github Clone
    </span>
  );
}
