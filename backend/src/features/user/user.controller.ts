import { SuccessOk } from "../../shared/response/success/success.response";
import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import Http500Error from "../../error/errors/h500Error";
import Http400Error from "../../error/errors/h400Error";

class UserController {
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    logout = async (request: Request, response: Response) => { 

        const cookies = request.cookies;
        if (!cookies?.jwt) return response.sendStatus(204); //No content
        const refreshToken = cookies.jwt;


        // Is refreshToken in db?
        const foundUser = await this.userService.findUserByRefreshToken(refreshToken)
        if (!foundUser) {
            response.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            return response.sendStatus(204);
        }

        // Delete refreshToken in db
        await this.userService.deleteRefreshToken(refreshToken)
        console.log('deleted token')


        response.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return response.sendStatus(204);

     } 
     
     
     refreshToken = async (request: Request, response: Response) => { 
        console.log('hit refresh')

        const cookies = request.cookies;
        if (!cookies?.jwt) return response.sendStatus(401);
        const refreshToken = cookies.jwt;

        const foundUser = await this.userService.findUserByRefreshToken(refreshToken)

        jsonwebtoken.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err: any, decoded: { email: string } | undefined) => {
                if (err || foundUser.email !== decoded?.email) return response.sendStatus(403);
                const role = foundUser.role;
                const accessToken = jsonwebtoken.sign(
                    {
                        "UserInfo": {
                            "email": decoded.email,
                            "role": role
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10m' } // secs for testing
                );
                response.json({ accessToken })
                console.log('response refresh', accessToken)
            }
        );
     } 

    adminLogin = async (request: Request, response: Response) => { }    



    login = async (request: Request, response: Response) => { 

        try {
            const { email, password } = request.body;
            const userData = { email, password }; 

            if (!email || !password) {
                return response.status(400).json({ message: 'Email and password are required.' });
            }
            const foundUser = await this.userService.findUserByEmail(userData)

            const match = await bcrypt.compare(password, foundUser.password);

             if (match) {
                const role = foundUser.role
                const id = foundUser.id

                const accessToken = jsonwebtoken.sign(
                    {
                      UserInfo: {
                        email: foundUser.email,
                        role: role,
                        id: id
                      },
                    },
                    process.env.ACCESS_TOKEN_SECRET as string,
                    { expiresIn: '50m' }
                );

                const refreshToken = jsonwebtoken.sign(
                    { 
                      email: foundUser.email
                    },
                    process.env.REFRESH_TOKEN_SECRET as string,
                    { expiresIn: '7d' }
                );
                //    const a = { refreshToken: refreshToken, id: foundUser.id  }; 
                //    console.log(a)

                   await this.userService.refreshToken(refreshToken, foundUser.id)
                   response.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
                   response.json({ accessToken });
                   console.log("successful login", foundUser.email)
                   console.log("refresh token", refreshToken)
                   console.log("access token", accessToken)


             }
             else {
                response.status(401).json({message: "bcrypt passwords dont match"});
            }
        } catch(err){
            console.log(err)
            response.status(500).json({ message: 'Internal server error' });
        }
    }


    register = async (request: Request, response: Response, next: NextFunction) => {   

        try {
            const { email, password } = request.body;

            if (!email || !password) {
                next(new Http400Error());

                // return response.status(400).json({ message: 'Email and password are required.' });
            }

            //check is valid email

            //check password is strong 

            //check duplicate email
            
            const hashedPwd = await bcrypt.hash(password, 10); 
            const userData = { email, password: hashedPwd }; 
      
            console.log('hit')
            const results = await this.userService.registerUser(userData)
            // SuccessOk(response, results);
            response.status(201).json(results);

        } catch(err){
            console.log(err)
            next(new Http500Error());
            // response.status(500).json({ message: 'Internal server error' });

        }
    }

    getUserByPhone = async (request: Request, response: Response) => {   
        request.body.phone
        try {
            console.log('hit')
            const results = await this.userService.getUserByPhoneOrCreate(request.body.phone)
            SuccessOk(response, results);
        } catch(err){
            console.log(err)
        }
    }

}

export { UserController };