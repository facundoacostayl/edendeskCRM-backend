interface User {
  id: number;
  loginEmail: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

export { User as UserType };
