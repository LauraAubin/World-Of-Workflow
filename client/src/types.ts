export interface Quest {
  table: string;
  title: string;
  location: string;
  description: string;
  questObjectives: string;
  dueDate: string;
  test: boolean;
  created_at: Date;
}

export enum ModalTypes {
  GM = 'GM',
  Quest = 'Quest'
}
