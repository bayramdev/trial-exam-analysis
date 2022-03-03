export interface User {
  userID: string;
  schoolName: string;
  schoolID: string;
  userType: "student" | "admin" | "superAdmin";
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
