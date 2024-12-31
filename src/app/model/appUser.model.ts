export enum Role {
  ENTREPRISE = 'ENTREPRISE',
  CANDIDAT = 'CANDIDAT',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface AppUser {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Role[];

 }
