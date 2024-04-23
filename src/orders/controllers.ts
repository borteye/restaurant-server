import { Request, Response } from "express";
import pool from "../../db";
import * as queries from "./queries";
import { Dish } from "../types/dishes";
import { uploadImage } from "../utils";

const placeOrder = async (req: Request, res: Response) => {
  const { userid, ordernumber, customer, status, orderdate, address, dishes } =
    req.body;
  try {
    await pool.query(
      queries.PLACE_ORDER,
      [userid, ordernumber, customer, status, orderdate, address, dishes],
      (err, result) => {
        if (err) {
          console.error("Error placing order:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        console.log("success");
        res.json({ success: "Thank you for your order" });
      }
    );
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const orders = async (req: Request, res: Response) => {
  const { role, id } = req.body;
  try {
    await pool.query(queries.ALL_ORDERS, (err, result) => {
      if (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (result.rows.length) {
        const orders = result.rows;
        res
          .status(200)
          .json({ success: "orders retrieved successfully", result: orders });
      } else if (!result.rows.length) {
        res.json({ error: "no orders found" });
      }
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const customerOrders = async (req: Request, res: Response) => {
  const { id, role } = req.params;
  try {
    role === "admin"
      ? await pool.query(queries.ALL_ORDERS, (err, result) => {
          if (err) {
            console.error("Error placing order:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          if (result.rows.length) {
            const orders = result.rows;
            res.status(200).json({
              success: "orders retrieved successfully",
              result: orders,
            });
          } else if (!result.rows.length) {
            res.json({ error: "no orders found" });
          }
        })
      : await pool.query(queries.CUSTOMER_ORDERS, [id], (err, result) => {
          if (err) {
            console.error("Error placing order:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          if (result.rows.length) {
            const customerOrder = result.rows;
            res.status(200).json({
              result: customerOrder,
              success: "orders retrieved successfully",
            });
          } else if (!result.rows.length) {
            res.json({ error: "no orders found" });
          }
        });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const orderStatistics = async (req: Request, res: Response) => {
  try {
    const [totalOrdersResult, completedOrdersResult] = await Promise.all([
      pool.query(queries.TOTAL_ORDERS),
      pool.query(queries.COMPLETED_ORDERS),
    ]);

    const totalOrders = parseInt(totalOrdersResult.rows[0].count);
    const completedOrders = parseInt(completedOrdersResult.rows[0].count);

    res.json([
      { title: "Total Orders", number: totalOrders, color: "#0FA5DC" },
      { title: "Complete Orders", number: completedOrders, color: "#23BAA6" },
    ]);
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { placeOrder, orders, customerOrders, orderStatistics };
