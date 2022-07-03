export interface Attributes {
  users: boolean;
  licenses: boolean;
  codeFrequency: boolean;
  collaborators: boolean;
}

export interface Filters {
  language: string;
  repositoryName: string;
  ownerLogin: string;
  licenseKey: string;
  hasIssues: boolean;
  isTemplate: boolean;
  minSize: number;
  maxSize: number;
  collaboratorsMinCount: number;
  collaboratorsMaxCount: number;
  forksMinCount: number;
  forksMaxCount: number;
  creationStart: Date;
  creationEnd: Date;
  updateStart: Date;
  updateEnd: Date;
  pushedStart: Date;
  pushedEnd: Date;
}

export interface Sort {
  type: 'created_at' | 'updated_at' | 'pushed_at';
  order: 'asc' | 'desc';
}

export interface GetRepositoriesDto {
  attributes: Attributes;
  filters: Filters;
  sort: Sort;
}