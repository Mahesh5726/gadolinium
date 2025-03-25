import { createMiddleware } from "hono/factory";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../../environment";

//high-order function -> function having a function as a parameter which returns a function
export const tokenMiddleware = createMiddleware(
    async (context, next) => {
    const token = context.req.header("token");

    if (!token) {
        return context.json({ error: "Unauthorized" }, 401);
    }

    try {
        const verified = jwt.verify(token, jwtSecretKey);
    } catch (error) {
        return context.json({ error: "Unauthorized" }, 401);
    }
    await next();
});
