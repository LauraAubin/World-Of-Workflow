export interface Quest {
  table: string;
  title: string;
  location: string;
  description: string;
  questObjectives: string;
  dueDate: string;
  test: boolean;
  completed: boolean;
  created_at: string;
}

export enum ModalTypes {
  GM = 'GM',
  Quest = 'Quest'
}

export type columnTypes = string | boolean | Date;
