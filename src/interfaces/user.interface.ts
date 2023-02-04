interface User {
    id: number,
    loginEmail: string,
    password: string,
    firstName?: string,
    lastName?: string
};

export {User as UserType};