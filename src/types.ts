export interface Client {
  id: number;
  name: string;
  type: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SortCriteria {
  id: string;
  field: string;
  direction: 'asc' | 'desc';
  label: string;
}