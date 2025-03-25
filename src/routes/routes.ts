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

