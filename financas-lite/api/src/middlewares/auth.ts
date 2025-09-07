import { Request, Response, NextFunction } from "express";
import { supaAdmin } from "../supabase";

const DEV_FAKE_USER_ID = process.env.DEV_FAKE_USER_ID; // opcional p/ dev

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const hdr = req.headers.authorization;

    if (!hdr) {
      if (DEV_FAKE_USER_ID) {
        req.user = { id: DEV_FAKE_USER_ID };
        return next();
      }
      return res.status(401).json({ error: "missing Authorization header" });
    }

    const token = hdr.replace(/^Bearer\s+/i, "").trim();
    if (!token) return res.status(401).json({ error: "invalid token" });

    const { data, error } = await supaAdmin.auth.getUser(token);
    if (error || !data?.user) return res.status(401).json({ error: "unauthorized" });

    req.user = { id: data.user.id, email: data.user.email ?? undefined };
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ error: "auth failed" });
  }
}
