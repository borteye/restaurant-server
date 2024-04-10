import { Request, Response } from "express";
import pool from "../../db";
import * as queries from "./queries";

const getCustomer = (req: Request, res: Response) => {
  const { id, role } = req.params;
  try {
    pool.query(queries.CHECK_USER_ROLE, [id, role], (err, result) => {
      if (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (result.rows.length) {
        pool.query(queries.GET_CUSTOMERS, (err, result) => {
          if (err) {
            console.error("Error placing order:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          if (result.rows.length) {
            res.status(200).json(result.rows);
          }
        });
      }
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const flagCustomer = (req: Request, res: Response) => {
  const { id } = req.body;
  console.log(id);
  try {
    pool.query(queries.CHECK_EXISTENCE, [id], (err, result) => {
      if (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (result.rows.length) {
        pool.query(queries.FLAG_CUSTOMER, [id], (err, result) => {
          if (err) {
            console.error("Error placing order:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          res.json({ success: "User has been flagged" });
        });
      } else if (!result.rows.length) {
        res.json({ error: "User already flagged" });
      }
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getCustomer, flagCustomer };
