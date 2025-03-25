import { Hono } from "hono";
import { jwtSecretKey } from "../../environment";
import jwt from "jsonwebtoken";
import { prisma } from "../extras/prisma";

export const usersRoutes = new Hono();

usersRoutes.get(
  "/",
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
  },
  async (context) => {
    try {
      const users = await prisma.user.findMany();
      return context.json(
        {
          data: {
            users,
          },
        },
        200
      );
    } catch (error) {
      return context.json({ error: "Failed to get users" }, 500);
    }
  }
);
