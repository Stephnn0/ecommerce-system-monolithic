import { AddressService } from "./address.service";


import { Request, Response } from "express";




class AddressController {

    addressService: AddressService

    constructor(){
        this.addressService = new AddressService()
    }




    createAddress = async (request: Request, response: Response) => {

        console.log("-----hit address create------")

        try {
            const { firstName, lastName,  company,  phone, address, city, zip, country, customerId } = request.body;
            console.log("-----req body create------", request.body)

            if (!firstName || !lastName) {
                return response.status(400).json({ message: 'Email and password are required.' });
            }
            const addressData = { firstName, lastName,  company,  phone, address, city, zip, country, customerId } 
            const results = await this.addressService.createAddress(addressData)
            response.status(201).json(results);

        } catch(err){
            console.log(err)
            response.status(500).json({ message: 'Internal server error' });
        }
    }



}


export {AddressController  }