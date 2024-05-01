import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    roles: string[]; 
  }

const verifyRoles = (...allowedRoles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const result = req.roles.map((role: string) => rolesArray.includes(role)).find((val: boolean) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;