export interface CodeFrequency {
  id: string;
  date: string;
  additions: number;
  deletions: number;
  repo_id: string;
}

export interface License {
  id: string;
  name: string;
  key: string;
  url: string;
}

export interface User {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  url: string;
  site_admin: boolean;
  bio: string;
  location: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface Collaborator {
  id: string;
  user_id: string;
  repo_id: string;
  users: User;
}

export interface Repository {
  id: string;
  name: string;
  full_name: string;
  language: string;
  has_issues: boolean;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  is_template: boolean;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  owner_id: string;
  license_id: string;
  codeFrequency: CodeFrequency;
  collaborators: Collaborator[];
  license: License;
  owner: User;
}

export interface ApiResponseData {
  result: Repository[];
  stats: {
    totalRepositories: number;
    totalSize: number;
    totalForks: number;
    totalIssues: number;
    languages: {
      [key: string]: number;
    };
    licenses: {
      [key: string]: number;
    };
    totalCollaborators: number;
  };
}