import express from "express";
import type { FoodItem } from "../../db/index.ts";
import { getDb, initDb } from "../../db/index.ts";

const router = express.Router();

function run(db: ReturnType<typeof getDb>, sql: string, params: unknown[] = []) {
  return new Promise<{ lastID: number; changes: number }>((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function get<T>(db: ReturnType<typeof getDb>, sql: string, params: unknown[] = []) {
  return new Promise<T | undefined>((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row as T | undefined);
    });
  });
}

function all<T>(db: ReturnType<typeof getDb>, sql: string, params: unknown[] = []) {
  return new Promise<T[]>((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows as T[]);
    });
  });
}

router.post("/add", async (req: any, res: any) => {
  const payload = req.body as FoodItem;

  if (!payload || typeof payload.desc !== "string" || payload.desc.trim() === "") {
    res.status(400).json({ ok: false, message: "'desc' is required" });
    return;
  }

  try {
    await initDb();
    const db = getDb();
    const now = new Date().toISOString();
    const createdAt = payload.created_at ?? now;
    const updatedAt = payload.updated_at ?? now;

    const result = await run(
      db,
      `INSERT INTO FoodItem (name, desc, price, currency, image, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
        .replace(/\s+/g, " ")
        .trim(),
      [
        payload.name ?? null,
        payload.desc,
        payload.price ?? null,
        payload.currency ?? null,
        payload.image ?? null,
        createdAt,
        updatedAt,
      ]
    );

    res.json({ ok: true, action: "add", id: result.lastID });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error?.message ?? "Insert failed" });
  }
});

router.get("/list", async (_req: any, res: any) => {
  try {
    await initDb();
    const db = getDb();
    const rows = await all<FoodItem & { id: number }>(
      db,
      "SELECT * FROM FoodItem ORDER BY id DESC"
    );
    res.json({ ok: true, action: "list", data: rows });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error?.message ?? "Fetch failed" });
  }
});

router.get("/:id", async (req: any, res: any) => {
  const id = Number(req.params.id);

  if (!Number.isFinite(id)) {
    res.status(400).json({ ok: false, message: "'id' param is required" });
    return;
  }

  try {
    await initDb();
    const db = getDb();
    const row = await get<FoodItem & { id: number }>(
      db,
      "SELECT * FROM FoodItem WHERE id = ?",
      [id]
    );

    if (!row) {
      res.status(404).json({ ok: false, message: "Food item not found" });
      return;
    }

    res.json({ ok: true, action: "get", data: row });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error?.message ?? "Fetch failed" });
  }
});

router.put("/:id", async (req: any, res: any) => {
  const id = Number(req.params.id);
  const payload = req.body as FoodItem;

  if (!Number.isFinite(id)) {
    res.status(400).json({ ok: false, message: "'id' param is required" });
    return;
  }

  const updates: string[] = [];
  const params: unknown[] = [];

  if (payload.name !== undefined) {
    updates.push("name = ?");
    params.push(payload.name);
  }

  if (payload.desc !== undefined) {
    updates.push("desc = ?");
    params.push(payload.desc);
  }

  if (payload.price !== undefined) {
    updates.push("price = ?");
    params.push(payload.price);
  }

  if (payload.currency !== undefined) {
    updates.push("currency = ?");
    params.push(payload.currency);
  }

  if (payload.image !== undefined) {
    updates.push("image = ?");
    params.push(payload.image);
  }

  if (updates.length === 0) {
    res.status(400).json({ ok: false, message: "No fields to update" });
    return;
  }

  updates.push("updated_at = ?");
  params.push(new Date().toISOString());
  params.push(id);

  try {
    await initDb();
    const db = getDb();
    const result = await run(
      db,
      `UPDATE FoodItem SET ${updates.join(", ")} WHERE id = ?`,
      params
    );

    if (result.changes === 0) {
      res.status(404).json({ ok: false, message: "Food item not found" });
      return;
    }

    res.json({ ok: true, action: "update", id });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error?.message ?? "Update failed" });
  }
});

router.delete("/:id", async (req: any, res: any) => {
  const id = Number(req.params.id);

  if (!Number.isFinite(id)) {
    res.status(400).json({ ok: false, message: "'id' param is required" });
    return;
  }

  try {
    await initDb();
    const db = getDb();
    const result = await run(db, "DELETE FROM FoodItem WHERE id = ?", [id]);

    if (result.changes === 0) {
      res.status(404).json({ ok: false, message: "Food item not found" });
      return;
    }

    res.json({ ok: true, action: "delete", id });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error?.message ?? "Delete failed" });
  }
});

export default router;
