export interface User {
  id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  IsConsent: boolean;
}

export interface Login {
  id: string;
  Email: string;
  Password: string;
  IsConsent: boolean;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  IsConsent: boolean;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isConsent: boolean;
  };
}
