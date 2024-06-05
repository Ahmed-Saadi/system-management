export interface Row {
  m_id?: number;
  name: string;
  categorie: string;
  owner: Owner | null;
  date?: String;
}

export interface Account {
  u_id?: number;
  family_name: string;
  username: string;
  email: string;
  phone_number: string;
  dob: string;
  profession: string;
  gender: string;
}

export interface Owner {
  u_id?: number;
  username: string;
  family_name: string;
  profession: string;
}
export interface Material_Demand {
  d_id?: number;
  categorie: string;
  type: string;
  description: string;
  name: string;
  status: string;
}

export interface Demand_congéer {
  dc_id: number;
  name: string;
  type: string;
  date_debut: String;
  date_fin: string;
  cause: string;
}

export interface Email {
  id?: number;
  reciver: string;
  subject: string;
  content: string;
  date:string;
  favorite: boolean;
  files: File[];
}

export interface File {
  id: number;
  filename: string;
  fileType: string;
  filepath: string;
}

export interface TaskInterface{
  id:number;
  status:string;
  files:File[];
  description: string;
  assignee:string;
  date:string;
  title:string;
}
