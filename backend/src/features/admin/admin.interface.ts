interface IAdmin {
    id?: number;
    username: string;
    password: string;
    refreshToken?: string;
    role?: string;
}



interface AdminRegister extends IAdmin {
}


interface IAdminService {
    registerAdmin(admin: AdminRegister): any;

}

export { IAdminService }