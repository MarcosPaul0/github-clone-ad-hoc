import { Option } from "./Option";
import { AiFillSignal } from "react-icons/ai";
import { Select } from "./Select";
import { RepositoriesContext } from "../contexts/RepositoriesContext";
import { ChangeEvent, useContext } from "react";

export function SortOptions() {
  const { handleChangeSort, sort } = useContext(RepositoriesContext);
  
  return (
    <Option icon={<AiFillSignal size={40} />} label="Ordenação">
      <Select
        initialValue="Ordenar por"
        options={[
          { label: "Data de criação", value: "created_at" },
          { label: "Data de atualização", value: "updated_at" },
          { label: "Data de push", value: "pushed_at" },
        ]}
        value={sort.type}
        onChange={(event: ChangeEvent) => {
          const { value } = event.target as HTMLInputElement;

          handleChangeSort({ key: 'type', value });
        }}
      />
      <Select
        initialValue="Ordenar em"
        options={[
          { label: "Ordem crescente", value: "asc" },
          { label: "Ordem decrescente", value: "desc" },
        ]}
        value={sort.order}
        onChange={(event: ChangeEvent) => {
          const { value } = event.target as HTMLInputElement;

          handleChangeSort({ key: 'order', value });
        }}
      />
    </Option>
  );
}
