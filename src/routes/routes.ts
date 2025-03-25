import { Hono } from "hono";
import {
  logInWithUsernameAndPassword,
  signUpWithUsernameAndPassword,
} from "../controllers/authentication/authentication-controller";
import {
  LogInWithUsernameAndPasswordError,
  SignUpWithUsernameAndPasswordError,
} from "../controllers/authentication/authentication-type";

export const hono = new Hono();

hono.post("/authentication/sign-up", async (c) => {
  const { username, password } = await c.req.json();
  try {
    const result = await signUpWithUsernameAndPassword({
      username,
      password,
    });

    return c.json({ data: result }, 200);
  } catch (error) {
    if (error === SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME) {
      return c.json({ error: "Username already exists" }, 409);
    }

    if (error === SignUpWithUsernameAndPasswordError.UNKNOWN) {
      return c.json({ error: "Unknown error" }, 500);
    }
  }
});

hono.post("/authentication/log-in", async (c) => {
  try {
    const { username, password } = await c.req.json();

    const result = await logInWithUsernameAndPassword({
      username,
      password,
    });

    return c.json(
      {
        data: result,
      },
      200
    );
  } catch (error) {
    if (
      error === LogInWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD
    ) {
      return c.json({ error: "Incorrect username or password" }, 401);
    }

    return c.json({ error: "Unknown error" }, 500);
  }
});
