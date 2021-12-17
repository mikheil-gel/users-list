import { List } from './list';

export interface UsersList {
  pagination: {
    previousPage: number | null;
    current: number;
    nextPage: number | null;
    total: number;
    pageSize: number;
  };
  list: List[];
}
