import { Hono } from "hono";

export const hono = new Hono();

hono.get("/health", (c) => {
  return c.json(
    {
      message: "All Ok",
    },
    200
  );
});
