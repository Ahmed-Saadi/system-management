export interface Row {
    m_id?:number;
    name:string;
    categorie:string;
    owner?:string;
    date:string;
  }
  

export interface Account{
  u_id? : number;
  user_family_name:string;
  username : string;
  email:string;
  phone_number:string;
  dob:string;
  profession:string;
  gender:string;
}