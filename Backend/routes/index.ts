import express from "express";
import foodRouter from "./food-item/index.ts";
import orderRouter from "./order/index.ts";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.json({ message: "API is running" });
});

router.get("/status", (req: any, res: any) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

router.use("/food", foodRouter);
router.use("/orders", orderRouter);

export default router;
