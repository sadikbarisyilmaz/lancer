export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Client {
  id: number;
  created_at: Date;
  user_id: string;
  name: string;
  type: string;
  tasks: Task[];
  email: string;
  phone: number;
}
export interface Task {
  id: number;
  created_at: Date;
  set_date: Date;
  user_id: string;
  client_id: string;
  title: string;
  about: string;
  fee: number;
  paid_amount: number;
  clients: Client;
}
export interface ClientNote {
  id: number;
  created_at: Date;
  user_id: number;
  content: string;
  // type: string;
  // desc: string;
  // email: string;
  // phone: number;
}
export interface ClientFormData {
  name: string;
  type: string;
  email: string;
  // desc: string;
  phone: string;
}
