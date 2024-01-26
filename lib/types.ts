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
export interface ClientNote {
  id: number;
  created_at: Date | string;
  user_id: number;
  content: string;
}
export interface ClientFormData {
  name: string;
  type: string;
  email: string;
  phone: string;
}
export interface EditClientFormData {
  name: string;
  type: string;
  email: string;
  phone: string;
}
export interface Task {
  id: number;
  created_at: Date;
  set_date: Date | string;
  set_time: string;
  user_id: string;
  client_id: string;
  title: string;
  about: string;
  fee: number;
  payment_status: string;
  clients: Client;
  frequency: string;
}
export interface TaskNote {
  id: number;
  created_at: Date | string;
  task_id: number;
  content: string;
}
export interface TaskFormData {
  set_date: Date;
  set_time: string;
  title: string;
  about: string;
  fee: string;
  client_id: string;
  frequency: string;
}
export interface EditTaskFormData {
  set_date: Date | string;
  set_time: string;
  title: string;
  about: string;
  fee: string;
  frequency: string;
}
