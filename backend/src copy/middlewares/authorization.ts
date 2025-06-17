import { NextFunction, Request, Response } from "express";
import { verify} from "jsonwebtoken";

interface JwtPayload {
    id: string;
    name: string;
    email: string;
    role: string;
}



export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const SECRET = process.env.SECRET || '';

    try {
        const decoded = verify(token, SECRET) as JwtPayload;
        req.body.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.', error });
    }
};

export const verifyRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user;

        if (!user) {
            return res.status(403).json({ message: 'No user information available.' });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403)
                .json({ message: `Access denied. Requires one of the following roles: ${allowedRoles.join(', ')}` });
        }

        next();
    };
};