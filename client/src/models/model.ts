export interface Material {
  m_id?: number;
  name: string;
  categorie: string;
  owner: Owner | null;
  date?: String;
}

export interface Account {
  u_id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  dob: string;
  profession: string;
  gender: string;
  profilePicture:string;
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
  response?:string;
  comment?:string;
}

export interface Demand_conger {
  dc_id: number;
  name: string;
  type: string;
  date_debut: string;
  date_fin: string;
  cause: string;
  nb_days:number;
}

export interface Email {
  id?: number;
  userReciever: string;
  subject: string;
  content: string;
  date: string;
  favorite: boolean;
  files: File[];
  receiver:Account;
  sender:Account; 
}

export interface File {
  id: number;
  filename: string;
  fileType: string;
  filepath: string;
}

export interface TaskInterface {
  id: number;
  status: string;
  files: File[];
  description: string;
  assignee: string;
  date: string;
  title: string;
}

export interface RequestTicket {
  id: number;
  subject: string;
  status?: string;
  type:string;
  createdAt?: Date;
  updatedAt?: Date;
  supportMessagesList?: RequestMessage[];
  requestMessage:string;
}
export interface RequestMessage{
  id:number;
  content:string;
  sentAt:Date;
  sender:Account;
}
export interface Team{
  id:number;
  creationDate:string;
  teamLeader:Account;
  members:Account[];
}