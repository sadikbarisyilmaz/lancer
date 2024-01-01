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
  desc: string;
  email: string;
  phone: number;
}
