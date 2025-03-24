import { Hono } from "hono";
import { signUpWithUsernameAndPassword } from "../controllers/authentication";
import { SignUpWithUsernameAndPasswordError } from '../controllers/authentication/+type';

export const hono = new Hono();

hono.post("/authentication/sign-up", async (c) => {
    const { username, password } = await c.req.json();
    try {
        const result = await signUpWithUsernameAndPassword({
            username,
            password
        });

        return c.json({ data: result }, 200);
    } catch (error) {
        if (error === SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME) {
            return c.json({ error: "Username already exists" }, 409);
        }

        if (error === SignUpWithUsernameAndPasswordError.UNKNOWN) {
            return c.json({ error: "Unknown error" }, 500);
        };
    }
});



hono.get("/health", (c) => {
  return c.json(
    {
      message: "All Ok",
    },
    200
  );
});
