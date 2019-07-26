export interface Quest {
  table: string;
  title: string;
  location: string;
  description: string;
  questObjectives: string;
  dueDate: string;
  test: boolean;
  created_at: string;
}

export enum ModalTypes {
  GM = 'GM',
  Quest = 'Quest'
}
