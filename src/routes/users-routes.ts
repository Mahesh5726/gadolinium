import { Hono } from "hono";
import { prisma } from "../extras/prisma";
import { tokenMiddleware } from "./middlewares/token-middleware";

export const usersRoutes = new Hono();

usersRoutes.get(
  "/", tokenMiddleware, async (context) => {
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
