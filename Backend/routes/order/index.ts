import express from "express";
import { getDb, initDb } from "../../db/index.ts";
import type { Order, OrderItem } from "../../types/order.ts";

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

function getPrice(price: OrderItem["price"]) {
  return typeof price === "number" ? price : parseFloat(price ?? "0");
}

function getQuantity(quantity: OrderItem["quantity"]) {
  const value = Number(quantity);
  return Number.isFinite(value) && value > 0 ? value : 1;
}

router.post("/add", async (req: any, res: any) => {
  const payload = req.body as Order;
  const items = Array.isArray(payload?.items) ? payload.items : [];

  if (items.length === 0) {
    res.status(400).json({ ok: false, message: "'items' is required" });
    return;
  }

  const total = items.reduce(
    (sum, item) => sum + getPrice(item.price) * getQuantity(item.quantity),
    0
  );

  try {
    await initDb();
    const db = getDb();
    const now = new Date().toISOString();
    const result = await run(
      db,
      "INSERT INTO Orders (items, total, status, created_at) VALUES (?, ?, ?, ?)",
      [JSON.stringify(items), total, payload.status ?? "pending", now]
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
    const rows = await all<
      { id: number; items: string; total: number; status?: string; created_at?: string }
    >(db, "SELECT * FROM Orders ORDER BY id DESC");

    const data = rows.map((row) => {
      let parsedItems: OrderItem[] = [];
      try {
        parsedItems = JSON.parse(row.items) as OrderItem[];
      } catch {
        parsedItems = [];
      }

      return { ...row, items: parsedItems };
    });

    res.json({ ok: true, action: "list", data });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: error?.message ?? "Fetch failed" });
  }
});

export default router;
