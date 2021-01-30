export interface Project {
  name: string;
  dt_begin: Date;
  dt_end: Date;
  price: number;
  risc: number;
  users?: number[];
}
