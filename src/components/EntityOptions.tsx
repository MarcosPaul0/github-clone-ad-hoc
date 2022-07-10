import { Option } from "./Option";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Checkbox } from "./Checkbox";
import { RepositoriesContext } from "../contexts/RepositoriesContext";
import { useContext } from "react";

export function EntityOptions() {
  const { attributes, handleChangeAttributes } =
    useContext(RepositoriesContext);

  return (
    <Option icon={<AiOutlinePlusCircle size={40} />} label="Entidades">
      <Checkbox
        label="Usuário"
        checked={attributes.users}
        onChange={() => {
          handleChangeAttributes({
            key: "users",
            value: !attributes.users,
          });
        }}
      />
      <Checkbox
        label="Licença"
        checked={attributes.licenses}
        onChange={() => {
          handleChangeAttributes({
            key: "licenses",
            value: !attributes.licenses,
          });
        }}
      />
      <Checkbox
        label="Frequência de Código"
        checked={attributes.codeFrequency}
        onChange={() => {
          handleChangeAttributes({
            key: "codeFrequency",
            value: !attributes.codeFrequency,
          });
        }}
      />
      <Checkbox
        label="Colaboradores"
        checked={attributes.collaborators}
        onChange={() => {
          handleChangeAttributes({
            key: "collaborators",
            value: !attributes.collaborators,
          });
        }}
      />
    </Option>
  );
}
