// src/models/User.ts

export interface User {
    email: string;
    password: string;
    cpf: string;
    name: string;
    role: string;
  }
  
  export interface UserGet {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at?: Date;
    deleted?: boolean;
  }
  
  export interface UserList {
    rooms: UserGet[];
  }
  