import { createContext, ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { apiClient } from "../services/axios";
import { ApiResponseData } from "../types/apiResponseData";
import { AttributeChangeType } from "../types/attributeChangeType";
import { AttributesType } from "../types/attributesType";
import { FilterChangeType } from "../types/filterChangeType";
import { FiltersType } from "../types/filtersType";
import { SortChangeType } from "../types/sortChangeType";
import { SortType } from "../types/sortType";

interface RepositoriesContextData {
  data: ApiResponseData;
  isLoading: boolean;
  attributes: AttributesType;
  filters: FiltersType;
  sort: SortType;
  page: number;
  handleChangeFilters: (params: FilterChangeType) => void;
  handleChangeSort: (params: SortChangeType) => void;
  handleChangeAttributes: (params: AttributeChangeType) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

export const RepositoriesContext = createContext<RepositoriesContextData>(
  {} as RepositoriesContextData
);

interface RepositoriesContextProviderProps {
  children: ReactNode;
}

export function RepositoriesContextProvider({
  children,
}: RepositoriesContextProviderProps) {
  const [page, setPage] = useState<number>(1);

  const [attributes, setAttributes] = useState<AttributesType>({
    codeFrequency: false,
    collaborators: false,
    licenses: false,
    users: false,
  });

  const [filters, setFilters] = useState<FiltersType>({
    language: '',
    repositoryName: '',
    ownerLogin: '',
    licenseKey: '',
    hasIssues: false,
    isTemplate: false,
    minSize: null,
    maxSize: null,
    collaboratorsMinCount: null,
    collaboratorsMaxCount: null,
    forksMinCount: null,
    forksMaxCount: null,
    creationStart: '',
    creationEnd: '',
    updateStart: '',
    updateEnd: '',
    pushedStart: '',
    pushedEnd: '',
  });

  const [sort, setSort] = useState<SortType>({
    order: '',
    type: '',
  });

  useEffect(() => {
    console.log({
      sort,
      attributes,
      filters,
    })
  }, [sort, attributes, filters]);

  function handleNextPage() {
    if (!data?.stats.totalRepositories) {
      return;
    }

    if (page * 14 >= data.stats.totalRepositories) {
      return;
    }

    setPage(page + 1);
  }

  function handlePreviousPage() {
    if (page - 1 === 0) {
      return;
    }

    setPage(page - 1);
  }

  function handleChangeFilters({ key, value }: FilterChangeType) {
    setFilters((currentParam) => {
      const newParams = { ...currentParam };
      newParams[key] = value;

      return newParams;
    });
  }

  function handleChangeSort({ key, value }: SortChangeType) {
    setSort((currentParam) => {
      const newParams = { ...currentParam };
      newParams[key] = value;

      return newParams;
    });
  }

  function handleChangeAttributes({ key, value }: AttributeChangeType) {
    setAttributes((currentParam) => {
      const newParams = { ...currentParam };
      newParams[key] = value;

      return newParams;
    });
  }

  const { data, isLoading } = useQuery(["repositories", page, attributes, sort, filters], async () => {
    const response = await apiClient.post<ApiResponseData>(`/${page}`, {
      attributes,
      filters,
      sort,
    });

    return response.data;
  });

  return (
    <RepositoriesContext.Provider
      value={{
        handleNextPage,
        handlePreviousPage,
        handleChangeAttributes,
        handleChangeFilters,
        handleChangeSort,
        attributes,
        filters,
        page,
        sort,
        data: data as ApiResponseData,
        isLoading,
      }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
}
