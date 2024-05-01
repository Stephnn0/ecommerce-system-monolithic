interface IAddress {
    id?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    phone?: string;
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    customerId?: string
}




interface IAddressCreate extends IAddress {
}

interface IAddressByCustomer extends IAddress {
}

interface IAddressService {
    createAddress(address: IAddressCreate): Promise<IAddress>;
    getAddressByCustomer(): any; 
}

export { IAddressService, IAddressCreate, IAddressByCustomer, IAddress }