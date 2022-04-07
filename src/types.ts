export interface User {
  userID: string;
  schoolName: string;
  schoolID: string;
  userType: "student" | "admin" | "superAdmin";
}

export interface LoginCredentials {
  userID: string;
  userPassword: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
