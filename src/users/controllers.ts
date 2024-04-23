import { Request, Response } from "express";
import pool from "../../db";
import * as queries from "./queries";
import upload from "../multer";

const getCustomers = (req: Request, res: Response) => {
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

const uploadImage = (req: Request, res: Response) => {
  console.log("hii: ", req.file);
  upload.single("file")(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const uploadedFile = req.file;

    if (!uploadedFile) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: uploadedFile });
  });
};

const customerStatistics = async (req: Request, res: Response) => {
  try {
    const [
      totalCustomersResult,
      activeCustomersResult,
      archivedCustomersResult,
    ] = await Promise.all([
      pool.query(queries.TOTAL_CUSTOMERS),
      pool.query(queries.ACTIVE_CUSTOMERS),
      pool.query(queries.ARCHIVED_CUSTOMERS),
    ]);

    const totalCustomers = parseInt(totalCustomersResult.rows[0].count);
    const activeCustomers = parseInt(activeCustomersResult.rows[0].count);
    const archivedCustomers = parseInt(archivedCustomersResult.rows[0].count);

    res.json([
      { title: "Total Customers", number: totalCustomers },
      { title: "Active Now", number: activeCustomers },
      { title: "Archived Customers", number: archivedCustomers },
    ]);
  } catch (error) {
    console.error("Error retrieving customer statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getCustomers, flagCustomer, uploadImage, customerStatistics };
