import { Option } from "./Option";
import { AiOutlineFilter } from "react-icons/ai";
import { Input } from "./Input";
import { ChangeEvent, useContext } from "react";
import { GroupHead } from "./GroupHead";
import { RepositoriesContext } from "../contexts/RepositoriesContext";
import { FilterChangeType } from "../types/filterChangeType";

export function FilterOptions() {
  const { filters, handleChangeFilters } = useContext(RepositoriesContext);

  function handleChangeText(event: ChangeEvent, key: FilterChangeType["key"]) {
    const { value } = event.target as HTMLInputElement;

    handleChangeFilters({
      key,
      value,
    });
  }

  function handleChangeNumber(
    event: ChangeEvent,
    key: FilterChangeType["key"]
  ) {
    const { value } = event.target as HTMLInputElement;

    if (isNaN(+value)) {
      return;
    }

    handleChangeFilters({
      key,
      value: +value,
    });
  }

  return (
    <Option icon={<AiOutlineFilter size={40} />} label="Filtros">
      <Input
        placeholder="Nome do repositório"
        value={filters.repositoryName as string}
        onChange={(event) => handleChangeText(event, "repositoryName")}
      />
      <Input
        placeholder="Nome do usuário"
        value={filters.ownerLogin as string}
        onChange={(event) => handleChangeText(event, "ownerLogin")}
      />
      <Input
        placeholder="Linguagem"
        value={filters.language as string}
        onChange={(event) => handleChangeText(event, "language")}
      />
      <Input
        placeholder="Licença"
        value={filters.licenseKey as string}
        onChange={(event) => handleChangeText(event, "licenseKey")}
      />

      <GroupHead title="Tamanho do repositório" />
      <Input
        label="Min"
        value={filters.minSize as number}
        onChange={(event) => handleChangeNumber(event, "minSize")}
      />
      <Input
        label="Max"
        value={filters.maxSize as number}
        onChange={(event) => handleChangeNumber(event, "maxSize")}
      />

      <GroupHead title="Número de colaboradores" />
      <Input
        label="Min"
        value={filters.collaboratorsMinCount as number}
        onChange={(event) => handleChangeNumber(event, "collaboratorsMinCount")}
      />
      <Input
        label="Max"
        value={filters.collaboratorsMaxCount as number}
        onChange={(event) => handleChangeNumber(event, "collaboratorsMaxCount")}
      />

      <GroupHead title="Números de forks" />
      <Input
        label="Min"
        value={filters.forksMinCount as number}
        onChange={(event) => handleChangeNumber(event, "forksMinCount")}
      />
      <Input
        label="Max"
        value={filters.forksMaxCount as number}
        onChange={(event) => handleChangeNumber(event, "forksMaxCount")}
      />

      <GroupHead title="Data de criação" />
      <Input
        type="date"
        label="Min"
        value={filters.creationStart as string}
        onChange={(event) => handleChangeText(event, "creationStart")}
      />
      <Input
        type="date"
        label="Max"
        value={filters.creationEnd as string}
        onChange={(event) => handleChangeText(event, "creationEnd")}
      />

      <GroupHead title="Data de atualização" />
      <Input
        type="date"
        label="Min"
        value={filters.updateStart as string}
        onChange={(event) => handleChangeText(event, "updateStart")}
      />
      <Input
        type="date"
        label="Max"
        value={filters.updateEnd as string}
        onChange={(event) => handleChangeText(event, "updateEnd")}
      />

      <GroupHead title="Data de Push" />
      <Input
        type="date"
        label="Min"
        value={filters.pushedStart as string}
        onChange={(event) => handleChangeText(event, "pushedStart")}
      />
      <Input
        type="date"
        label="Max"
        value={filters.pushedEnd as string}
        onChange={(event) => handleChangeText(event, "pushedEnd")}
      />
    </Option>
  );
}
