import { useContext } from "react";
import { RepositoriesContext } from "../contexts/RepositoriesContext";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export function Pagination() {
  const { handleNextPage, handlePreviousPage, page } =
    useContext(RepositoriesContext);

  return (
    <div className="w-full flex justify-center gap-24 absolute bottom-10">
      <button
        className={`
          hover:bg-gray-700 text-white font-bold py-2 px-4 rounded
          flex items-center gap-4  border-2 border-white-500
        `}
        onClick={handlePreviousPage}
      >
        <AiOutlineDoubleLeft size={30} />
        Anterior
      </button>

      <div 
        className={`
          text-white font-bold rounded
          flex items-center
        `}
      >
        {page}
      </div>

      <button
        className={`
          hover:bg-gray-700 text-white font-bold py-2 px-4 rounded
          flex items-center gap-4 border-2 border-white-500
        `}
        onClick={handleNextPage}
      >
        Próxima
        <AiOutlineDoubleRight size={30} />
      </button>
    </div>
  );
}
