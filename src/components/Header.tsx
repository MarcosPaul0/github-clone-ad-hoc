import { useState } from "react";
import { AiFillGithub, AiOutlineMenu } from "react-icons/ai";
import { Logo } from "./Logo";

interface HeaderProps {
  handleToggleSidebar: () => void;
  handleSelect: (option: 'table'|'dashboard') => void;
  selected: 'table'|'dashboard';
}

export function Header({ handleToggleSidebar, handleSelect, selected }: HeaderProps) {
  return (
    <header
      className={`
        bg-gray-900 text-gray-50 h-16 w-full flex items-center 
        justify-between pr-24 drop-shadow-lg sticky top-0 z-10
      `}
    >
      <span className={`flex items center`}>
        <button className={`pl-5 pr-8`} onClick={handleToggleSidebar}>
          <AiOutlineMenu size={40} />
        </button>

        <Logo />
      </span>

      <ul className={`flex items-center gap-10 relative`}>
        <li className={`
            flex justify-center p-5 cursor-pointer relative
            ease-linear duration-200
            font-bold after:content-[''] after:absolute after:rounded-lg after:bottom-0 
            after:h-1 after:w-full after:bg-blue-500 after:duration-200
            ${selected === 'table' ? 'after:scale-100' : 'after:scale-0'}`
          }
          onClick={() => handleSelect('table')}
        >
          Tabela
        </li>
        <li
          className={`
            flex justify-center p-5 cursor-pointer relative
            ease-linear duration-200
            font-bold after:content-[''] after:absolute after:rounded-lg after:bottom-0
            after:h-1 after:w-full after:bg-blue-500 after:duration-200
            ${selected === 'dashboard' ? 'after:scale-100' : 'after:scale-0'}
          `}
          onClick={() => handleSelect('dashboard')}
        >
          Dashboard
        </li>
      </ul>
    </header>
  );
}
