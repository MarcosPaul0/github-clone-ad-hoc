export interface SortType {
  type: 'created_at' | 'updated_at' | 'pushed_at' | '';
  order: 'asc' | 'desc' | '';
}