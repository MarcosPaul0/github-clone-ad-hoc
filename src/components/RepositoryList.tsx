import { useContext } from "react";
import { RepositoriesContext } from "../contexts/RepositoriesContext";
import { ImSpinner2 } from "react-icons/im";
import { Pagination } from "./Pagination";
import Image from "next/image";

export function RepositoryList() {
  const { data, attributes, isLoading } = useContext(RepositoriesContext);

  function renderRepositories() {
    if (!data) {
      return null;
    }

    return data.result.map((repository) => {
      const createdDate = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
      }).format(new Date(repository.created_at));

      const updatedDate = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
      }).format(new Date(repository.updated_at));

      const pushedDate = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
      }).format(new Date(repository.pushed_at));

      const licenseName = repository?.license
        ? repository?.license.key.toLocaleUpperCase()
        : "Nenhuma";

      return (
        <tr
          key={repository.id}
          className={`
          border-b-2 border-gray-700 
          text-xs font-normal
        `}
        >
          {attributes.users && (
            <>
              <td className="px-4 py-2">
                <Image
                  className={`
                  rounded-full aspect-square
                `}
                  height={29}
                  width={29}
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                />
              </td>
              <td className="text-left px-4 py-2">{repository.owner.login}</td>
            </>
          )}
          <td className="text-left p-4 ">
            <a href={repository.html_url}>{repository.name}</a>
          </td>
          <td className="text-left p-4">{repository.language}</td>
          <td className="text-left p-4">{repository.size}</td>
          <td className="text-left p-4">{repository.open_issues_count}</td>
          <td className="text-left p-4">{repository.forks_count}</td>
          {attributes.licenses && (
            <td className="text-left p-4">{licenseName}</td>
          )}
          {attributes.collaborators && (
            <td className="text-left p-4">{repository.collaborators.length}</td>
          )}
          {attributes.codeFrequency && (
            <>
              <td className="text-left p-4">
                {repository.codeFrequency.additions}
              </td>
              <td className="text-left p-4">
                {repository.codeFrequency.deletions}
              </td>
            </>
          )}
          <td className="text-left p-4">{createdDate}</td>
          <td className="text-left p-4">{updatedDate}</td>
          <td className="text-left p-4">{pushedDate}</td>
        </tr>
      );
    });
  }

  return (
    <div 
      className={`
        w-full py-8 px-20 flex flex-col items-center 
        gap-10 relative
      `}
    >
      {isLoading ? (
        <ImSpinner2 size={50} className={`animate-spin absolute top-96`} />
      ) : (
        <table
          className={`
          font-bold text-sm
          w-full border-collapse
        `}
        >
          <thead>
            <tr
              className={`
              border-b-2 border-gray-400 
            `}
            >
              {data?.result[0]?.owner && (
                <>
                  <th></th>
                  <th className="text-left px-4 py-2">Autor</th>
                </>
              )}
              <th className="text-left px-4 py-2">Nome do Repo</th>
              <th className="text-left px-4 py-2">Linguagem</th>
              <th className="text-left px-4 py-2">Tamanho</th>
              <th className="text-left px-4 py-2">Questões</th>
              <th className="text-left px-4 py-2">Forks</th>
              {attributes.licenses && (
                <th className="text-left px-4 py-2">Licença</th>
              )}
              {attributes.collaborators && (
                <th className="text-left px-4 py-2">Colaboradores</th>
              )}
              {attributes.codeFrequency && (
                <>
                  <th className="text-left p-4">Adições</th>
                  <th className="text-left p-4">Deleções</th>
                </>
              )}
              <th className="text-left px-4 py-2">Criação</th>
              <th className="text-left px-4 py-2">Atualização</th>
              <th className="text-left px-4 py-2">Push</th>
            </tr>
          </thead>
          <tbody>{renderRepositories()}</tbody>
        </table>
      )}

      <Pagination />
    </div>
  );
}
