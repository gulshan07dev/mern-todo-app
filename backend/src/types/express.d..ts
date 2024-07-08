import { Request } from "express";

interface Cookies {
    token?: string
}

declare global {
    namespace Express {
        interface Request {
            userId?: string
            cookies: Cookies
        }
    }
}