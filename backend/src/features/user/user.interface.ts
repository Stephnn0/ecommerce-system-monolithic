interface IUser {
    id?: number;
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    refreshToken?: string;
    roles?: string;
}


interface IUserRegister extends IUser {
}

interface IUserLogin extends IUser {
}

interface IUpdateRefreshToken extends IUser {
}



interface IUserService {
    getUserByPhoneOrCreate(phone: string): any;
    registerUser(note: IUserRegister): any;
    findUserByEmail(note: IUserLogin): any;

}

export { IUserService, IUser, IUserRegister, IUserLogin, IUpdateRefreshToken }