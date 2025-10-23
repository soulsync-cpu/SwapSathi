import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany({
        select: { id: true, email: true, name: true, createdAt: true },
        take: 100,
      });
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      const { email, name } = req.body;
      if (!email) return res.status(400).json({ error: "email_required" });
      const user = await prisma.user.create({ data: { email, name } });
      return res.status(201).json(user);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end();
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "internal_server_error" });
  }
}
