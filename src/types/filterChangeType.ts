export interface FilterChangeType {
  key:
    | "language"
    | "repositoryName"
    | "ownerLogin"
    | "licenseKey"
    | "hasIssues"
    | "isTemplate"
    | "minSize"
    | "maxSize"
    | "collaboratorsMinCount"
    | "collaboratorsMaxCount"
    | "forksMinCount"
    | "forksMaxCount"
    | "creationStart"
    | "creationEnd"
    | "updateStart"
    | "updateEnd"
    | "pushedStart"
    | "pushedEnd";
  value: any;
}
